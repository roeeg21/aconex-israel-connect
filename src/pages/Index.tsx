import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModulesSection from "@/components/ModulesSection";
import BenefitsSection from "@/components/BenefitsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ModulesSection />
    <BenefitsSection />
    <AboutSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
