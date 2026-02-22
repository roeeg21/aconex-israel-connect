import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { CheckCircle2 } from "lucide-react";

const Solutions = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <ScrollReveal>
          <section className="section-padding section-alt">
            <div className="container mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">{t.solutions.label}</p>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{t.solutions.title}</h1>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <section className="section-padding">
            <div className="container mx-auto max-w-4xl space-y-12">
              {t.solutions.categories.map((cat, i) => (
                <ScrollReveal key={i} delay={i * 90}>
                  <div className="bg-card rounded-xl p-6 sm:p-8 card-elevated border border-border">
                    <h2 className="font-display font-bold text-xl text-foreground mb-3">{cat.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-5">{cat.desc}</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {cat.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 size={16} className="text-accent shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
