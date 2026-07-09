import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Are donations to FLAL tax-deductible?",
    a: "Yes. Friends of Lebanese Alternative Learning is a registered U.S. 501(c)(3) nonprofit (EIN 99-3511136). Donations from U.S. taxpayers are tax-deductible to the fullest extent allowed by law. You'll receive a receipt for your records.",
  },
  {
    q: "Where do my donations actually go?",
    a: "Donations fund LAL's programs on the ground in Lebanon — offline learning technology, free K–12 digital curriculum, teacher training, and community Learning Spaces. FLAL keeps operating costs lean so the maximum share of every dollar reaches children in the classroom.",
  },
  {
    q: "Why give through FLAL instead of directly to LAL?",
    a: "FLAL exists so U.S. donors can support LAL's work with the confidence, compliance, and tax benefits of an American nonprofit. We handle U.S. reporting, donor stewardship, and grant partnerships, and pass funds through to LAL — so you get a tax-deductible receipt and LAL gets the resources it needs.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="bg-background section-padding scroll-mt-20">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-grey leading-tight">
            Questions, Answered.
          </h2>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-base md:text-lg font-bold text-brand-grey hover:text-brand-magenta hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-brand-grey/85 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
