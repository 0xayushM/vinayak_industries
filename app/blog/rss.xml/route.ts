import { beaconUrl, siteKey } from '@beacon/next/config';

// The blog's RSS feed, served from this domain; Beacon builds it from the published posts.
export const revalidate = 300;

export async function GET(): Promise<Response> {
  const key = siteKey();
  if (!key) return new Response('Feed not configured', { status: 404 });
  try {
    const res = await fetch(`${beaconUrl()}/content/v1/${encodeURIComponent(key)}/rss.xml`, { next: { revalidate: 300, tags: ['beacon-posts'] } });
    if (!res.ok) return new Response('Feed unavailable', { status: 502 });
    return new Response(await res.text(), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
  } catch {
    return new Response('Feed unavailable', { status: 502 });
  }
}
