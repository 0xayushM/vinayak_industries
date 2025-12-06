'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-pink-500 to-pink-600">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          {...fadeInUp}
        >
          Ready to Start Your Project?
        </motion.h2>
        <motion.p 
          className="text-xl text-pink-100 mb-8"
          {...fadeInUp}
        >
          Get in touch with us today for a custom quote and consultation. We're here to bring your ideas to life with precision and quality.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          {...fadeInUp}
        >
          <Link href="/contact">
            <button className="bg-white text-pink-500 px-8 py-3.5 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors">
              Request a Quote
            </button>
          </Link>
          <Link href="/contact">
            <button className="bg-pink-700 text-white px-8 py-3.5 rounded-full font-medium text-lg hover:bg-pink-800 transition-colors border-2 border-white">
              Contact Us
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
