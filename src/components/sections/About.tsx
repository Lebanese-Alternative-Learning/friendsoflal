const columns = [
  {
    title: "Who is FLAL?",
    body: "Friends of Lebanese Alternative Learning (FLAL) is a 501(c)(3) organization based in Washington, D.C., dedicated to funding the work of Lebanese Alternative Learning (LAL) — a Lebanese NGO that believes in the power of education to mobilize change and brighten futures. LAL spreads seeds of education in the least privileged of places, granting access to quality learning through technology, anytime, anywhere.",
  },
  {
    title: "Why a separate U.S. nonprofit?",
    body: "FLAL exists to give donors in the United States a trusted, tax-deductible way to support LAL's mission on the ground in Lebanon. As a registered 501(c)(3), FLAL meets U.S. compliance and transparency standards, making it simple for individuals, family foundations, and corporate partners to contribute with confidence.",
  },
  {
    title: "How does FLAL support LAL?",
    body: "Every dollar raised by FLAL is directed to LAL's programs — funding offline learning technology, teacher training, and free digital curriculum for Lebanese children who would otherwise be left behind. FLAL handles fundraising, donor stewardship, and grant partnerships in the U.S. so LAL can stay focused on impact in the classroom.",
  },
];

const About = () => {
  return (
    <section id="about" className="bg-background section-padding scroll-mt-20">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow">Who We Are</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-grey leading-tight">
            Funding Education at the Roots.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {columns.map((col) => (
            <div key={col.title} className="border-l-4 border-brand-magenta pl-6">
              <h3 className="text-xl md:text-2xl font-extrabold text-brand-grey">
                {col.title}
              </h3>
              <p className="mt-4 text-base text-brand-grey/90 leading-relaxed">
                {col.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
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
    </section>
  );
};

export default About;
