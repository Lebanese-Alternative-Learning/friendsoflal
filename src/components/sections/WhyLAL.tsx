const pillars = [
  {
    emoji: "💡",
    title: "Why Digital Education",
    body: "In Lebanon, school closures, displacement, and economic collapse have pulled hundreds of thousands of children out of the classroom. Digital, offline-first learning reaches them where power, internet, and teachers cannot — turning any device into a full curriculum.",
  },
  {
    emoji: "🌱",
    title: "Our Beliefs",
    body: "Every child, regardless of background, deserves access to quality education. Learning should be free, in their own language, and rooted in their community. Technology is not a replacement for teachers — it's a way to empower them.",
  },
  {
    emoji: "🏫",
    title: "How the Spaces Work",
    body: "LAL sets up Learning Spaces — physical rooms equipped with offline servers, tablets, and trained facilitators. Children come to learn at their own pace, and communities take ownership of the space, keeping it alive long after LAL's initial support.",
  },
];

const steps = [
  { emoji: "🚪", title: "School closes", body: "Conflict, crisis, or poverty interrupts a child's education." },
  { emoji: "📦", title: "LAL delivers", body: "Offline technology & full K–12 curriculum arrive on the ground." },
  { emoji: "👩‍🏫", title: "Teachers trained", body: "Facilitators receive training and ongoing pedagogical support." },
  { emoji: "📚", title: "Students learn", body: "Children keep learning — free, in Arabic, at their own pace." },
  { emoji: "🤝", title: "Community owns it", body: "Local families sustain the Learning Space for the long term." },
];

const WhyLAL = () => {
  return (
    <section id="why-lal" className="bg-brand-soft section-padding scroll-mt-20">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow">Why LAL</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-grey leading-tight">
            A Model Built for the Hardest Places to Learn.
          </h2>
          <p className="mt-6 text-base md:text-lg text-brand-grey/85 leading-relaxed">
            LAL's approach is what makes it different: digital-first, community-owned, and designed to work when everything else breaks down.
          </p>
        </div>

        {/* Pillars */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl">{p.emoji}</div>
              <h3 className="mt-4 text-xl font-extrabold text-brand-grey">
                {p.title}
              </h3>
              <p className="mt-3 text-brand-grey/85 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* How the Model Works */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow">How the Model Works</p>
            <h3 className="mt-4 text-2xl md:text-4xl font-extrabold text-brand-grey leading-tight">
              From crisis to classroom, in five steps.
            </h3>
          </div>

          <div className="mt-12 flex flex-col md:flex-row md:flex-wrap md:justify-center items-stretch gap-4 md:gap-2">
            {steps.map((s, i) => (
              <div key={s.title} className="flex flex-col md:flex-row items-center gap-4 md:gap-2 md:flex-1 md:min-w-[180px] md:max-w-[220px]">
                <div className="w-full bg-background rounded-2xl p-5 shadow-sm border-t-4 border-brand-magenta text-center h-full flex flex-col">
                  <div className="text-3xl">{s.emoji}</div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-wider text-brand-magenta">
                    Step {i + 1}
                  </div>
                  <div className="mt-1 font-extrabold text-brand-grey">{s.title}</div>
                  <div className="mt-2 text-sm text-brand-grey/80 leading-snug">{s.body}</div>
                </div>
                {i < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="text-2xl text-brand-magenta font-black md:mx-0 rotate-90 md:rotate-0 shrink-0"
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLAL;
