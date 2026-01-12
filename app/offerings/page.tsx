'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OfferingsPage() {
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
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-amber-500 mb-4 leading-tight font-[family-name:var(--font-carbon)]"
            variants={fadeInUp}
          >
            OUR OFFERINGS
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white max-w-3xl leading-relaxed font-[family-name:var(--font-korto)]"
            variants={fadeInUp}
          >
            Comprehensive plastic injection molding solutions from design to delivery.
          </motion.p>
        </motion.div>
      </section>

      {/* Design & Development Card */}
      <section className="p-3 md:p-6 bg-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="relative rounded-[40px] md:rounded-[50px] overflow-hidden bg-gray-900">
            <div className="absolute top-0 right-0 w-[50%] h-full z-0">
              <Image
                src="/images/offerings/offering-1.jpg"
                alt="Injection Moulds Design"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
            </div>
            <div className="relative z-10 p-8 lg:p-12">
              <motion.div 
                className="max-w-xl"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-4xl font-bold text-amber-500 font-[family-name:var(--font-carbon)] mb-6">
                  DESIGN & DEVELOPMENT OF<br />INJECTION MOULDS AND DIES
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    We provide our customers with best possible options for their products and components with attention to detail. 
                    Our team of qualified Product Designers talk to you through every step of the design process.
                  </p>
                  <p>
                    Vinayak Technoplast is experienced at developing custom molds/die and tools. We have an in-house full fledged ultra 
                    modern toolroom helping to reduce overall lead times in the supply chain.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Injection Moulding Card */}
      <section className="p-3 md:p-6 bg-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="relative rounded-[40px] md:rounded-[50px] overflow-hidden bg-gray-900">
            <div className="absolute top-0 left-0 w-[50%] h-full z-0">
              <Image
                src="/images/offerings/offering-2.jpg"
                alt="Injection Moulding Engineering Polymer"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent" />
            </div>
            <div className="relative z-10 p-8 lg:p-12 flex justify-end">
              <motion.div 
                className="max-w-xl"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-4xl font-bold text-amber-500 font-[family-name:var(--font-carbon)] mb-6">
                  INJECTION MOULDING OF<br />ENGINEERING POLYMERS
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Plastic injection moulding remains at the core of our offerings. We are proud to serve the Indian industry by 
                    producing high quality parts and products at our injection moulding facility.
                  </p>
                  <p>
                    We deal with materials such as <span className="font-semibold text-white">Polystyrene, Nylon, PC, ABS, PMMA, Polypropylene, SAN and what not</span>.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Assembly Card */}
      <section className="p-3 md:p-6 bg-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="relative rounded-[40px] md:rounded-[50px] overflow-hidden bg-gray-900">
            <div className="absolute top-0 right-0 w-[50%] h-full z-0">
              <Image
                src="/images/offerings/offering-3.jpg"
                alt="Complete Product Assembly"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
            </div>
            <div className="relative z-10 p-8 lg:p-12">
              <motion.div 
                className="max-w-xl"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-4xl font-bold text-amber-500 font-[family-name:var(--font-carbon)] mb-6">
                  COMPLETE ASSEMBLY AND<br />SUPPLY OF FINISH PRODUCTS
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  It is our endeavor to provide effective services to our customers that allow them to save on time and effort and 
                  hence increase their profitability. We do packaging, assembling, and also perform secondary operations to help 
                  shorten the supply chain, provide turnkey manufacturing, and reduce lead times and overall cost.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Moulding Capacities - Table 1 */}
      <section className="p-3 md:p-6 bg-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="bg-white rounded-[40px] md:rounded-[50px] p-4 lg:p-12">
            <h2 className="text-2xl md:text-4xl p-4 font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-8">OUR MOULDING CAPACITIES</h2>
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-amber-500 text-white">
                    <th className="px-6 py-4 text-left font-semibold">SR. NO.</th>
                    <th className="px-6 py-4 text-left font-semibold">CLAMP TONNAGE TONNES (MAX)</th>
                    <th className="px-6 py-4 text-left font-semibold">MOULDING MACHINE MAKES</th>
                    <th className="px-6 py-4 text-left font-semibold">SHOT WEIGHT (GMS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { no: 1, tonnage: "850 T", machine: "HAITIAN", shot: 4500 },
                    { no: 2, tonnage: "700 T", machine: "HAITIAN", shot: 2500 },
                    { no: 3, tonnage: "650 T", machine: "SHIBAURA", shot: 2870 },
                    { no: 4, tonnage: "550 T", machine: "HAITIAN", shot: 2000 },
                    { no: 5, tonnage: "450 T", machine: "MILACRON", shot: 1530 },
                    { no: 6, tonnage: "450 T", machine: "MILACRON", shot: 1530 },
                    { no: 7, tonnage: "350 T", machine: "BOLE", shot: 1000 },
                    { no: 8, tonnage: "250 T", machine: "JSW", shot: 600 },
                    { no: 9, tonnage: "235 T", machine: "SHIBAURA", shot: 470 },
                    { no: 10, tonnage: "225 T", machine: "SHIBAURA", shot: 430 },
                    { no: 11, tonnage: "220 T", machine: "TOSHIBA", shot: 402 },
                    { no: 12, tonnage: "170 T", machine: "MILACRON", shot: 355 },
                    { no: 13, tonnage: "160 T", machine: "BOLE", shot: 250 },
                    { no: 14, tonnage: "155 T", machine: "TOSHIBA", shot: 230 },
                    { no: 15, tonnage: "150 T", machine: "MILACRON", shot: 303 },
                    { no: 16, tonnage: "150 T", machine: "SHIBAURA", shot: 210 },
                    { no: 17, tonnage: "145 T", machine: "MILACRON", shot: 150 },
                    { no: 18, tonnage: "140 T", machine: "MILACRON", shot: 140 },
                    { no: 19, tonnage: "135 T", machine: "MILACRON", shot: 135 },
                    { no: 20, tonnage: "125 T", machine: "TOSHIBA", shot: 210 },
                    { no: 21, tonnage: "120 T", machine: "NIGATA", shot: 200 },
                    { no: 22, tonnage: "120 T", machine: "SHIBAURA", shot: 162 },
                    { no: 23, tonnage: "115 T", machine: "MILACRON", shot: 128 },
                    { no: 24, tonnage: "110 T", machine: "TOSHIBA", shot: 162 },
                    { no: 25, tonnage: "105 T", machine: "L&T", shot: 162 },
                    { no: 26, tonnage: "100 T", machine: "PRATISHNA", shot: 160 },
                    { no: 27, tonnage: "100 T", machine: "SHIBAURA", shot: 110 },
                    { no: 28, tonnage: "90 T", machine: "PRATISHNA", shot: 155 },
                    { no: 29, tonnage: "80 T", machine: "SPEERY", shot: 150 },
                    { no: 30, tonnage: "75 T", machine: "SWIFT", shot: 104 },
                  ].map((row) => (
                    <tr key={row.no} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">{row.no}</td>
                      <td className="px-6 py-4 text-gray-700">{row.tonnage}</td>
                      <td className="px-6 py-4 text-gray-900 font-medium">{row.machine}</td>
                      <td className="px-6 py-4 text-gray-700">{row.shot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 lg:p-12 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white font-[family-name:var(--font-carbon)]">Ready to Start Your Project?</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our comprehensive offerings can bring your product vision to life.
            </p>
            <Link href="/contact">
              <button className="bg-white text-amber-500 px-8 py-3.5 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors">
                Request a Quote
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
