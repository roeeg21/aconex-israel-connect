import { ShieldCheck, Users, Lock, RefreshCcw } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Neutral Data Ownership",
    desc: "Every organization owns its data. No super-user, no alterable records — full autonomy across the supply chain.",
  },
  {
    icon: Users,
    title: "Unlimited Scalability",
    desc: "Handle unlimited file sizes, volumes, file types and participants without any restrictions.",
  },
  {
    icon: Lock,
    title: "Immutable Audit Trail",
    desc: "Every action is logged and unalterable, giving you a complete, trustworthy project record for compliance and disputes.",
  },
  {
    icon: RefreshCcw,
    title: "Continuous Innovation",
    desc: "Monthly releases bring new features — 2D/3D overlays, shared mailing groups, expanded exports and more.",
  },
];

const BenefitsSection = () => (
  <section id="benefits" className="section-padding">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">Why Aconex</p>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
          Built on Trust, Designed for Scale
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {benefits.map((b) => (
          <div key={b.title} className="flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <b.icon size={22} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
