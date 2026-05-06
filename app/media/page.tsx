'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import newslettersData from "@/data/newsletters.json";
import caseStudiesData from "@/data/case-studies.json";
import blogsData from "@/data/blogs.json";

interface MediaItem {
  id: number;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  link: string;
  embedUrl?: string;
  date?: string;
  client?: string;
  tags?: string[];
}

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Newsletters", "Case Studies", "Blogs"];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const newsletters = newslettersData.items as MediaItem[];
  const caseStudies = caseStudiesData.items as MediaItem[];
  const blogs = blogsData.items as MediaItem[];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="h-[60vh] min-h-[400px] relative overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg-image.png"
            alt="Vinayak Technoplast Media"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent" />
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg className="w-full h-16" viewBox="0 0 1440 64" preserveAspectRatio="none">
            <path d="M0 64L1440 64L1440 32L0 64Z" fill="#f9fafb" />
          </svg>
        </div>

        <motion.div
          className="max-w-7xl mx-auto relative z-10 w-full px-6"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-amber-500 mb-4 leading-tight font-[family-name:var(--font-carbon)]"
            variants={fadeInUp}
          >
            MEDIA
          </motion.h1>
          <motion.p
            className="text-base md:text-2xl text-white max-w-3xl leading-relaxed font-[family-name:var(--font-korto)]"
            variants={fadeInUp}
          >
            Stories, insights and updates from inside Vinayak Technoplast — newsletters, case studies and blogs.
          </motion.p>
        </motion.div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 px-6 bg-gray-50 md:sticky top-20 z-10 border-b border-gray-200">
        <div className="max-w-8xl mx-auto">
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 py-2 md:px-6 md:py-3 text-sm md:text-lg rounded-full font-medium transition-all ${
                  activeTab === index
                    ? "bg-amber-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="h-full">
        {/* Tab 1: Newsletters */}
        {activeTab === 0 && (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-8xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-4">
                Newsletters
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl">
                Quarterly updates from across the business — capacity additions, client wins, R&amp;D progress and shop-floor news.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsletters.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col group"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <div className="relative h-52">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-base font-bold text-gray-900 mb-4 flex-1 font-[family-name:var(--font-carbon)] leading-snug">
                        {item.title}
                      </h3>
                      <span className="inline-flex items-center gap-2 text-amber-500 text-sm font-semibold group-hover:gap-3 transition-all">
                        Read Newsletter
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Case Studies */}
        {activeTab === 1 && (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-8xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-4">
                Case Studies
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl">
                Real engineering challenges solved on our shop floor — measurable improvements in cycle time, quality and tool life.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {caseStudies.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="w-full"
                  >
                    {item.embedUrl ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative group cursor-pointer"
                        aria-label={`View on LinkedIn: ${item.title}`}
                      >
                        <iframe
                          src={item.embedUrl}
                          height="399"
                          width="100%"
                          frameBorder="0"
                          allowFullScreen
                          title={item.title}
                          className="rounded-2xl border border-gray-200 shadow-sm w-full pointer-events-none"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-transparent group-hover:bg-black/5 transition-colors duration-200" />
                      </a>
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                        {item.image && (
                          <div className="relative h-64">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                          </div>
                        )}
                        <div className="p-7 flex flex-col flex-1">
                          {item.client && (
                            <div className="text-amber-500 text-xs font-bold tracking-wider uppercase mb-3">
                              {item.client}
                            </div>
                          )}
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-carbon)]">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{item.excerpt}</p>
                          <Link href={item.link} className="mt-auto">
                            <button className="bg-amber-500 text-white px-5 py-2.5 rounded-full font-medium hover:bg-amber-600 transition-colors inline-flex items-center gap-2 group text-sm">
                              Read Case Study
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Blogs */}
        {activeTab === 2 && (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-8xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-4">
                Blogs
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl">
                Thoughts and learnings from our engineering team — on design, manufacturing, materials and the polymer industry.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {blogs.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="w-full"
                  >
                    {item.embedUrl ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative group cursor-pointer"
                        aria-label={`View on LinkedIn: ${item.title}`}
                      >
                        <iframe
                          src={item.embedUrl}
                          height="199"
                          width="100%"
                          frameBorder="0"
                          allowFullScreen
                          title={item.title}
                          className="md:hidden rounded-2xl border border-gray-200 shadow-sm w-full pointer-events-none"
                        />
                        <iframe
                          src={item.embedUrl}
                          height="399"
                          width="100%"
                          frameBorder="0"
                          allowFullScreen
                          title={item.title}
                          className="hidden md:block rounded-2xl border border-gray-200 shadow-sm w-full pointer-events-none"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-transparent group-hover:bg-black/5 transition-colors duration-200" />
                      </a>
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                        {item.image && (
                          <div className="relative h-56">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-carbon)]">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                            {item.excerpt}
                          </p>
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-auto">
                            <button className="bg-amber-500 text-white px-5 py-2.5 rounded-full font-medium hover:bg-amber-600 transition-colors inline-flex items-center gap-2 group text-sm">
                              Read Blog
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </a>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-carbon)]">
            Want stories like these in your inbox?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Subscribe to our quarterly newsletter for engineering insights, case studies and updates from our shop floor.
          </p>
          <Link href="/contact">
            <button className="bg-white text-amber-500 px-8 py-3.5 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors">
              Subscribe Now
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
