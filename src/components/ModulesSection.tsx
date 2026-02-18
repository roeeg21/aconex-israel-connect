import {
  FileText,
  Mail,
  GitBranch,
  HardHat,
  DollarSign,
  Box,
  Smartphone,
  BarChart3,
} from "lucide-react";

const modules = [
  { icon: FileText, title: "Documents", desc: "Upload, version-control and distribute project files with unlimited storage and strict audit trails." },
  { icon: Mail, title: "Mail", desc: "Standardized digital communication with automated routing, shared mailing groups and an unalterable record." },
  { icon: GitBranch, title: "Workflows", desc: "Define review and approval processes with custom workflows, tracking and compliance reporting." },
  { icon: HardHat, title: "Field", desc: "Mobile-first site inspections with real-time issue capture, dashboards and role-based permissions." },
  { icon: DollarSign, title: "Cost", desc: "Complete budget, contract and change-event management fully integrated with the platform." },
  { icon: Box, title: "Models", desc: "Share and coordinate BIM models with open standards, 2D/3D overlays and Revit 2026 support." },
  { icon: Smartphone, title: "Mobile", desc: "Full platform access from any device with monthly updates and offline capability." },
  { icon: BarChart3, title: "Insights", desc: "Dashboards and reports with advanced filters to track project health at a glance." },
];

const ModulesSection = () => (
  <section id="modules" className="section-padding section-alt">
    <div className="container mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">Platform Modules</p>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
          Everything You Need in One Platform
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Aconex brings documents, communication, models and field operations together — so every stakeholder works from a single source of truth.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {modules.map((m) => (
          <div
            key={m.title}
            className="bg-card rounded-lg p-6 card-elevated border border-border group cursor-default"
          >
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <m.icon size={22} className="text-accent" />
            </div>
            <h3 className="font-display font-semibold text-foreground text-lg mb-2">{m.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ModulesSection;
