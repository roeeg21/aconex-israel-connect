import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Target, Eye, Lightbulb, ShieldCheck } from "lucide-react";

const valueIcons = [Target, Eye, Lightbulb, ShieldCheck];

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="section-padding section-alt">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">{t.about.label}</p>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{t.about.title}</h1>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-[15px]">
              <p>{t.about.history}</p>
              <p><strong className="text-foreground">Mission:</strong> {t.about.mission}</p>
              <p><strong className="text-foreground">Vision:</strong> {t.about.vision}</p>
              <p>{t.about.consulting}</p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto max-w-4xl">
            <div className="grid sm:grid-cols-2 gap-8">
              {t.about.values.map((v, i) => {
                const Icon = valueIcons[i];
                return (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <Icon size={22} className="text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground text-lg mb-1">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
