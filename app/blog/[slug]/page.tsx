import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BLOG_PATH, canonicalFor, formatDate, getPost, readingMinutes } from '@/lib/blog';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: 'Post not found | Vinayak Technoplast' };
  const title = post.meta?.title || post.title;
  const description = post.meta?.description || post.excerpt;
  const url = canonicalFor(post);
  return {
    title: `${title} | Vinayak Technoplast`,
    description,
    alternates: { canonical: url },
    robots: post.meta?.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: 'Vinayak Technoplast',
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: post.cover ? [post.cover] : ['/logo/logo.png'],
    },
    twitter: { card: 'summary_large_image', title, description, images: post.cover ? [post.cover] : ['/logo/logo.png'] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <div className="min-h-full bg-white">
      <Navigation />

      <section className="h-[60vh] min-h-[420px] relative overflow-hidden flex items-end z-0">
        <div className="absolute inset-0 z-0">
          {post.cover ? (
            // eslint-disable-next-line @next/next/no-img-element -- Beacon serves short-lived signed image links
            <img src={post.cover} alt="" className="h-full w-full object-cover" />
          ) : (
            <Image src="/images/bg-image.png" alt="" fill className="object-cover" priority />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/30" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10 w-full px-(--spacing-gutter) pb-12">
          <Link href={BLOG_PATH} className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-amber-400">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All posts
          </Link>
          <h1 className="text-display font-bold text-white leading-tight font-[family-name:var(--font-carbon)]">{post.title}</h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
            {post.author ? <span>{post.author}</span> : null}
            {post.publishedAt ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {formatDate(post.publishedAt)}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {readingMinutes(post.html)} min read
            </span>
          </p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-(--spacing-gutter) py-(--spacing-section-sm)">
        {/* Beacon sanitises the HTML before it leaves Beacon. */}
        <article className="beacon-prose" dangerouslySetInnerHTML={{ __html: post.html ?? '' }} />

        {post.tags.length ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Link key={t} href={`${BLOG_PATH}?tag=${encodeURIComponent(t)}`} className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700 hover:border-amber-500 hover:text-amber-600">
                {t}
              </Link>
            ))}
          </div>
        ) : null}

        <aside className="mt-14 rounded-3xl bg-gray-900 p-8 text-white">
          <h2 className="text-title font-bold font-[family-name:var(--font-carbon)]">
            Have a part to <span className="text-amber-500">mould</span>?
          </h2>
          <p className="mt-3 text-white/80">Share your drawing or sample. We reply with a quote, the right material and a realistic timeline.</p>
          <Link href="/contact" className="mt-6 inline-flex items-center rounded-full bg-amber-500 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-amber-400">
            Get a quote
          </Link>
        </aside>
      </main>

      {post.jsonLd?.map((j, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j).replace(/</g, '\\u003c') }} />
      ))}

      <Footer />
    </div>
  );
}
