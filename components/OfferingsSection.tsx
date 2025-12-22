'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function OfferingsSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const equipment = [
    { range: "60-220 tons", qty: 20 },
    { range: "250-450 tons", qty: 6 },
    { range: "500-700 tons", qty: 3 },
    { range: "850 tons", qty: 1 }
  ];

  const advantages = [
    {
      number: "1",
      title: "Expert R&D Team",
      description: "Our dedicated R&D team, comprised of over 40 professionals, provides personalized, one-on-one service to meet your specific needs."
    },
    {
      number: "2",
      title: "Cost-Effective Solutions",
      description: "Achieve substantial savings of 30-50% with our optimized production processes, making your projects more economical."
    },
    {
      number: "3",
      title: "Quick Turnaround",
      description: "For time-sensitive projects, we excel in delivering rapid production turnaround times, ensuring your deadlines are met."
    }
  ];

  return (
    <section className="md:py-6 md:px-6 px-3">
      {/* Combined Card with Background Image */}
      <div className="max-w-8xl mx-auto">
        <div className="relative rounded-[40px] md:rounded-[50px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/bg-image.png"
              alt="Manufacturing Facility"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/70" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 lg:p-12">
            {/* Equipment Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left Content */}
              <motion.div {...fadeInUp}>
                <h2 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-carbon)] mb-6">
                  Our Equipment
                </h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Our facility houses 30 injection molding machines ranging from 60 to 850 tons, 
                  allowing us to handle a wide variety of project sizes and complexities.
                </p>

                {/* Equipment Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {equipment.map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <p className="text-amber-500 text-xs font-medium mb-1">Tonnage Range</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold text-lg">{item.range}</span>
                        <div className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Qty: {item.qty}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right - Tonnage Badge */}
              <motion.div 
                className="flex justify-center h-full items-end"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-64 h-64">
                  <Image
                    src="/tonnage.png"
                    alt="650 Tonnage"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            {/* <div className="border-t border-white/20 mb-12"></div> */}

            {/* Advantages Section */}
            <div>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-carbon)] mb-8"
                {...fadeInUp}
              >
                Our Main Advantages
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {advantages.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div>
                        <h3 className="font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                      </div>
                      <span className="text-5xl font-bold text-white/20">{item.number}</span>
                    </div>
                  </motion.div>
                ))}

                {/* CTA Card */}
                <motion.div
                  className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl text-white"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="font-bold text-xl mb-4">Discover Our Complete Equipment List</h3>
                  <Link href="/capabilities">
                    <button className="bg-white text-amber-600 px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors">
                      View Capabilities
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
