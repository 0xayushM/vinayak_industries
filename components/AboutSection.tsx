'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">Vinayak Technoplast</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We are a professionally managed company led by Mr. Arjun Kumar Agarwal, Mechanical Engineer from IIT-BHU. With 30 years of experience, we ensure consistent quality, timely delivery, and competitive pricing making us one of Delhi's leading moulders.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Our strategically located manufacturing unit spans <span className="font-semibold text-pink-500">35,000 Sq Ft</span>, equipped with state-of-the-art facilities for design, mould development, and production.
            </p>
            <Link href="/about">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-colors">
                Learn More About Us
              </button>
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-4xl font-bold text-pink-500 mb-2">30+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-4xl font-bold text-pink-500 mb-2">35K</div>
              <div className="text-gray-600 font-medium">Sq Ft Facility</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-4xl font-bold text-pink-500 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Quality Focus</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-4xl font-bold text-pink-500 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
