import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import BrandsCarousel from "@/components/BrandsCarousel";
import OfferingsSection from "@/components/OfferingsSection";
import ProductLineSection from "@/components/ProductLineSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import HomeDownloadPrompt from "@/components/HomeDownloadPrompt";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, pageNodes } from "@/lib/seo";

const PAGE = {
  path: '/',
  title: 'Vinayak Technoplast - Plastic Injection Moulding Manufacturer in New Delhi',
  description: 'ISO 9001:2015 certified plastic injection moulding manufacturer in New Delhi. In-house mould making, 30+ machines from 60 to 850 tonnes and complete assembly for automotive, EV, pharma, kitchenware and electrical OEMs.',
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <BrandsCarousel />
      <AboutSection />
      <StatsSection />
      <OfferingsSection />
      <ProductLineSection />
      {/* <BlogSection /> */}
      <CTASection />
      <Footer />

      <HomeDownloadPrompt />
      <JsonLd nodes={pageNodes(PAGE)} />
    </div>
  );
}
