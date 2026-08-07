'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CapabilitiesSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  };

  const capabilities = [
    {
      title: "Product Design",
      description: "Advanced CAD/CAM design capabilities with experienced engineering team",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Manufacturing Shop Floor",
      description: "State-of-the-art injection moulding machines from 60 to 650 tons",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Manufacturing and R&D",
      description: "Continuous innovation and process optimization for better results",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Lab & Testing Facilities",
      description: "Comprehensive quality testing and inspection equipment",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="py-(--spacing-section) px-(--spacing-gutter) bg-white">
      <div className="max-w-8xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-heading font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-4">
            Manufacturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Capabilities</span>
          </h2>
          <p className="text-lead text-gray-600 max-w-3xl mx-auto">
            State-of-the-art equipment and advanced manufacturing processes
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`p-6 text-white bg-gradient-to-r from-gray-800/50 to-gray-900/50 `}>
                <h3 className="text-lead font-bold mb-2">{capability.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">{capability.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center" {...fadeInUp}>
          <Link href="/capabilities">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 lg:px-7 lg:py-3 2xl:px-8 2xl:py-3.5 rounded-full font-medium text-lead transition-colors">
              Explore Our Capabilities
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
