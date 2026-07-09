import { WifiOff, BookOpen, Presentation, Home, HeartHandshake } from "lucide-react";

const pillars = [
  {
    Icon: WifiOff,
    title: "Offline-First Technology",
    body: "Learning continues without reliable internet or electricity.",
  },
  {
    Icon: BookOpen,
    title: "Curriculum Aligned",
    body: "Content aligned with the Lebanese curriculum for grades K–12.",
  },
  {
    Icon: Presentation,
    title: "Teacher Empowerment",
    body: "Ongoing training and support for educators and school leaders.",
  },
  {
    Icon: Home,
    title: "Safe Learning Spaces",
    body: "Alternative learning spaces that are accessible and community-centered.",
  },
  {
    Icon: HeartHandshake,
    title: "Community Partnership",
    body: "Working hand-in-hand with communities for lasting impact.",
  },
];

const WhyLAL = () => {
  return (
    <section id="why-lal" className="bg-background section-padding scroll-mt-20">
      <div className="container-narrow">
        <div className="max-w-3xl">
          <p className="eyebrow">Why LAL</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-grey leading-tight">
            Education That Continues—No Matter What.
          </h2>
          <p className="mt-6 text-base md:text-lg text-brand-grey/85 leading-relaxed">
            LAL builds resilient education solutions for crisis-affected
            communities. Through offline-capable technology, a Lebanese
            curriculum, trained teachers, and safe learning spaces, children
            can keep learning even when schools close, homes are disrupted,
            or electricity and internet are unavailable.
          </p>
          <a
            href="#about"
            className="mt-6 inline-flex items-center gap-1 font-bold text-brand-magenta hover:underline underline-offset-4"
          >
            Learn more about how we work <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Pillars */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
          {pillars.map(({ Icon, title, body }) => (
            <div key={title} className="text-center px-2">
              <div className="flex justify-center">
                <Icon className="h-10 w-10 text-brand-magenta" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-extrabold text-brand-grey leading-snug">
                {title}
              </h3>
              <p className="mt-3 text-sm text-brand-grey/80 leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default WhyLAL;
