import { describe, expect, it } from "vitest";
import { educationGuardian } from "./educationGuardian";

describe("Education Guardian campaign", () => {
  it("provides one year of learning for $20 per child", () => {
    expect(educationGuardian.annualCostPerChild).toBe(20);
    expect(educationGuardian.learningYears).toBe(1);
  });
});