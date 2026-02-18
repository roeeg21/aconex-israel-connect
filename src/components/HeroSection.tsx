import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import heroImg from "@/assets/hero-construction.jpg";

const HeroSection = () => (
  <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img src={heroImg} alt="Modern construction site with digital collaboration" className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
    </div>

    {/* Content */}
    <div className="relative z-10 container mx-auto px-4 py-32">
      <div className="max-w-2xl space-y-6 animate-fade-up">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent-foreground backdrop-blur-sm border border-accent/20">
          <Shield size={14} className="text-accent" />
          Authorized Oracle Aconex Distributor in Israel
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-primary-foreground">
          The Neutral, Secure Platform for Your{" "}
          <span className="text-accent">Construction Projects</span>
        </h1>

        <p className="text-lg text-primary-foreground/70 max-w-xl leading-relaxed">
          Oracle Aconex connects every team, document, and process on one cloud platform — 
          with full data ownership and an immutable audit trail.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8">
            <a href="#contact">
              Request a Demo <ArrowRight size={18} className="ml-2" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
            <a href="#modules">Explore Modules</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
