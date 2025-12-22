'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef } from 'react';

interface BlogPost {
  id: number;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  link: string;
}

const BlogSection = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth / 2;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Blog Post Title",
      image: "/images/blog/blog1.png",
      excerpt: "Short excerpt of the blog post...",
      content: "You Don’t Reduce Costs by Changing Vendors. You Reduce Costs by Changing Design. In manufacturing, cost reduction is often approached by changing suppliers or negotiating prices. But real, sustainable savings begin much earlier...",
      link: "https://www.linkedin.com/posts/vinayaktechnoplast_you-dont-reduce-cost-by-changing-vendors-activity-7407371083084902401-D6uw"
    },
    {
      id: 2,
      title: "Blog Post Title",
      image: "/images/blog/blog2.png",
      excerpt: "Short excerpt of the blog post...",
      content: "Full content of the blog post will be displayed here. This text will be clamped and show ...more at the end if it's too long.",
      link: "https://www.linkedin.com/posts/vinayaktechnoplast_you-dont-reduce-cost-by-changing-vendors-activity-7407371083084902401-D6uw"
    },
    {
      id: 3,
      title: "Blog Post Title",
      image: "/images/blog/blog3.png",
      excerpt: "Short excerpt of the blog post...",
      content: "Full content of the blog post will be displayed here. This text will be clamped and show ...more at the end if it's too long.",
      link: "https://www.linkedin.com/posts/vinayaktechnoplast_you-dont-reduce-cost-by-changing-vendors-activity-7407371083084902401-D6uw"
    }

  ];

  const handleCardClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleImageClick = (e: React.MouseEvent, postId: number) => {
    e.stopPropagation();
    setFlippedCard(flippedCard === postId ? null : postId);
  };

  return (
    <section className="py-16 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left side - Heading (span-1) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-4">
              Latest <span className="text-amber-500">Insights</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Stay updated with our latest news and insights
            </p>
          </motion.div>

          {/* Right side - Scrollable carousel (span-2) */}
          <div className="lg:col-span-2 relative">
            {/* Navigation Arrow - Right Only */}
            <button
              onClick={() => scroll('right')}
              className="absolute -right-5 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="perspective-1000 flex-shrink-0 w-full md:w-[calc(50%-12px)] snap-start"
                  onMouseEnter={() => setFlippedCard(post.id)}
                  onMouseLeave={() => setFlippedCard(null)}
                >
                  <div
                    className={`relative w-full h-96 transition-transform duration-700 transform-style-3d ${
                      flippedCard === post.id ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front of card - Image */}
                    <div 
                      className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                      onClick={(e) => handleImageClick(e, post.id)}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Tap/Hover overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="text-center">
                            <span className="hidden md:inline-block text-white font-semibold text-sm">
                              Hover me
                            </span>
                            <span className="inline-block md:hidden text-white font-semibold text-sm">
                              Tap me
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back of card - Content */}
                    <div 
                      className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer"
                      onClick={() => handleCardClick(post.link)}
                    >
                      <div className="h-full p-6 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-carbon)]">
                          {post.title}
                        </h3>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-gray-700 leading-relaxed line-clamp-[12]">
                            {post.content}
                            <span className="text-amber-500 font-medium ml-1">...more</span>
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <span className="text-amber-500 font-medium text-sm">
                            Click to read full post →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
