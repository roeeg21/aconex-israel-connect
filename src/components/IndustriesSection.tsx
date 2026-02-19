import { Cpu, Gauge, Plug, FolderKanban } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Cpu, Gauge, Plug, FolderKanban];

const IndustriesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">{t.industries.label}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{t.industries.title}</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {t.industries.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Icon size={22} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
