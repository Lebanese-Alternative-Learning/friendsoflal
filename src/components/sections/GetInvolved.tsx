import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useSiteData } from "@/context/SiteDataContext";
import { resolve } from "@/utils/dataLoader";

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
    <section id="get-involved" className="bg-brand-blue/40 py-14 px-6 md:py-16 md:px-8 scroll-mt-20">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Heading */}
          <div>
            <p className="eyebrow">{resolve(data, "get-involved-eyebrow", "Get Involved")}</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-grey leading-tight">
              {resolve(data, "get-involved-heading", "Be Part of the Change.")}
            </h2>
          </div>

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
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 rounded-full bg-background border border-border px-5 py-3 text-brand-grey placeholder:text-brand-grey/50 focus:outline-none focus:ring-2 focus:ring-brand-magenta focus:border-transparent disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-brand-magenta px-7 py-3 font-bold text-primary-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 inline-flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : (
                  resolve(data, "subscribe-cta", "Notify Me")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
