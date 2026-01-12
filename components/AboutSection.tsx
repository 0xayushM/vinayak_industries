'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="pt-20 pb-6 px-6 bg-white">
      <div className="max-w-8xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-6">
              About<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Vinayak</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              Vinayak Technoplast is a premier one-stop ecosystem for the global plastic manufacturing industry. Inspired by the engineering vision of Mr. Arjun Kumar Agarwal (IIT-BHU) and driven by Mr. Sandeep Agarwal, we transcend traditional moulding to deliver high-precision, turnkey solutions from concept design to final assemblies all under one roof.
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
      </div>
    </section>
  );
}
