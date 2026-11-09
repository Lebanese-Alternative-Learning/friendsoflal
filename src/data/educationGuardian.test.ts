import { describe, expect, it } from "vitest";
import { educationGuardian, fundraisingProgress } from "./educationGuardian";

describe("Education Guardian campaign", () => {
  it("provides one year of learning for $20 per child", () => {
    expect(educationGuardian.annualCostPerChild).toBe(20);
    expect(educationGuardian.learningYears).toBe(1);
  });

  it("shows the confirmed $1,000 raised", () => {
    expect(educationGuardian.raisedAmount).toBe(1000);
    expect(fundraisingProgress(educationGuardian.raisedAmount, educationGuardian.fundraisingGoal)).toBeCloseTo(1000 / 60000 * 100, 6);
  });

  it("calculates progress and caps it at the goal", () => {
    expect(fundraisingProgress(30000, 60000)).toBe(50);
    expect(fundraisingProgress(70000, 60000)).toBe(100);
    expect(fundraisingProgress(0, 0)).toBe(0);
  });
});