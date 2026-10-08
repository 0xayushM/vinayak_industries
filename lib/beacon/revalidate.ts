/**
 * On-demand revalidation (B5): Beacon calls the site when a post is
 * published, changed or taken down, so it shows within seconds instead of
 * after the 5-minute cache.
 *
 *   // app/api/beacon/revalidate/route.ts
 *   import { createRevalidateHandler } from '@beacon/next/revalidate';
 *   export const POST = createRevalidateHandler();
 *
 * Then set the site's "Revalidate webhook" in Beacon to
 * https://<site>/api/beacon/revalidate.
 *
 * Beacon sends POST {slug, tags, url, removed} with
 *   X-Beacon-Timestamp: <unix seconds>
 *   X-Beacon-Signature: sha256=<hex hmac(site secret, "<timestamp>.<body>")>
 * Requests more than 5 minutes off, or with a wrong signature, get 401.
 */

import { revalidatePath, revalidateTag } from 'next/cache';
import { siteSecret } from './config';
import { verifySignature } from './hmac';

export type RevalidateBody = { slug?: string; tags?: string[]; url?: string; removed?: boolean };

export type RevalidateOptions = {
  secret?: string;
  /** also revalidate these paths, e.g. (b) => [`/blog/${b.slug}`, '/blog'] */
  paths?: (body: RevalidateBody) => string[];
  /** for tests: replaces next/cache */
  revalidate?: { tag: (t: string) => void; path: (p: string) => void };
};

/** Only Beacon's own tags are honoured, so a leaked secret cannot purge the rest of the site's cache. */
const TAG = /^beacon-[a-z0-9-]{1,120}$/;

export function createRevalidateHandler(opts: RevalidateOptions = {}) {
  return async function POST(req: Request): Promise<Response> {
    const secret = siteSecret(opts.secret);
    if (!secret) return Response.json({ error: 'BEACON_SITE_SECRET is not set on this site' }, { status: 500 });
    const raw = await req.text();
    const ok = await verifySignature(secret, req.headers.get('x-beacon-timestamp'), req.headers.get('x-beacon-signature'), raw);
    if (!ok) return Response.json({ error: 'bad signature or stale timestamp' }, { status: 401 });
    let body: RevalidateBody;
    try {
      body = JSON.parse(raw) as RevalidateBody;
    } catch {
      return Response.json({ error: 'invalid JSON' }, { status: 400 });
    }
    const tags = (Array.isArray(body.tags) ? body.tags : []).filter((t): t is string => typeof t === 'string' && TAG.test(t)).slice(0, 50);
    // Next 16 wants a profile ({ expire: 0 } = drop now); Next 15 takes the tag alone and ignores it.
    const tagNow = revalidateTag as unknown as (tag: string, profile?: { expire: number }) => void;
    const doTag = opts.revalidate?.tag ?? ((t: string) => tagNow(t, { expire: 0 }));
    const doPath = opts.revalidate?.path ?? ((p: string) => revalidatePath(p));
    for (const t of tags) doTag(t);
    const paths = opts.paths ? opts.paths(body).filter((p) => typeof p === 'string' && p.startsWith('/')).slice(0, 20) : [];
    for (const p of paths) doPath(p);
    return Response.json({ revalidated: tags, paths, at: new Date().toISOString() });
  };
}
