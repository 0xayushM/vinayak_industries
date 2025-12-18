'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineCog6Tooth, HiOutlineBolt, HiOutlineShieldCheck, HiOutlineCpuChip } from "react-icons/hi2";

export default function EVPage() {
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

  const features = [
    {
      icon: HiOutlineCog6Tooth,
      title: "Heat-Resistant Components",
      description: "Engineered to withstand high temperatures in demanding EV applications"
    },
    {
      icon: HiOutlineBolt,
      title: "High-Strength Functional Parts",
      description: "Durable components designed for structural integrity and performance"
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Aesthetic Interiors",
      description: "Premium finish quality for visible interior components"
    },
    {
      icon: HiOutlineCpuChip,
      title: "Precision Tolerances",
      description: "Tight dimensional accuracy for perfect fit and assembly"
    }
  ];

  const challenges = [
    { title: "Gating Complexity", description: "Advanced gating solutions for complex geometries" },
    { title: "Cooling Systems", description: "Optimized cooling for consistent part quality" },
    { title: "Structural Strength", description: "Reinforced designs for load-bearing applications" },
    { title: "Thickness Variation", description: "Uniform wall thickness for dimensional stability" }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - Dark gradient background like carousel */}
      <section className="min-h-screen relative overflow-hidden flex items-center" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #312e81 60%, #4c1d95 100%)'
      }}>
        {/* Geometric accent lines */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M0 0 L200 0 L200 50 L50 200 L0 200 Z" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <path d="M20 0 L200 0 L200 30 L30 200 L0 200 L0 20 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          </svg>
        </div>
        
        {/* Bottom right geometric accent */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-20">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            <path d="M300 300 L300 100 L200 300 Z" fill="none" stroke="rgba(99,102,241,0.5)" strokeWidth="1"/>
            <path d="M300 250 L250 300" stroke="rgba(99,102,241,0.3)" strokeWidth="1"/>
            <path d="M300 200 L200 300" stroke="rgba(99,102,241,0.3)" strokeWidth="1"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full px-6 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight font-[family-name:var(--font-carbon)]"
                variants={fadeInUp}
              >
                WHEN THE PART<br />
                GETS TOUGH,
              </motion.h1>
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-400 mb-8 leading-tight font-[family-name:var(--font-carbon)]"
                variants={fadeInUp}
              >
                OUR ENGINEERING<br />
                GETS SMARTER
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mb-8 font-[family-name:var(--font-korto)]"
                variants={fadeInUp}
              >
                Precision-engineered plastic components for the next generation of electric vehicles. 
                From body panels to interior trims, we deliver excellence.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link href="/contact">
                  <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:shadow-lg hover:shadow-indigo-500/30">
                    Get Started
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Wireframe EV Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [0, -15, 0]
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.3 },
                x: { duration: 0.8, delay: 0.3 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className="relative w-full aspect-[4/5] lg:aspect-square scale-125">
                <Image
                  src="/images/wireframes/EV Wireframe (1).png"
                  alt="EV Wireframe"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative" style={{
        background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)'
      }}>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-carbon)]">
              EV COMPONENT EXPERTISE
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Specialized manufacturing capabilities for electric vehicle applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center mb-6 group-hover:border-indigo-400 transition-colors">
                  <feature.icon className="w-8 h-8 text-white group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-carbon)]">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section with Wireframe */}
      <section className="py-24 px-6 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
      }}>
        {/* Geometric accents */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="0,0 100,0 0,100" fill="none" stroke="rgba(99,102,241,0.5)" strokeWidth="1"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Wireframe Image */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                y: [0, -15, 0]
              }}
              viewport={{ once: true }}
              transition={{ 
                opacity: { duration: 0.8 },
                x: { duration: 0.8 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className="relative w-full aspect-[4/3] scale-150">
                <Image
                  src="/images/wireframes/EV Wireframe (3).png"
                  alt="EV Wireframe Side View"
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Challenge labels around the image */}
              {/* <div className="absolute top-1/4 -left-4 md:left-0">
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center bg-slate-900/80">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium hidden md:block">Cooling</span>
                </motion.div>
              </div>

              <div className="absolute bottom-1/4 -left-4 md:left-0">
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center bg-slate-900/80">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium hidden md:block">Structural Strength</span>
                </motion.div>
              </div> */}
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-carbon)]">
                EACH COMES WITH
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-indigo-400 mb-8 font-[family-name:var(--font-carbon)]">
                UNIQUE CHALLENGES
              </h3>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                EV components demand exceptional engineering precision. Our team tackles complex 
                manufacturing challenges to deliver parts that meet the rigorous standards of 
                the electric vehicle industry.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="text-white font-bold mb-2">{challenge.title}</h4>
                    <p className="text-gray-400 text-sm">{challenge.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EV Parts Gallery Section */}
      <section className="py-24 px-6" style={{
        background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)'
      }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-carbon)]">
              EV PARTS GALLERY
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our comprehensive range of precision-molded EV components
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {evImages.slice(0, 16).map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden bg-slate-800/50 hover:shadow-xl hover:shadow-indigo-500/20 transition-all cursor-pointer group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <Image
                  src={image}
                  alt={`EV Component ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/product-line">
              <button className="border-2 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white px-8 py-3 rounded-full font-medium transition-all">
                View All Products
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
      }}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-20">
          <Image
            src="/images/wireframes/EV Wireframe (2).png"
            alt=""
            fill
            className="object-contain opacity-30"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-carbon)]">
              Ready to Power Your EV Project?
            </h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Partner with us for precision-engineered plastic components that meet the demanding 
              standards of the electric vehicle industry.
            </p>
            <Link href="/contact">
              <button className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:shadow-xl">
                Start Your Project
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
