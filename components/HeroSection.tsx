'use client';

import { motion } from "framer-motion";
import { Award, ChevronDown, TrendingUp, Users, CheckCircle } from "lucide-react";

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

  const scrollIndicator = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <section className="h-screen relative overflow-hidden flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
          onLoadedMetadata={() => {
            const video = document.querySelector('video');
            if (video) {
              video.playbackRate = 1.5;
            }
          }}
        >
          <source src="/videos/VinayakIntro.mp4" type="video/mp4" />
        </video>
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
          className="max-w-4xl"
        >
          {/* ISO Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/40 rounded-full px-4 py-2 mb-6"
            variants={fadeInUp}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-xs md:text-sm font-bold tracking-wider">ISO 9001:2015 CERTIFIED</span>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-amber-500 leading-[1.05] mb-2 tracking-tight font-[family-name:var(--font-carbon)]"
            variants={fadeInUp}
          >
            MANUFACTURING
          </motion.h1>
          <motion.h2 
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight font-[family-name:var(--font-carbon)]"
            variants={fadeInUp}
          >
            FOR THE FUTURE
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-xl text-gray-200 font-medium mb-8 max-w-2xl leading-relaxed font-[family-name:var(--font-korto)]"
            variants={fadeInUp}
          >
            Precision moulds and injection molding solutions powering everything from automotive components to consumer appliances. Trusted by industry leaders worldwide.
          </motion.p>

          {/* Stats Row */}
          {/* <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 max-w-3xl"
            variants={fadeInUp}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-carbon)]">30+</span>
              </div>
              <p className="text-xs md:text-sm text-gray-300">Years Experience</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-amber-400" />
                <span className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-carbon)]">100M+</span>
              </div>
              <p className="text-xs md:text-sm text-gray-300">Parts Delivered</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-carbon)]">99.9%</span>
              </div>
              <p className="text-xs md:text-sm text-gray-300">Quality Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-carbon)]">850T</span>
              </div>
              <p className="text-xs md:text-sm text-gray-300">Max Capacity</p>
            </div>
          </motion.div> */}
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeInUp}
          >
            <motion.button 
              className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-base transition-all shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 font-[family-name:var(--font-korto)] group inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get a Custom Quote
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
            <motion.button 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-base transition-all font-[family-name:var(--font-korto)]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Capabilities
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2 cursor-pointer group"
        variants={scrollIndicator}
        animate="animate"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-white/60 group-hover:text-white/90 text-xs font-semibold tracking-widest transition-colors">SCROLL DOWN</span>
        <ChevronDown className="w-6 h-6 text-amber-500 group-hover:text-amber-400 transition-colors" />
      </motion.div>
    </section>
  );
}
