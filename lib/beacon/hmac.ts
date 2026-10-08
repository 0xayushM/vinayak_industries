/**
 * HMAC-SHA256 with Web Crypto, so it runs in Next middleware (edge) as well
 * as in Node. Signatures are `sha256=<hex>` over "<timestamp>.<body>", the
 * same scheme Beacon uses for every signed call (docs/contracts.md).
 */

const enc = new TextEncoder();

export async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(message)));
  let hex = '';
  for (const b of sig) hex += b.toString(16).padStart(2, '0');
  return hex;
}

export async function signature(secret: string, timestamp: string | number, body: string): Promise<string> {
  return `sha256=${await hmacHex(secret, `${timestamp}.${body}`)}`;
}

/** Compare without stopping at the first difference (no timing hint). */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** True when the signature matches and the timestamp is within `skewSeconds` of now. */
export async function verifySignature(secret: string, timestamp: string | null, sig: string | null, body: string, skewSeconds = 300, now = Date.now()): Promise<boolean> {
  if (!secret || !timestamp || !sig || !/^\d{9,13}$/.test(timestamp)) return false;
  const ts = Number(timestamp);
  const seconds = ts > 1e12 ? ts / 1000 : ts;
  if (Math.abs(now / 1000 - seconds) > skewSeconds) return false;
  return safeEqual(sig, await signature(secret, timestamp, body));
}
