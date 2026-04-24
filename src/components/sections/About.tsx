const About = () => {
  return (
    <section className="bg-background section-padding">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow text-center">Who We Are</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-grey text-center leading-tight">
            Funding Education at the Roots.
          </h2>

          <div className="mt-10 border-l-4 border-brand-magenta pl-6 md:pl-8">
            <p className="text-base md:text-lg text-brand-grey/90 leading-relaxed">
              Friends of Lebanese Alternative Learning (FLAL) is a 501(c)(3)
              organization based in Washington, D.C., dedicated to funding the
              work of Lebanese Alternative Learning (LAL) — a Lebanese NGO that
              believes in the power of education to mobilize change and brighten
              futures. LAL spreads seeds of education in the least privileged of
              places, granting access to quality learning through technology,
              anytime, anywhere.
            </p>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://lal.ngo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-brand-magenta hover:underline underline-offset-4"
            >
              Learn more about LAL's work at lal.ngo
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
