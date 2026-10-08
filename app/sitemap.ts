import type { MetadataRoute } from 'next';
import { SITE_URL, allPosts, canonicalFor, postPath } from '@/lib/blog';

// Rebuilt with the blog (Beacon's publish webhook refreshes /sitemap.xml too).
export const revalidate = 300;

const PAGES: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/offerings', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/capabilities', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/product-line', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/moulding', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ev', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/media', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await allPosts();
  return [
    ...PAGES.map((p) => ({ url: `${SITE_URL}${p.path === '/' ? '' : p.path}`, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...posts
      .filter((p) => !p.meta?.noindex && canonicalFor(p) === `${SITE_URL}${postPath(p.slug)}`)
      .map((p) => ({ url: `${SITE_URL}${postPath(p.slug)}`, lastModified: p.updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ];
}
