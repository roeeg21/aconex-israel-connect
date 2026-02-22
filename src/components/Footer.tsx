import { Link } from "react-router-dom";
import megatechLogo from "@/assets/megatech-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <img src={megatechLogo} alt="Megatec" className="h-8 brightness-0 invert opacity-80" />
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-semibold text-sm mb-4 uppercase tracking-wider text-primary-foreground/80">
              {t.footer.quickLinks}
            </p>
            <ul className="space-y-2.5 text-sm text-primary-foreground/60">
              <li><Link to="/about" className="hover:text-accent transition-colors">{t.nav.about}</Link></li>
              <li><Link to="/solutions" className="hover:text-accent transition-colors">{t.nav.solutions}</Link></li>
              <li><Link to="/support" className="hover:text-accent transition-colors">{t.nav.support}</Link></li>
              <li><a href="/#contact" className="hover:text-accent transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="font-semibold text-sm mb-4 uppercase tracking-wider text-primary-foreground/80">
              {t.footer.resources}
            </p>
            <ul className="space-y-2.5 text-sm text-primary-foreground/60">
              <li>
                <a href="https://www.oracle.com/construction-engineering/aconex/#rc30p10" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  Oracle Aconex Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="font-semibold text-sm mb-4 uppercase tracking-wider text-primary-foreground/80">
              {t.nav.contact}
            </p>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-accent shrink-0" />
                <a href="mailto:Menachem_getz@megatec.co.il" className="hover:text-accent transition-colors">Menachem_getz@megatec.co.il</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-accent shrink-0" />
                <span>+972-54-453-0230</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                <span>2 Yohanan HaSandlar Street, Haifa, Israel</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/40">
          <span>© {new Date().getFullYear()} Megatec M.A. Advanced Technologies Ltd. {t.footer.rights}</span>
          <span>{t.footer.submittedBy}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
