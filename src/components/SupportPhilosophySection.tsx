import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const SupportPhilosophySection = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding section-alt">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">{t.supportPhilosophy.label}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{t.supportPhilosophy.title}</h2>
        </div>

        <p className="text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto mb-10">
          {t.supportPhilosophy.desc}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {t.supportPhilosophy.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-accent mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportPhilosophySection;
