'use client';

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import BrandsCarousel from "@/components/BrandsCarousel";
import OfferingsSection from "@/components/OfferingsSection";
import ProductLineSection from "@/components/ProductLineSection";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import DownloadDialog from "@/components/DownloadDialog";
import { useState, useEffect } from "react";

export default function HomeClient() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenDownloadPopup');
    
    if (!hasSeenPopup && !hasShownPopup) {
      const timer = setTimeout(() => {
        setIsDialogOpen(true);
        setHasShownPopup(true);
        sessionStorage.setItem('hasSeenDownloadPopup', 'true');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasShownPopup]);

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
      
      <DownloadDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}
