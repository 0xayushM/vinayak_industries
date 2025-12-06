'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductLineSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6 }
  };

  const categories = [
    {
      name: "Automotive Exterior Parts",
      description: "Head lamps, indicators, wheel covers, and more",
      icon: "🚗",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Household Products",
      description: "Wide range of household plastic items",
      icon: "🏠",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Electrical Parts",
      description: "Precision electrical components",
      icon: "⚡",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Power Tool Parts",
      description: "Durable power tool components",
      icon: "🔧",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Medical Industry",
      description: "High-quality medical components",
      icon: "🏥",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500">Product Line</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Diverse range of plastic injection molded products serving multiple industries
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.slice(0, 3).map((category, index) => (
            <motion.div
              key={index}
              className={`bg-white/10 border border-white/20 rounded-2xl p-8 text-white hover:shadow-xl transition-all`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
              <p className="text-white/90">{category.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          {categories.slice(3).map((category, index) => (
            <motion.div
              key={index}
              className={`bg-white/10 border border-white/20 rounded-2xl p-8 text-white hover:shadow-xl transition-all`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
              <p className="text-white/90">{category.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center" {...fadeInUp}>
          <Link href="/product-line">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-colors">
              View All Products
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
