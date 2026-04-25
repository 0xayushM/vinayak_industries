'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  HiOutlineFire,
  HiOutlineCog8Tooth,
  HiOutlineSparkles,
  HiOutlineCubeTransparent,
  HiOutlineBeaker,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineWrenchScrewdriver,
  HiOutlineArrowsPointingOut,
  HiOutlineClock,
} from "react-icons/hi2";

export default function MouldingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const cycleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cycleProgress } = useScroll({
    target: cycleRef,
    offset: ["start start", "end end"],
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  // 4-step injection moulding process
  const processSteps = [
    {
      no: "01",
      icon: HiOutlineCog8Tooth,
      title: "Clamping",
      tag: "Mould Closes",
      desc: "The two mould halves are securely closed and held under high tonnage by our clamping unit — ensuring a leak-free seal before molten polymer enters the cavity.",
      highlights: [
        "75 T to 850 T clamping force",
        "Precision parallel platens",
        "Mould safety sensors",
      ],
      image: "/images/moulding/moulding_1.jpg",
    },
    {
      no: "02",
      icon: HiOutlineFire,
      title: "Injection",
      tag: "Polymer Flows",
      desc: "Engineering-grade pellets are melted in our heated barrel and injected into the mould at precisely controlled pressure, temperature and shot weight — filling 95–99% of the cavity uniformly.",
      highlights: [
        "Up to 4,500 g shot weight",
        "Closed-loop pressure control",
        "Optimised gating geometry",
      ],
      image: "/images/moulding/moulding_2.jpg",
    },
    {
      no: "03",
      icon: HiOutlineSparkles,
      title: "Cooling",
      tag: "Part Solidifies",
      desc: "Optimised cooling channels and balanced gating solidify the part to dimensional accuracy. Our process engineers fine-tune cycle times to consistently shave 20–30%.",
      highlights: [
        "20–30% shorter cycle times",
        "Conformal cooling design",
        "Stable dimensional accuracy",
      ],
      image: "/images/moulding/moulding_3.jpg",
    },
    {
      no: "04",
      icon: HiOutlineCubeTransparent,
      title: "Ejection",
      tag: "Part Released",
      desc: "Ejector pins lift the finished, cooled component cleanly out of the mould — ready for in-line inspection, secondary operations, or assembly under one roof.",
      highlights: [
        "Damage-free ejection",
        "In-line visual inspection",
        "Secondary ops under one roof",
      ],
      image: "/images/moulding/moudling_4.jpg",
    },
  ];

  // Scroll-driven step advancement
  useEffect(() => {
    const unsubscribe = cycleProgress.on("change", (latest) => {
      // Bias slightly so each step occupies an even slice and the last step
      // stays active until the section fully exits.
      const idx = Math.min(
        processSteps.length - 1,
        Math.max(0, Math.floor(latest * processSteps.length))
      );
      setActiveStep(idx);
    });
    return () => unsubscribe();
  }, [cycleProgress, processSteps.length]);

  // Engineering polymers we run
  const materials = [
    {
      code: "ABS",
      name: "Acrylonitrile Butadiene Styrene",
      desc: "Tough, rigid engineering thermoplastic with excellent impact, stress and heat resistance. Ideal for automotive interiors, electrical housings and consumer goods.",
    },
    {
      code: "PC",
      name: "Polycarbonate",
      desc: "Lightweight, optically clear and exceptionally strong. Often blended with ABS (PC-ABS) for tough, mouldable parts in lighting, electronics and protective covers.",
    },
    {
      code: "PP",
      name: "Polypropylene",
      desc: "Crystalline, flexible and chemically inert. Outstanding fatigue and chemical resistance for kitchenware, packaging, automotive trim and living-hinge parts.",
    },
    {
      code: "PA",
      name: "Nylon (Polyamide)",
      desc: "High-strength engineering plastic with great wear, friction and heat resistance — engineered for gears, bushings, cable ties and structural automotive parts.",
    },
    {
      code: "PMMA",
      name: "Acrylic",
      desc: "Glass-clear, weather-stable and scratch-resistant. The polymer of choice for lenses, light pipes, lamp covers and aesthetic interior trims.",
    },
    {
      code: "POM",
      name: "Acetal / Delrin",
      desc: "Low-friction, dimensionally stable engineering polymer for precision mechanical components — switches, pumps, gears and fittings.",
    },
    {
      code: "PS",
      name: "Polystyrene",
      desc: "Cost-effective, easy-flowing thermoplastic for high-volume consumer and electrical parts where rigidity and finish matter.",
    },
    {
      code: "SAN",
      name: "Styrene Acrylonitrile",
      desc: "Transparent, heat- and chemical-resistant — a workhorse for kitchenware, appliance lenses and durable display components.",
    },
  ];

  // Capabilities / metrics
  const stats = [
    { value: "850 T", label: "Largest clamping tonnage" },
    { value: "30+", label: "Moulding machines" },
    { value: "35,000", label: "Sq. ft. plant area" },
    { value: "± 2 µ", label: "Tooling accuracy" },
  ];

  // Industries served
  const industries = [
    {
      icon: HiOutlineBolt,
      title: "Automotive",
      desc: "Tier-1 supplier of moulded components to Maruti Suzuki, Hyundai and leading auto OEMs.",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Electrical",
      desc: "Switches, sockets and accessories for industry leaders including RR Kabel.",
    },
    {
      icon: HiOutlineBeaker,
      title: "Pharma & Medical",
      desc: "Precision components manufactured to strict cleanliness and tolerance standards.",
    },
    {
      icon: HiOutlineCubeTransparent,
      title: "Kitchenware",
      desc: "Aesthetic, food-safe parts engineered for everyday durability and finish quality.",
    },
  ];

  // Why us
  const differentiators = [
    {
      icon: HiOutlineWrenchScrewdriver,
      title: "In-house Tool Room",
      desc: "Mould design, manufacturing and trial — all under one roof, dramatically cutting lead times.",
    },
    {
      icon: HiOutlineArrowsPointingOut,
      title: "10 T to 850 T",
      desc: "A full spectrum of clamping tonnage to handle micro components through large structural parts.",
    },
    {
      icon: HiOutlineClock,
      title: "20–30% Faster Cycles",
      desc: "Optimised gating, venting and cooling reduce cycle times without compromising quality.",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "ISO / IATF Quality",
      desc: "Every part is produced under ISO 9001:2015 and IATF-aligned process controls.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950">
      <Navigation />

      {/* Hero Section — molten / industrial */}
      <section
        className="min-h-screen relative overflow-hidden flex items-center"
        style={{
          background:
            "linear-gradient(135deg, #0c0a09 0%, #1c1917 30%, #292524 60%, #44403c 100%)",
        }}
      >
        {/* Background image — moulding press */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/moulding/moulding_1.jpg"
            alt="Plastic injection moulding press"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(12,10,9,0.92) 0%, rgba(28,25,23,0.85) 35%, rgba(120,53,15,0.55) 75%, rgba(220,38,38,0.35) 100%)",
            }}
          />
        </div>

        {/* Glowing molten orb — top right */}
        <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, #ea580c 0%, #b91c1c 50%, transparent 80%)" }}
        />

        {/* Hot grid lines bottom-left */}
        <div className="absolute bottom-0 left-0 w-72 h-72 opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="hotline" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            <path d="M0 200 L0 80 L80 0 L200 0" fill="none" stroke="url(#hotline)" strokeWidth="1" />
            <path d="M0 200 L0 120 L120 0 L200 0" fill="none" stroke="url(#hotline)" strokeWidth="1" opacity="0.6" />
            <path d="M0 200 L0 160 L160 0 L200 0" fill="none" stroke="url(#hotline)" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full px-6 py-32">
          <motion.div
            className="max-w-4xl"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-300 text-xs md:text-sm tracking-[0.25em] uppercase mb-6 font-[family-name:var(--font-korto)]"
              variants={fadeInUp}
            >
              Plastic Injection Moulding
            </motion.span>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-[1.05] font-[family-name:var(--font-carbon)]"
              variants={fadeInUp}
            >
              MOULDED FOR
            </motion.h1>
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.05] font-[family-name:var(--font-carbon)]"
              variants={fadeInUp}
              style={{
                background: "linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #dc2626 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PRECISION & SCALE
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-10 font-[family-name:var(--font-korto)]"
              variants={fadeInUp}
            >
              For 30+ years Vinayak Technoplast has engineered moulded plastic components for
              India&rsquo;s most demanding OEMs. From 10 T micro-shots to 850 T structural parts —
              every cycle backed by an in-house tool room and a 35,000 sq.ft. plant.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
              <Link href="/contact">
                <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:shadow-lg hover:shadow-orange-500/40 font-[family-name:var(--font-korto)]">
                  Start a Moulding Project
                </button>
              </Link>
              <Link href="/offerings">
                <button className="border-2 border-white/30 hover:border-orange-400 hover:text-orange-300 text-white px-8 py-4 rounded-full font-medium text-lg transition-all font-[family-name:var(--font-korto)]">
                  View Capacities
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom angled accent strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-600" />
      </section>

      {/* Stats Bar — metallic */}
      <section className="relative bg-stone-950 py-12 px-6 border-b border-white/5">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="text-center md:border-r last:md:border-r-0 border-white/10 px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div
                  className="text-3xl md:text-5xl font-bold mb-2 font-[family-name:var(--font-carbon)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #fbbf24 0%, #f97316 70%, #dc2626 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </div>
                <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider font-[family-name:var(--font-korto)]">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section — scroll-driven cycle */}
      <section
        ref={cycleRef}
        className="relative"
        style={{
          background: "linear-gradient(180deg, #0c0a09 0%, #1c1917 100%)",
          // 1 viewport for entry/heading + 1 viewport per step
          height: `${100 + processSteps.length * 90}vh`,
        }}
      >
        {/* Sticky inner viewport — stays pinned while user scrolls through the section */}
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="max-w-8xl mx-auto px-6 w-full relative z-10">
            {/* Heading */}
            <motion.div
              className="text-center mb-10 md:mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-orange-400 text-xs md:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-korto)]">
                The Cycle · Scroll to advance
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mt-3 font-[family-name:var(--font-carbon)]">
                FROM PELLET TO <span className="text-orange-500">PRECISION PART</span>
              </h2>
            </motion.div>

            {/* Step Navigator — non-interactive, driven by scroll */}
            <div className="relative mb-8 md:mb-12">
              {/* Connecting flow line */}
              <div
                className="absolute top-10 md:top-12 left-[12%] right-[12%] h-[3px] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(251,191,36,0.4) 0%, rgba(249,115,22,0.4) 50%, rgba(220,38,38,0.4) 100%)",
                }}
              />
              {/* Active progress fill — driven by scrollYProgress */}
              <motion.div
                className="absolute top-10 md:top-12 left-[12%] h-[3px] rounded-full origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #dc2626 100%)",
                  boxShadow: "0 0 12px rgba(249,115,22,0.7)",
                  width: "76%",
                  scaleX: cycleProgress,
                }}
              />

              <div className="grid grid-cols-4 gap-2 md:gap-6 relative z-10">
                {processSteps.map((step, index) => {
                  const isActive = activeStep === index;
                  const isPassed = index <= activeStep;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center select-none"
                    >
                      {/* Node */}
                      <div className="relative">
                        <div
                          className={`relative w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                            isActive ? "scale-110" : ""
                          }`}
                          style={{
                            background: isPassed
                              ? "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #dc2626 100%)"
                              : "rgba(255,255,255,0.04)",
                            border: isPassed
                              ? "none"
                              : "1px solid rgba(255,255,255,0.15)",
                            boxShadow: isActive
                              ? "0 0 32px rgba(249,115,22,0.55)"
                              : "none",
                          }}
                        >
                          <step.icon
                            className={`w-7 h-7 md:w-10 md:h-10 transition-colors duration-300 ${
                              isPassed ? "text-white" : "text-white/50"
                            }`}
                          />
                          <span
                            className={`absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 rounded-full text-[10px] md:text-xs font-bold flex items-center justify-center font-[family-name:var(--font-carbon)] transition-colors ${
                              isPassed
                                ? "bg-stone-950 text-orange-300 border border-orange-500/60"
                                : "bg-stone-900 text-white/60 border border-white/15"
                            }`}
                          >
                            {step.no}
                          </span>
                        </div>
                      </div>

                      {/* Label */}
                      <div className="mt-3 md:mt-4 text-center">
                        <div
                          className={`text-xs md:text-lg font-bold uppercase font-[family-name:var(--font-carbon)] transition-colors ${
                            isActive ? "text-white" : "text-white/50"
                          }`}
                        >
                          {step.title}
                        </div>
                        <div
                          className={`hidden md:block text-[10px] md:text-xs mt-1 tracking-widest uppercase transition-colors font-[family-name:var(--font-korto)] ${
                            isActive ? "text-orange-400" : "text-white/25"
                          }`}
                        >
                          {step.tag}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detail Panel — animates as activeStep changes via scroll */}
            <div className="relative bg-stone-900/50 border border-white/10 rounded-3xl p-5 md:p-10 overflow-hidden">
              {/* Heat glow */}
              <div
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, #ea580c 0%, #b91c1c 50%, transparent 80%)",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 grid lg:grid-cols-2 gap-6 lg:gap-12 items-center"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={processSteps[activeStep].image}
                      alt={processSteps[activeStep].title}
                      fill
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(12,10,9,0.4) 0%, transparent 50%, rgba(220,38,38,0.3) 100%)",
                      }}
                    />
                    <div
                      className="absolute bottom-2 right-4 md:bottom-4 md:right-6 text-6xl md:text-8xl font-bold opacity-90 font-[family-name:var(--font-carbon)] leading-none"
                      style={{
                        background:
                          "linear-gradient(135deg, #fbbf24 0%, #f97316 60%, #dc2626 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {processSteps[activeStep].no}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-[10px] md:text-xs tracking-[0.2em] uppercase mb-3 md:mb-4 font-[family-name:var(--font-korto)]">
                      Step {processSteps[activeStep].no} · {processSteps[activeStep].tag}
                    </span>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-5 font-[family-name:var(--font-carbon)] uppercase">
                      {processSteps[activeStep].title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed mb-5 md:mb-8 font-[family-name:var(--font-korto)]">
                      {processSteps[activeStep].desc}
                    </p>

                    <ul className="space-y-2 md:space-y-3">
                      {processSteps[activeStep].highlights.map((h, hi) => (
                        <motion.li
                          key={hi}
                          className="flex items-center gap-3 text-gray-300 text-sm md:text-base font-[family-name:var(--font-korto)]"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + hi * 0.08 }}
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              background:
                                "linear-gradient(135deg, #fbbf24 0%, #dc2626 100%)",
                              boxShadow: "0 0 8px rgba(249,115,22,0.7)",
                            }}
                          />
                          <span>{h}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section — engineering polymers */}
      <section className="py-24 px-6 relative" style={{
        background: "linear-gradient(180deg, #1c1917 0%, #0c0a09 100%)",
      }}>
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-8xl mx-auto relative z-10">
          <motion.div
            className="grid md:grid-cols-2 gap-10 items-end mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="text-orange-400 text-sm md:text-base tracking-[0.3em] uppercase font-[family-name:var(--font-korto)]">
                Engineering Polymers
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 font-[family-name:var(--font-carbon)]">
                MATERIALS WE <span className="text-orange-500">MOULD</span>
              </h2>
            </div>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-[family-name:var(--font-korto)]">
              From commodity plastics to high-performance engineering polymers — we run the
              materials your application demands. Our process engineers tune temperature,
              pressure and cooling for every resin we touch.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {materials.map((m, i) => (
              <motion.div
                key={i}
                className="group relative bg-stone-900/60 border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {/* Hover heat glow */}
                <div
                  className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(249,115,22,0.6) 0%, transparent 70%)",
                  }}
                />
                <div className="relative z-10">
                  <div
                    className="text-3xl font-bold mb-2 font-[family-name:var(--font-carbon)]"
                    style={{
                      background:
                        "linear-gradient(135deg, #fbbf24 0%, #f97316 70%, #dc2626 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {m.code}
                  </div>
                  <h3 className="text-white font-semibold mb-3 font-[family-name:var(--font-korto)]">
                    {m.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-[family-name:var(--font-korto)]">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section — split layout with image */}
      <section className="py-24 px-6 relative overflow-hidden" style={{
        background: "linear-gradient(135deg, #0c0a09 0%, #1c1917 50%, #292524 100%)",
      }}>
        <div className="max-w-8xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image side */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/moulding/moulding_2.jpg"
                  alt="Vinayak Technoplast moulding floor"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 0%, transparent 50%, rgba(220,38,38,0.25) 100%)",
                  }}
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-stone-900 border border-orange-500/30 rounded-2xl p-5 md:p-6 max-w-[220px] shadow-2xl">
                <div
                  className="text-3xl md:text-4xl font-bold mb-1 font-[family-name:var(--font-carbon)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #fbbf24 0%, #f97316 70%, #dc2626 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  200+
                </div>
                <p className="text-gray-300 text-xs md:text-sm font-[family-name:var(--font-korto)]">
                  New moulds delivered every year, average lead time 4–6 weeks.
                </p>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-orange-400 text-sm md:text-base tracking-[0.3em] uppercase font-[family-name:var(--font-korto)]">
                Why Vinayak
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6 font-[family-name:var(--font-carbon)]">
                NOT THE CHEAPEST PRICE.<br />
                <span className="text-orange-500">THE LOWEST FAILURE RATE.</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 font-[family-name:var(--font-korto)]">
                Led by CEO Sandeep Agarwal — 21+ years in precision injection moulding —
                we engineer reliability into every tool and every part. We diagnose root
                causes of warpage, flashing and part failure, then design moulds with proper
                venting, optimised gating and advanced cooling.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {differentiators.map((d, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-orange-500/30 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <d.icon className="w-7 h-7 text-orange-400 mb-3" />
                    <h4 className="text-white font-bold mb-1 font-[family-name:var(--font-korto)]">
                      {d.title}
                    </h4>
                    <p className="text-gray-400 text-sm font-[family-name:var(--font-korto)]">
                      {d.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 px-6" style={{
        background: "linear-gradient(180deg, #1c1917 0%, #0c0a09 100%)",
      }}>
        <div className="max-w-8xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange-400 text-sm md:text-base tracking-[0.3em] uppercase font-[family-name:var(--font-korto)]">
              Industries Served
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4 font-[family-name:var(--font-carbon)]">
              TRUSTED ACROSS <span className="text-orange-500">SECTORS</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                className="relative bg-gradient-to-br from-stone-900 to-stone-950 border border-white/10 rounded-2xl p-8 hover:border-orange-500/40 transition-all overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #dc2626 100%)",
                  }}
                />
                <ind.icon className="w-12 h-12 text-orange-400 mb-5" />
                <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-carbon)] uppercase">
                  {ind.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-[family-name:var(--font-korto)]">
                  {ind.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — moulding floor images */}
      <section className="py-24 px-6" style={{
        background: "linear-gradient(180deg, #0c0a09 0%, #1c1917 100%)",
      }}>
        <div className="max-w-8xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange-400 text-sm md:text-base tracking-[0.3em] uppercase font-[family-name:var(--font-korto)]">
              On The Floor
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4 font-[family-name:var(--font-carbon)]">
              INSIDE OUR <span className="text-orange-500">MOULDING SHOP</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-[family-name:var(--font-korto)]">
              30+ machines, ranging from 75 T to 850 T tonnage, running shift-after-shift in
              our 35,000 sq.ft. plant.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "/images/moulding/moulding_1.jpg",
              "/images/moulding/moulding_2.jpg",
              "/images/moulding/moulding_3.jpg",
              "/images/moulding/moudling_4.jpg",
            ].map((src, i) => (
              <motion.div
                key={i}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-900 group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Image
                  src={src}
                  alt={`Vinayak Technoplast moulding shop ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 60%, rgba(249,115,22,0.25) 100%)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — molten gradient */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f59e0b 0%, #ea580c 45%, #b91c1c 100%)",
        }}
      >
        {/* Decorative heat rings */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20 border-2 border-white" />
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-10 border-2 border-white" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-20 border-2 border-white" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-carbon)]">
              Have a part that needs to be moulded right?
            </h2>
            <p className="text-lg md:text-xl text-orange-50 mb-10 max-w-2xl mx-auto font-[family-name:var(--font-korto)]">
              Share your drawing or 3D model. Our engineers will come back with a tooling
              proposal, the right resin recommendation, and a realistic cycle time — usually
              within 48 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-white text-red-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-stone-100 transition-all hover:shadow-xl font-[family-name:var(--font-korto)]">
                  Request a Quote
                </button>
              </Link>
              <Link href="/capabilities">
                <button className="bg-stone-950/40 hover:bg-stone-950/60 text-white px-10 py-4 rounded-full font-bold text-lg transition-all border-2 border-white/40 hover:border-white font-[family-name:var(--font-korto)]">
                  Explore Capabilities
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
