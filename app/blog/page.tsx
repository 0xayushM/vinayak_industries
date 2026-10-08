import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Calendar } from 'lucide-react';
import linkedinData from '@/data/blogs.json';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BLOG_PATH, SITE_URL, formatDate, listPosts, postPath } from '@/lib/blog';

// Beacon refreshes these pages the moment a post is published (app/api/beacon/revalidate);
// otherwise they are rebuilt at most every 5 minutes.
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog | Vinayak Technoplast',
  description: 'Guides and insights on plastic injection moulding, mould making, materials and manufacturing for automotive, pharma, kitchenware and electrical products.',
  alternates: { canonical: `${SITE_URL}${BLOG_PATH}`, types: { 'application/rss+xml': `${SITE_URL}${BLOG_PATH}/rss.xml` } },
};

// Earlier posts published on LinkedIn (data/blogs.json); new posts are written and approved in Beacon.
type LinkedInItem = { id: number; title: string; excerpt?: string; link: string };
const linkedin = (linkedinData.items as LinkedInItem[]).filter((i) => i.link && i.title && !/^latest linkedin post$/i.test(i.title));

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string; tag?: string }> }) {
  const q = await searchParams;
  const page = Math.max(1, Number(q.page ?? 1) || 1);
  const tag = q.tag?.slice(0, 80) || undefined;
  const { posts, pages } = await listPosts(page, tag);
  const pageHref = (p: number) => {
    const s = new URLSearchParams();
    if (p > 1) s.set('page', String(p));
    if (tag) s.set('tag', tag);
    const qs = s.toString();
    return qs ? `${BLOG_PATH}?${qs}` : BLOG_PATH;
  };

  return (
    <div className="min-h-full bg-white">
      <Navigation />

      {/* Dark hero: the navbar is transparent with white text until you scroll past 60vh */}
      <section className="h-[60vh] min-h-[400px] relative overflow-hidden flex items-center z-0">
        <div className="absolute inset-0 z-0">
          <Image src="/images/bg-image.png" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 w-full px-(--spacing-gutter)">
          <h1 className="text-hero font-bold text-amber-500 mb-4 leading-tight font-[family-name:var(--font-carbon)]">BLOG</h1>
          <p className="text-subtitle text-white max-w-3xl leading-relaxed font-[family-name:var(--font-korto)]">
            Practical guides on injection moulding, tooling and materials, from the team on our shop floor.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-(--spacing-gutter) py-(--spacing-section-sm)">
        {tag ? (
          <p className="mb-8 text-gray-600">
            Posts tagged <span className="font-semibold text-gray-900">{tag}</span> ·{' '}
            <Link href={BLOG_PATH} className="text-amber-600 hover:underline">
              all posts
            </Link>
          </p>
        ) : null}

        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-title font-semibold text-gray-900">New articles are on their way</h2>
            <p className="mt-3 text-gray-600">
              Meanwhile, read the notes from our team below, or our{' '}
              <Link href="/media" className="text-amber-600 hover:underline">
                newsletters and case studies
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article key={p.slug} className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl">
                <Link href={postPath(p.slug)} className="flex h-full flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    {p.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element -- Beacon serves short-lived signed image links
                      <img src={p.cover} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
                        <span className="text-4xl font-bold text-amber-500 font-[family-name:var(--font-carbon)]">VT</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {p.publishedAt ? (
                      <p className="mb-2 flex items-center gap-1.5 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        {formatDate(p.publishedAt)}
                      </p>
                    ) : null}
                    <h2 className="text-xl font-semibold leading-snug text-gray-900 group-hover:text-amber-600">{p.title}</h2>
                    <p className="mt-3 line-clamp-3 text-gray-600">{p.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-amber-600">
                      Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {pages > 1 ? (
          <nav aria-label="Pages" className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={pageHref(p)}
                aria-current={p === page ? 'page' : undefined}
                className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors ${p === page ? 'bg-amber-500 text-white' : 'border border-gray-200 text-gray-700 hover:border-amber-500 hover:text-amber-600'}`}
              >
                {p}
              </Link>
            ))}
          </nav>
        ) : null}
        {page === 1 && !tag && linkedin.length ? (
          <section className="mt-(--spacing-section-sm) border-t border-gray-100 pt-(--spacing-section-sm)">
            <h2 className="text-title font-bold text-gray-900 font-[family-name:var(--font-carbon)]">
              From our <span className="text-amber-500">LinkedIn</span>
            </h2>
            <p className="mt-2 mb-8 max-w-3xl text-gray-600">Shorter notes from the engineering team on design, cycle times, materials and the industry.</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {linkedin.map((item) => (
                <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-lg">
                  <span className="font-semibold leading-snug text-gray-900 group-hover:text-amber-600">{item.title}</span>
                  {item.excerpt ? <span className="mt-2 line-clamp-2 text-sm text-gray-600">{item.excerpt}</span> : null}
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-amber-600">
                    Read on LinkedIn <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
