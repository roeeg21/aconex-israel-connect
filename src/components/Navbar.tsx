import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import megatechLogo from "@/assets/megatech-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t, lang, toggleLang } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.solutions, href: "/solutions" },
    { label: t.nav.support, href: "/support" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return location.pathname === "/";
    return location.pathname === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground tracking-tight">
          <img src={megatechLogo} alt="Megatec" className="h-7" />
          <span className="text-accent">Megatec</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            l.href.startsWith("/#") ? (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${isActive(l.href) ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                to={l.href}
                className={`text-sm font-medium transition-colors ${isActive(l.href) ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
              >
                {l.label}
              </Link>
            )
          ))}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle language"
          >
            <Globe size={16} />
            {lang === "en" ? "עב" : "EN"}
          </button>
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/#contact">{t.nav.demo}</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleLang} className="text-muted-foreground hover:text-foreground p-1" aria-label="Toggle language">
            <Globe size={20} />
          </button>
          <button className="text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 animate-fade-in">
          {navLinks.map((l) => (
            l.href.startsWith("/#") ? (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            )
          ))}
          <Button asChild size="sm" className="mt-2 w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/#contact" onClick={() => setOpen(false)}>{t.nav.demo}</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
