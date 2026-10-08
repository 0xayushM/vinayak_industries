/**
 * The blog's posts come from Beacon (beacon.vinayaktechnoplast.com → Blog).
 * Marketers write and approve them there; these helpers read the published
 * ones. They never throw: if Beacon is unreachable or the site key is not
 * set, the blog shows an empty state instead of breaking the build or page.
 */

import { getPost as beaconGetPost, listPosts as beaconListPosts, type BeaconPost, type PostList } from '@beacon/next/content';

export type { BeaconPost };

/** The site's own address; post links and canonicals use it. */
export const SITE_URL = 'https://www.vinayaktechnoplast.com';
export const BLOG_PATH = '/blog';

export async function listPosts(page = 1, tag?: string): Promise<PostList> {
  try {
    return await beaconListPosts({ page, tag });
  } catch (error) {
    console.error('Blog: could not list posts from Beacon:', (error as Error).message);
    return { posts: [], page: 1, pages: 1, total: 0 };
  }
}

export async function getPost(slug: string): Promise<BeaconPost | null> {
  try {
    return await beaconGetPost(slug);
  } catch (error) {
    console.error(`Blog: could not load "${slug}" from Beacon:`, (error as Error).message);
    return null;
  }
}

/** Every published post (for the sitemap); at most 20 pages of 12. */
export async function allPosts(): Promise<BeaconPost[]> {
  const first = await listPosts(1);
  const out = [...first.posts];
  for (let p = 2; p <= Math.min(first.pages, 20); p++) out.push(...(await listPosts(p)).posts);
  return out;
}

export function postPath(slug: string): string {
  return `${BLOG_PATH}/${slug}`;
}

/**
 * The canonical address: the post's page on this site, unless the marketer
 * set a different canonical in Beacon (a post first published elsewhere).
 */
export function canonicalFor(post: BeaconPost): string {
  const own = `${SITE_URL}${postPath(post.slug)}`;
  const set = post.meta?.canonical;
  if (!set) return own;
  try {
    const u = new URL(set);
    // Beacon builds its default canonical from the site's domain; treat that as ours.
    if (u.hostname.replace(/^www\./, '') === 'vinayaktechnoplast.com' && u.pathname === postPath(post.slug)) return own;
    return set;
  } catch {
    return own;
  }
}

export function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
}

/** Minutes to read, from the post's HTML (about 220 words a minute). */
export function readingMinutes(html: string | undefined): number {
  const words = (html ?? '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
