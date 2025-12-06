import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import OfferingsSection from "@/components/OfferingsSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProductLineSection from "@/components/ProductLineSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <OfferingsSection />
      <CapabilitiesSection />
      <ProductLineSection />
      <CTASection />
      <Footer />
    </div>
  );
}
