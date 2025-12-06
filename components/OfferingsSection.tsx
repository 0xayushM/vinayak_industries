'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function OfferingsSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  };

  const offerings = [
    {
      title: "Design & Development",
      description: "Expert design and development of injection moulds and dies with advanced CAD/CAM technology.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Plastic Injection Moulding",
      description: "High-precision plastic injection moulding with machines ranging from 60 to 650 tons capacity.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Assembly & Finishing",
      description: "Complete assembly services and finishing solutions for final product delivery.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500">Offerings</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive plastic injection molding solutions from design to delivery
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {offerings.map((offering, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:shadow-lg transition-all border border-white/20"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center text-white mb-6">
                {offering.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{offering.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-6">{offering.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center" {...fadeInUp}>
          <Link href="/offerings">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-colors">
              View All Offerings
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
