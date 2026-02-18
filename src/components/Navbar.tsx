import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import megatechLogo from "@/assets/megatech-logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Modules", href: "#modules" },
  { label: "Benefits", href: "#benefits" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#home" className="flex items-center gap-2 font-display text-xl font-bold text-foreground tracking-tight">
          <img src={megatechLogo} alt="Megatech" className="h-7" />
          <span><span className="text-accent">Aconex</span> Israel</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="#contact">Request a Demo</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 animate-fade-in">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Button asChild size="sm" className="mt-2 w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="#contact" onClick={() => setOpen(false)}>Request a Demo</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
