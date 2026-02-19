import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Cpu } from "lucide-react";
import heroImg from "@/assets/hero-construction.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Advanced engineering and CAD technology" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-2xl space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent-foreground backdrop-blur-sm border border-accent/20">
            <Cpu size={14} className="text-accent" />
            {t.hero.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-primary-foreground">
            {t.hero.headline}
          </h1>

          <p className="text-lg text-primary-foreground/70 max-w-xl leading-relaxed">
            {t.hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8">
              <a href="#contact">
                {t.hero.cta1} <ArrowRight size={18} className="ms-2" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/60 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 font-semibold text-base px-8 backdrop-blur-sm">
              <a href="#contact">
                <MessageCircle size={18} className="me-2" />
                {t.hero.cta2}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
