'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Highlight {
  title: string;
  number: string;
  unit: string;
  description: string;
}

interface StatsCarouselProps {
  highlights: Highlight[];
}

export default function StatsCarousel({ highlights }: StatsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardsPerView = 4;
  const totalSlides = Math.ceil(highlights.length / cardsPerView);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getCurrentCards = () => {
    const startIdx = currentIndex * cardsPerView;
    return highlights.slice(startIdx, startIdx + cardsPerView);
  };

  return (
    <section className="py-16 md:px-6 px-3 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-3">
            Why Industry Leaders Choose Us
          </h2>
          <p className="text-gray-600 text-lg">
            Proven capabilities backed by real metrics
          </p>
        </motion.div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {getCurrentCards().map((item, index) => (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Animated Border Gradient */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 -z-10" style={{ padding: '2px' }}>
                      <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Title */}
                      <h3 className="text-amber-600 group-hover:text-amber-700 font-bold text-sm mb-4 uppercase tracking-wide transition-colors duration-300">
                        {item.title}
                      </h3>

                      {/* Large Number */}
                      <div className="mb-2">
                        <span className="text-5xl md:text-6xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 font-[family-name:var(--font-carbon)] leading-none transition-all duration-300">
                          {item.number}
                        </span>
                      </div>

                      {/* Unit */}
                      <div className="mb-4">
                        <span className="text-sm font-semibold text-gray-600 group-hover:text-amber-700 transition-colors duration-300">
                          {item.unit}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 leading-relaxed transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-amber-500 text-gray-800 hover:text-white rounded-full p-3 shadow-lg transition-all duration-300 group z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-amber-500 text-gray-800 hover:text-white rounded-full p-3 shadow-lg transition-all duration-300 group z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'bg-amber-500 w-8 h-2'
                    : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          {!isPaused && (
            <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, ease: 'linear' }}
                key={currentIndex}
              />
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link href="/capabilities">
            <button className="text-amber-600 hover:text-amber-700 font-semibold text-sm flex items-center gap-2 mx-auto group">
              <span>View All Capabilities</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
