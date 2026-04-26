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
  HiOutlinePencilSquare,
  HiOutlineCpuChip,
  HiOutlineSquares2X2,
  HiOutlineRectangleGroup,
  HiOutlineCircleStack,
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

  // 6-step mould manufacturing process
  const processSteps = [
    {
      no: "01",
      icon: HiOutlinePencilSquare,
      title: "DFM Review",
      tag: "Design Analysis",
      desc: "Every project starts with a thorough Design for Manufacturability review. We analyse your 3D model for parting-line feasibility, draft angles, sink marks, warp risk and undercuts — catching problems in CAD before a gram of steel is touched.",
      highlights: [
        "Parting line & gate point optimisation",
        "Draft angle & undercut analysis",
        "Mould-flow simulation review",
      ],
      image: "/images/moulding/moulding_1.jpg",
    },
    {
      no: "02",
      icon: HiOutlineCpuChip,
      title: "CAD / CAM",
      tag: "Mould Engineering",
      desc: "The complete mould — cavity, core, runner system, cooling channels and ejection layout — is designed in 3D CAD. Our CAM engineers then generate precision tool-paths for every VMC operation, ensuring zero ambiguity on the shop floor.",
      highlights: [
        "Hot runner manifold design",
        "Balanced runner & cooling systems",
        "Full CAM tool-path generation",
      ],
      image: "/images/moulding/moulding_2.jpg",
    },
    {
      no: "03",
      icon: HiOutlineCog8Tooth,
      title: "CNC Milling",
      tag: "HAAS VMC",
      desc: "Cavity and core blocks are machined on our HAAS VF-2 and VF-3 vertical machining centres. High-speed spindles and rigid fixturing hold dimensional accuracy through the entire cut, leaving only fine detail work for the EDM stage.",
      highlights: [
        "HAAS VF-2 & VF-3 VMC",
        "Up to 1000 × 508 × 500 mm travel",
        "±5 µ roughing-stage accuracy",
      ],
      image: "/images/manufacturing/manufacturing-1/VMC-HAAS-VF3.jpg",
    },
    {
      no: "04",
      icon: HiOutlineFire,
      title: "EDM & Wire-Cut",
      tag: "Spark Erosion",
      desc: "Sharp corners, deep ribs, texture patterns and complex profiles are burnt in by our Electronica EDM machines. Wire-cut handles precision parting-line details. Together they take cavities to the final ±2 µ tolerance specification.",
      highlights: [
        "3 × Electronica EDM units",
        "±2 µ spark-erosion accuracy",
        "Wire-cut for parting lines",
      ],
      image: "/images/manufacturing/manufacturing-1/edm-die-machine.jpg",
    },
    {
      no: "05",
      icon: HiOutlineSparkles,
      title: "Assembly & Finish",
      tag: "Mould Benching",
      desc: "Cavity inserts, core inserts, ejector plates, guide pillars, slides and hot-runner manifolds are assembled and fitted to spec. Surface finish is applied cavity-by-cavity to the Ra value your part demands.",
      highlights: [
        "Hardened inserts & guided ejection",
        "Slide & lifter mechanisms",
        "Surface finish to Ra 0.8 µ",
      ],
      image: "/images/moulding/moulding_3.jpg",
    },
    {
      no: "06",
      icon: HiOutlineShieldCheck,
      title: "T1 Trial",
      tag: "First Shots",
      desc: "The completed mould goes onto one of our in-house injection machines for T1 shots. Parts are dimensionally checked against your drawing. Process parameters are locked, documented, and any corrections are completed in-house — typically within 24–48 hours.",
      highlights: [
        "In-house T1 on our press fleet",
        "CMM dimensional inspection",
        "Corrections within 24–48 hours",
      ],
      image: "/images/moulding/moudling_4.jpg",
    },
  ];

  // Scroll-driven step advancement
  useEffect(() => {
    const unsubscribe = cycleProgress.on("change", (latest) => {
      const idx = Math.min(
        processSteps.length - 1,
        Math.max(0, Math.floor(latest * processSteps.length))
      );
      setActiveStep(idx);
    });
    return () => unsubscribe();
  }, [cycleProgress, processSteps.length]);

  // Mould types manufactured
  const mouldTypes = [
    {
      icon: HiOutlineSquares2X2,
      type: "Two-Plate Mould",
      tag: "Most Common",
      desc: "Standard split-line mould where runner and part eject together. Cost-effective and reliable for straightforward geometries and mid-to-high volume production.",
      badge: "High-volume",
    },
    {
      icon: HiOutlineRectangleGroup,
      type: "Three-Plate Mould",
      tag: "Multi-cavity",
      desc: "Three parting surfaces allow the gate to separate automatically from the part. Ideal for centre-gated, multi-cavity layouts where gate location is critical.",
      badge: "Complex gating",
    },
    {
      icon: HiOutlineFire,
      type: "Hot Runner Mould",
      tag: "Zero Waste",
      desc: "A heated manifold system keeps the plastic permanently molten in the runner — no cold runners to trim, minimal material waste, and consistent shot-to-shot quality.",
      badge: "Premium",
    },
    {
      icon: HiOutlineBolt,
      type: "Hot Sprue Mould",
      tag: "Single Point",
      desc: "A single heated nozzle feeds the cavity directly, eliminating the cold slug and reducing cycle time. A cost-effective step up from cold runner for mid-volume runs.",
      badge: "Mid-volume",
    },
    {
      icon: HiOutlineCircleStack,
      type: "Cold Runner Mould",
      tag: "Versatile",
      desc: "Conventional runner system compatible with all engineering resins. Straightforward to maintain and modify — the workhorse for engineering polymer applications.",
      badge: "All materials",
    },
    {
      icon: HiOutlineWrenchScrewdriver,
      type: "Insert & Overmould",
      tag: "Multi-material",
      desc: "Metal inserts are placed in the cavity before each shot, or a secondary material is overmoulded onto a substrate. Reduces assembly operations and improves part strength.",
      badge: "Speciality",
    },
  ];

  // Capabilities / metrics
  const stats = [
    { value: "200+", label: "Moulds per year", sublabel: "Manufacturing capacity" },
    { value: "4–6 wk", label: "Average lead time", sublabel: "Design to T1 trial" },
    { value: "±2 µ", label: "Tooling accuracy", sublabel: "EDM spark erosion" },
    { value: "50+", label: "Moulds maintained", sublabel: "Active mould bank" },
  ];

  // Tool room machines
  const toolRoomMachines = [
    { category: "VMC", make: "HAAS", model: "VF-2", travel: "762 × 406 × 508 mm" },
    { category: "VMC", make: "HAAS", model: "VF-3", travel: "1000 × 508 × 500 mm" },
    { category: "VMC", make: "BFW", model: "1577", travel: "1500 × 700 × 700 mm" },
    { category: "EDM", make: "Electronica", model: "5535", travel: "550 × 350 mm" },
    { category: "EDM", make: "Electronica", model: "EB1510N", travel: "1500 × 1000 × 600 mm" },
    { category: "EDM", make: "JOEMARS", model: "AZ50TR", travel: "400 × 400 × 300 mm" },
    { category: "Wire-Cut", make: "Electronica", model: "Sprintcut", travel: "400 × 300 × 225 mm" },
    { category: "ZMC", make: "Electronica", model: "—", travel: "1500 × 1200 × 600 mm" },
  ];

  // Industries served
  const industries = [
    {
      icon: HiOutlineBolt,
      title: "Automotive",
      desc: "Complex interior and underbody moulds for Tier-1 suppliers to Maruti Suzuki, Hyundai and leading Indian OEMs.",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Electrical",
      desc: "Precision socket, switch and accessory moulds meeting BIS dimensional tolerances — supplied to RR Kabel and others.",
    },
    {
      icon: HiOutlineBeaker,
      title: "Pharma & Medical",
      desc: "Cleanroom-compatible moulds with polished cavities and validated first-article reports for medical components.",
    },
    {
      icon: HiOutlineCubeTransparent,
      title: "Kitchenware",
      desc: "High-cavity, high-gloss consumer moulds with long service life and short changeover — built for shift-after-shift production.",
    },
  ];

  // Why us
  const differentiators = [
    {
      icon: HiOutlineWrenchScrewdriver,
      title: "Full In-House Tool Room",
      desc: "VMC HAAS, 3× EDM, Wire-Cut and surface grinders — no outsourcing, no waiting on sub-contractors.",
    },
    {
      icon: HiOutlinePencilSquare,
      title: "DFM Included, No Extra Cost",
      desc: "We review your part geometry for sink, warp, draft and gate position before locking the design — saving costly corrections later.",
    },
    {
      icon: HiOutlineArrowsPointingOut,
      title: "±2 Micron Accuracy",
      desc: "Electronica EDM and HAAS VMC deliver mould cavities to sub-2 µ — the precision that eliminates flash and holds tight tolerances over 1M+ shots.",
    },
    {
      icon: HiOutlineClock,
      title: "T1 in 4–6 Weeks",
      desc: "From signed drawing to first shots — averaged across 200+ moulds delivered per year. We quote lead times we actually hit.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950">
      <Navigation />

      {/* Hero Section */}
      <section
        className="min-h-screen relative overflow-hidden flex items-center"
        style={{
          background:
            "linear-gradient(135deg, #0c0a09 0%, #1c1917 30%, #292524 60%, #44403c 100%)",
        }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/manufacturing/manufacturing-1/VMC-HAAS-VF3.jpg"
            alt="Vinayak Technoplast in-house tool room"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(12,10,9,0.93) 0%, rgba(28,25,23,0.85) 35%, rgba(120,53,15,0.55) 75%, rgba(220,38,38,0.35) 100%)",
            }}
          />
        </div>

        <div
          className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, #ea580c 0%, #b91c1c 50%, transparent 80%)" }}
        />

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
              Mould Manufacturing · In-House Tool Room
            </motion.span>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-[1.05] font-[family-name:var(--font-carbon)]"
              variants={fadeInUp}
            >
              PRECISION MOULDS
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
              BUILT IN-HOUSE
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-5 font-[family-name:var(--font-korto)]"
              variants={fadeInUp}
            >
              Vinayak Technoplast designs and manufactures plastic injection moulds entirely
              in-house — from DFM analysis and CAD/CAM through CNC milling, EDM spark erosion
              and T1 trial shots. 200+ moulds delivered every year. Lead time 4–6 weeks.
              Accuracy to ±2 µ.
            </motion.p>

            <motion.div className="flex flex-wrap gap-2 mb-8" variants={fadeInUp}>
              {["Two-Plate", "Three-Plate", "Hot Runner", "Hot Sprue", "Cold Runner", "Insert / Overmould"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-gray-400 text-xs font-[family-name:var(--font-korto)] tracking-wide"
                >
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
              <Link href="/contact">
                <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:shadow-lg hover:shadow-orange-500/40 font-[family-name:var(--font-korto)]">
                  Request a Tooling Quote
                </button>
              </Link>
              <a href="#tool-room">
                <button className="border-2 border-white/30 hover:border-orange-400 hover:text-orange-300 text-white px-8 py-4 rounded-full font-medium text-lg transition-all font-[family-name:var(--font-korto)]">
                  See Our Tool Room
                </button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-600" />
      </section>

      {/* Stats Bar */}
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
                  className="text-3xl md:text-5xl font-bold mb-1 font-[family-name:var(--font-carbon)]"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24 0%, #f97316 70%, #dc2626 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </div>
                <p className="text-white text-sm md:text-base font-semibold font-[family-name:var(--font-korto)]">
                  {s.label}
                </p>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-[family-name:var(--font-korto)] mt-0.5">
                  {s.sublabel}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mould Types Section */}
      <section
        className="py-24 px-6 relative"
        style={{ background: "linear-gradient(180deg, #1c1917 0%, #0c0a09 100%)" }}
      >
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
                What We Build
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 font-[family-name:var(--font-carbon)]">
                MOULD TYPES <span className="text-orange-500">WE MANUFACTURE</span>
              </h2>
            </div>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-[family-name:var(--font-korto)]">
              From simple two-plate moulds to complex hot runner systems — our tool room handles
              every category. We recommend the right mould type based on your volume, material
              and part geometry — not on what is easiest for us to build.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mouldTypes.map((m, i) => (
              <motion.div
                key={i}
                className="group relative bg-stone-900/60 border border-white/10 rounded-2xl p-7 hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div
                  className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle, rgba(249,115,22,0.6) 0%, transparent 70%)" }}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(220,38,38,0.15) 100%)",
                        border: "1px solid rgba(249,115,22,0.3)",
                      }}
                    >
                      <m.icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] tracking-wider uppercase font-[family-name:var(--font-korto)]">
                      {m.badge}
                    </span>
                  </div>
                  <div className="text-[10px] text-orange-400/70 tracking-[0.2em] uppercase mb-1.5 font-[family-name:var(--font-korto)]">
                    {m.tag}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3 font-[family-name:var(--font-korto)]">
                    {m.type}
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

      {/* Mid-page CTA #1 */}
      <section
        className="py-14 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(234,88,12,0.2) 0%, transparent 70%)" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-carbon)] mb-2">
                HAVE A MOULD DESIGN REQUIREMENT?
              </h3>
              <p className="text-gray-400 text-base font-[family-name:var(--font-korto)]">
                Share your 3D model or 2D drawing. We&apos;ll return a DFM report, mould type
                recommendation and lead time estimate — within 48 hours, no obligation.
              </p>
            </div>
            <Link href="/contact" className="flex-shrink-0">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-8 py-4 rounded-full font-medium text-base whitespace-nowrap transition-all hover:shadow-lg hover:shadow-orange-500/40 font-[family-name:var(--font-korto)]">
                Get Free DFM Review
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tool Room Section */}
      <section
        id="tool-room"
        className="py-24 px-6 relative"
        style={{ background: "linear-gradient(180deg, #0c0a09 0%, #1c1917 100%)" }}
      >
        <div className="max-w-8xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange-400 text-sm md:text-base tracking-[0.3em] uppercase font-[family-name:var(--font-korto)]">
              In-House Tool Room
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4 font-[family-name:var(--font-carbon)]">
              THE MACHINES BEHIND <span className="text-orange-500">EVERY MOULD</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-[family-name:var(--font-korto)]">
              We own and operate every machine that touches a mould. No outsourced machining,
              no waiting on sub-contractors — full control over quality and lead time.
            </p>
          </motion.div>

          {/* Key machine showcase */}
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            <motion.div
              className="group relative bg-stone-900/60 border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/40 transition-all duration-300"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/manufacturing/manufacturing-1/VMC-HAAS-VF3.jpg"
                  alt="VMC HAAS VF3 - CNC Milling"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(12,10,9,0.9) 100%)" }}
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs tracking-wider uppercase font-[family-name:var(--font-korto)]">
                  CNC Milling
                </span>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold text-white mb-1 font-[family-name:var(--font-carbon)]">
                  VMC HAAS VF-2 & VF-3
                </h3>
                <p className="text-gray-400 text-sm mb-5 font-[family-name:var(--font-korto)]">
                  High-speed vertical machining centres for cavity and core milling. Rigid Heidenhain
                  feedback ensures dimensional accuracy from roughing to semi-finishing.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Max travel", value: "1000 × 508 × 500 mm" },
                    { label: "Accuracy", value: "±5 µ" },
                    { label: "Spindle speed", value: "8100 RPM" },
                    { label: "Control", value: "Haas CNC" },
                  ].map((spec, si) => (
                    <div key={si} className="bg-white/5 rounded-xl p-3">
                      <div className="text-[10px] text-orange-400/70 tracking-wider uppercase font-[family-name:var(--font-korto)]">
                        {spec.label}
                      </div>
                      <div className="text-white text-sm font-semibold font-[family-name:var(--font-korto)] mt-0.5">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative bg-stone-900/60 border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/40 transition-all duration-300"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/manufacturing/manufacturing-1/edm-die-machine.jpg"
                  alt="EDM Machine - Spark Erosion"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(12,10,9,0.9) 100%)" }}
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs tracking-wider uppercase font-[family-name:var(--font-korto)]">
                  EDM / Wire-Cut
                </span>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold text-white mb-1 font-[family-name:var(--font-carbon)]">
                  Electronica EDM × 3 Units
                </h3>
                <p className="text-gray-400 text-sm mb-5 font-[family-name:var(--font-korto)]">
                  Spark erosion for complex profiles, deep ribs and fine surface textures.
                  Wire-cut for parting-line details. Together they achieve the final ±2 µ specification.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Accuracy", value: "±2 µ" },
                    { label: "Max table", value: "1500 × 1000 × 600 mm" },
                    { label: "Pulse generator", value: "Up to 95 A" },
                    { label: "Wire-cut", value: "Electronica Sprintcut" },
                  ].map((spec, si) => (
                    <div key={si} className="bg-white/5 rounded-xl p-3">
                      <div className="text-[10px] text-orange-400/70 tracking-wider uppercase font-[family-name:var(--font-korto)]">
                        {spec.label}
                      </div>
                      <div className="text-white text-sm font-semibold font-[family-name:var(--font-korto)] mt-0.5">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Complete machine list */}
          <motion.div
            className="bg-stone-900/40 border border-white/10 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="px-6 py-4 border-b border-white/10">
              <h4 className="text-white font-bold font-[family-name:var(--font-carbon)] tracking-wider">
                COMPLETE TOOL ROOM EQUIPMENT LIST
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    style={{ background: "linear-gradient(90deg, rgba(251,191,36,0.08) 0%, rgba(220,38,38,0.08) 100%)" }}
                  >
                    {["Machine", "Make", "Model", "Travel / Spec"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-orange-400 font-semibold uppercase tracking-wider text-xs font-[family-name:var(--font-korto)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {toolRoomMachines.map((m, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3 text-gray-300 font-medium font-[family-name:var(--font-korto)]">{m.category}</td>
                      <td className="px-5 py-3 text-gray-400 font-[family-name:var(--font-korto)]">{m.make}</td>
                      <td className="px-5 py-3 text-gray-400 font-[family-name:var(--font-korto)]">{m.model}</td>
                      <td className="px-5 py-3 text-gray-400 font-[family-name:var(--font-korto)]">{m.travel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mid-page CTA #2 — Mould Repair */}
      <section
        className="py-14 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #292524 0%, #1c1917 100%)" }}
      >
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20"
          style={{ background: "radial-gradient(ellipse at right, rgba(234,88,12,0.4) 0%, transparent 70%)" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-carbon)] mb-2">
                NEED A MOULD REPAIRED OR MODIFIED?
              </h3>
              <p className="text-gray-400 text-base font-[family-name:var(--font-korto)]">
                We maintain an active bank of 50+ moulds and take on third-party mould repair,
                modification and re-qualification work. Turnaround in 24–72 hours for urgent cases.
              </p>
            </div>
            <Link href="/contact" className="flex-shrink-0">
              <button className="border-2 border-orange-500/60 hover:bg-orange-500/10 text-orange-300 hover:text-orange-200 px-8 py-4 rounded-full font-medium text-base whitespace-nowrap transition-all font-[family-name:var(--font-korto)]">
                Enquire About Mould Repair
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section — scroll-driven 6-step mould manufacturing */}
      <section
        ref={cycleRef}
        className="relative"
        style={{
          background: "linear-gradient(180deg, #0c0a09 0%, #1c1917 100%)",
          height: `${100 + processSteps.length * 90}vh`,
        }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="max-w-8xl mx-auto px-6 w-full relative z-10">
            <motion.div
              className="text-center mb-8 md:mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-orange-400 text-xs md:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-korto)]">
                How We Build · Scroll to advance
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mt-3 font-[family-name:var(--font-carbon)]">
                FROM DRAWING TO <span className="text-orange-500">FIRST SHOTS</span>
              </h2>
            </motion.div>

            {/* Step Navigator */}
            <div className="relative mb-6 md:mb-8">
              <div
                className="absolute top-8 md:top-10 left-[8%] right-[8%] h-[3px] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(251,191,36,0.4) 0%, rgba(249,115,22,0.4) 50%, rgba(220,38,38,0.4) 100%)",
                }}
              />
              <motion.div
                className="absolute top-8 md:top-10 left-[8%] h-[3px] rounded-full origin-left"
                style={{
                  background: "linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #dc2626 100%)",
                  boxShadow: "0 0 12px rgba(249,115,22,0.7)",
                  width: "84%",
                  scaleX: cycleProgress,
                }}
              />

              <div className="grid grid-cols-6 gap-1 md:gap-4 relative z-10">
                {processSteps.map((step, index) => {
                  const isActive = activeStep === index;
                  const isPassed = index <= activeStep;
                  return (
                    <div key={index} className="flex flex-col items-center select-none">
                      <div className="relative">
                        <div
                          className={`relative w-12 h-12 md:w-20 md:h-20 rounded-xl flex items-center justify-center transition-all duration-500 ${
                            isActive ? "scale-110" : ""
                          }`}
                          style={{
                            background: isPassed
                              ? "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #dc2626 100%)"
                              : "rgba(255,255,255,0.04)",
                            border: isPassed ? "none" : "1px solid rgba(255,255,255,0.15)",
                            boxShadow: isActive ? "0 0 32px rgba(249,115,22,0.55)" : "none",
                          }}
                        >
                          <step.icon
                            className={`w-5 h-5 md:w-8 md:h-8 transition-colors duration-300 ${
                              isPassed ? "text-white" : "text-white/50"
                            }`}
                          />
                          <span
                            className={`absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full text-[9px] md:text-[10px] font-bold flex items-center justify-center font-[family-name:var(--font-carbon)] transition-colors ${
                              isPassed
                                ? "bg-stone-950 text-orange-300 border border-orange-500/60"
                                : "bg-stone-900 text-white/60 border border-white/15"
                            }`}
                          >
                            {step.no}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-3 text-center">
                        <div
                          className={`text-[9px] md:text-sm font-bold uppercase font-[family-name:var(--font-carbon)] transition-colors leading-tight ${
                            isActive ? "text-white" : "text-white/40"
                          }`}
                        >
                          {step.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detail Panel */}
            <div className="relative bg-stone-900/50 border border-white/10 rounded-3xl p-5 md:p-8 overflow-hidden">
              <div
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #ea580c 0%, #b91c1c 50%, transparent 80%)" }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 grid lg:grid-cols-2 gap-6 lg:gap-10 items-center"
                >
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

                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-[10px] md:text-xs tracking-[0.2em] uppercase mb-3 md:mb-4 font-[family-name:var(--font-korto)]">
                      Step {processSteps[activeStep].no} · {processSteps[activeStep].tag}
                    </span>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 font-[family-name:var(--font-carbon)] uppercase">
                      {processSteps[activeStep].title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5 md:mb-6 font-[family-name:var(--font-korto)]">
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
                              background: "linear-gradient(135deg, #fbbf24 0%, #dc2626 100%)",
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

      {/* Why Us Section */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0c0a09 0%, #1c1917 50%, #292524 100%)" }}
      >
        <div className="max-w-8xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/manufacturing/manufacturing-1/VMC-HAAS-VF3.jpg"
                  alt="Vinayak Technoplast in-house tool room"
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
                  Moulds delivered annually. Average lead time 4–6 weeks.
                </p>
              </div>
            </motion.div>

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
                NOT JUST A MOULDER.<br />
                <span className="text-orange-500">A MOULD MAKER.</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 font-[family-name:var(--font-korto)]">
                Most injection moulding companies buy their tools from external toolmakers.
                Vinayak designs and builds every mould in-house — giving us complete control
                over lead time, accuracy and ongoing maintenance. Our CEO Sandeep Agarwal,
                with 21+ years in precision moulding, personally oversees DFM analysis on
                every project.
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
      <section
        className="py-24 px-6"
        style={{ background: "linear-gradient(180deg, #1c1917 0%, #0c0a09 100%)" }}
      >
        <div className="max-w-8xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange-400 text-sm md:text-base tracking-[0.3em] uppercase font-[family-name:var(--font-korto)]">
              Sectors We Serve
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4 font-[family-name:var(--font-carbon)]">
              MOULDS BUILT FOR <span className="text-orange-500">EVERY SECTOR</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-[family-name:var(--font-korto)]">
              From automotive to medical — we manufacture moulds for any industry where
              precision, repeatability and long tool life matter.
            </p>
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
                    background: "linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #dc2626 100%)",
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

      {/* Gallery */}
      <section
        className="py-24 px-6"
        style={{ background: "linear-gradient(180deg, #0c0a09 0%, #1c1917 100%)" }}
      >
        <div className="max-w-8xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange-400 text-sm md:text-base tracking-[0.3em] uppercase font-[family-name:var(--font-korto)]">
              Inside Our Facility
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4 font-[family-name:var(--font-carbon)]">
              THE TOOL ROOM <span className="text-orange-500">IN ACTION</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-[family-name:var(--font-korto)]">
              VMC machining centres, EDM spark eroders, wire-cut machines and a full moulding
              press fleet — all under one roof in our 35,000 sq.ft. plant.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: "/images/manufacturing/manufacturing-1/VMC-HAAS-VF3.jpg", label: "VMC HAAS VF-3" },
              { src: "/images/manufacturing/manufacturing-1/edm-die-machine.jpg", label: "EDM Die Machine" },
              { src: "/images/moulding/moulding_1.jpg", label: "Injection Moulding Press" },
              { src: "/images/moulding/moulding_2.jpg", label: "Production Floor" },
              { src: "/images/moulding/moulding_3.jpg", label: "Moulding Operations" },
              { src: "/images/moulding/moudling_4.jpg", label: "Finished Components" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, transparent 60%, rgba(249,115,22,0.25) 100%)",
                  }}
                />
                <div className="absolute bottom-3 left-4 text-white text-xs font-semibold font-[family-name:var(--font-korto)] opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 45%, #b91c1c 100%)",
        }}
      >
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
              Ready to commission your next mould?
            </h2>
            <p className="text-lg md:text-xl text-orange-50 mb-10 max-w-2xl mx-auto font-[family-name:var(--font-korto)]">
              Share your 3D model or drawing. Our engineers will return a tooling proposal,
              mould type recommendation and lead time estimate — usually within 48 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-white text-red-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-stone-100 transition-all hover:shadow-xl font-[family-name:var(--font-korto)]">
                  Request a Tooling Quote
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
