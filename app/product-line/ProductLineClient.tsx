'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import productLineData from '@/data/product-line-categories.json';

const PRODUCTS_PER_PAGE = 20;

function getProductName(imagePath: string) {
  const filename = imagePath.split('/').pop() ?? '';
  return filename.replace(/\.(png|jpe?g|webp)$/i, '').replace(/[-_]/g, ' ');
}

export default function ProductLineClient() {
  const categories = productLineData.categories;
  const ALL_IMAGES = categories.flatMap((c) => c.images.map((img) => ({ img, category: c.name })));

  const [activeCategoryId, setActiveCategoryId] = useState<number | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeImages =
    activeCategoryId === 'all'
      ? ALL_IMAGES.map((x) => x.img)
      : categories.find((c) => c.id === activeCategoryId)?.images ?? [];

  const totalPages = Math.ceil(activeImages.length / PRODUCTS_PER_PAGE);
  const pagedImages = activeImages.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const activeName =
    activeCategoryId === 'all'
      ? 'All Products'
      : categories.find((c) => c.id === activeCategoryId)?.name ?? '';

  function selectCategory(id: number | 'all') {
    setActiveCategoryId(id);
    setCurrentPage(1);
    setSidebarOpen(false);
  }

  function goToPage(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const pageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
    if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="h-[50vh] min-h-[320px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src="/images/bg-image.png" alt="Injection moulded component production at Vinayak Technoplast" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg className="w-full h-16" viewBox="0 0 1440 64" preserveAspectRatio="none">
            <path d="M0 64L1440 64L1440 32L0 64Z" fill="white" />
          </svg>
        </div>
        <motion.div
          className="max-w-7xl mx-auto relative z-10 w-full px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-amber-500 mb-4 leading-tight font-[family-name:var(--font-carbon)]">
            PRODUCT LINE
          </h1>
          <p className="text-base md:text-xl text-white max-w-2xl leading-relaxed">
            Diverse range of plastic injection molded products serving multiple industries with precision and quality.
          </p>
        </motion.div>
      </section>

      {/* Mobile category toggle */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-white sticky top-20 z-20">
        <span className="font-semibold text-gray-800 text-sm">{activeName}</span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-medium"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          Categories
        </button>
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setSidebarOpen(false)}>
          <div
            className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <span className="font-bold text-gray-900">Categories</span>
              <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <nav className="p-3 space-y-1">
              <SidebarItem
                label="All Products"
                count={ALL_IMAGES.length}
                active={activeCategoryId === 'all'}
                onClick={() => selectCategory('all')}
              />
              {categories.map((cat) => (
                <SidebarItem
                  key={cat.id}
                  label={cat.name}
                  count={cat.images.length}
                  active={activeCategoryId === cat.id}
                  onClick={() => selectCategory(cat.id)}
                />
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-8 flex gap-8">

        {/* Sidebar — desktop */}
        <aside className="hidden md:block w-56 lg:w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b bg-gray-50">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Categories</p>
            </div>
            <nav className="p-2 space-y-0.5">
              <SidebarItem
                label="All Products"
                count={ALL_IMAGES.length}
                active={activeCategoryId === 'all'}
                onClick={() => selectCategory('all')}
              />
              {categories.map((cat) => (
                <SidebarItem
                  key={cat.id}
                  label={cat.name}
                  count={cat.images.length}
                  active={activeCategoryId === cat.id}
                  onClick={() => selectCategory(cat.id)}
                />
              ))}
            </nav>
          </div>
        </aside>

        {/* Products area */}
        <div className="flex-1 min-w-0">

          {/* Header bar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-carbon)]">{activeName}</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {activeImages.length} product{activeImages.length !== 1 ? 's' : ''}
                {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
              </p>
            </div>
          </div>

          {/* Grid */}
          {pagedImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {pagedImages.map((image, idx) => (
                <div
                  key={`${image}-${idx}`}
                  className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-amber-300 transition-all duration-200"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={image}
                      alt={getProductName(image)}
                      fill
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="px-3 pb-3">
                    <p className="text-xs text-gray-600 font-medium line-clamp-2 leading-snug">
                      {getProductName(image)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">No products in this category.</div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1 flex-wrap">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>

              {pageNumbers().map((p, i) =>
                p === '...' ? (
                  <span key={`ellipsis-${i}`} className="px-2 py-2 text-gray-400 text-sm">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p as number)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === p
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-amber-500 to-amber-600 mt-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-carbon)]">Need a Custom Product?</h2>
          <p className="text-xl text-amber-100 mb-8">
            We specialize in developing custom plastic injection molding solutions tailored to your specific requirements.
          </p>
          <Link href="/contact">
            <button className="bg-white text-amber-500 px-8 py-3.5 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors">
              Discuss Your Project
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SidebarItem({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-left transition-all ${
        active
          ? 'bg-amber-500 text-white font-semibold shadow-sm'
          : 'text-gray-700 hover:bg-gray-50 font-medium'
      }`}
    >
      <span className="leading-snug">{label}</span>
      <span
        className={`text-xs rounded-full px-2 py-0.5 flex-shrink-0 ml-2 ${
          active ? 'bg-amber-400 text-white' : 'bg-gray-100 text-gray-500'
        }`}
      >
        {count}
      </span>
    </button>
  );
}
