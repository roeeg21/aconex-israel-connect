import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DifferentiatorsSection from "@/components/DifferentiatorsSection";
import IndustriesSection from "@/components/IndustriesSection";
import SupportPhilosophySection from "@/components/SupportPhilosophySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <ScrollReveal delay={0}>
      <HeroSection />
    </ScrollReveal>
    <ScrollReveal delay={50}>
      <DifferentiatorsSection />
    </ScrollReveal>
    <ScrollReveal delay={80}>
      <IndustriesSection />
    </ScrollReveal>
    <ScrollReveal delay={110}>
      <SupportPhilosophySection />
    </ScrollReveal>
    <ScrollReveal delay={140}>
      <ContactSection />
    </ScrollReveal>
    <Footer />
  </div>
);

export default Index;
