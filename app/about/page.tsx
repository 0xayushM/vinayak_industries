'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiChatBubbleLeftRight, HiUsers, HiAcademicCap, HiCheckBadge, HiWrench, HiBolt, HiComputerDesktop, HiStar, HiArrowTrendingUp, HiBeaker, HiCheckCircle, HiUserGroup } from "react-icons/hi2";
import CTASection from "@/components/CTASection";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Who We Are",
    "Management Team",
    "Infrastructure"
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

  const infrastructureImages = [
    "/images/infrastructure/Vinayak-Technoplast1.jpg",
    "/images/infrastructure/Vinayak-Technoplast2.jpg",
    "/images/infrastructure/Vinayak-Technoplast3.jpg",
    "/images/infrastructure/Vinayak-Technoplast4.jpg",
    "/images/infrastructure/Vinayak-Technoplast5.jpg",
    "/images/infrastructure/Vinayak-Technoplast6.jpg",
    "/images/infrastructure/Vinayak-Technoplast7.jpg",
    "/images/infrastructure/Vinayak-Technoplast8.jpg",
    "/images/infrastructure/Vinayak-Technoplast10.jpg",
    "/images/infrastructure/Vinayak-Technoplast11.jpg",
    "/images/infrastructure/Vinayak-Technoplast12.jpg",
    "/images/infrastructure/Vinayak-Technoplast13.jpg",
    "/images/infrastructure/Vinayak-Technoplast14.jpg",
    "/images/infrastructure/Vinayak-Technoplast15.jpg",
    "/images/infrastructure/Vinayak-Technoplast16.jpg",
    "/images/infrastructure/Vinayak-Technoplast17.jpg",
    "/images/infrastructure/Vinayak-Technoplast18.jpg",
    "/images/infrastructure/Vinayak-Technoplast19.jpg",
    "/images/infrastructure/Vinayak-Technoplast20.jpg",
    "/images/infrastructure/Vinayak-Technoplast21.jpg",
    "/images/infrastructure/Vinayak-Technoplast22.jpg",
  ];

  return (
    <div className="h-full bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="h-[60vh] min-h-[400px] relative overflow-hidden flex items-center z-0">
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
            ABOUT US
          </motion.h1>
          <motion.p 
            className="text-base md:text-2xl text-white max-w-3xl leading-relaxed font-[family-name:var(--font-korto)]"
            variants={fadeInUp}
          >
            Specialising in design, mould development and moulding solutions under one roof.
          </motion.p>
        </motion.div>
      </section>

      {/* Tabs and Content Container */}
      <div className="relative">
        {/* Tabs Navigation */}
        <section className="py-8 px-6 bg-gray-50 md:sticky top-20 z-30 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`md:px-6 md:py-4 px-3 py-2 rounded-full text-sm md:text-lg font-medium transition-all ${
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
        <div className="h-full bg-gray-100">
        {/* Tab 1: Who We Are */}
        {activeTab === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-3 px-3 md:py-6 md:px-6"
          >
            {/* Who We Are + Commitments Combined Card */}
            <div className="max-w-8xl mx-auto mb-6">
              <div className="relative rounded-[40px] md:rounded-[50px] overflow-hidden bg-gray-900">
                {/* Background Image */}
                <div className="absolute top-0 right-0 w-[50%] h-[60%] z-0">
                  <Image
                    src="/images/bg-image.png"
                    alt="Manufacturing Facility"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
                </div>

                <div className="relative z-[1] p-8 lg:p-12">
                  {/* Who We Are Section */}
                  <h2 className="text-3xl md:text-5xl font-bold text-amber-500 mb-6 font-[family-name:var(--font-carbon)]">WHO WE ARE</h2>
                  <div className="text-sm md:text-base max-w-2xl space-y-4 text-gray-300 leading-relaxed mb-8">
                    <p>
                      Vinayak Technoplast specialises in design, mould development and moulding solutions under one roof.
                      We are professionally managed company led by our chairman <span className="font-semibold text-white">Mr. Arjun Kumar Agarwal</span>, Mechanical Engineer from <span className="font-semibold text-white">IIT, BHU</span>. 
                    </p>
                    <p>
                      We have experience of <span className="font-semibold text-amber-500">30 Years</span> and are proud to be one of the top moulders in Delhi with a <span className="font-semibold text-amber-500">35,000 Sq Ft</span> facility.
                    </p>
                  </div>

                  {/* Commitments Grid */}
                  <h3 className="text-2xl font-bold text-white mb-6 font-[family-name:var(--font-carbon)]">OUR COMMITMENTS</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: HiChatBubbleLeftRight, title: "Good Communication", desc: "With customer and team members" },
                      { icon: HiUsers, title: "Equal Opportunity", desc: "At work place" },
                      { icon: HiAcademicCap, title: "Skill Development", desc: "Continuous training" },
                      { icon: HiCheckBadge, title: "First Time Right", desc: "Every time" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <item.icon className="text-3xl mb-3 text-amber-500" />
                        <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Policy Card - Now White */}
            <div className="max-w-8xl mx-auto mb-6">
              <div className="bg-white rounded-[40px] md:rounded-[50px] p-8 lg:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-8">QUALITY POLICY</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Vinayak Technoplast is committed to produce and supply quality products to meet our customer needs.",
                    "We shall continuously strive to improve the effectiveness of our Quality Management System.",
                    "We shall train and motivate our employees for self and continual improvement.",
                    "We are conscious of our responsibility towards safety, health and environment.",
                    "Quality is what we think, act and believe in."
                  ].map((policy, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={`text-gray-700 leading-relaxed ${index === 4 ? 'font-semibold text-gray-900' : ''}`}>{policy}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements Card - Now Dark */}
            <div className="max-w-8xl mx-auto">
              <div className="relative rounded-[40px] md:rounded-[50px] overflow-hidden bg-gray-900 p-8 lg:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-amber-500 font-[family-name:var(--font-carbon)] mb-8">ACHIEVEMENTS</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: HiWrench, text: "Expand Tool Room with Effective Manpower" },
                    { icon: HiBolt, text: "Addition of New sub Processes, Assembly for Electrical Accessories" },
                    { icon: HiComputerDesktop, text: "Work under process upgradation to ERP System" },
                    { icon: HiStar, text: "Get Higher Rank in Quality by All Customers" },
                    { icon: HiArrowTrendingUp, text: "Achieved a sales growth of 25%" },
                    { icon: HiUserGroup, text: "Successfully join new company JAY USHIN" },
                    { icon: HiBeaker, text: "Add ISI Lab For Electrical Accessories" },
                    { icon: HiCheckCircle, text: "All work done as per ISO/T.S. (I.A.T.F.)" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-2xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <item.icon className="text-3xl mb-3 text-amber-500" />
                      <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Management Team */}
        {activeTab === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-3 px-3 md:py-6 md:px-6"
          >
            <div className="max-w-8xl mx-auto">
              {/* Single merged card */}
              <div className="bg-gray-900 rounded-[40px] md:rounded-[50px] p-8 lg:p-12">
                {/* Heading inside card */}
                <h2 className="text-3xl md:text-5xl font-bold text-amber-500 mb-2 font-[family-name:var(--font-carbon)]">MANAGEMENT TEAM</h2>
                <p className="text-sm md:text-base text-gray-400 mb-8">
                  We are professionally managed company led by our chairman <span className="text-white font-semibold">Mr. Arjun Kumar Agarwal</span>, Mechanical Engineer from <span className="text-white font-semibold">IIT BHU</span>.
                </p>

                {/* Content grid with image card inside */}
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Image inside a card */}
                  <div className="md:col-span-1  overflow-hidden">
                    <div className="rounded-lg md:rounded-2xl overflow-hidden h-[450px]">
                      <Image
                        src="/sandeep_kalra.jpeg"
                        alt="Mr. Sandeep Agarwal, CEO"
                        width={600}
                        height={450}
                        className="object-cover object-top w-full h-full"
                      />
                    </div>
                  </div>

                  {/* About content */}
                  <div className="md:col-span-2 ">
                    <div className="flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-white mb-2">Mr. Sandeep Agarwal</h3>
                    <p className="text-amber-500 font-semibold text-lg mb-6">CEO</p>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      At Vinayak Technoplast, we don't compete on the cheapest price. We compete on the lowest failure rate. Led by CEO Sandeep Agarwal, who brings over 21 years of hands-on experience in precision injection molding, we focus on engineering reliability into every tool and every part.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                      Our approach is different: we diagnose the root causes of warpage, flashing, and part failure, and then engineer molds with proper venting, optimized gating, and advanced cooling solutions that consistently reduce cycle times by 20 to 30 percent. This commitment to performance and predictability has made us a trusted Tier-1 partner for industry leaders including Maruti Suzuki, Hyundai, RR Kabel, and top brands across the Automotive, Pharma, Kitchenware, and Electrical sectors.
                    </p>
                  </div>
                  </div>
                </div>

                {/* Team Members Grid */}
                <div className="mt-12 pt-12 border-t border-white/10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-[family-name:var(--font-carbon)]">OUR TEAM</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { name: "Mr. Bholanath Nayak", role: "Plant Head", image: "/team/Bhola Sir.jpg" },
                      { name: "Mr. Shambhu Nath", role: "Accounts Head", image: "/team/Shambhu.jpg" },
                      { name: "Mr. Sonu Malik", role: "Operations Head", image: "/team/Sonuji.jpg" },
                      { name: "Mr. Karan Dhingra", role: "Division Head", image: "/team/karan.jpeg" },
                      { name: "Mr. Puran Chand", role: "Design and Development", image: "/team/Puran Chand Ji.jpg" },
                      { name: "Mr. Nirmal", role: "Store Head", image: "/team/Nirmalji.jpg" },
                      { name: "Mr. Anil Tanwar", role: "Inventory Head", image: "/team/Anilji.JPG" },
                      { name: "Mr. Shubham", role: "QMS Head", image: "/team/Shubhamji.jpg" },
                    ].map((member, index) => (
                      <motion.div
                        key={index}
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-white">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <h4 className="text-white font-bold text-sm md:text-lg mb-1">{member.name}</h4>
                        <p className="text-amber-500 text-xs md:text-sm font-medium uppercase tracking-wide">{member.role}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Infrastructure */}
        {activeTab === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:p-6 p-3"
          >
            <div className="max-w-8xl mx-auto">
              <div className="bg-white md:rounded-[50px] rounded-[40px] p-6 lg:p-12">
                <h2 className="text-2xl md:text-5xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-4">INFRASTRUCTURE</h2>
                <p className="text-sm md:text-xl text-gray-600 mb-8">
                  Strategically located manufacturing unit spanning <span className="font-semibold text-amber-500">35,000 Sq Ft</span> manufacturing area.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {infrastructureImages.map((image, index) => (
                    <motion.div 
                      key={index} 
                      className="relative h-56 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                    >
                      <Image 
                        src={image} 
                        alt={`Infrastructure ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        </div>
      </div>
      <CTASection/>
      <Footer />
    </div>
  );
}
