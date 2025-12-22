'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import StatsCarousel from "./StatsCarousel";

export default function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const highlights = [
    {
      title: "Engineering Precision",
      number: "3",
      unit: "Decades",
      description: "Over 30 years of specialized experience in precision injection molding. Our engineering team has mastered the art of producing complex components with tight tolerances for demanding industries."
    },
    {
      title: "Parts Delivered",
      number: "100M+",
      unit: "Components",
      description: "We have successfully manufactured and delivered over 100 million precision-molded parts to automotive, medical, and industrial clients, maintaining consistent quality throughout."
    },
    {
      title: "Quality Pass Rate",
      number: "99.9%",
      unit: "First-Time Right",
      description: "Our rigorous quality control processes ensure that 99.9% of our parts pass inspection on the first attempt, minimizing rejections and ensuring reliability for our clients."
    },
    {
      title: "Zero-Defect OEMs",
      number: "5+",
      unit: "Tier-1 Partners",
      description: "We maintain zero-defect delivery records with 5+ major OEMs in automotive and medical sectors, demonstrating our commitment to excellence and reliability."
    },
    {
      title: "Max Clamping Force",
      number: "850T",
      unit: "Tonnage",
      description: "Our heavy-duty 850-ton and many other injection molding machines enable us to produce large, complex parts that many competitors cannot handle, giving you access to advanced manufacturing capabilities."
    },
    {
      title: "High-Performance Machines",
      number: "30+",
      unit: "Units",
      description: "Our facility houses 30+ injection molding machines ranging from 60 to 850 tonnes, allowing us to handle projects of any size and complexity with optimal efficiency."
    },
    {
      title: "Engineering Polymers",
      number: "PA66",
      unit: "PC/ABS/PBT",
      description: "We specialize in engineering-grade polymers including PA66, Polycarbonate, ABS and PBT, ensuring your components meet the highest performance standards for demanding applications."
    },
    {
      title: "Multi-Cavity Production",
      number: "High",
      unit: "Volume",
      description: "Our multi-cavity mold capabilities enable high-volume production runs with consistent quality across all cavities, reducing per-unit costs while maintaining precision."
    },
    {
      title: "Toolroom Lead Time",
      number: "4-6",
      unit: "Weeks",
      description: "Our in-house toolroom delivers rapid mold development in just 4-6 weeks, significantly faster than industry standards, helping you get to market quickly."
    },
    {
      title: "Production Cycles",
      number: "24x7",
      unit: "Operations",
      description: "We operate round-the-clock production cycles to meet tight deadlines and high-volume demands, ensuring your orders are completed on time, every time."
    },
    {
      title: "Faster Tooling",
      number: "30%",
      unit: "Time Savings",
      description: "Our optimized tooling processes are 30% faster than industry averages, reducing your time-to-market and giving you a competitive edge in your industry."
    },
    {
      title: "In-House Capabilities",
      number: "Full",
      unit: "Turnkey",
      description: "From mold design and maintenance to production and assemblies, everything is handled in-house, reducing lead times and ensuring seamless communication throughout your project."
    },
    {
      title: "Manufacturing Facility",
      number: "35,000",
      unit: "Sq. Ft.",
      description: "Our strategically located 35,000 sq. ft. facility in Delhi NCR is equipped with state-of-the-art infrastructure for design, mold development, and high-volume production."
    },
    {
      title: "Strategic Location",
      number: "Delhi",
      unit: "NCR",
      description: "Located in the heart of India's industrial hub, our Delhi NCR facility offers excellent connectivity and logistics advantages for timely delivery across India and export markets."
    },
    {
      title: "Quality Certified",
      number: "ISO",
      unit: "9001:2015",
      description: "We are ISO 9001:2015 certified, demonstrating our commitment to international quality management standards and continuous improvement in all our processes."
    },
    {
      title: "Industry Trust",
      number: "Auto",
      unit: "Medical and Others",
      description: "Trusted by leading automotive, medical device and other manufacturers, we understand the stringent requirements of regulated industries and deliver components that meet or exceed specifications."
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

        {/* Infographics Carousel Section */}
        <StatsCarousel highlights={highlights} />
      </div>
    </section>
  );
}
