import { Zap, Settings, DollarSign, Users, Package, Award } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Zap, Settings, DollarSign, Users, Package, Award];

const DifferentiatorsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding section-alt">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">{t.differentiators.label}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{t.differentiators.title}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.differentiators.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="bg-card rounded-lg p-6 card-elevated border border-border group cursor-default">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon size={22} className="text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorsSection;
