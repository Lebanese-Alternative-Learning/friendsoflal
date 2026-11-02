import { educationGuardian } from "@/data/educationGuardian";
import DonateBox from "@/components/sections/Donate";
import FundraisingProgress from "@/components/sections/FundraisingProgress";

const EducationGuardian = () => (
  <section id="education-guardian" aria-labelledby="guardian-heading" className="bg-brand-soft section-padding scroll-mt-20">
    <div className="container-narrow grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
      <header className="text-center lg:col-span-2">
        <h2 id="guardian-heading" className="text-4xl md:text-5xl font-extrabold leading-tight text-brand-magenta">Education Guardian Campaign</h2>
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-brand-grey">Give a child a full year of learning today.</p>
      </header>
      <div>
        <h3 className="text-3xl md:text-4xl font-extrabold leading-tight text-brand-grey">
          Every Child Has a <span className="text-brand-magenta">Right to Learn.</span>
        </h3>
        <p className="mt-5 text-base md:text-lg leading-relaxed text-brand-grey/90">
          For many children in Lebanon, that right is interrupted by conflict, displacement, financial hardship, and limited access to educational resources. Every interruption breaks their learning continuity, and every lost month is hard to catch up.
        </p>
        <h3 className="mt-8 text-2xl md:text-3xl font-extrabold leading-tight text-brand-grey">
          Tabshoura <span className="text-brand-magenta">Keeps Children Learning.</span>
        </h3>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-brand-grey/90">
          Lebanese Alternative Learning (LAL) keeps children learning through <strong className="text-brand-magenta">Tabshoura</strong>, a free digital learning platform offering complete lessons in {educationGuardian.languages.slice(0, -1).join(", ")}, and {educationGuardian.languages.at(-1)}.
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-brand-grey/90">
          It costs LAL just ${educationGuardian.annualCostPerChild} per child to keep Tabshoura running and provide a full year of free learning. Every dollar you give to FLAL is regranted to LAL to keep the Tabshoura platform running.
        </p>
        <FundraisingProgress />
      </div>
      <div className="flex flex-col gap-8">
        <aside
          aria-label="Support this project"
          className="bg-primary text-primary-foreground rounded-lg p-6 md:p-7 text-center"
        >
          <p className="text-3xl md:text-4xl font-extrabold leading-tight">
            ${educationGuardian.annualCostPerChild} = {educationGuardian.learningYears} child learning for{" "}
            {educationGuardian.learningYears} year
          </p>
          <p className="mt-4 text-sm md:text-base text-white/85">
            Your gift keeps one child learning on Tabshoura for a full school year.
          </p>
        </aside>
        <DonateBox />
      </div>
    </div>
  </section>
);

export default EducationGuardian;