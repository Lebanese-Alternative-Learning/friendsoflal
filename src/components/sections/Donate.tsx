import { useMemo, useState, FormEvent } from "react";
import { Check } from "lucide-react";
import { donate, childrenSupported } from "@/data/donate";
import { useSiteData } from "@/context/SiteDataContext";
import { resolve } from "@/utils/dataLoader";

const titles = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prefer not to say"];

const inputClass =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-sm md:text-base text-brand-grey placeholder:text-brand-grey/50 focus:outline-none focus:ring-2 focus:ring-brand-magenta focus:border-transparent disabled:opacity-60";

const Donate = () => {
  const data = useSiteData();
  const [preset, setPreset] = useState<number | "custom">(donate.presets[0]);
  const [customAmount, setCustomAmount] = useState("");
  const [updates, setUpdates] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const formspreeEndpoint = resolve(data, "formspree-endpoint", "").trim();

  const amount = useMemo(() => {
    if (preset !== "custom") return preset;
    const parsed = Number.parseFloat(customAmount.replace(/[^0-9.]/g, ""));
    return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed * 100) / 100 : 0;
  }, [preset, customAmount]);

  const children = childrenSupported(amount);
  const label = amount > 0 ? `$${amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2)}` : "your amount";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (amount <= 0) {
      e.preventDefault();
      return;
    }
    // Send the donor's details to the notification inbox, then the anchor's
    // default action opens the Stripe checkout in a new tab.
    const form = e.currentTarget;
    const details = new FormData(form);
    if (formspreeEndpoint && !formspreeEndpoint.includes("YOUR_FORM_ID")) {
      const payload: Record<string, unknown> = {
        _subject: `Donation intent — ${label}`,
        amount,
        "updates opt-in": updates ? "yes" : "no",
      };
      details.forEach((value, key) => {
        if (typeof value === "string" && value.trim()) payload[key] = value.trim();
      });
      try {
        fetch(formspreeEndpoint, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => undefined);
      } catch {
        /* the Stripe checkout must not be blocked by a notification failure */
      }
    }
    setSubmitted(true);
    // Also cover keyboard submits (Enter) — the anchor click opens Stripe for pointer users.
    window.open(donate.stripeCheckoutUrl, "_blank", "noopener");
  };

  return (
    <section id="donate" aria-labelledby="donate-heading" className="bg-background section-padding scroll-mt-20">
      <div className="container-narrow max-w-4xl">
        <p className="eyebrow">{resolve(data, "donate-eyebrow", "Support Education in Lebanon")}</p>
        <h2 id="donate-heading" className="mt-3 text-3xl md:text-4xl font-extrabold text-brand-grey">
          {resolve(data, "donate-title", "Choose Your Gift.")}
        </h2>

        {/* Step 1 — amount */}
        <div className="mt-8 flex items-center gap-3">
          <span aria-hidden="true" className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-magenta text-sm font-extrabold text-white">
            1
          </span>
          <h3 className="text-sm md:text-base font-extrabold tracking-[0.14em] uppercase text-brand-grey">
            {resolve(data, "donate-step1", "Choose Your Gift")}
          </h3>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4" role="group" aria-label="Donation amount">
          {donate.presets.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setPreset(value)}
              aria-pressed={preset === value}
              className={`min-h-16 rounded-md border-2 px-4 py-4 text-2xl md:text-3xl font-extrabold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 ${
                preset === value
                  ? "border-brand-magenta bg-brand-magenta text-white"
                  : "border-brand-grey/70 bg-background text-brand-grey hover:border-brand-magenta"
              }`}
            >
              ${value}
            </button>
          ))}
          <div
            className={`flex min-h-16 items-center rounded-md border-2 px-3 transition-colors ${
              preset === "custom" ? "border-brand-magenta" : "border-brand-grey/70"
            }`}
          >
            <span aria-hidden="true" className="mr-1 text-xl font-extrabold text-brand-grey">$</span>
            <label htmlFor="custom-amount" className="sr-only">
              Your custom amount in dollars
            </label>
            <input
              id="custom-amount"
              type="number"
              min={1}
              step="1"
              inputMode="decimal"
              placeholder="Your amount"
              value={customAmount}
              onFocus={() => setPreset("custom")}
              onChange={(e) => {
                setPreset("custom");
                setCustomAmount(e.target.value);
              }}
              className="w-full bg-transparent py-4 text-xl md:text-2xl font-extrabold text-brand-grey placeholder:font-bold placeholder:text-brand-grey/45 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* Impact callout */}
        <div className="mt-6 rounded-md bg-brand-magenta/10 border-l-4 border-brand-magenta px-6 py-6">
          <p className="text-lg md:text-xl font-extrabold text-brand-magenta" aria-live="polite">
            {children > 0 ? (
              <>
                You keep <span className="text-2xl md:text-3xl">{children}</span> {children === 1 ? "child" : "children"} learning for a full year.
              </>
            ) : (
              <>Choose an amount to see your impact.</>
            )}
          </p>
          {children > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2" aria-hidden="true">
              {Array.from({ length: Math.min(children, 10) }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="h-6 w-6 fill-brand-magenta">
                  <circle cx="12" cy="6.5" r="3.5" />
                  <path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2z" />
                </svg>
              ))}
              {children > 10 && <span className="text-sm font-extrabold text-brand-magenta">+{children - 10}</span>}
            </div>
          )}
        </div>

        {/* Step 2 — details */}
        <form onSubmit={handleSubmit} className="mt-12">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-magenta text-sm font-extrabold text-white">
              2
            </span>
            <h3 className="text-sm md:text-base font-extrabold tracking-[0.14em] uppercase text-brand-grey">
              {resolve(data, "donate-step2", "Your Details")}
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="donate-title" className="sr-only">Title</label>
              <select id="donate-title" name="title" className={inputClass} defaultValue={titles[0]}>
                {titles.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="donate-first-name" className="sr-only">First name</label>
              <input id="donate-first-name" name="first name" type="text" autoComplete="given-name" placeholder="First name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="donate-last-name" className="sr-only">Last name</label>
              <input id="donate-last-name" name="last name" type="text" autoComplete="family-name" placeholder="Last name" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="donate-address" className="sr-only">Address</label>
              <input id="donate-address" name="address" type="text" autoComplete="street-address" placeholder="Address" className={inputClass} />
            </div>
            <div>
              <label htmlFor="donate-city" className="sr-only">City</label>
              <input id="donate-city" name="city" type="text" autoComplete="address-level2" placeholder="City" className={inputClass} />
            </div>
            <div>
              <label htmlFor="donate-country" className="sr-only">Country</label>
              <input id="donate-country" name="country" type="text" autoComplete="country-name" placeholder="Country" className={inputClass} />
            </div>
            <div>
              <label htmlFor="donate-phone" className="sr-only">Phone</label>
              <input id="donate-phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone" className={inputClass} />
            </div>
            <div>
              <label htmlFor="donate-email" className="sr-only">Email</label>
              <input id="donate-email" name="email" type="email" autoComplete="email" placeholder="Email" className={inputClass} />
            </div>
          </div>

          <label htmlFor="donate-updates" className="mt-5 flex items-center gap-3 text-sm md:text-base text-brand-grey">
            <input
              id="donate-updates"
              type="checkbox"
              checked={updates}
              onChange={(e) => setUpdates(e.target.checked)}
              className="h-5 w-5 rounded border-brand-grey/60 accent-[hsl(var(--brand-magenta))] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta"
            />
            {resolve(data, "donate-updates-label", "Send me updates related to this project")}
          </label>

          <a
            href={amount > 0 ? donate.stripeCheckoutUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={amount <= 0}
            onClick={(e) => {
              if (amount <= 0) e.preventDefault();
            }}
            className="mt-8 flex w-full items-center justify-center rounded-md bg-brand-magenta px-8 py-5 text-xl md:text-2xl font-extrabold uppercase tracking-wide text-white shadow-md transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 aria-disabled:opacity-50"
          >
            Donate {label}
            {submitted && <Check className="ml-3 h-5 w-5" aria-hidden="true" />}
          </a>
          <p className="mt-3 text-center text-xs text-brand-grey/70">
            {resolve(data, "donate-note", "Checkout opens securely on Stripe in a new tab.")}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Donate;
