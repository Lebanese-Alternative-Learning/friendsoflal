import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { HandHeart, Users, Megaphone, Mail, Loader2 } from "lucide-react";
import { z } from "zod";
import { useSiteData } from "@/context/SiteDataContext";
import { resolve } from "@/utils/dataLoader";

const ways = [
  { Icon: HandHeart, label: "Make a Gift" },
  { Icon: Users, label: "Partner With Us" },
  { Icon: Megaphone, label: "Start a Fundraiser" },
  { Icon: Mail, label: "Subscribe" },
];

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email address." })
  .max(255, { message: "Email must be less than 255 characters." });

const GetInvolved = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const data = useSiteData();

  const formspreeEndpoint = resolve(data, "formspree-endpoint", "").trim();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    if (!formspreeEndpoint || formspreeEndpoint.includes("YOUR_FORM_ID")) {
      toast.error("Formspree endpoint is not configured yet.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: validation.data }),
      });

      if (response.ok) {
        toast.success(
          resolve(data, "donate-subscribe-success", "Thanks! We'll be in touch."),
          {
            description: resolve(
              data,
              "donate-subscribe-success-desc",
              "You'll hear from us as soon as donations open."
            ),
          }
        );
        setEmail("");
      } else {
        const body = await response.json().catch(() => ({}));
        toast.error(body?.error || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Unable to submit. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="donate" className="bg-brand-blue/40 py-14 px-6 md:py-16 md:px-8 scroll-mt-20">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-[245px_1fr_1px_310px] gap-10 lg:gap-8 xl:gap-10 items-center">
          {/* Heading */}
          <div>
            <p className="eyebrow">{resolve(data, "get-involved-eyebrow", "Get Involved")}</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-grey leading-tight">
              {resolve(data, "get-involved-heading", "Be Part of the Change.")}
            </h2>
            <p className="mt-5 text-sm md:text-base text-brand-grey/85 leading-relaxed">
              {resolve(data, "get-involved-description", "There are many ways to support education in Lebanon.")}
            </p>
          </div>

          {/* Ways to help */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {ways.map(({ Icon, label }) => (
              <button
                key={label}
                type="button"
                className="group flex flex-col items-center text-center focus:outline-none"
              >
                <span className="h-14 w-14 rounded-full bg-brand-magenta/10 flex items-center justify-center transition-colors group-hover:bg-brand-magenta/20">
                  <Icon className="h-6 w-6 text-brand-magenta" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="mt-3 text-sm font-bold text-brand-grey leading-snug md:whitespace-nowrap">
                  {resolve(data, `get-involved-way-${label.toLowerCase().replace(/\s+/g, "-")}`, label)}
                </span>
              </button>
            ))}
          </div>

          <div aria-hidden="true" className="hidden lg:block h-36 w-px bg-brand-grey/25" />

          {/* Subscribe */}
          <div>
            <p className="text-sm text-brand-grey/85 leading-relaxed">
              {resolve(data, "subscribe-description", "Stay connected. Get updates on our work, stories from the field, and ways to get involved.")}
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
                className="rounded-full bg-brand-magenta px-7 py-3 font-bold text-primary-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 whitespace-nowrap"
              >
                {resolve(data, "subscribe-cta", "Notify Me")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
