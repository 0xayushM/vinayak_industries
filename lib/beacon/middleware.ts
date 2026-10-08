/**
 * The AI-bot tap for a site's middleware.ts (G11, spec section 7):
 *
 *   import { beaconBotTap } from '@beacon/next/middleware';
 *   export function middleware(req: NextRequest, event: NextFetchEvent) {
 *     beaconBotTap(req, { event });
 *     return NextResponse.next();
 *   }
 *
 * Only requests whose user agent matches the AI and search bot list are
 * reported, fire-and-forget, as POST {beacon}/i/b signed with the site
 * secret. It never throws and never delays the response; passing `event`
 * lets the edge runtime finish the call after the response is sent.
 */

import { beaconUrl, siteKey as envSiteKey, siteSecret } from './config';
import { signature } from './hmac';

/**
 * User-agent patterns, copied from @beacon/core BOT_SEED (spec Appendix B) so
 * the SDK has no server dependencies. Beacon identifies the exact bot and
 * checks its IP against the operator's published ranges; this list only
 * decides what is worth sending. Keep it in step with BOT_SEED.
 */
export const BOT_UA_PATTERNS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Googlebot',
  'bingbot',
  'Applebot',
  'CCBot',
  'meta-externalagent',
  'Bytespider',
  'Amazonbot',
  'DuckAssistBot',
  'MistralAI-User',
];

const BOT_RE = new RegExp(BOT_UA_PATTERNS.map((p) => p.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&')).join('|'), 'i');

export function isAiBot(userAgent: string | null | undefined): boolean {
  return Boolean(userAgent) && BOT_RE.test(userAgent as string);
}

type TapRequest = { headers: Headers; url: string; nextUrl?: { pathname: string }; ip?: string };

export type BotTapOptions = {
  /** NextFetchEvent from middleware(req, event): keeps the call alive after the response */
  event?: { waitUntil(p: Promise<unknown>): void };
  siteKey?: string;
  secret?: string;
  apiUrl?: string;
  /** status and time of the response, when the caller knows them (e.g. a custom server) */
  status?: number;
  ms?: number;
  /** for tests: replaces fetch */
  fetcher?: typeof fetch;
};

function clientIp(req: TapRequest): string | null {
  const h = req.headers;
  const cf = h.get('cf-connecting-ip');
  if (cf) return cf.trim();
  const xff = h.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim() || null;
  return h.get('x-real-ip')?.trim() || req.ip || null;
}

/** The signed request the tap sends (exported for tests and other runtimes). */
export async function botHitRequest(req: TapRequest, opts: BotTapOptions = {}): Promise<{ url: string; init: RequestInit } | null> {
  const ua = req.headers.get('user-agent');
  if (!isAiBot(ua)) return null;
  const k = envSiteKey(opts.siteKey);
  const secret = siteSecret(opts.secret);
  if (!k || !secret) return null;
  let path = req.nextUrl?.pathname;
  if (!path) {
    try {
      path = new URL(req.url).pathname;
    } catch {
      path = '/';
    }
  }
  const ts = Math.floor(Date.now() / 1000);
  const body = JSON.stringify({ k, ts, path: path.slice(0, 2000), ua: (ua as string).slice(0, 1000), ip: clientIp(req), status: opts.status ?? null, ms: opts.ms ?? null, source: 'middleware' });
  return {
    url: `${beaconUrl(opts.apiUrl)}/i/b`,
    init: { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Beacon-Signature': await signature(secret, ts, body) }, body, keepalive: true },
  };
}

/** Report an AI-bot hit. Returns at once; never throws. */
export function beaconBotTap(req: TapRequest, opts: BotTapOptions = {}): void {
  try {
    if (!isAiBot(req.headers.get('user-agent'))) return;
    const work = (async () => {
      const r = await botHitRequest(req, opts);
      if (!r) return;
      const f = opts.fetcher ?? fetch;
      await f(r.url, { ...r.init, signal: AbortSignal.timeout(3000) });
    })().catch(() => undefined);
    opts.event?.waitUntil(work);
  } catch {
    /* never break the site */
  }
}
