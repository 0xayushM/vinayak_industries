'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
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
      <section className="pt-32 pb-20 px-6 bg-white relative overflow-hidden flex items-center">
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
          className="max-w-7xl mx-auto relative z-10 w-full md:py-32"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            variants={fadeInUp}
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">Offerings</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl leading-relaxed"
            variants={fadeInUp}
          >
            Comprehensive plastic injection molding solutions from design to delivery.
          </motion.p>
        </motion.div>
      </section>

      {/* Design & Development */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Design & Development of<br />
                <span className="text-pink-500">Injection Moulds and Dies</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We provide our customers with best possible options for their products and components with attention to detail. 
                  Our team of qualified Product Designers talk to you through every step of the design process to ensure that the 
                  design best represents your ideas for the product. The design studios are fully equipped with the latest hardware 
                  equipment and software. A range of tooling and other machines ensure that we deliver the best quality product within 
                  the fastest possible time.
                </p>
                <p>
                  Vinayak Technoplast is experienced at developing custom molds/die and tools. We have an in-house full fledged ultra 
                  modern toolroom helping to reduce overall lead times in the supply chain. It also ensures seamless communication 
                  through the development, tooling and production process.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/offerings/offering-1.jpg"
                  alt="Injection Moulds Design"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Injection Moulding */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/offerings/offering-2.jpg"
                  alt="Injection Moulding Engineering Polymer"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Injection Moulding of<br />
                <span className="text-pink-500">Engineering Polymers</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Plastic injection moulding remains at the core of our offerings. We are proud to serve the Indian industry by 
                  producing high quality parts and products at our injection moulding facility.
                </p>
                <p>
                  We deal with materials such as <span className="font-semibold text-gray-900">Polystyrene, Nylon, PC, ABS, PMMA, Polypropylene and SAN</span> for 
                  injection moulding. We employ a team of experienced and dedicated operators who are adept at using these materials 
                  and our equipment. All are computer controlled, and give optimal efficiency in set-up, process control and monitoring. 
                  Our injection molding machines are designed for repeatability to help secure reduced labor costs and lower reject rates, 
                  saving you money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Assembly */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Complete Assembly and Supply<br />
                <span className="text-pink-500">of Finish Products</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  It is our endeavor to provide effective services to our customers that allow them to save on time and effort and 
                  hence increase their profitability. We do packaging, assembling, and also perform secondary operations to help 
                  shorten the supply chain, provide turnkey manufacturing, and reduce lead times and overall cost.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/offerings/offering-3.jpg"
                  alt="Complete Product Assembly"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moulding Capacities - Table 1 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Moulding Capacities</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-pink-500 text-white">
                    <th className="px-6 py-4 text-left font-semibold">S.No.</th>
                    <th className="px-6 py-4 text-left font-semibold">Moulding Machines</th>
                    <th className="px-6 py-4 text-left font-semibold">Clamp Tonnage (Tones) Max.</th>
                    <th className="px-6 py-4 text-left font-semibold">Shot Wt. (gms)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { no: 1, machine: "Ferromatik Milacron", tonnage: 450, shot: 1530 },
                    { no: 2, machine: "Bole", tonnage: 350, shot: 1000 },
                    { no: 3, machine: "JSW", tonnage: 250, shot: 600 },
                    { no: 4, machine: "Windsor", tonnage: 230, shot: 750 },
                    { no: 5, machine: "Toshiba", tonnage: 220, shot: 402 },
                    { no: 6, machine: "JSW", tonnage: 200, shot: 215 },
                    { no: 7, machine: "Kawaguchi", tonnage: 190, shot: 260 },
                    { no: 8, machine: "Ferromatik Milacron", tonnage: 170, shot: 355 },
                    { no: 9, machine: "Ferromatik Milacron", tonnage: 150, shot: 303 },
                    { no: 10, machine: "Bole", tonnage: 160, shot: 250 },
                    { no: 11, machine: "Ferromatik Milacron", tonnage: 145, shot: 150 },
                    { no: 12, machine: "Ferromatik Milacron", tonnage: 140, shot: 140 },
                    { no: 13, machine: "Ferromatik Milacron", tonnage: 135, shot: 135 },
                    { no: 14, machine: "Toshiba", tonnage: 125, shot: 210 },
                    { no: 15, machine: "Nigata", tonnage: 120, shot: 200 },
                    { no: 16, machine: "Ferromatik Milacron", tonnage: 115, shot: 128 },
                    { no: 17, machine: "Toshiba", tonnage: 110, shot: 162 },
                    { no: 18, machine: "Pratishna", tonnage: 100, shot: 160 },
                    { no: 19, machine: "Pratishna", tonnage: 90, shot: 155 },
                    { no: 20, machine: "Sperry", tonnage: 80, shot: 150 },
                    { no: 21, machine: "Swift", tonnage: 75, shot: 104 },
                  ].map((row) => (
                    <tr key={row.no} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">{row.no}</td>
                      <td className="px-6 py-4 text-gray-900 font-medium">{row.machine}</td>
                      <td className="px-6 py-4 text-gray-700">{row.tonnage}</td>
                      <td className="px-6 py-4 text-gray-700">{row.shot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Moulding Capacities - Table 2 (Detailed Specs 450T-150T) */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Moulding Capacities</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-pink-500 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Description</th>
                    <th className="px-4 py-3 text-left font-semibold">Unit</th>
                    <th className="px-4 py-3 text-left font-semibold">450 T</th>
                    <th className="px-4 py-3 text-left font-semibold">350 T</th>
                    <th className="px-4 py-3 text-left font-semibold">250 T</th>
                    <th className="px-4 py-3 text-left font-semibold">230 T</th>
                    <th className="px-4 py-3 text-left font-semibold">220 T</th>
                    <th className="px-4 py-3 text-left font-semibold">200 T</th>
                    <th className="px-4 py-3 text-left font-semibold">190 T</th>
                    <th className="px-4 py-3 text-left font-semibold">170 T</th>
                    <th className="px-4 py-3 text-left font-semibold">160 T</th>
                    <th className="px-4 py-3 text-left font-semibold">150 T</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Make</td><td className="px-4 py-3 text-gray-700">-</td><td className="px-4 py-3 text-gray-700">Ferromatik</td><td className="px-4 py-3 text-gray-700">Bole</td><td className="px-4 py-3 text-gray-700">JSW</td><td className="px-4 py-3 text-gray-700">Windsor</td><td className="px-4 py-3 text-gray-700">Toshiba</td><td className="px-4 py-3 text-gray-700">JSW</td><td className="px-4 py-3 text-gray-700">Kawaguchi</td><td className="px-4 py-3 text-gray-700">Ferromatik</td><td className="px-4 py-3 text-gray-700">Bole</td><td className="px-4 py-3 text-gray-700">Ferromatik</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Platen Size</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">1810*1010</td><td className="px-4 py-3 text-gray-700">1000*950</td><td className="px-4 py-3 text-gray-700">840*840</td><td className="px-4 py-3 text-gray-700">600*600</td><td className="px-4 py-3 text-gray-700">720*720</td><td className="px-4 py-3 text-gray-700">740*740</td><td className="px-4 py-3 text-gray-700">690*680</td><td className="px-4 py-3 text-gray-700">610*610</td><td className="px-4 py-3 text-gray-700">660*660</td><td className="px-4 py-3 text-gray-700">610*610</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Tie Bar Distance</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">710*710</td><td className="px-4 py-3 text-gray-700">680*600</td><td className="px-4 py-3 text-gray-700">560*560</td><td className="px-4 py-3 text-gray-700">510*510</td><td className="px-4 py-3 text-gray-700">510*510</td><td className="px-4 py-3 text-gray-700">510*510</td><td className="px-4 py-3 text-gray-700">450*450</td><td className="px-4 py-3 text-gray-700">410*410</td><td className="px-4 py-3 text-gray-700">460*460</td><td className="px-4 py-3 text-gray-700">410*410</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Min Mould Height</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">300</td><td className="px-4 py-3 text-gray-700">250</td><td className="px-4 py-3 text-gray-700">230</td><td className="px-4 py-3 text-gray-700">250</td><td className="px-4 py-3 text-gray-700">200</td><td className="px-4 py-3 text-gray-700">220</td><td className="px-4 py-3 text-gray-700">250</td><td className="px-4 py-3 text-gray-700">200</td><td className="px-4 py-3 text-gray-700">220</td><td className="px-4 py-3 text-gray-700">200</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Max Mould Height</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">1360</td><td className="px-4 py-3 text-gray-700">690</td><td className="px-4 py-3 text-gray-700">620</td><td className="px-4 py-3 text-gray-700">790</td><td className="px-4 py-3 text-gray-700">550</td><td className="px-4 py-3 text-gray-700">500</td><td className="px-4 py-3 text-gray-700">420</td><td className="px-4 py-3 text-gray-700">-</td><td className="px-4 py-3 text-gray-700">530</td><td className="px-4 py-3 text-gray-700">-</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Max. Shot Weight</td><td className="px-4 py-3 text-gray-700">GM</td><td className="px-4 py-3 text-gray-700">1530</td><td className="px-4 py-3 text-gray-700">1000</td><td className="px-4 py-3 text-gray-700">500</td><td className="px-4 py-3 text-gray-700">750</td><td className="px-4 py-3 text-gray-700">402</td><td className="px-4 py-3 text-gray-700">215</td><td className="px-4 py-3 text-gray-700">260</td><td className="px-4 py-3 text-gray-700">355</td><td className="px-4 py-3 text-gray-700">250</td><td className="px-4 py-3 text-gray-700">303</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Locating Ring Size</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">110</td><td className="px-4 py-3 text-gray-700">110</td><td className="px-4 py-3 text-gray-700">110</td><td className="px-4 py-3 text-gray-700">110</td><td className="px-4 py-3 text-gray-700">125</td><td className="px-4 py-3 text-gray-700">120</td><td className="px-4 py-3 text-gray-700">110</td><td className="px-4 py-3 text-gray-700">100</td><td className="px-4 py-3 text-gray-700">125</td><td className="px-4 py-3 text-gray-700">100</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Plasticizing</td><td className="px-4 py-3 text-gray-700">GM/S EC</td><td className="px-4 py-3 text-gray-700">77</td><td className="px-4 py-3 text-gray-700">42</td><td className="px-4 py-3 text-gray-700">58</td><td className="px-4 py-3 text-gray-700">40</td><td className="px-4 py-3 text-gray-700">31</td><td className="px-4 py-3 text-gray-700">29.7</td><td className="px-4 py-3 text-gray-700">36</td><td className="px-4 py-3 text-gray-700">20</td><td className="px-4 py-3 text-gray-700">26</td><td className="px-4 py-3 text-gray-700">20</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Screw Dia</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">80</td><td className="px-4 py-3 text-gray-700">58</td><td className="px-4 py-3 text-gray-700">60</td><td className="px-4 py-3 text-gray-700">60</td><td className="px-4 py-3 text-gray-700">50</td><td className="px-4 py-3 text-gray-700">46</td><td className="px-4 py-3 text-gray-700">52</td><td className="px-4 py-3 text-gray-700">45</td><td className="px-4 py-3 text-gray-700">45</td><td className="px-4 py-3 text-gray-700">45</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Clamp Force</td><td className="px-4 py-3 text-gray-700">TON</td><td className="px-4 py-3 text-gray-700">450</td><td className="px-4 py-3 text-gray-700">350</td><td className="px-4 py-3 text-gray-700">250</td><td className="px-4 py-3 text-gray-700">230</td><td className="px-4 py-3 text-gray-700">220</td><td className="px-4 py-3 text-gray-700">200</td><td className="px-4 py-3 text-gray-700">190</td><td className="px-4 py-3 text-gray-700">170</td><td className="px-4 py-3 text-gray-700">160</td><td className="px-4 py-3 text-gray-700">150</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Total Connecting Load</td><td className="px-4 py-3 text-gray-700">KW</td><td className="px-4 py-3 text-gray-700">54.6</td><td className="px-4 py-3 text-gray-700">42</td><td className="px-4 py-3 text-gray-700">38</td><td className="px-4 py-3 text-gray-700">40</td><td className="px-4 py-3 text-gray-700">30</td><td className="px-4 py-3 text-gray-700">34.4</td><td className="px-4 py-3 text-gray-700">35</td><td className="px-4 py-3 text-gray-700">27.2</td><td className="px-4 py-3 text-gray-700">32</td><td className="px-4 py-3 text-gray-700">27.2</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Nozzle Hole Dia</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">5</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Core Pull System</td><td className="px-4 py-3 text-gray-700">-</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">YES</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Nozzle Radios</td><td className="px-4 py-3 text-gray-700">-</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Oil Tank Capacity</td><td className="px-4 py-3 text-gray-700">LTR.</td><td className="px-4 py-3 text-gray-700">905</td><td className="px-4 py-3 text-gray-700">700</td><td className="px-4 py-3 text-gray-700">630</td><td className="px-4 py-3 text-gray-700">840</td><td className="px-4 py-3 text-gray-700">310</td><td className="px-4 py-3 text-gray-700">350</td><td className="px-4 py-3 text-gray-700">450</td><td className="px-4 py-3 text-gray-700">315+140</td><td className="px-4 py-3 text-gray-700">300</td><td className="px-4 py-3 text-gray-700">315+400</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Max Opening</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">1660</td><td className="px-4 py-3 text-gray-700">1320</td><td className="px-4 py-3 text-gray-700">-</td><td className="px-4 py-3 text-gray-700">990</td><td className="px-4 py-3 text-gray-700">450</td><td className="px-4 py-3 text-gray-700">990</td><td className="px-4 py-3 text-gray-700">-</td><td className="px-4 py-3 text-gray-700">760</td><td className="px-4 py-3 text-gray-700">850</td><td className="px-4 py-3 text-gray-700">760</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Moulding Capacities - Table 3 (Detailed Specs 145T-75T) */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Moulding Capacities</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-pink-500 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Description</th>
                    <th className="px-4 py-3 text-left font-semibold">Unit</th>
                    <th className="px-4 py-3 text-left font-semibold">145 T</th>
                    <th className="px-4 py-3 text-left font-semibold">140 T</th>
                    <th className="px-4 py-3 text-left font-semibold">135T</th>
                    <th className="px-4 py-3 text-left font-semibold">125T</th>
                    <th className="px-4 py-3 text-left font-semibold">120T</th>
                    <th className="px-4 py-3 text-left font-semibold">115T</th>
                    <th className="px-4 py-3 text-left font-semibold">110T</th>
                    <th className="px-4 py-3 text-left font-semibold">100T</th>
                    <th className="px-4 py-3 text-left font-semibold">90T</th>
                    <th className="px-4 py-3 text-left font-semibold">80T</th>
                    <th className="px-4 py-3 text-left font-semibold">75T</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Make</td><td className="px-4 py-3 text-gray-700">-</td><td className="px-4 py-3 text-gray-700">Ferromatik</td><td className="px-4 py-3 text-gray-700">Bole</td><td className="px-4 py-3 text-gray-700">JSW</td><td className="px-4 py-3 text-gray-700">Windsor</td><td className="px-4 py-3 text-gray-700">Toshiba</td><td className="px-4 py-3 text-gray-700">JSW</td><td className="px-4 py-3 text-gray-700">Kawaguchi</td><td className="px-4 py-3 text-gray-700">Ferromatik</td><td className="px-4 py-3 text-gray-700">Bole</td><td className="px-4 py-3 text-gray-700">Ferromatik</td><td className="px-4 py-3 text-gray-700">Swift</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Platen Size</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">610*565</td><td className="px-4 py-3 text-gray-700">610*570</td><td className="px-4 py-3 text-gray-700">610*565</td><td className="px-4 py-3 text-gray-700">600*600</td><td className="px-4 py-3 text-gray-700">600*600</td><td className="px-4 py-3 text-gray-700">610*565</td><td className="px-4 py-3 text-gray-700">480*480</td><td className="px-4 py-3 text-gray-700">570*560</td><td className="px-4 py-3 text-gray-700">560*550</td><td className="px-4 py-3 text-gray-700">550*500</td><td className="px-4 py-3 text-gray-700">-</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Tie Bar Distance</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">450*360</td><td className="px-4 py-3 text-gray-700">410*370</td><td className="px-4 py-3 text-gray-700">350*360</td><td className="px-4 py-3 text-gray-700">420*420</td><td className="px-4 py-3 text-gray-700">420*420</td><td className="px-4 py-3 text-gray-700">450*360</td><td className="px-4 py-3 text-gray-700">320*320</td><td className="px-4 py-3 text-gray-700">370*350</td><td className="px-4 py-3 text-gray-700">350*350</td><td className="px-4 py-3 text-gray-700">350*350</td><td className="px-4 py-3 text-gray-700">-</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Min Mould Height</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">150</td><td className="px-4 py-3 text-gray-700">200</td><td className="px-4 py-3 text-gray-700">150</td><td className="px-4 py-3 text-gray-700">200</td><td className="px-4 py-3 text-gray-700">200</td><td className="px-4 py-3 text-gray-700">150</td><td className="px-4 py-3 text-gray-700">180</td><td className="px-4 py-3 text-gray-700">170</td><td className="px-4 py-3 text-gray-700">170</td><td className="px-4 py-3 text-gray-700">150</td><td className="px-4 py-3 text-gray-700">180</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Max Mould Height</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">400</td><td className="px-4 py-3 text-gray-700">700</td><td className="px-4 py-3 text-gray-700">400</td><td className="px-4 py-3 text-gray-700">530</td><td className="px-4 py-3 text-gray-700">400</td><td className="px-4 py-3 text-gray-700">400</td><td className="px-4 py-3 text-gray-700">410</td><td className="px-4 py-3 text-gray-700">360</td><td className="px-4 py-3 text-gray-700">370</td><td className="px-4 py-3 text-gray-700">330</td><td className="px-4 py-3 text-gray-700">380</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Max. Shot Weight</td><td className="px-4 py-3 text-gray-700">GM</td><td className="px-4 py-3 text-gray-700">128</td><td className="px-4 py-3 text-gray-700">126</td><td className="px-4 py-3 text-gray-700">128</td><td className="px-4 py-3 text-gray-700">210</td><td className="px-4 py-3 text-gray-700">200</td><td className="px-4 py-3 text-gray-700">128</td><td className="px-4 py-3 text-gray-700">162</td><td className="px-4 py-3 text-gray-700">160</td><td className="px-4 py-3 text-gray-700">155</td><td className="px-4 py-3 text-gray-700">150</td><td className="px-4 py-3 text-gray-700">104</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Locating Ring Size</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">100</td><td className="px-4 py-3 text-gray-700">100</td><td className="px-4 py-3 text-gray-700">100</td><td className="px-4 py-3 text-gray-700">125</td><td className="px-4 py-3 text-gray-700">100</td><td className="px-4 py-3 text-gray-700">100</td><td className="px-4 py-3 text-gray-700">10</td><td className="px-4 py-3 text-gray-700">110</td><td className="px-4 py-3 text-gray-700">110</td><td className="px-4 py-3 text-gray-700">129</td><td className="px-4 py-3 text-gray-700">100</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Plasticizing Rate</td><td className="px-4 py-3 text-gray-700">GM/SEC</td><td className="px-4 py-3 text-gray-700">14</td><td className="px-4 py-3 text-gray-700">15</td><td className="px-4 py-3 text-gray-700">14</td><td className="px-4 py-3 text-gray-700">15</td><td className="px-4 py-3 text-gray-700">18</td><td className="px-4 py-3 text-gray-700">14</td><td className="px-4 py-3 text-gray-700">23.2</td><td className="px-4 py-3 text-gray-700">17</td><td className="px-4 py-3 text-gray-700">16</td><td className="px-4 py-3 text-gray-700">15</td><td className="px-4 py-3 text-gray-700">16</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Screw Die</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">32</td><td className="px-4 py-3 text-gray-700">36</td><td className="px-4 py-3 text-gray-700">32</td><td className="px-4 py-3 text-gray-700">40</td><td className="px-4 py-3 text-gray-700">42</td><td className="px-4 py-3 text-gray-700">32</td><td className="px-4 py-3 text-gray-700">36</td><td className="px-4 py-3 text-gray-700">35</td><td className="px-4 py-3 text-gray-700">34</td><td className="px-4 py-3 text-gray-700">34</td><td className="px-4 py-3 text-gray-700">32</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Clamp Force</td><td className="px-4 py-3 text-gray-700">TON</td><td className="px-4 py-3 text-gray-700">115</td><td className="px-4 py-3 text-gray-700">140</td><td className="px-4 py-3 text-gray-700">115</td><td className="px-4 py-3 text-gray-700">125</td><td className="px-4 py-3 text-gray-700">120</td><td className="px-4 py-3 text-gray-700">115</td><td className="px-4 py-3 text-gray-700">110</td><td className="px-4 py-3 text-gray-700">100</td><td className="px-4 py-3 text-gray-700">90</td><td className="px-4 py-3 text-gray-700">80</td><td className="px-4 py-3 text-gray-700">75</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Total Connecting Load</td><td className="px-4 py-3 text-gray-700">KW</td><td className="px-4 py-3 text-gray-700">16</td><td className="px-4 py-3 text-gray-700">20</td><td className="px-4 py-3 text-gray-700">16</td><td className="px-4 py-3 text-gray-700">10</td><td className="px-4 py-3 text-gray-700">30</td><td className="px-4 py-3 text-gray-700">16</td><td className="px-4 py-3 text-gray-700">17.3</td><td className="px-4 py-3 text-gray-700">30</td><td className="px-4 py-3 text-gray-700">28</td><td className="px-4 py-3 text-gray-700">26</td><td className="px-4 py-3 text-gray-700">20</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Nozzle Hole Dia</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">4</td><td className="px-4 py-3 text-gray-700">3.5</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Core Pull System</td><td className="px-4 py-3 text-gray-700">-</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">NO</td><td className="px-4 py-3 text-gray-700">YES</td><td className="px-4 py-3 text-gray-700">NO</td><td className="px-4 py-3 text-gray-700">NO</td><td className="px-4 py-3 text-gray-700">NO</td><td className="px-4 py-3 text-gray-700">NO</td><td className="px-4 py-3 text-gray-700">YES</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Nozzle Radios</td><td className="px-4 py-3 text-gray-700">-</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td><td className="px-4 py-3 text-gray-700">R-15</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Oil Tank Capacity</td><td className="px-4 py-3 text-gray-700">LTR.</td><td className="px-4 py-3 text-gray-700">160</td><td className="px-4 py-3 text-gray-700">280</td><td className="px-4 py-3 text-gray-700">160</td><td className="px-4 py-3 text-gray-700">285</td><td className="px-4 py-3 text-gray-700">300</td><td className="px-4 py-3 text-gray-700">160</td><td className="px-4 py-3 text-gray-700">180</td><td className="px-4 py-3 text-gray-700">300</td><td className="px-4 py-3 text-gray-700">300</td><td className="px-4 py-3 text-gray-700">250</td><td className="px-4 py-3 text-gray-700">180</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-900">Max Opening</td><td className="px-4 py-3 text-gray-700">MM</td><td className="px-4 py-3 text-gray-700">170</td><td className="px-4 py-3 text-gray-700">700</td><td className="px-4 py-3 text-gray-700">700</td><td className="px-4 py-3 text-gray-700">530</td><td className="px-4 py-3 text-gray-700">700</td><td className="px-4 py-3 text-gray-700">700</td><td className="px-4 py-3 text-gray-700">700</td><td className="px-4 py-3 text-gray-700">640</td><td className="px-4 py-3 text-gray-700">680</td><td className="px-4 py-3 text-gray-700">550</td><td className="px-4 py-3 text-gray-700">460</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-pink-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-pink-100 mb-8">
            Let's discuss how our comprehensive offerings can bring your product vision to life.
          </p>
          <button className="bg-white text-pink-500 px-8 py-3.5 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors">
            Request a Quote
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
