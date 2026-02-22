import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { Headphones, RefreshCcw, TrendingUp, ShieldAlert, GraduationCap, Handshake } from "lucide-react";

const serviceIcons = [Headphones, RefreshCcw, TrendingUp, ShieldAlert, GraduationCap, Handshake];

const SupportPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <ScrollReveal>
          <section className="section-padding section-alt">
            <div className="container mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">{t.supportPage.label}</p>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">{t.supportPage.title}</h1>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">{t.supportPage.intro}</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <section className="section-padding">
            <div className="container mx-auto max-w-4xl">
              <div className="grid sm:grid-cols-2 gap-6">
                {t.supportPage.services.map((s, i) => {
                  const Icon = serviceIcons[i];
                  return (
                    <ScrollReveal key={i} delay={i * 70}>
                      <div className="bg-card rounded-lg p-6 card-elevated border border-border">
                        <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                          <Icon size={22} className="text-accent" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground text-lg mb-2">{s.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
