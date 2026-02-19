import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DifferentiatorsSection from "@/components/DifferentiatorsSection";
import IndustriesSection from "@/components/IndustriesSection";
import SupportPhilosophySection from "@/components/SupportPhilosophySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <DifferentiatorsSection />
    <IndustriesSection />
    <SupportPhilosophySection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
