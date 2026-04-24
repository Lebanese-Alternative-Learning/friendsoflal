const stats = [
  { value: "1,200+", label: "Digital Lessons" },
  { value: "Thousands", label: "of Learners Reached" },
  { value: "Multiple", label: "Countries" },
  { value: "K–12", label: "Coverage" },
];

const Impact = () => {
  return (
    <section className="bg-brand-blue/60 section-padding">
      <div className="container-narrow">
        <div className="text-center">
          <p className="eyebrow">LAL's Impact So Far</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-grey">
            Real Reach, Real Learners.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-background rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-magenta leading-tight">
                {stat.value}
              </div>
              <div className="mt-3 text-sm md:text-base font-semibold text-brand-grey">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-brand-grey/80">
          All programs funded through donor support.
        </p>
      </div>
    </section>
  );
};

export default Impact;
