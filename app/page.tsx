import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BrandsCarousel from "@/components/BrandsCarousel";
import OfferingsSection from "@/components/OfferingsSection";
import ProductLineSection from "@/components/ProductLineSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <BrandsCarousel />
      <AboutSection />
      <OfferingsSection />
      <ProductLineSection />
      <CTASection />
      <Footer />
    </div>
  );
}
