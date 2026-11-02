import { useMemo, useState } from "react";
import { donate, childrenSupported } from "@/data/donate";

const chipBase =
  "min-h-12 rounded-full border-2 px-5 py-2.5 text-lg font-extrabold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

const DonateBox = () => {
  const [preset, setPreset] = useState<number | "custom">(donate.presets[0]);
  const [customAmount, setCustomAmount] = useState("");

  const amount = useMemo(() => {
    if (preset !== "custom") return preset;
    const parsed = Number.parseFloat(customAmount.replace(/[^0-9.]/g, ""));
    return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed * 100) / 100 : 0;
  }, [preset, customAmount]);

  const children = childrenSupported(amount);
  const label = amount > 0 ? `$${amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2)}` : "…";

  return (
    <aside aria-label="Choose your gift" className="bg-primary text-primary-foreground rounded-lg p-8 md:p-10 text-center">
      <p className="text-sm font-extrabold tracking-[0.18em] uppercase">Choose Your Gift</p>

      <div className="mt-5 flex flex-wrap justify-center gap-3" role="group" aria-label="Donation amount">
        {donate.presets.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setPreset(value)}
            aria-pressed={preset === value}
            className={`${chipBase} ${
              preset === value
                ? "border-background bg-background text-primary"
                : "border-white/60 text-white hover:border-background"
            }`}
          >
            ${value}
          </button>
        ))}
        <div
          className={`flex min-h-12 items-center rounded-full border-2 px-4 ${
            preset === "custom" ? "border-background bg-background/10" : "border-white/60"
          }`}
        >
          <span aria-hidden="true" className="mr-1 font-extrabold text-white">$</span>
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
            className="w-28 bg-transparent py-2.5 text-lg font-extrabold text-white placeholder:font-bold placeholder:text-white/70 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      <p className="mt-6 text-lg md:text-xl font-extrabold" aria-live="polite">
        {children > 0
          ? `You keep ${children} ${children === 1 ? "child" : "children"} learning for a full year.`
          : "Enter an amount to see your impact."}
      </p>

      <a
        href={amount > 0 ? donate.stripeCheckoutUrl : undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={amount <= 0}
        onClick={(e) => {
          if (amount <= 0) e.preventDefault();
        }}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-background px-8 py-4 text-lg font-extrabold uppercase tracking-wide text-primary shadow-md transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary aria-disabled:opacity-60"
      >
        Donate {label}
      </a>
      <p className="mt-3 text-xs text-white/80">
        Checkout opens securely on Stripe in a new tab.
      </p>
    </aside>
  );
};

export default DonateBox;
