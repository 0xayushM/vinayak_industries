'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DownloadDialog from "@/components/DownloadDialog";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  Award,
  ChevronDown,
  ArrowRight,
  PencilRuler,
  Cpu,
  Cog,
  Flame,
  Sparkles,
  ShieldCheck,
  Layers,
  Boxes,
  Zap,
  CircleDot,
  Wrench,
  Target,
  Clock,
  FileText,
  Car,
  FlaskRound,
  UtensilsCrossed,
  CheckCircle2,
  Phone,
  Signal,
} from "lucide-react";

export default function MouldingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        staggerChildren: 0.15,
      },
    },
  };

  // 6-step mould manufacturing process
  const processSteps = [
    {
      no: "01",
      icon: PencilRuler,
      title: "DFM Review",
      tag: "Design Analysis",
      desc: "Every project starts with a thorough Design for Manufacturability review. We analyse your 3D model for parting-line feasibility, draft angles, sink marks, warp risk and undercuts — catching problems in CAD before a gram of steel is touched.",
      highlights: [
        "Parting line & gate point optimisation",
        "Draft angle & undercut analysis",
        "Mould-flow simulation review",
      ],
      image: "/images/moulding/DAM_Mould.png",
    },
    {
      no: "02",
      icon: Cpu,
      title: "CAD / CAM",
      tag: "Mould Engineering",
      desc: "The complete mould — cavity, core, runner system, cooling channels and ejection layout — is designed in 3D CAD. Our CAM engineers then generate precision tool-paths for every VMC operation, ensuring zero ambiguity on the shop floor.",
      highlights: [
        "Hot runner manifold design",
        "Balanced runner & cooling systems",
        "Full CAM tool-path generation",
      ],
      image: "/images/moulding/3D_Mould.png",
    },
    {
      no: "03",
      icon: Cog,
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
      icon: Flame,
      title: "EDM & Wire-Cut",
      tag: "Spark Erosion",
      desc: "Sharp corners, deep ribs, texture patterns and complex profiles are burnt in by our Electronica EDM machines. Wire-cut handles precision parting-line details. Together they take cavities to the final ±2 µ tolerance specification.",
      highlights: [
        "3 × Electronica EDM units",
        "±2 µ spark-erosion accuracy",
        "Wire-cut for parting lines",
      ],
      image: "/images/moulding/Joemars_Mould.png",
    },
    {
      no: "05",
      icon: Sparkles,
      title: "Assembly & Finish",
      tag: "Mould Benching",
      desc: "Cavity inserts, core inserts, ejector plates, guide pillars, slides and hot-runner manifolds are assembled and fitted to spec. Surface finish is applied cavity-by-cavity to the Ra value your part demands.",
      highlights: [
        "Hardened inserts & guided ejection",
        "Slide & lifter mechanisms",
        "Surface finish to Ra 0.8 µ",
      ],
      image: "/images/moulding/Assembly_Mould.png",
    },
    {
      no: "06",
      icon: ShieldCheck,
      title: "T1 Trial",
      tag: "First Shots",
      desc: "The completed mould goes onto one of our in-house injection machines for T1 shots. Parts are dimensionally checked against your drawing. Process parameters are locked, documented, and any corrections are completed in-house — typically within 24–48 hours.",
      highlights: [
        "In-house T1 on our press fleet",
        "CMM dimensional inspection",
        "Corrections within 24–48 hours",
      ],
      image: "/images/moulding/T1_Mould.png",
    },
  ];

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


  const mouldTypes = [
    {
      icon: Layers,
      type: "Two-Plate Mould",
      tag: "Most Common",
      desc: "Standard split-line mould where runner and part eject together. Cost-effective and reliable for straightforward geometries and mid-to-high volume production.",
      badge: "High-volume",
    },
    {
      icon: Boxes,
      type: "Three-Plate Mould",
      tag: "Multi-cavity",
      desc: "Three parting surfaces allow the gate to separate automatically from the part. Ideal for centre-gated, multi-cavity layouts where gate location is critical.",
      badge: "Complex gating",
    },
    {
      icon: Flame,
      type: "Hot Runner Mould",
      tag: "Zero Waste",
      desc: "A heated manifold system keeps the plastic permanently molten in the runner — no cold runners to trim, minimal material waste, and consistent shot-to-shot quality.",
      badge: "Premium",
    },
    {
      icon: Zap,
      type: "Hot Sprue Mould",
      tag: "Single Point",
      desc: "A single heated nozzle feeds the cavity directly, eliminating the cold slug and reducing cycle time. A cost-effective step up from cold runner for mid-volume runs.",
      badge: "Mid-volume",
    },
    {
      icon: CircleDot,
      type: "Cold Runner Mould",
      tag: "Versatile",
      desc: "Conventional runner system compatible with all engineering resins. Straightforward to maintain and modify — the workhorse for engineering polymer applications.",
      badge: "All materials",
    },
    {
      icon: Wrench,
      type: "Insert & Overmould",
      tag: "Multi-material",
      desc: "Metal inserts are placed in the cavity before each shot, or a secondary material is overmoulded onto a substrate. Reduces assembly operations and improves part strength.",
      badge: "Speciality",
    },
  ];

  const stats = [
    { value: "200+", label: "Moulds / Year", sublabel: "Manufacturing capacity" },
    { value: "2-4 wk", label: "Lead Time", sublabel: "Design to T1 trial" },
    { value: "±2 µ", label: "Tooling Accuracy", sublabel: "EDM spark erosion" },
    { value: "50+", label: "Active Moulds", sublabel: "Maintenance bank" },
  ];

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

  const industries = [
    {
      icon: Car,
      title: "Automotive",
      desc: "Complex interior and underbody moulds for Tier-1 suppliers to Maruti Suzuki, Hyundai and leading Indian OEMs.",
    },
    {
      icon: Zap,
      title: "Electrical",
      desc: "Precision socket, switch and accessory moulds meeting BIS dimensional tolerances — supplied to RR Kabel and others.",
    },
    {
      icon: Signal,
      title: "Telecom",
      desc: "Precision enclosures, connectors and fibre-optic component moulds for reliable performance in harsh environments.",
    },
    {
      icon: FlaskRound,
      title: "Pharma & Medical",
      desc: "Cleanroom-compatible moulds with polished cavities and validated first-article reports for medical components.",
    },
    {
      icon: UtensilsCrossed,
      title: "Kitchenware",
      desc: "High-cavity, high-gloss consumer moulds with long service life and short changeover — built for shift-after-shift production.",
    },
  ];

  const differentiators = [
    {
      icon: Wrench,
      title: "Full In-House Tool Room",
      desc: "VMC HAAS, 3× EDM, Wire-Cut and surface grinders — no outsourcing, no waiting on sub-contractors.",
    },
    {
      icon: FileText,
      title: "DFM Review at No Cost",
      desc: "We review your part for sink, warp, draft and gate position before locking the design — saving costly corrections later.",
    },
    {
      icon: Target,
      title: "±2 Micron Accuracy",
      desc: "Electronica EDM and HAAS VMC deliver mould cavities to sub-2 µ — the precision that holds tight tolerances over 1M+ shots.",
    },
    {
      icon: Clock,
      title: "T1 in 2-4 Weeks",
      desc: "From signed drawing to first shots — averaged across 200+ moulds delivered per year. Lead times we actually hit.",
    },
  ];

  const galleryImages = [
    "/images/moulds/img1.jpeg",
    "/images/moulds/img2.jpeg",
    "/images/moulds/img3.jpeg",
    "/images/moulds/img4.jpeg",
    "/images/moulds/img5.jpeg",
    "/images/moulds/img6.jpeg",
    "/images/moulds/img7.jpeg",
    "/images/moulds/img8.jpeg",
    "/images/moulds/img9.png",
    "/images/moulds/img10.png",
    "/images/moulds/img11.png",
    "/images/moulds/img12.png",
    "/images/moulds/img13.png",
    "/images/moulds/img14.png",
    "/images/moulds/img15.png",
    "/images/moulds/img16.png",
    "/images/moulds/img17.png",
  ];

  const marqueeImages = [...galleryImages, ...galleryImages];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section — Video background, B2B style */}
      <section className="h-screen relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/bg-image.jpeg"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
            onLoadedMetadata={(e) => {
              (e.currentTarget as HTMLVideoElement).playbackRate = 1;
            }}
          >
            <source src="/mould.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/65 to-gray-900/40" />
        </div>

        {/* Diagonal accent shape (matches homepage) */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg className="w-full h-32" viewBox="0 0 1440 128" preserveAspectRatio="none">
            <path d="M0 128L1440 128L1440 64L0 128Z" fill="#ffffff" />
          </svg>
        </div>

        {/* Bottom angled banner (matches homepage) */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 z-20">
          <div className="flex items-center">
            <div className="bg-amber-500 px-8 py-4 ml-auto mr-12 skew-x-[-12deg]">
              <span className="text-gray-900 font-bold text-xl tracking-wider skew-x-[12deg] inline-block font-[family-name:var(--font-carbon)]">
                PRECISION TOOLING
              </span>
            </div>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="absolute left-8 bottom-32 z-10 grid grid-cols-5 gap-2">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-amber-500/60" />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full px-6 lg:px-16">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/40 rounded-full px-4 py-2 mb-6"
              variants={fadeInUp}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-xs md:text-sm font-bold tracking-wider">
                IN-HOUSE TOOL ROOM · ISO 9001:2015
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-amber-500 leading-[1.05] mb-2 tracking-tight font-[family-name:var(--font-carbon)]"
              variants={fadeInUp}
            >
              PRECISION MOULDS
            </motion.h1>
            <motion.h2
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight font-[family-name:var(--font-carbon)]"
              variants={fadeInUp}
            >
              ENGINEERED IN-HOUSE
            </motion.h2>

            <motion.p
              className="text-base md:text-xl text-gray-200 font-medium mb-8 max-w-2xl leading-relaxed font-[family-name:var(--font-korto)]"
              variants={fadeInUp}
            >
              We design and manufacture plastic injection moulds end-to-end — DFM analysis,
              CAD/CAM, CNC milling, EDM, assembly and T1 trial — entirely under one roof.
              <span className="text-amber-400 font-bold"> 200+ moulds delivered every year</span>
              , at ±2 µ accuracy, in 2–4 weeks.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
              <motion.button
                onClick={() => setIsDialogOpen(true)}
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-base transition-all shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 font-[family-name:var(--font-korto)] group inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Request a Tooling Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <a href="#tool-room">
                <motion.button
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-base transition-all font-[family-name:var(--font-korto)] w-full sm:w-auto inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Our Tool Room
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2 cursor-pointer group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-white/60 group-hover:text-white/90 text-xs font-semibold tracking-widest transition-colors">
            SCROLL DOWN
          </span>
          <ChevronDown className="w-6 h-6 text-amber-500 group-hover:text-amber-400 transition-colors" />
        </motion.div>
      </section>

      {/* Stats Bar — Minimal dark infographic */}
      <section className="bg-gray-950 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-black px-6 py-8 md:px-8 md:py-10">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <span className="text-amber-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase font-[family-name:var(--font-korto)]">
                Key Metrics
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mt-3 font-[family-name:var(--font-carbon)]">
                Moulding performance
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 md:p-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <div className="text-3xl md:text-5xl font-bold text-amber-400 font-[family-name:var(--font-carbon)] leading-none mb-2">
                    {s.value}
                  </div>
                  <p className="text-white text-sm md:text-base font-semibold font-[family-name:var(--font-korto)]">
                    {s.label}
                  </p>
                  <p className="text-gray-400 text-[11px] md:text-xs uppercase tracking-wider font-[family-name:var(--font-korto)] mt-1">
                    {s.sublabel}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mould Gallery — Horizontal scroll strip */}
      <section className="bg-gray-950 pb-20 pt-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-amber-500 text-sm font-bold tracking-[0.25em] uppercase font-[family-name:var(--font-korto)]">
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 font-[family-name:var(--font-carbon)]">
              MOULDS FROM OUR TOOL ROOM
            </h2>
          </motion.div>
        </div>
        <div className="overflow-hidden px-6 pb-2">
          <div
            className="mould-marquee-track flex w-max gap-4"
            style={{ animation: "mouldMarquee 70s linear infinite", willChange: "transform" }}
          >
            {marqueeImages.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative shrink-0 w-56 md:w-72 h-56 md:h-80 rounded-2xl overflow-hidden border border-white/10 bg-black"
              >
                <Image
                  src={src}
                  alt={`Mould image ${i + 1}`}
                  fill
                  className="object-cover object-center scale-[0.86]"
                />
              </div>
            ))}
          </div>
        </div>
        <style jsx global>{`
          @keyframes mouldMarquee {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }
        `}</style>
      </section>

      {/* About Mould Capability — homepage AboutSection style */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-amber-500 text-sm font-bold tracking-[0.25em] uppercase font-[family-name:var(--font-korto)]">
                Beyond Moulding
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] mt-3 mb-6 leading-tight">
                Unmatched Precision  <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                  Through Full In-House Tooling.
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                Most injection moulding companies depend on external toolmakers for their moulds —
                creating delays, quality compromises and finger-pointing when problems arise.
                Vinayak Technoplast designs and manufactures every mould in-house, end-to-end.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                From DFM analysis on day one through CNC milling, EDM spark erosion and T1
                validation — we own the entire process. Led personally by CEO Sandeep Agarwal
                (21+ years in precision moulding), we deliver moulds that hold tight tolerances
                over millions of shots.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Full in-house tool room",
                  "DFM review included",
                  "ISO 9001:2015 certified",
                  "30+ year track record",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsDialogOpen(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-medium text-sm md:text-lg transition-colors inline-flex items-center gap-2 group"
              >
                Discuss Your Mould Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/20">
                <Image
                  src="/images/moulding/Infra_mould.png"
                  alt="Vinayak Technoplast in-house tool room"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-white rounded-2xl p-5 md:p-6 shadow-2xl border border-gray-100 max-w-[240px]">
                <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-1 font-[family-name:var(--font-carbon)]">
                  200+
                </div>
                <p className="text-gray-700 text-sm font-medium leading-tight">
                  Moulds delivered annually with average lead time of 2-4 weeks.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mould Types Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-500 text-sm font-bold tracking-[0.25em] uppercase font-[family-name:var(--font-korto)]">
              What We Build
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3 mb-4 font-[family-name:var(--font-carbon)]">
              Mould Types We Manufacture
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              From simple two-plate tools to complex hot runner systems — our tool room handles
              every category. We recommend the right mould type based on your volume, material
              and part geometry.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mouldTypes.map((m, i) => (
              <motion.div
                key={i}
                className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-xl bg-amber-50 group-hover:bg-amber-500 flex items-center justify-center transition-colors duration-300">
                    <m.icon className="w-7 h-7 text-amber-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] tracking-wider uppercase font-bold font-[family-name:var(--font-korto)]">
                    {m.badge}
                  </span>
                </div>
                <div className="text-[10px] text-amber-500 tracking-[0.2em] uppercase mb-1.5 font-bold font-[family-name:var(--font-korto)]">
                  {m.tag}
                </div>
                <h3 className="text-gray-900 font-bold text-xl mb-3 font-[family-name:var(--font-korto)]">
                  {m.type}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mid-CTA Banner */}
          <motion.div
            className="mt-14 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-10 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute right-0 top-0 grid grid-cols-5 gap-2 p-6 opacity-30">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              ))}
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between relative z-10">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-carbon)] mb-2">
                  Not sure which mould type fits your part?
                </h3>
                <p className="text-gray-300 text-base">
                  Share your 3D model — our engineers will return a DFM report and mould type
                  recommendation within 48 hours, free of charge.
                </p>
              </div>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-gray-900 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap transition-all shadow-lg shadow-amber-500/30 inline-flex items-center gap-2 group"
              >
                Get Free DFM Review
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* In-House Tool Room — Dark feature section like OfferingsSection */}
      <section id="tool-room" className="md:py-6 md:px-6 px-3 py-3">
        <div className="max-w-8xl mx-auto">
          <div className="relative rounded-[40px] md:rounded-[50px] overflow-hidden bg-gray-900">
            {/* Background image with overlays */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/manufacturing/manufacturing-1/VMC-HAAS-VF3.jpg"
                alt="Tool room background"
                fill
                className="object-cover opacity-15"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/85" />
            </div>

            {/* Decorative dots */}
            <div className="absolute top-8 right-8 grid grid-cols-5 gap-2 z-10">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-amber-500/60" />
              ))}
            </div>

            <div className="relative z-10 p-8 lg:p-14">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-amber-500 text-sm font-bold tracking-[0.25em] uppercase font-[family-name:var(--font-korto)]">
                  In-House Tool Room
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4 font-[family-name:var(--font-carbon)]">
                  THE MACHINES BEHIND <span className="text-amber-500">EVERY MOULD</span>
                </h2>
                <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                  We own and operate every machine that touches a mould. No outsourced machining,
                  no waiting on sub-contractors — full control over quality and lead time.
                </p>
              </motion.div>

              {/* Hero machine cards */}
              <div className="grid lg:grid-cols-2 gap-6 mb-10">
                <motion.div
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-300"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="/images/manufacturing/manufacturing-1/VMC-HAAS-VF3.jpg"
                      alt="VMC HAAS VF3"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-gray-900 text-xs font-bold tracking-wider uppercase">
                      CNC Milling
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-white mb-1 font-[family-name:var(--font-carbon)]">
                      VMC HAAS VF-2 & VF-3
                    </h3>
                    <p className="text-gray-400 text-sm mb-5">
                      High-speed vertical machining centres for cavity and core milling. Rigid
                      Heidenhain feedback ensures dimensional accuracy from roughing to semi-finishing.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Max travel", value: "1000 × 508 × 500 mm" },
                        { label: "Accuracy", value: "±5 µ" },
                        { label: "Spindle speed", value: "8100 RPM" },
                        { label: "Control", value: "Haas CNC" },
                      ].map((spec, si) => (
                        <div key={si} className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <div className="text-[10px] text-amber-400 tracking-wider uppercase font-bold">
                            {spec.label}
                          </div>
                          <div className="text-white text-sm font-semibold mt-0.5">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-300"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="/images/manufacturing/manufacturing-1/edm-die-machine.jpg"
                      alt="EDM Machine"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-gray-900 text-xs font-bold tracking-wider uppercase">
                      EDM / Wire-Cut
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-white mb-1 font-[family-name:var(--font-carbon)]">
                      Electronica EDM × 3 Units
                    </h3>
                    <p className="text-gray-400 text-sm mb-5">
                      Spark erosion for complex profiles, deep ribs and fine surface textures.
                      Wire-cut for parting-line details. Together they achieve ±2 µ specification.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Accuracy", value: "±2 µ" },
                        { label: "Max table", value: "1500 × 1000 × 600 mm" },
                        { label: "Pulse generator", value: "Up to 95 A" },
                        { label: "Wire-cut", value: "Sprintcut" },
                      ].map((spec, si) => (
                        <div key={si} className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <div className="text-[10px] text-amber-400 tracking-wider uppercase font-bold">
                            {spec.label}
                          </div>
                          <div className="text-white text-sm font-semibold mt-0.5">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Equipment list table */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between flex-wrap gap-3">
                  <h4 className="text-white font-bold font-[family-name:var(--font-carbon)] tracking-wider">
                    COMPLETE TOOL ROOM EQUIPMENT
                  </h4>
                  <Link href="/capabilities">
                    <button className="text-amber-400 hover:text-amber-300 text-sm font-bold inline-flex items-center gap-1.5 group">
                      View Full Capabilities
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-white/5">
                        {["Machine", "Make", "Model", "Travel / Spec"].map((h) => (
                          <th
                            key={h}
                            className="px-5 py-3 text-left text-amber-400 font-bold uppercase tracking-wider text-xs"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {toolRoomMachines.map((m, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-5 py-3 text-white font-semibold">{m.category}</td>
                          <td className="px-5 py-3 text-gray-300">{m.make}</td>
                          <td className="px-5 py-3 text-gray-300">{m.model}</td>
                          <td className="px-5 py-3 text-gray-400">{m.travel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section — scroll-driven, dark background */}
      <section
        ref={cycleRef}
        className="relative bg-gray-900"
        style={{ height: `${100 + processSteps.length * 90}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <motion.div
              className="text-center mb-8 md:mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-amber-500 text-sm font-bold tracking-[0.25em] uppercase font-[family-name:var(--font-korto)]">
                How We Build · Scroll to Advance
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 font-[family-name:var(--font-carbon)]">
                FROM DRAWING TO <span className="text-amber-500">FIRST SHOTS</span>
              </h2>
            </motion.div>

            {/* Step Navigator */}
            <div className="relative mb-6 md:mb-8">
              <div className="absolute top-7 md:top-9 left-[8%] right-[8%] h-[3px] rounded-full bg-white/15" />
              <motion.div
                className="absolute top-7 md:top-9 left-[8%] h-[3px] rounded-full origin-left bg-amber-500"
                style={{
                  width: "84%",
                  scaleX: cycleProgress,
                  boxShadow: "0 0 12px rgba(245,158,11,0.5)",
                }}
              />

              <div className="grid grid-cols-6 gap-1 md:gap-4 relative z-10">
                {processSteps.map((step, index) => {
                  const isActive = activeStep === index;
                  const isPassed = index <= activeStep;
                  return (
                    <div key={index} className="flex flex-col items-center select-none">
                      <div
                        className={`relative w-12 h-12 md:w-[72px] md:h-[72px] rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isActive ? "scale-110" : ""
                        } ${
                          isPassed
                            ? "bg-amber-500 shadow-lg shadow-amber-500/40"
                            : "bg-white/5 border-2 border-white/20"
                        }`}
                      >
                        <step.icon
                          className={`w-5 h-5 md:w-7 md:h-7 transition-colors duration-300 ${
                            isPassed ? "text-white" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full text-[9px] md:text-[10px] font-bold flex items-center justify-center transition-colors ${
                            isPassed
                              ? "bg-gray-900 text-amber-400"
                              : "bg-white/10 text-gray-400"
                          }`}
                        >
                          {step.no}
                        </span>
                      </div>
                      <div
                        className={`mt-2 md:mt-3 text-center text-[9px] md:text-sm font-bold uppercase font-[family-name:var(--font-carbon)] transition-colors leading-tight ${
                          isActive ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detail Panel */}
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center"
                >
                  <div className="relative aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={processSteps[activeStep].image}
                      alt={processSteps[activeStep].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                    <div className="absolute bottom-2 right-4 md:bottom-4 md:right-6 text-6xl md:text-8xl font-bold text-amber-400 opacity-90 font-[family-name:var(--font-carbon)] leading-none">
                      {processSteps[activeStep].no}
                    </div>
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] md:text-xs tracking-[0.2em] uppercase mb-3 md:mb-4 font-bold">
                      Step {processSteps[activeStep].no} · {processSteps[activeStep].tag}
                    </span>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 font-[family-name:var(--font-carbon)] uppercase">
                      {processSteps[activeStep].title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5 md:mb-6">
                      {processSteps[activeStep].desc}
                    </p>
                    <ul className="space-y-2 md:space-y-3">
                      {processSteps[activeStep].highlights.map((h, hi) => (
                        <motion.li
                          key={hi}
                          className="flex items-center gap-3 text-gray-200 text-sm md:text-base"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + hi * 0.08 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                          <span className="font-medium">{h}</span>
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

      {/* Mid-page CTA — Mould Repair (clean B2B banner) */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-50 to-transparent" />
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-2">
                    Need a Mould Repaired or Modified?
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    We maintain 50+ active moulds and take on third-party repair, modification
                    and re-qualification work. Urgent turnaround in 24–72 hours.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="flex-shrink-0 border-2 border-amber-500 hover:bg-amber-500 text-amber-600 hover:text-white px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all inline-flex items-center gap-2 group"
              >
                Enquire About Repair
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Vinayak — split layout matching homepage style */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/20">
                <Image
                  src="/images/moulding/Joemars_Mould.png"
                  alt="Vinayak Technoplast EDM"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-xl">
                    <div className="flex items-center gap-3 mb-1">
                      <Award className="w-5 h-5 text-amber-500" />
                      <span className="text-xs font-bold text-gray-700 tracking-wider uppercase">
                        ISO 9001:2015 Certified
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Tooling and moulding processes audited to international quality standards.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-amber-500 text-sm font-bold tracking-[0.25em] uppercase font-[family-name:var(--font-korto)]">
                Why Vinayak Technoplast
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3 mb-6 font-[family-name:var(--font-carbon)] leading-tight">
                Not just a moulder.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                  A mould maker.
                </span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10">
                Most injection moulding companies depend on external toolmakers. We design,
                manufacture and validate every mould in-house — giving you complete control over
                lead time, accuracy and ongoing maintenance.
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {differentiators.map((d, i) => (
                  <motion.div
                    key={i}
                    className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-amber-500 hover:shadow-lg rounded-2xl p-6 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center mb-4">
                      <d.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-gray-900 font-bold mb-2 font-[family-name:var(--font-korto)]">
                      {d.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-500 text-sm font-bold tracking-[0.25em] uppercase font-[family-name:var(--font-korto)]">
              Sectors We Serve
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3 mb-4 font-[family-name:var(--font-carbon)]">
              Moulds Built for Every Sector
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              From automotive Tier-1s to medical device makers — we manufacture moulds for any
              industry where precision, repeatability and tool life matter.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-7 hover:border-amber-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-14 h-14 rounded-xl bg-amber-50 group-hover:bg-amber-500 flex items-center justify-center mb-5 transition-colors duration-300">
                  <ind.icon className="w-7 h-7 text-amber-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-carbon)] uppercase">
                  {ind.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section — homepage style amber gradient */}
      <section className="py-20 px-6 bg-gradient-to-br from-amber-500 to-amber-600">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-carbon)] leading-tight">
                Ready to commission your next mould?
              </h2>
              <p className="text-base md:text-lg text-amber-50 leading-relaxed">
                Share your 3D model or 2D drawing. Our engineers will return a complete tooling
                proposal — mould type, lead time and cost estimate — within 48 hours.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <button
                onClick={() => setIsDialogOpen(true)}
                className="w-full bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-base hover:bg-gray-100 transition-all shadow-xl inline-flex items-center justify-center gap-2 group"
              >
                Request a Tooling Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-full font-bold text-base transition-colors border-2 border-white inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Talk to an Engineer
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      <DownloadDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}
