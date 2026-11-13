export const educationGuardian = {
  annualCostPerChild: 20,
  learningYears: 1,
  languages: ["Arabic", "French", "English"],
  // Offline fallback: the gifts banked before automated tracking began. The
  // database seeds the same figure as its baseline row, so the live total and
  // this number agree until the backend is unreachable.
  raisedAmount: 11043,
  // Initial goal mirrors the original LAL campaign reference, pending FLAL confirmation.
  fundraisingGoal: 60000,
  campaignUrl: "https://buy.stripe.com/6oUdR82Za3TX8Rv5Ys3cc00",
};

export const fundraisingProgress = (raised: number, goal: number): number =>
  goal > 0 ? Math.min(100, Math.max(0, (raised / goal) * 100)) : 0;