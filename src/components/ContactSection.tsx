import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const freeMailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "mail.com", "protonmail.com", "yandex.com"];

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [form, setForm] = useState({
    organization: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    projectSize: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const domain = form.email.split("@")[1]?.toLowerCase();
    if (!domain || freeMailDomains.includes(domain)) {
      toast({
        title: t.contact.toasts.corpRequired,
        description: t.contact.toasts.corpDesc,
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: t.contact.toasts.success,
        description: t.contact.toasts.successDesc,
      });
      setForm({ organization: "", name: "", email: "", phone: "", role: "", projectSize: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">{t.contact.label}</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight">{t.contact.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.contact.desc}</p>
            <div className="pt-2 space-y-3 text-sm text-muted-foreground">
              {t.contact.bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 sm:p-8 card-elevated border border-border space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="organization">{t.contact.form.organization}</Label>
                <Input id="organization" name="organization" required value={form.organization} onChange={handleChange} placeholder={t.contact.form.placeholders.organization} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="name">{t.contact.form.name}</Label>
                <Input id="name" name="name" required value={form.name} onChange={handleChange} placeholder={t.contact.form.placeholders.name} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">{t.contact.form.email}</Label>
                <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder={t.contact.form.placeholders.email} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">{t.contact.form.phone}</Label>
                <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder={t.contact.form.placeholders.phone} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="role">{t.contact.form.role}</Label>
                <Input id="role" name="role" value={form.role} onChange={handleChange} placeholder={t.contact.form.placeholders.role} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="projectSize">{t.contact.form.projectSize}</Label>
                <Input id="projectSize" name="projectSize" value={form.projectSize} onChange={handleChange} placeholder={t.contact.form.placeholders.projectSize} />
              </div>
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              {submitting ? t.contact.form.sending : (
                <>{t.contact.form.submit} <Send size={16} className="ms-2" /></>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">{t.contact.form.privacy}</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
