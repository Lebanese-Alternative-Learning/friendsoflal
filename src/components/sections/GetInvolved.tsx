import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { HandHeart, Users, Megaphone, Mail } from "lucide-react";

const ways = [
  { Icon: HandHeart, label: "Make a Gift" },
  { Icon: Users, label: "Partner With Us" },
  { Icon: Megaphone, label: "Start a Fundraiser" },
  { Icon: Mail, label: "Subscribe" },
];

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
    <section id="donate" className="bg-brand-soft/30 section-padding scroll-mt-20">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Heading */}
          <div className="lg:col-span-3">
            <p className="eyebrow">Get Involved</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-grey leading-tight">
              Be Part of the Change.
            </h2>
            <p className="mt-5 text-sm md:text-base text-brand-grey/85 leading-relaxed">
              There are many ways to support education in Lebanon.
            </p>
          </div>

          {/* Ways to help */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {ways.map(({ Icon, label }) => (
              <button
                key={label}
                type="button"
                className="group flex flex-col items-center text-center focus:outline-none"
              >
                <span className="h-14 w-14 rounded-full bg-brand-magenta/10 flex items-center justify-center transition-colors group-hover:bg-brand-magenta/20">
                  <Icon className="h-6 w-6 text-brand-magenta" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="mt-3 text-sm font-bold text-brand-grey leading-snug">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Subscribe */}
          <div className="lg:col-span-4 lg:border-l lg:border-brand-grey/20 lg:pl-8">
            <p className="text-sm text-brand-grey/85 leading-relaxed">
              Stay connected. Get updates on our work, stories from the field, and ways to get involved.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-5 flex flex-col sm:flex-row gap-3"
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
                placeholder="Your email address"
                className="flex-1 rounded-full bg-background border border-border px-5 py-3 text-brand-grey placeholder:text-brand-grey/50 focus:outline-none focus:ring-2 focus:ring-brand-magenta focus:border-transparent"
              />
              <button
                type="submit"
                className="rounded-full bg-brand-magenta px-6 py-3 font-bold text-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2"
              >
                Notify Me
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
