import { Users, GraduationCap, School, PlayCircle, Heart, Globe } from "lucide-react";

const stats = [
  { value: "68,000+", label: "Learners Reached", Icon: Users },
  { value: "3,000+", label: "Educators Trained", Icon: GraduationCap },
  { value: "50+", label: "Schools & Learning Spaces Supported", Icon: School },
  { value: "1,200+", label: "Digital Lessons Available", Icon: PlayCircle },
  { value: "12+", label: "Years of Impact", Icon: Heart },
  { value: "10+", label: "Countries Engaged", Icon: Globe },
];

const Impact = () => {
  return (
    <section className="bg-brand-blue/40 section-padding">
      <div className="container-narrow">
        <div className="text-center">
          <p className="eyebrow">LAL's Impact So Far</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-grey">
            Real Reach, Real Learners.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {stats.map(({ value, label, Icon }) => (
            <div
              key={label}
              className="bg-background rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-brand-magenta leading-tight">
                {value}
              </div>
              <div className="mt-2 text-sm font-semibold text-brand-grey leading-snug flex-1">
                {label}
              </div>
              <Icon className="mt-4 h-8 w-8 text-brand-magenta" strokeWidth={1.75} aria-hidden="true" />
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
