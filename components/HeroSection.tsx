'use client';

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section className="h-screen relative overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-image.jpeg"
          alt="Manufacturing Facility"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent" />
      </div>

      {/* Diagonal accent shape */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg className="w-full h-32" viewBox="0 0 1440 128" preserveAspectRatio="none">
          <path d="M0 128L1440 128L1440 64L0 128Z" fill="#1f2937" />
        </svg>
      </div>

      {/* Bottom banner */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 z-20">
        <div className="flex items-center">
          <div className="bg-amber-500 px-8 py-4 ml-auto mr-12 skew-x-[-12deg]">
            <span className="text-gray-900 font-bold text-xl tracking-wider skew-x-[12deg] inline-block font-[family-name:var(--font-korto)]">
              VINAYAK TECHNOPLAST
            </span>
          </div>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute left-8 bottom-32 z-10 grid grid-cols-5 gap-2">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-amber-500/60" />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 lg:px-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-amber-500 leading-[1.05] mb-2 tracking-tight font-[family-name:var(--font-carbon)]"
            variants={fadeInUp}
          >
            MANUFACTURING
          </motion.h1>
          <motion.h2 
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-8 tracking-tight font-[family-name:var(--font-carbon)]"
            variants={fadeInUp}
          >
            FOR THE FUTURE
          </motion.h2>
          
          <motion.p 
            className="text-sm md:text-lg text-gray-300 font-medium mb-10 max-w-xl italic tracking-wide font-[family-name:var(--font-korto)]"
            variants={fadeInUp}
          >
            "POWERING EVERYTHING FROM THE ROAD YOU DRIVE ON TO THE APPLIANCES YOU USE DAILY."
          </motion.p>
          
          <motion.button 
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-4 py-2 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 font-[family-name:var(--font-korto)]"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get a Custom Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
