import { RefreshCw, TrendingUp, UserCheck, Sprout } from "lucide-react";
import boyTablet from "@/assets/boy-tablet.jpg";

const items = [
  {
    Icon: RefreshCw,
    title: "Ensure Continuity",
    body: "Keep education going without interruption.",
  },
  {
    Icon: TrendingUp,
    title: "Close Learning Gaps",
    body: "Help children catch up and keep up.",
  },
  {
    Icon: UserCheck,
    title: "Reach Out-of-School Children",
    body: "Bring education to children who are left behind.",
  },
  {
    Icon: Sprout,
    title: "Empower Communities",
    body: "Strengthen communities through education.",
  },
];

const WhyDonate = () => {
  return (
    <section id="why-donate" className="bg-brand-soft/60 py-14 px-6 md:py-16 md:px-8 scroll-mt-20">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-md lg:h-[250px]">
            <img
              src={boyTablet}
              alt="A Lebanese student learning on a tablet"
              width={1024}
              height={768}
              loading="lazy"
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>

          <div>
            <p className="eyebrow">Why Donate</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-grey leading-tight">
              Your Support Keeps Education Going.
            </h2>
            <p className="mt-3 max-w-3xl text-sm md:text-base text-brand-grey/85 leading-relaxed">
              Your donation helps children in Lebanon access quality education,
              recover lost learning, and build a brighter future.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
              {items.map(({ Icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <div className="shrink-0 h-12 w-12 rounded-full bg-brand-magenta/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-brand-magenta" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-brand-grey leading-snug">
                      {title}
                    </h3>
                    <p className="mt-2 text-xs text-brand-grey/80 leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center lg:pr-36">
              <a
                href="#donate"
                className="inline-flex items-center justify-center rounded-full bg-brand-magenta px-8 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2"
              >
                Donate Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDonate;
