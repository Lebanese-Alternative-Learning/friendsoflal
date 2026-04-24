const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* Soft geometric wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-brand-blue/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-24 h-64 w-64 rounded-full bg-brand-blue/30 blur-3xl"
      />

      <div className="container-narrow relative section-padding text-center">
        <div className="fade-in-up max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-brand-grey">
            Education Changes Everything.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-brand-grey/85 leading-relaxed max-w-2xl mx-auto">
            Friends of Lebanese Alternative Learning funds free, quality education
            for every child in Lebanon — through technology, in school and out.
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href="#donate"
              className="inline-flex items-center justify-center rounded-full bg-brand-magenta px-8 py-4 text-base md:text-lg font-bold text-white shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2"
            >
              Support Our Work
            </a>
          </div>

          <p className="mt-8 text-sm text-brand-grey/70">
            U.S. 501(c)(3) · EIN 99-3511136
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
