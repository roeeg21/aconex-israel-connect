import megatechLogo from "@/assets/megatech-logo.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid sm:grid-cols-3 gap-8">
        <div>
          <p className="font-display font-bold text-lg mb-2">
            <span className="text-accent">Aconex</span> Israel
          </p>
          <p className="text-sm text-primary-foreground/60 leading-relaxed">
            Authorized Oracle Aconex distributor — bringing the world's leading construction CDE to the Israeli market.
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm mb-3 uppercase tracking-wider text-primary-foreground/80">Quick Links</p>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            <li><a href="#modules" className="hover:text-accent transition-colors">Modules</a></li>
            <li><a href="#benefits" className="hover:text-accent transition-colors">Benefits</a></li>
            <li><a href="#about" className="hover:text-accent transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-sm mb-3 uppercase tracking-wider text-primary-foreground/80">Resources</p>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            <li><a href="https://docs.oracle.com/en/cloud/paas/aconex/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Oracle Aconex Docs</a></li>
            <li><a href="https://docs.oracle.com/en/cloud/paas/aconex/acrel/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Release Notes</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-primary-foreground/40">
        <span>Submitted by Megatech Advanced Technologies Ltd.</span>
        <img src={megatechLogo} alt="Megatech Advanced Technologies" className="h-6 brightness-0 invert opacity-60" />
      </div>
      <div className="text-center text-xs text-primary-foreground/30 mt-3">
        © {new Date().getFullYear()} Aconex Israel. All rights reserved. Oracle and Aconex are trademarks of Oracle Corporation.
      </div>
    </div>
  </footer>
);

export default Footer;
