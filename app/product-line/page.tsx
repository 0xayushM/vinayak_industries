'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductLinePage() {
  const [activeTab, setActiveTab] = useState(0);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const categories = [
    {
      name: "Automotive Exterior Parts",
      folder: "category-1",
      images: [
        "automotive-1.png",
        "automotive-2.png",
        "automotive-3.png",
        "automotive-4.png",
        "automotive-5.png",
        "automotive-6.png",
        "automotive-7.png",
        "automotive-8.png",
        "automotive-9.jpg"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Household Products",
      folder: "category-2",
      images: [
        "household-1.png",
        "household-2.png",
        "household-3.png",
        "household-4.png",
        "household-5.png",
        "household-6.png",
        "household-7.png",
        "household-8.png",
        "household-9.png",
        "household-10.png",
        "household-11.png",
        "household-12.png",
        "household-13.png",
        "household-14.png",
        "household-15.png",
        "household-16.png",
        "household-17.jpg",
      ],
      color: "from-green-500 to-green-600"
    },
    {
      name: "Electrical Parts",
      folder: "category-3",
      images: Array.from({ length: 6 }, (_, i) => `part-${i + 1}.png`),
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Power Tool Parts",
      folder: "category-4",
      images: Array.from({ length: 5 }, (_, i) => `Power-Tool-Parts-${i + 1}.png`),
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Medical Industry",
      folder: "category-5",
      images: [
        "Medical-Industry-1.png",
        "Medical-Industry-2.png",
        "Medical-Industry-3.png",
        "Medical-Industry-4.png",
        "Medical-Industry-5.png",
        "Medical-Industry-6.png",
        "Medical-Industry-7.png",
        "Medical-Industry-8.png",
        "Medical-Industry-9.png",
        "Medical-Industry-10.png",
        "Medical-Industry-11.png"
      ],
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="h-[60vh] min-h-[400px] relative overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg-image.png"
            alt="Manufacturing Facility"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent" />
        </div>
        
        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg className="w-full h-16" viewBox="0 0 1440 64" preserveAspectRatio="none">
            <path d="M0 64L1440 64L1440 32L0 64Z" fill="#f9fafb" />
          </svg>
        </div>

        <motion.div 
          className="max-w-7xl mx-auto relative z-10 w-full px-6"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-amber-500 mb-4 leading-tight font-[family-name:var(--font-carbon)]"
            variants={fadeInUp}
          >
            PRODUCT LINE
          </motion.h1>
          <motion.p 
            className="text-base md:text-2xl text-white max-w-3xl leading-relaxed font-[family-name:var(--font-korto)]"
            variants={fadeInUp}
          >
            Diverse range of plastic injection molded products serving multiple industries with precision and quality.
          </motion.p>
        </motion.div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 px-6 bg-gray-50 md:sticky top-20 z-10 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 py-2 md:px-6 md:py-3 text-sm md:text-lg rounded-full font-medium transition-all ${
                  activeTab === index
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="pb-8 px-6 bg-gray-50 h-full">
        <div className="max-w-7xl mx-auto">
          {categories.map((category, categoryIndex) => (
            activeTab === categoryIndex && (
              <div key={categoryIndex}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.images.map((image, imageIndex) => (
                    <div 
                      key={imageIndex}
                      className="group relative aspect-square bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all cursor-pointer border border-gray-200"
                    >
                      <Image
                        src={`/images/product-line/${category.folder}/${image}`}
                        alt={`${category.name} - ${imageIndex + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-carbon)]">Need a Custom Product?</h2>
          <p className="text-xl text-amber-100 mb-8">
            We specialize in developing custom plastic injection molding solutions tailored to your specific requirements.
          </p>
          <Link href="/contact">
            <button className="bg-white text-amber-500 px-8 py-3.5 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors">
              Discuss Your Project
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
