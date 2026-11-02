type Gift = { amount: number };

const stripeCheckoutUrl = "https://buy.stripe.com/6oUdR82Za3TX8Rv5Ys3cc00";

export const donate = {
  /** Preset gift amounts shown on the amount picker. */
  presets: [20, 100, 500] as Gift["amount"][],
  /** Stripe checkout all donate buttons open in a new tab. */
  stripeCheckoutUrl,
  /** Children kept learning for a full year per dollar (education guardian rate). */
  annualCostPerChild: 20,
};

/** Children kept learning for a full year by a gift of the given amount. */
export const childrenSupported = (amount: number): number =>
  Math.floor(amount / donate.annualCostPerChild);

/** Stripe expects the prefilled donation in the link's base currency's minor units. */
export const checkoutUrlForAmount = (amount: number): string | undefined => {
  if (!Number.isFinite(amount) || amount <= 0) return undefined;
  const cents = Math.round(amount * 100);
  if (!Number.isSafeInteger(cents) || cents < 1) return undefined;
  const url = new URL(donate.stripeCheckoutUrl);
  url.searchParams.set("prefilled_amount", String(cents));
  return url.toString();
};

export default donate;
