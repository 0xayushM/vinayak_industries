'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
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
      <section className="pt-32 pb-20 px-6 bg-white relative overflow-hidden flex items-cente">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/background-tile.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <motion.div 
          className="max-w-7xl relative z-10 w-full mx-auto md:py-32"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            variants={fadeInUp}
          >
            Manufacturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">Capabilities</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl leading-relaxed"
            variants={fadeInUp}
          >
            State-of-the-art equipment and advanced manufacturing processes to deliver exceptional results.
          </motion.p>
        </motion.div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 px-6 bg-gray-50 sticky top-20 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === index
                    ? 'bg-pink-500 text-white shadow-lg'
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
      <div className="min-h-screen">
        {/* Tab 1: Product Design & Development */}
        {activeTab === 0 && (
          <div>
            {/* Product Design Section */}
            <section className="py-16 px-6 bg-white">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Product Design & Development</h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <motion.div 
                    className="bg-gray-50 rounded-3xl p-8"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Design</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700"><span className="font-semibold">Solid works</span> - Three Stations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700"><span className="font-semibold">Auto Cad/Drafting Release 2014</span> : Three Stations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700"><span className="font-semibold">Delcam / Powershape 5.5</span> : One Station</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    className="bg-gray-50 rounded-3xl p-8"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Development</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700"><span className="font-semibold">Delcam Power Mill 5.5</span> : One station</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700"><span className="font-semibold">Conventional/Unconventional machines</span> 12 nos.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Capability for <span className="font-semibold">Precision Moulds, Designing Moulds & Delivering Engineering Solutions</span> by using latest Techniques & Technologies available.</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>

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
                        <li>• Capacity of Developing <span className="font-semibold text-pink-500">200 Moulds Per Annum</span> (Hot runner/Hot sprue/Three plate, Two plate, Cold Runner)</li>
                        <li>• Average Lead Time of <span className="font-semibold text-pink-500">4-6 Weeks</span> & Maintenance of Over 50 Moulds</li>
                        <li>• Capability to manufacture moulds for <span className="font-semibold text-pink-500">10 to 700 Tonnes</span> Injection molding Machines</li>
                        <li>• Capability to manufacture moulds to deliver accuracy within <span className="font-semibold text-pink-500">2 microns</span></li>
                      </ul>
                      <button className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors">
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
                        <li>• Development of Moulds increased by <span className="font-semibold text-pink-500">22%</span> in the Financial Year 17-18</li>
                        <li>• 01 EDM have been added to the tool room in the financial Year 16-17</li>
                        <li>• Manpower increase by <span className="font-semibold text-pink-500">two times</span> in the financial year 17-18</li>
                        <li>• Addition of 1 VMC VF2(HAAS) in the financial year 17-18</li>
                        <li>• Expansion of Design & Development Under Process. The proposal is to dedicate 1000 Sq feet to the D & D facility</li>
                        <li>• Mould Development Capacity will increase by <span className="font-semibold text-pink-500">40%</span> in the financial Year 18-19</li>
                      </ul>
                      <button className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors">
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Manufacturing Shop Floor</h2>
              <p className="text-xl text-gray-600 mb-12">
                Vinayak Technoplast has a state-of-the-art facility that provides high quality services to its clients in the following services
              </p>

              <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg">Dedicated Team of Processing Engineers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg"><span className="font-semibold text-pink-500">30 Years of Experience</span> of Processing Engineering Polymers & Various Polymer Compounds</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg">Over <span className="font-semibold text-pink-500">20 CNC operated</span> injection moulding machines ranging from <span className="font-semibold text-pink-500">80~450 Tonnes</span> available for bulk production</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg">Range includes make of over 20 Plastic Injection Molding Machines like <span className="font-semibold">Ferromatik, Toshiba, JSW, Windsor, Nigata, Pratishna & Bole</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg">Processing Capability Up to <span className="font-semibold text-pink-500">1530 gms</span> Of Shot Weight</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg">All Machines are CNC Controlled & Fitted With Hopper Dryers & Loaders</span>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Manufacturing and R&D</h2>
              <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Vinayak Technoplast engineers have the ability to combine unique ideas and advanced technology into innovative and superior products.
                  And, along the way, Vinayak Technoplast has built a reputation for uncompromising quality. The Vinayak Technoplast development facilities consist of design and research engineering, product manufacturing and Testing laboratory. The development team works together with our customers to bring a product from concept, through design and testing, into final production.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-lg font-semibold">Fully Equipped Area For Assembly & Sub Assemblies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-lg font-semibold">Efficient Material Handling System supported by Goods Lift</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-lg font-semibold">Motor Driven Over Head Cranes</span>
                  </li>
                </ul>
              </div>

              {/* Quality Checks Table */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">We thrive to achieve Highest Standards in Business with latest quality checks</h3>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-12">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-pink-500 text-white">
                        <th className="px-6 py-4 text-left font-semibold">S.No.</th>
                        <th className="px-6 py-4 text-left font-semibold">Machine</th>
                        <th className="px-6 py-4 text-left font-semibold">Make</th>
                        <th className="px-6 py-4 text-left font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { no: 1, machine: "Height Gauge", make: "Mitutoyo", desc: "300 mm, 600 mm" },
                        { no: 2, machine: "Bore Gauge", make: "Mitutoyo", desc: "6-100 mm, 10-18.5 mm, 18-35 mm, 50-150 mm" },
                        { no: 3, machine: "Vernier Caliper", make: "Mitutoyo", desc: "200 mm, 300 mm, 600 mm" },
                        { no: 4, machine: "Micrometers", make: "Mitutoyo", desc: "0-25 mm, 25-50 mm, 0-150 mm" },
                        { no: 5, machine: "Slip Gauge Set", make: "Mitutoyo", desc: "0.5-100mm" },
                        { no: 6, machine: "Rockwell Hardness Tester", make: "Fine Instruments", desc: "Upto 70 HRC" },
                      ].map((row) => (
                        <tr key={row.no} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-gray-900">{row.no}</td>
                          <td className="px-6 py-4 text-gray-900 font-medium">{row.machine}</td>
                          <td className="px-6 py-4 text-gray-700">{row.make}</td>
                          <td className="px-6 py-4 text-gray-700">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tooling Technology Table */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Highest Standards in Tooling With Latest Technology</h3>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-pink-500 text-white">
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
                        { no: 4, machine: "VMC", make: "HAAS", model: "VF -2", desc: "Travel : 762 mm x 406 mm x 508 mm" },
                        { no: 5, machine: "VMC", make: "HAAS", model: "VF -3", desc: "Travel : 1000 mm x 508 mm x 500 mm" },
                        { no: 6, machine: "Surface Grinder", make: "Guru Arjan", model: "3 Nos. AJ2", desc: "Bed Size : 500 mm x 200 mm" },
                        { no: 7, machine: "Automatic Grinder", make: "Praga", model: "", desc: "Bed Size : 500 mm x 200 mm" },
                        { no: 8, machine: "Milling", make: "Precicut", model: "2 Nos 2S", desc: "Travel : 1020 mm x 254 mm" },
                        { no: 9, machine: "Lathe", make: "HMT", model: "LTM20", desc: "1000mm Bed Length" },
                        { no: 10, machine: "Radial Drill", make: "Batliboi", model: "613", desc: "63 mm Boring Capacity" },
                        { no: 11, machine: "Hardness Testing Machine", make: "Rockwell", model: "", desc: "Max. Load 150 kg" },
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Lab & Testing Facilities</h2>
              <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our success in this industry is the result of hard work of manpower. Our team comprises of engineers, technocrats, marketing managers, quality controllers, R & D personnel, packing as well as store experts. We also provide training to team to improvise their skills.
                </p>
              </div>

              {/* Testing Equipment Table */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Testing Equipment in our Plant</h3>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-12">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-pink-500 text-white">
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

      <Footer />
    </div>
  );
}
