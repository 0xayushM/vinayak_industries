import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

/**
 * Server-side bot checks shared by every lead endpoint.
 *
 * Layers, cheapest first:
 *  1. declared bots and script user agents
 *  2. same-origin: the POST must come from a page on this site
 *  3. honeypot: a field people never see, so only bots fill it
 *  4. signed form token: proves a page was loaded first, and how long ago
 *  5. per-IP rate limit
 *  6. content: markup and link dumps that a quote request never contains
 *
 * "drop" answers the bot with a normal success so it does not adapt; nothing is saved.
 * "reject" returns an error the real form can react to (it retries once with a fresh token).
 */

export type Verdict =
  | { action: 'allow' }
  | { action: 'drop'; reason: string }
  | { action: 'reject'; reason: string; status: number; code: 'token' | 'origin' | 'rate' | 'content' };

const MIN_AGE_MS = 3_000; // faster than a person can open and fill any of the forms
const MAX_AGE_MS = 2 * 60 * 60 * 1000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const MAX_FIELD_LENGTH = 5_000;
const MAX_LINKS = 3;

const BOT_UA =
  /bot|crawl|spider|slurp|headless|lighthouse|python|curl|wget|axios|node-fetch|go-http|java\/|okhttp|scrap|postman|insomnia|httpclient|libwww|phantomjs|selenium|puppeteer|playwright/i;

function signingKey(): Buffer | null {
  // FORM_GUARD_SECRET is optional: without it the key is derived from a secret the site already needs.
  const base = process.env.FORM_GUARD_SECRET || process.env.GOOGLE_PRIVATE_KEY || process.env.BREW_MY_AGENT_API_KEY;
  if (!base) return null;
  return createHmac('sha256', base).update('form-guard-v1').digest();
}

function sign(payload: string, key: Buffer) {
  return createHmac('sha256', key).update(payload).digest('base64url');
}

/** Token handed to the browser when a form is opened: "<issued at>.<nonce>.<signature>". */
export function issueFormToken(now = Date.now()): string {
  const key = signingKey();
  if (!key) return '';
  const payload = `${now}.${randomBytes(8).toString('base64url')}`;
  return `${payload}.${sign(payload, key)}`;
}

export function checkFormToken(token: unknown, now = Date.now()): 'ok' | 'missing' | 'invalid' | 'too-fast' | 'expired' | 'unconfigured' {
  const key = signingKey();
  if (!key) return 'unconfigured';
  if (typeof token !== 'string' || !token) return 'missing';
  const parts = token.split('.');
  if (parts.length !== 3) return 'invalid';
  const [issued, nonce, signature] = parts;
  const expected = Buffer.from(sign(`${issued}.${nonce}`, key));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return 'invalid';
  const age = now - Number(issued);
  if (!Number.isFinite(age) || age < 0) return 'invalid';
  if (age < MIN_AGE_MS) return 'too-fast';
  if (age > MAX_AGE_MS) return 'expired';
  return 'ok';
}

// Best effort: memory is per server instance, so this stops bursts, not a patient distributed bot.
const hits = new Map<string, number[]>();

function rateLimited(key: string, now: number) {
  const recent = (hits.get(key) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
  }
  return false;
}

function sameOrigin(request: Request) {
  const source = request.headers.get('origin') || request.headers.get('referer');
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!source || !host) return false;
  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}

function clientIp(request: Request) {
  return (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}

/**
 * @param body   parsed JSON body; `_t` is the form token and `_hp` the honeypot
 * @param texts  every free-text value the visitor supplied
 * @param names  short fields (name, company) that should never contain a link
 */
export function checkSubmission(
  request: Request,
  body: Record<string, unknown>,
  { texts = [], names = [] }: { texts?: unknown[]; names?: unknown[] } = {},
  now = Date.now(),
): Verdict {
  const userAgent = request.headers.get('user-agent') || '';
  if (!userAgent || BOT_UA.test(userAgent)) return { action: 'drop', reason: 'bot user agent' };

  if (!sameOrigin(request)) return { action: 'reject', reason: 'cross-origin or missing origin', status: 403, code: 'origin' };

  if (typeof body._hp === 'string' && body._hp.trim()) return { action: 'drop', reason: 'honeypot filled' };

  const token = checkFormToken(body._t, now);
  if (token === 'unconfigured') {
    console.warn('Form guard: no signing secret available, token check skipped');
  } else if (token !== 'ok') {
    return { action: 'reject', reason: `form token ${token}`, status: 400, code: 'token' };
  }

  const path = new URL(request.url).pathname;
  if (rateLimited(`${path}|${clientIp(request)}`, now)) {
    return { action: 'reject', reason: 'rate limit', status: 429, code: 'rate' };
  }

  const strings = [...texts, ...names].filter((v): v is string => typeof v === 'string');
  if (strings.some((v) => v.length > MAX_FIELD_LENGTH)) return { action: 'reject', reason: 'field too long', status: 400, code: 'content' };
  if (strings.some((v) => /<\s*\/?\s*[a-z][^>]*>|\[\/?url/i.test(v))) return { action: 'reject', reason: 'markup in a field', status: 400, code: 'content' };
  const links = strings.join(' ').match(/https?:\/\/|www\./gi)?.length || 0;
  if (links > MAX_LINKS) return { action: 'reject', reason: 'too many links', status: 400, code: 'content' };
  if (names.some((v) => typeof v === 'string' && /https?:\/\/|www\./i.test(v))) {
    return { action: 'reject', reason: 'link in a name field', status: 400, code: 'content' };
  }

  return { action: 'allow' };
}

/** Turns a non-allow verdict into the response to send, and logs it so blocked attempts show up in the server logs. */
export function guardResponse(verdict: Exclude<Verdict, { action: 'allow' }>, request: Request): Response {
  console.warn(`Form guard: ${verdict.action} ${new URL(request.url).pathname} (${verdict.reason}) ip=${clientIp(request)}`);
  if (verdict.action === 'drop') return Response.json({ success: true }, { status: 200 });
  return Response.json({ error: 'Submission could not be verified', code: verdict.code }, { status: verdict.status });
}
