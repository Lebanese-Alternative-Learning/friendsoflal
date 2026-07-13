import { HandHeart, Sparkles, GraduationCap, BookOpenCheck, Users2, ArrowRight } from "lucide-react";

const steps = [
  {
    Icon: HandHeart,
    title: "FLAL Raises Funds",
    body: "Donors in the U.S. contribute tax-deductible gifts to power the mission.",
  },
  {
    Icon: Sparkles,
    title: "LAL Delivers Programs",
    body: "Funds flow to LAL to run offline-first learning programs on the ground.",
  },
  {
    Icon: GraduationCap,
    title: "Teachers Get Trained",
    body: "Educators receive ongoing training, coaching, and classroom support.",
  },
  {
    Icon: BookOpenCheck,
    title: "Students Keep Learning",
    body: "Children continue their education—no matter the crisis or context.",
  },
  {
    Icon: Users2,
    title: "Communities Take Ownership",
    body: "Local leaders sustain and scale learning spaces for the long term.",
  },
];

const HowModel = () => {
  return (
    <section id="how-it-works" className="bg-brand-blue/40 py-14 px-6 md:py-16 md:px-8 scroll-mt-20">
      <div className="container-narrow">
        <div className="text-center">
          <p className="eyebrow">How the Model Works</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-grey leading-tight">
            From Donation to Lasting Impact.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-brand-grey/85 leading-relaxed">
            A simple, transparent flow that turns every dollar into continuous
            learning for children in Lebanon.
          </p>
        </div>

        <div className="mt-10 flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-4 lg:gap-2">
          {steps.map(({ Icon, title, body }, i) => (
            <div key={title} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-2 lg:flex-1">
              <div className="relative flex-1 w-full lg:w-auto rounded-2xl bg-background p-5 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-brand-magenta/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-brand-magenta" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div className="mt-3 text-xs font-bold text-brand-magenta">
                  Step {i + 1}
                </div>
                <h3 className="mt-1 text-sm font-extrabold text-brand-grey leading-snug">
                  {title}
                </h3>
                <p className="mt-2 text-xs text-brand-grey/80 leading-relaxed">
                  {body}
                </p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight
                  className="h-6 w-6 text-brand-magenta shrink-0 rotate-90 lg:rotate-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowModel;
