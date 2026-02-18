import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const freeMailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "mail.com", "protonmail.com", "yandex.com"];

const ContactSection = () => {
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
        title: "Corporate email required",
        description: "Please use your organization email address (not Gmail, Yahoo, etc.).",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Request received!",
        description: "We'll verify your email and get back to you shortly.",
      });
      setForm({ organization: "", name: "", email: "", phone: "", role: "", projectSize: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left copy */}
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Get Started</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight">
              Request a Personalized Demo
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Fill in your details and our team will schedule a demo tailored to your project's needs. 
              We'll send a verification email to confirm your organization.
            </p>
            <div className="pt-2 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span>Corporate email required for verification</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span>Your data is used solely for contact purposes</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span>Compliant with Israeli privacy law & GDPR</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 sm:p-8 card-elevated border border-border space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="organization">Organization</Label>
                <Input id="organization" name="organization" required value={form.organization} onChange={handleChange} placeholder="Company name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Corporate Email</Label>
                <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@company.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+972..." />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <Input id="role" name="role" value={form.role} onChange={handleChange} placeholder="Project Manager, Architect…" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="projectSize">Project Size</Label>
                <Input id="projectSize" name="projectSize" value={form.projectSize} onChange={handleChange} placeholder="e.g. $10M+" />
              </div>
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              {submitting ? "Sending…" : (
                <>Submit Request <Send size={16} className="ml-2" /></>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to our privacy policy. We'll verify your email before processing your request.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
