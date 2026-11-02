import { educationGuardian } from "@/data/educationGuardian";

const EducationGuardian = () => (
  <section id="education-guardian" aria-labelledby="guardian-heading" className="bg-brand-soft section-padding scroll-mt-20">
    <div className="container-narrow grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
      <div>
        <p className="eyebrow">Education Guardian</p>
        <h2 id="guardian-heading" className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight text-brand-grey">
          Every Child Has a <span className="text-brand-magenta">Right to Learn.</span>
        </h2>
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
          It costs LAL just ${educationGuardian.annualCostPerChild} per child to keep Tabshoura running and provide a full year of free learning.
        </p>
      </div>
      <aside
        aria-label="Support this project"
        className="bg-primary text-primary-foreground rounded-lg p-8 md:p-10 text-center"
      >
        <p className="text-3xl md:text-4xl font-extrabold leading-tight">
          ${educationGuardian.annualCostPerChild} = {educationGuardian.learningYears} child learning for{" "}
          {educationGuardian.learningYears} year
        </p>
        <p className="mt-4 text-sm md:text-base text-white/85">
          Your gift keeps one child learning on Tabshoura for a full school year.
        </p>
        <a
          href={educationGuardian.campaignUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-background px-8 py-4 text-lg font-extrabold uppercase tracking-wide text-primary shadow-md transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          Support This Project
        </a>
        <p className="mt-3 text-xs text-white/80">Checkout opens securely on Stripe in a new tab.</p>
      </aside>
    </div>
  </section>
);

export default EducationGuardian;