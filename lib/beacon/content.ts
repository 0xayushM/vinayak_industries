/**
 * The content API client (B4) for a site's blog pages. Server-side only.
 *
 *   import { getPost, listPosts } from '@beacon/next/content';
 *   export const revalidate = 300;
 *
 *   const { posts, pages } = await listPosts({ tag, page });
 *   const post = await getPost(slug);                       // null when not published
 *   const draft = await getPost(slug, { preview: true });   // needs BEACON_SITE_SECRET
 *
 * Responses are cached by Next for 5 minutes and tagged so Beacon's publish
 * webhook can refresh them at once: `beacon-posts` (every list),
 * `beacon-post-<slug>` (one post), `beacon-tag-<tag>` (a tag page). The
 * webhook handler is in @beacon/next/revalidate.
 */

import { beaconUrl, siteKey, siteSecret } from './config';

export type BeaconPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** sanitised HTML (posts only) */
  html?: string;
  cover: string | null;
  author: string | null;
  tags: string[];
  categories: string[];
  publishedAt: string | null;
  updatedAt: string;
  meta: { title: string; description: string; canonical: string; noindex: boolean };
  /** JSON-LD blocks to render in <script type="application/ld+json"> (posts only) */
  jsonLd?: Record<string, unknown>[];
  url: string;
};

export type PostList = { posts: BeaconPost[]; page: number; pages: number; total: number };

export type ContentOptions = { siteKey?: string; apiUrl?: string; secret?: string; revalidate?: number | false };

type NextFetchInit = RequestInit & { next?: { revalidate?: number | false; tags?: string[] } };

/** Same slug rule as Beacon (tags become beacon-tag-<slug>). */
export function tagSlug(tag: string): string {
  return tag
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function base(opts: ContentOptions): string {
  const k = siteKey(opts.siteKey);
  if (!k) throw new Error('@beacon/next: set NEXT_PUBLIC_BEACON_SITE_KEY or BEACON_SITE_KEY (or pass siteKey)');
  return `${beaconUrl(opts.apiUrl)}/content/v1/${encodeURIComponent(k)}`;
}

async function getJson<T>(url: string, init: NextFetchInit): Promise<T | null> {
  const res = await fetch(url, { ...init, headers: { Accept: 'application/json', ...(init.headers ?? {}) } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Beacon content API answered ${res.status} for ${url}`);
  return (await res.json()) as T;
}

export async function listPosts(q: { tag?: string; page?: number } = {}, opts: ContentOptions = {}): Promise<PostList> {
  const params = new URLSearchParams();
  if (q.tag) params.set('tag', q.tag);
  if (q.page && q.page > 1) params.set('page', String(q.page));
  const qs = params.toString();
  const tags = ['beacon-posts', ...(q.tag ? [`beacon-tag-${tagSlug(q.tag)}`] : [])];
  const data = await getJson<PostList>(`${base(opts)}/posts${qs ? `?${qs}` : ''}`, { next: { revalidate: opts.revalidate ?? 300, tags } });
  return data ?? { posts: [], page: 1, pages: 1, total: 0 };
}

export async function getPost(slug: string, o: { preview?: boolean } & ContentOptions = {}): Promise<BeaconPost | null> {
  const url = `${base(o)}/posts/${encodeURIComponent(slug)}`;
  if (o.preview) {
    const secret = siteSecret(o.secret);
    if (!secret) throw new Error('@beacon/next: previews need BEACON_SITE_SECRET');
    return getJson<BeaconPost>(`${url}?preview=1`, { cache: 'no-store', headers: { Authorization: `Bearer ${secret}` } });
  }
  return getJson<BeaconPost>(url, { next: { revalidate: o.revalidate ?? 300, tags: ['beacon-posts', `beacon-post-${slug}`] } });
}

/** URLs for the site's sitemap.xml / feed: Beacon serves them ready-made. */
export function feedUrls(opts: ContentOptions = {}): { rss: string; sitemap: string } {
  const b = base(opts);
  return { rss: `${b}/rss.xml`, sitemap: `${b}/sitemap-posts.xml` };
}
