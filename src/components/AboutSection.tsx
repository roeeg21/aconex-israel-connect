const AboutSection = () => (
  <section id="about" className="section-padding section-alt">
    <div className="container mx-auto max-w-4xl">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">About</p>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
          Oracle Aconex in Israel
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
          <p>
            As the authorized Oracle Aconex distributor in Israel, we bring the world's leading construction 
            collaboration platform to the local market — with Hebrew language support, local expertise and 
            dedicated onboarding.
          </p>
          <p>
            Israel's construction sector is rapidly embracing digital transformation. Aconex's proven track 
            record on mega-projects worldwide, combined with Oracle's enterprise-grade security, makes it the 
            ideal choice for government and private infrastructure projects.
          </p>
        </div>

        <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
          <p>
            The platform's <strong className="text-foreground">five rules of data ownership</strong> ensure that every organization 
            controls who sees its information. Records cannot be altered, and there is no super-user — fostering 
            genuine trust across the supply chain.
          </p>
          <p>
            Integration with other Oracle Construction & Engineering solutions, including Primavera P6 
            for scheduling, ensures compatibility with tools already used across the region.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
