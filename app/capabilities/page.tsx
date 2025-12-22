'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CapabilitiesPage() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Product Design & Development",
    "Manufacturing Shop Floor",
    "Manufacturing and R&D",
    "Lab & Testing Facilities"
  ];

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
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-amber-500 mb-4 leading-tight font-[family-name:var(--font-carbon)]"
            variants={fadeInUp}
          >
            CAPABILITIES
          </motion.h1>
          <motion.p 
            className="text-base md:text-2xl text-white max-w-3xl leading-relaxed font-[family-name:var(--font-korto)]"
            variants={fadeInUp}
          >
            State-of-the-art equipment and advanced manufacturing processes to deliver exceptional results.
          </motion.p>
        </motion.div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 px-6 bg-gray-50 md:sticky top-20 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 py-2 md:px-6 md:py-3 text-sm md:text-lg rounded-full font-medium transition-all ${
                  activeTab === index
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="h-full">
        {/* Tab 1: Product Design & Development */}
        {activeTab === 0 && (
          <div>
            {/* Product Design Section */}
            <section className="py-16 px-6 bg-white">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] font-[family-name:var(--font-carbon)] mb-8">Product Design & Development</h2>
                
                

                {/* VMC HAAS and EDM Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div 
                    className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0 }}
                  >
                    <div className="relative h-64">
                      <Image 
                        src="/images/manufacturing/manufacturing-1/VMC-HAAS-VF3.jpg"
                        alt="VMC HAAS VF3"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">VMC HAAS VF3</h3>
                      <ul className="space-y-3 text-gray-600">
                        <li>• Capacity of Developing <span className="font-semibold text-amber-500">200 Moulds Per Annum</span> (Hot runner/Hot sprue/Three plate, Two plate, Cold Runner)</li>
                        <li>• Average Lead Time of <span className="font-semibold text-amber-500">4-6 Weeks</span> & Maintenance of Over 50 Moulds</li>
                      </ul>
                      <button className="mt-6 bg-amber-500 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-600 transition-colors">
                        Send Enquiry
                      </button>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="relative h-64">
                      <Image 
                        src="/images/manufacturing/manufacturing-1/edm-die-machine.jpg"
                        alt="EDM JOEMAR AZ50TR"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">EDM JOEMAR AZ50TR</h3>
                      <ul className="space-y-3 text-gray-600">
                        <li>• Capability to manufacture moulds for <span className="font-semibold text-amber-500">10 to 700 Tonnes</span> Injection molding Machines</li>
                        <li>• Capability to manufacture moulds to deliver accuracy within <span className="font-semibold text-amber-500">2 microns</span></li>
                     </ul>
                      <button className="mt-6 bg-amber-500 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-600 transition-colors">
                        Send Enquiry
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: Manufacturing Shop Floor */}
        {activeTab === 1 && (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] font-[family-name:var(--font-carbon)] mb-8">Manufacturing Shop Floor</h2>
              <p className="text-xl text-gray-600 mb-12">
                Vinayak Technoplast has a state-of-the-art facility that provides high quality services to its clients in the following areas.
              </p>

              <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg">Dedicated Team of Processing Engineers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg"><span className="font-semibold text-amber-500">30 Years of Experience</span> of Processing Engineering Polymers & Various Polymer Compounds</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg">Over <span className="font-semibold text-amber-500">30 PLC operated</span> injection moulding machines ranging from <span className="font-semibold text-amber-500">60~850 Tonnes</span> available for bulk production</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg">Range includes make of over 30 Plastic Injection Molding Machines like <span className="font-semibold">Ferromatik, Toshiba, L&T, Shibaura and Bole</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg">Processing Capability Up to <span className="font-semibold text-amber-500">4000 gms</span> Of Shot Weight</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg">All Machines are PLC Controlled & Fitted With Hopper Dryers & Loaders</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-96 rounded-3xl overflow-hidden shadow-lg">
                  <Image 
                    src="/images/manufacturing/manufacturing-2.jpg"
                    alt="Manufacturing Shop Floor"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Manufacturing and R&D */}
        {activeTab === 2 && (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] font-[family-name:var(--font-carbon)] mb-8">Manufacturing and R&D</h2>
              <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Vinayak Technoplast engineers have the ability to combine unique ideas and advanced technology into innovative and superior products.
                  And, along the way, Vinayak Technoplast has built a reputation for uncompromising quality. The Vinayak Technoplast development facilities consist of design and research engineering, product manufacturing and Testing laboratory. The development team works together with our customers to bring a product from concept, through design and testing, into final production.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-lg font-semibold">Fully Equipped Area For Assembly & Sub Assemblies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-lg font-semibold">Efficient Material Handling System supported by Goods Lift</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-lg font-semibold">Motor Driven Over Head Cranes</span>
                  </li>
                </ul>
              </div>

              {/* Quality Checks Table */}
              {/* Tooling Technology Table */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Highest Standards in Tooling With Latest Technology</h3>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-amber-500 text-white">
                        <th className="px-4 py-3 text-left font-semibold">S. No.</th>
                        <th className="px-4 py-3 text-left font-semibold">Machine</th>
                        <th className="px-4 py-3 text-left font-semibold">Make</th>
                        <th className="px-4 py-3 text-left font-semibold">Model</th>
                        <th className="px-4 py-3 text-left font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { no: 1, machine: "Wire cut", make: "Electronica", model: "Sprintcut", desc: "Travel : 400 mm x 300 mm x 225 mm" },
                        { no: 2, machine: "EDM", make: "Electronica", model: "5535", desc: "Travel : 50 A Pulse Generator 550 mm x 350 mm" },
                        { no: 3, machine: "EDM", make: "JOEMARS", model: "AZ50TR", desc: "Travel : 50 A Pulse Generator 400 mm x 400 mm x 300 mm" },
                        { no: 4, machine: "EDM", make: "Electronica", model: "EB1510N", desc: "Travel : 95 A Pulse Generator 1500 mm x 1000 mm x 600 mm" },
                        { no: 5, machine: "ZMC", make: "Electronica", model: "", desc: "Travel : 1500 mm x 1200 mm x 600 mm" },
                        { no: 6, machine: "VMC", make: "HAAS", model: "VF-2", desc: "Travel : 762 mm x 406 mm x 508 mm" },
                        { no: 7, machine: "VMC", make: "HAAS", model: "VF-3", desc: "Travel : 1000 mm x 508 mm x 500 mm" },
                        { no: 8, machine: "VMC", make: "BFW", model: "1577", desc: "Travel : 1500 mm x 700 mm x 700 mm" },
                        { no: 9, machine: "Surface Grinder", make: "Guru Arjan 3 Nos.", model: "AJ2", desc: "Bed Size : 500 mm x 200 mm" },
                        { no: 10, machine: "Automatic Grinder", make: "Praga", model: "", desc: "Bed Size : 500 mm x 200 mm" },
                        { no: 11, machine: "Milling", make: "Precicut 2 Nos", model: "2S", desc: "Travel : 1020 mm x 254 mm" },
                        { no: 12, machine: "Milling", make: "Maan", model: "", desc: "Travel : 1300 mm x 800 mm" },
                        { no: 13, machine: "Lathe", make: "HMT", model: "LTM20", desc: "1000mm Bed Length" },
                        { no: 14, machine: "Lathe", make: "HMT", model: "", desc: "1200mm Bed Length" },
                        { no: 15, machine: "Radial Drill", make: "Batliboi", model: "613", desc: "63 mm Boring Capacity" },
                        { no: 16, machine: "Radial Drill", make: "Prakash", model: "", desc: "50 mm Boring Capacity" },
                        { no: 17, machine: "Hardness Testing Machine", make: "Rockwell", model: "", desc: "Max. Load 150 kg" },
                      ].map((row) => (
                        <tr key={row.no} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-900">{row.no}</td>
                          <td className="px-4 py-3 text-gray-900 font-medium">{row.machine}</td>
                          <td className="px-4 py-3 text-gray-700">{row.make}</td>
                          <td className="px-4 py-3 text-gray-700">{row.model}</td>
                          <td className="px-4 py-3 text-gray-700">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: Lab & Testing Facilities */}
        {activeTab === 3 && (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] font-[family-name:var(--font-carbon)] mb-8">Lab & Testing Facilities</h2>
              <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our success in this industry is the result of hard work of manpower. Our team comprises of engineers, technocrats, marketing managers, quality controllers, R & D personnel, packing as well as store experts. We also provide continuous training to team to improvise their skills.
                </p>
              </div>

              {/* Testing Equipment Table */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Testing Equipment in our Plant</h3>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-12">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-amber-500 text-white">
                        <th className="px-6 py-4 text-left font-semibold">S.No.</th>
                        <th className="px-6 py-4 text-left font-semibold">Equipment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { no: 1, equipment: "Endurance Test Apparatus" },
                        { no: 2, equipment: "Sample Test Apparatus" },
                        { no: 3, equipment: "High Voltage/IR & Pie Shock Test" },
                        { no: 4, equipment: "Temp. Indicator, Temp. Rise Box, Load Tester" },
                        { no: 5, equipment: "Glow wire Test Apparatus" },
                        { no: 6, equipment: "Damage to Conductor Test Apparatus" },
                        { no: 7, equipment: "Hot Air Oven" },
                        { no: 8, equipment: "Humidity Chamber" },
                        { no: 9, equipment: "Deep Freezer" },
                        { no: 10, equipment: "Meggar Tester" },
                      ].map((row) => (
                        <tr key={row.no} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-gray-900">{row.no}</td>
                          <td className="px-6 py-4 text-gray-900 font-medium">{row.equipment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Equipment Images */}
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Testing Equipment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Deep Freezer", url: "/images/manufacturing/manufacturing-4/Deep-Freezer.jpg" },
                  { name: "Humidity Chamber", url: "/images/manufacturing/manufacturing-4/Humidity-Chamber-1.jpg" },
                  { name: "Hot Air Oven", url: "/images/manufacturing/manufacturing-4/Hot-Air-Oven.jpg" },
                  { name: "Glow Wire Test Apparatus", url: "/images/manufacturing/manufacturing-4/Glow-Wire-Test.jpg" },
                  { name: "Tumbling Barrel", url: "/images/manufacturing/manufacturing-4/Tumbling-Barrel.jpg" },
                  { name: "Switch Endurance Test Apparatus", url: "/images/manufacturing/manufacturing-4/Swtich-Endurance-Test.jpg" },
                ].map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-64">
                      <Image 
                        src={item.url}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
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
