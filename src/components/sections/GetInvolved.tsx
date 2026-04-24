import { useState, FormEvent } from "react";
import { toast } from "sonner";

const GetInvolved = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks! We'll be in touch.", {
      description: "You'll hear from us as soon as donations open.",
    });
    setEmail("");
  };

  return (
    <section id="donate" className="bg-brand-soft section-padding scroll-mt-20">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow">Get Involved</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-grey leading-tight">
            Be Part of the Change.
          </h2>
          <p className="mt-6 text-base md:text-lg text-brand-grey/85 leading-relaxed">
            FLAL is growing. Stay tuned to learn more about our upcoming
            fundraising initiatives and how you can make a difference.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-full bg-background border border-border px-5 py-3 text-brand-grey placeholder:text-brand-grey/50 focus:outline-none focus:ring-2 focus:ring-brand-magenta focus:border-transparent"
            />
            <button
              type="submit"
              className="rounded-full bg-brand-magenta px-6 py-3 font-bold text-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2"
            >
              Notify Me
            </button>
          </form>

          <p className="mt-6 text-sm text-brand-grey/60">
            [Donation options coming soon]
          </p>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
