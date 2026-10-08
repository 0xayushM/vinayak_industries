import { createRevalidateHandler } from '@beacon/next/revalidate';

/**
 * Beacon calls this when a post is published, changed or taken down, so the
 * blog shows it within seconds. Signed with BEACON_SITE_SECRET; anything
 * else gets 401. Set it in Beacon: Blog → Connect a site → step 1.
 */
export const POST = createRevalidateHandler({ paths: (b) => ['/blog', ...(b.slug ? [`/blog/${b.slug}`] : []), '/sitemap.xml'] });
