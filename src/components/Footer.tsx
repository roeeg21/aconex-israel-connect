import { Link } from "react-router-dom";
import megatechLogo from "@/assets/megatech-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <p className="font-display font-bold text-lg mb-2">
              <span className="text-accent"></span>
            </p>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3 uppercase tracking-wider text-primary-foreground/80">{t.footer.quickLinks}</p>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/about" className="hover:text-accent transition-colors">{t.nav.about}</Link></li>
              <li><Link to="/solutions" className="hover:text-accent transition-colors">{t.nav.solutions}</Link></li>
              <li><Link to="/support" className="hover:text-accent transition-colors">{t.nav.support}</Link></li>
              <li><a href="/#contact" className="hover:text-accent transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3 uppercase tracking-wider text-primary-foreground/80">{t.footer.resources}</p>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="https://www.oracle.com/construction-engineering/aconex/#rc30p10" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Oracle Aconex Docs</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-primary-foreground/40">
          <span>{t.footer.submittedBy}</span>
          <img src={megatechLogo} alt="Megatech Advanced Technologies" className="h-6 brightness-0 invert opacity-60" />
        </div>
        <div className="text-center text-xs text-primary-foreground/30 mt-3">
          © {new Date().getFullYear()} Megatec M.A. Advanced Technologies Ltd. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
