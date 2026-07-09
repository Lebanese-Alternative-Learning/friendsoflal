import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/95"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-brand-blue/40 blur-3xl"
      />

      <div className="container-narrow relative section-padding text-center">
        <div className="fade-in-up max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-brand-grey">
            Every Child Deserves the Chance to Learn.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-brand-grey/85 leading-relaxed max-w-2xl mx-auto">
            Friends of Lebanese Alternative Learning funds free, quality education
            for every child in Lebanon — through technology, in school and out.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#donate"
              className="inline-flex items-center justify-center rounded-full bg-brand-magenta px-8 py-4 text-base md:text-lg font-bold text-white shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2"
            >
              Support Our Work
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full bg-background/80 backdrop-blur border-2 border-brand-magenta px-8 py-4 text-base md:text-lg font-bold text-brand-magenta transition-all hover:bg-brand-magenta hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2"
            >
              Learn More
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
