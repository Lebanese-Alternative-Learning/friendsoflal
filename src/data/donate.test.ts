import { describe, expect, it } from "vitest";
import { donate, childrenSupported, checkoutUrlForAmount } from "./donate";

describe("Donate section", () => {
  it("uses the project Stripe checkout for every donate button", () => {
    expect(donate.stripeCheckoutUrl).toBe(
      "https://buy.stripe.com/6oUdR82Za3TX8Rv5Ys3cc00"
    );
  });

  it("offers the preset gift amounts", () => {
    expect(donate.presets).toEqual([20, 100, 500]);
  });

  it.each([[20, "2000"], [100, "10000"], [500, "50000"], [37.50, "3750"]])(
    "passes a $%s donation to Stripe in cents",
    (amount, cents) => {
      expect(checkoutUrlForAmount(amount)).toBe(`${donate.stripeCheckoutUrl}?prefilled_amount=${cents}`);
    }
  );

  it.each([0, -20, Number.NaN, Number.POSITIVE_INFINITY])(
    "does not create a checkout link for an invalid amount (%s)",
    (amount) => expect(checkoutUrlForAmount(amount)).toBeUndefined()
  );

  it("keeps children learning at $20 per child per year", () => {
    expect(donate.annualCostPerChild).toBe(20);
    expect(childrenSupported(20)).toBe(1);
    expect(childrenSupported(100)).toBe(5);
    expect(childrenSupported(500)).toBe(25);
    expect(childrenSupported(19)).toBe(0);
  });
});
