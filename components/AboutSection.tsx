'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const highlights = [
    {
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Made in India",
      subtitle: "Quality Products"
    },
    {
      icon: <span className="text-4xl font-bold text-teal-600">30+</span>,
      title: "Years of industry",
      subtitle: "experience"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Family-owned",
      subtitle: "Company"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Turnkey",
      subtitle: "Manufacturing"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Large Tonnage",
      subtitle: "up to 650"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="pt-20 pb-6 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-6">
              About<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Vinayak</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              We are a professionally managed company led by Mr. Arjun Kumar Agarwal, Mechanical Engineer from IIT-BHU. With 30 years of experience, we ensure consistent quality, timely delivery, and competitive pricing making us one of Delhi's leading moulders.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
              Our strategically located manufacturing unit spans <span className="font-semibold text-amber-500">35,000 Sq Ft</span>, equipped with state-of-the-art facilities for design, mould development, and production.
            </p>
            <Link href="/about">
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 md:px-8 md:py-4 rounded-full font-medium text-sm md:text-lg transition-colors">
                Learn More About Us
              </button>
            </Link>
          </motion.div>

          {/* Video Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/20">
              {!isPlaying ? (
                <>
                  {/* Video Thumbnail */}
                  <Image
                    src="/images/infrastructure/Vinayak-Technoplast1.jpg"
                    alt="Vinayak Industries Factory"
                    fill
                    className="object-cover"
                  />

                  {/* Play Button Overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group bg-black/20"
                    onClick={() => setIsPlaying(true)}
                  >
                    {/* Outer ring */}
                    <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-white/40 group-hover:border-white/60 transition-all" />

                    {/* Inner play button */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 group-hover:bg-amber-600 flex items-center justify-center transition-all shadow-lg group-hover:scale-105">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/lnv8oNVRIi8?autoplay=1"
                  title="Vinayak Industries Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* Highlights Bar */}
        <section className="py-12 px-6 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-3">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
