'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function EVPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    "/ev_carousel/Vinayak Carousel 2-1.png",
    "/ev_carousel/Vinayak Carousel 2-2.png",
    "/ev_carousel/Vinayak Carousel 2-3.png",
    "/ev_carousel/Vinayak Carousel 2-4.png",
    "/ev_carousel/Vinayak Carousel 2-5.png",
    "/ev_carousel/Vinayak Carousel 2-6.png",
  ];

  const evImages = [
    "/images/ev/img1.jpeg",
    "/images/ev/img2.jpeg",
    "/images/ev/img3.jpeg",
    "/images/ev/img4.jpeg",
    "/images/ev/img5.jpeg",
    "/images/ev/img6.jpeg",
    "/images/ev/img7.jpeg",
    "/images/ev/img8.jpeg",
    "/images/ev/img9.jpeg",
    "/images/ev/img10.jpeg",
    "/images/ev/img11.jpeg",
    "/images/ev/img12.jpeg",
    "/images/ev/img13.jpeg",
    "/images/ev/img14.jpeg",
    "/images/ev/img15.jpeg",
    "/images/ev/img16.jpeg",
    "/images/ev/img17.jpeg",
    "/images/ev/img18.jpeg",
    "/images/ev/img19.jpeg",
    "/images/ev/img20.jpeg",
    "/images/ev/img21.jpeg",
    "/images/ev/img22.jpeg",
    "/images/ev/img23.jpeg",
    "/images/ev/img24.jpeg",
    "/images/ev/img25.jpeg",
    "/images/ev/img26.jpeg",
    "/images/ev/img27.jpeg",
    "/images/ev/img28.jpeg",
    "/images/ev/img29.jpeg",
    "/images/ev/img30.jpeg",
    "/images/ev/img31.jpeg",
    "/images/ev/img32.jpeg",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="h-[60vh] min-h-[400px] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg-image.png"
            alt="EV Manufacturing"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg className="w-full h-16" viewBox="0 0 1440 64" preserveAspectRatio="none">
            <path d="M0 64L1440 64L1440 32L0 64Z" fill="#111827" />
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
            EV COMPONENTS
          </motion.h1>
          <motion.p 
            className="text-base md:text-2xl text-white max-w-3xl leading-relaxed font-[family-name:var(--font-korto)]"
            variants={fadeInUp}
          >
            Precision-engineered components for the electric vehicle industry.
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content - 2 Grid Layout */}
      <section className="bg-gray-900">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Panel - Fixed Carousel */}
          <div className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-[family-name:var(--font-carbon)]">
                EV PRODUCT SHOWCASE
              </h2>
              
              {/* Carousel Container */}
              <div className="relative">
                <div className="relative aspect-[6/7]">
                  {carouselImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: index === currentSlide ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={image}
                        alt={`EV Carousel ${index + 1}`}
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm p-2 rounded-full transition-all"
                >
                  <HiChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm p-2 rounded-full transition-all"
                >
                  <HiChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide 
                          ? 'bg-amber-500 w-6' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-400 mt-6 text-sm md:text-base">
                Explore our range of precision-molded EV components designed for performance and durability.
              </p>
            </div>
          </div>

          {/* Right Panel - Scrollable Image Grid */}
          <div className="lg:w-1/2 p-6 lg:p-12 lg:overflow-y-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-[family-name:var(--font-carbon)]">
              EV GALLERY
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {evImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden bg-gray-800 hover:shadow-xl transition-all cursor-pointer group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <Image
                    src={image}
                    alt={`EV Component ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
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
