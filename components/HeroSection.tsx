'use client';

import { motion } from "framer-motion";

export default function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 py-12 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4"
              variants={fadeInUp}
            >
              Leading Plastic Injection Molding Manufacturer
            </motion.h1>
            <motion.p 
              className="text-2xl text-blue-600 font-semibold mb-8"
              variants={fadeInUp}
            >
              in Southern California
            </motion.p>
            <motion.button 
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-colors"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Custom Quote
            </motion.button>
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-video bg-gray-800 rounded-3xl overflow-hidden relative">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/lnv8oNVRIi8"
                title="Vinayak Industries Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
