import { describe, expect, it } from "vitest";
import { educationGuardian, fundraisingProgress } from "./educationGuardian";

describe("Education Guardian campaign", () => {
  it("provides one year of learning for $20 per child", () => {
    expect(educationGuardian.annualCostPerChild).toBe(20);
    expect(educationGuardian.learningYears).toBe(1);
  });

  it("starts with the confirmed $0 raised", () => {
    expect(educationGuardian.raisedAmount).toBe(0);
    expect(fundraisingProgress(educationGuardian.raisedAmount, educationGuardian.fundraisingGoal)).toBe(0);
  });

  it("calculates progress and caps it at the goal", () => {
    expect(fundraisingProgress(30000, 60000)).toBe(50);
    expect(fundraisingProgress(70000, 60000)).toBe(100);
    expect(fundraisingProgress(0, 0)).toBe(0);
  });
});