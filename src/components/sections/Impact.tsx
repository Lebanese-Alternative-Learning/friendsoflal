import { Users, GraduationCap, School, PlayCircle, Heart, Globe } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { resolve } from "@/utils/dataLoader";

const defaultStats = [
  { value: "68,000+", label: "Learners Reached", Icon: Users },
  { value: "3,000+", label: "Educators Trained", Icon: GraduationCap },
  { value: "50+", label: "Schools & Learning Spaces Supported", Icon: School },
  { value: "1,200+", label: "Digital Lessons Available", Icon: PlayCircle },
  { value: "12+", label: "Years of Impact", Icon: Heart },
  { value: "10+", label: "Countries Engaged", Icon: Globe },
];

const Impact = () => {
  const data = useSiteData();

  return (
    <section id="impact" className="bg-brand-blue/40 py-14 px-6 md:py-16 md:px-8 scroll-mt-20">
      <div className="container-narrow">
        <div className="text-center">
          <p className="eyebrow">{resolve(data, "impact-eyebrow", "LAL's Impact So Far")}</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-grey">
            {resolve(data, "impact-heading", "Real Reach, Real Learners.")}
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {defaultStats.map((stat, i) => (
            <div
              key={stat.label}
              className="min-h-[150px] rounded-2xl bg-background p-4 md:p-5 shadow-sm transition-shadow hover:shadow-md flex flex-col items-center text-center"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-brand-magenta leading-tight">
                {resolve(data, `impact-stat-${i+1}-value`, stat.value)}
              </div>
              <div className="mt-2 min-h-[34px] text-xs md:text-sm font-extrabold text-brand-grey leading-snug">
                {resolve(data, `impact-stat-${i+1}-label`, stat.label)}
              </div>
              <stat.Icon className="mt-auto h-9 w-9 text-brand-magenta" strokeWidth={1.65} aria-hidden="true" />
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-brand-grey/80">
          {resolve(data, "impact-footer", "All programs funded through donor support.")}
        </p>
      </div>
    </section>
  );
};

export default Impact;
