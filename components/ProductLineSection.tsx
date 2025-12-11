'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ProductLineSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const products = [
    {
      name: "MEDICAL INDUSTRY COMPONENTS",
      description: "Critical items such as suction units, PC jars, needle cutters (Nil-Sharps), etc. ensuring strict adherence to quality standards for our medical partners"
    },
    {
      name: "MASS CONSUMER PRODUCTS",
      description: "Such as switches, energy meters, LED light housings, and multi-plugs."
    },
    {
      name: "AUTOMOTIVE EXTERIOR PARTS",
      description: "High-precision parts such as visors, headlamps, tail lamps, reflectors, etc, serving two-wheelers, four-wheelers, and tractors"
    },
    {
      name: "PRECISION INDUSTRIAL COMPONENTS",
      description: "Mechanical and technical parts for industrial machinery, vehicles, or heavy equipment."
    }
  ];

  return (
    <section className="md:py-6 md:px-6 px-3 py-3">
      <div className="max-w-8xl mx-auto">
        <div className="relative rounded-[40px] md:rounded-[50px] overflow-hidden bg-gray-900">
          {/* Background Image - Top Right Corner Only */}
          <div className="absolute top-0 right-0 w-[70%] h-[55%] z-0">
            <Image
              src="/images/bg-image.jpeg"
              alt="Manufacturing Facility"
              fill
              className="object-cover object-top"
            />
            {/* Gradient overlays to blend into dark background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tl from-gray-900/80 via-transparent to-transparent" />
          </div>

          {/* Decorative dots */}
          <div className="absolute top-8 right-8 grid grid-cols-5 gap-2 z-10">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-amber-500/60" />
            ))}
          </div>

          {/* Diagonal accent lines */}
          <div className="absolute top-[40%] left-0 w-[45%] h-[2px] bg-gradient-to-r from-amber-500/50 to-transparent transform -rotate-12 z-5" />
          <div className="absolute top-[45%] left-0 w-[35%] h-[2px] bg-gradient-to-r from-amber-500/30 to-transparent transform -rotate-12 z-5" />

          {/* Content */}
          <div className="relative z-10 p-8 lg:p-12">
            {/* Top Section - Title and Products */}
            <div className="grid gap-8 mb-12">
              {/* Left Column - Title */}
              <motion.div {...fadeInUp} className="lg:col-span-2">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-500 mb-6 font-[family-name:var(--font-carbon)] leading-tight">
                  OUR CORE PRODUCTS
                </h2>
                <p className="text-gray-300 max-w-xl leading-relaxed text-sm">
                  We produce a wide range of high-quality products designed to meet the needs of industry and business (B2B) customers. Each of our products is developed through a precision manufacturing process and rigorous quality testing.
                </p>
              </motion.div>

              {/* Right Columns - Products Grid */}
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-x-12 gap-y-6">
                {products.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-amber-500 border-b-[8px] border-b-transparent mt-1 flex-shrink-0" />
                      <h3 className="text-amber-500 font-bold text-sm tracking-wide">
                        {product.name}
                      </h3>
                    </div>
                    <p className="max-w-xl text-gray-400 text-sm leading-relaxed pl-5">
                      {product.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
