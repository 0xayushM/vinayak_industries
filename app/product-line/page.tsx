'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
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
      folder: "cateogory-1",
      images: [
        "Bike-Indicators.jpg",
        "Head-Lamps.jpg",
        "Indicators.jpg",
        "JCB-Lamps.jpg",
        "JCB-Products.jpg",
        "Realview-mirror.jpg",
        "Wheel-Cover.jpg",
        "tractor-Headlamp.jpg",
        "tractor-Headlamps.jpg"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Household Products",
      folder: "category-2",
      images: Array.from({ length: 17 }, (_, i) => `HouseHold-${i + 1}.jpg`),
      color: "from-green-500 to-green-600"
    },
    {
      name: "Electrical Parts",
      folder: "category-3",
      images: Array.from({ length: 7 }, (_, i) => `Electrical-Parts-${i + 1}.jpg`),
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Power Tool Parts",
      folder: "category-4",
      images: Array.from({ length: 5 }, (_, i) => `Power-Tool-Parts-${i + 1}.jpg`),
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Medical Industry",
      folder: "categroy-5",
      images: [
        "Medical-Industry-2.jpg",
        "Medical-Industry-3.jpg",
        "Medical-Industry-4.jpg",
        "Medical-Industry-5.jpg",
        "Medical-Industry-6.jpg",
        "Medical-Industry-7.jpg",
        "Medical-Industry-8.jpg",
        "Medical-Industry-9.jpg",
        "Medical-Industry-10.jpg",
        "Medical-Industry-11.jpg",
        "Medical-Industry-12.jpg"
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
            src="/images/bg-image.jpeg"
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
          <button className="bg-white text-amber-500 px-8 py-3.5 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors">
            Discuss Your Project
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
