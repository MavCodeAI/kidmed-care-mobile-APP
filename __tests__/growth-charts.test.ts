import { describe, it, expect } from "vitest";
import {
  heightInfants,
  weightInfants,
  bmiChildren,
  interpolateGrowthData,
  calculatePercentile,
  classifyGrowthStatus,
} from "../lib/growth-data";

describe("Growth Charts - WHO/CDC Data", () => {
  describe("Height Data", () => {
    it("should have height data for boys and girls", () => {
      expect(heightInfants.boys.length).toBeGreaterThan(0);
      expect(heightInfants.girls.length).toBeGreaterThan(0);
      expect(heightInfants.boys.length).toBe(heightInfants.girls.length);
    });

    it("should have all percentiles for each age", () => {
      heightInfants.boys.forEach((point) => {
        expect(point.p3).toBeGreaterThan(0);
        expect(point.p5).toBeGreaterThan(point.p3);
        expect(point.p10).toBeGreaterThan(point.p5);
        expect(point.p25).toBeGreaterThan(point.p10);
        expect(point.p50).toBeGreaterThan(point.p25);
        expect(point.p75).toBeGreaterThan(point.p50);
        expect(point.p90).toBeGreaterThan(point.p75);
        expect(point.p95).toBeGreaterThan(point.p90);
        expect(point.p97).toBeGreaterThan(point.p95);
      });
    });

    it("should have increasing height with age", () => {
      for (let i = 0; i < heightInfants.boys.length - 1; i++) {
        expect(heightInfants.boys[i + 1].p50).toBeGreaterThan(heightInfants.boys[i].p50);
        expect(heightInfants.girls[i + 1].p50).toBeGreaterThan(heightInfants.girls[i].p50);
      }
    });

    it("should have girls slightly shorter than boys on average", () => {
      // Compare median heights at similar ages
      const boysMedian = heightInfants.boys[heightInfants.boys.length - 1].p50;
      const girlsMedian = heightInfants.girls[heightInfants.girls.length - 1].p50;
      expect(girlsMedian).toBeLessThanOrEqual(boysMedian);
    });
  });

  describe("Weight Data", () => {
    it("should have weight data for boys and girls", () => {
      expect(weightInfants.boys.length).toBeGreaterThan(0);
      expect(weightInfants.girls.length).toBeGreaterThan(0);
    });

    it("should have all percentiles for each age", () => {
      weightInfants.boys.forEach((point) => {
        expect(point.p3).toBeGreaterThan(0);
        expect(point.p50).toBeGreaterThan(point.p3);
        expect(point.p97).toBeGreaterThan(point.p50);
      });
    });

    it("should have increasing weight with age", () => {
      for (let i = 0; i < weightInfants.boys.length - 1; i++) {
        expect(weightInfants.boys[i + 1].p50).toBeGreaterThan(weightInfants.boys[i].p50);
      }
    });
  });

  describe("BMI Data", () => {
    it("should have BMI data for boys and girls", () => {
      expect(bmiChildren.boys.length).toBeGreaterThan(0);
      expect(bmiChildren.girls.length).toBeGreaterThan(0);
    });

    it("should have BMI values in reasonable range", () => {
      bmiChildren.boys.forEach((point) => {
        expect(point.p50).toBeGreaterThan(10);
        expect(point.p50).toBeLessThan(35);
      });
    });
  });

  describe("Interpolation", () => {
    it("should interpolate height data for intermediate ages", () => {
      const age12 = heightInfants.boys.find((p) => p.age === 12);
      const age18 = heightInfants.boys.find((p) => p.age === 18);

      if (age12 && age18) {
        const age15 = interpolateGrowthData(heightInfants.boys, 15);
        expect(age15).not.toBeNull();
        if (age15) {
          expect(age15.p50).toBeGreaterThan(age12.p50);
          expect(age15.p50).toBeLessThan(age18.p50);
        }
      }
    });

    it("should return null for ages outside data range", () => {
      const tooYoung = interpolateGrowthData(heightInfants.boys, -1);
      expect(tooYoung).toBeNull();

      const tooOld = interpolateGrowthData(heightInfants.boys, 500);
      expect(tooOld).toBeNull();
    });

    it("should return exact point when age matches", () => {
      const exact = interpolateGrowthData(heightInfants.boys, 12);
      const expected = heightInfants.boys.find((p) => p.age === 12);

      expect(exact).not.toBeNull();
      if (exact && expected) {
        expect(exact.p50).toBe(expected.p50);
      }
    });

    it("should interpolate smoothly between points", () => {
      const age12 = heightInfants.boys.find((p) => p.age === 12);
      const age18 = heightInfants.boys.find((p) => p.age === 18);

      if (age12 && age18) {
        const age15 = interpolateGrowthData(heightInfants.boys, 15);
        if (age15) {
          // At age 15 (halfway between 12 and 18)
          const expectedP50 = age12.p50 + (age18.p50 - age12.p50) * 0.5;
          expect(Math.abs(age15.p50 - expectedP50)).toBeLessThan(0.1);
        }
      }
    });
  });

  describe("Percentile Calculation", () => {
    it("should calculate percentile for measurement at median", () => {
      const age12 = heightInfants.boys.find((p) => p.age === 12);
      if (age12) {
        const percentile = calculatePercentile(heightInfants.boys, 12, age12.p50);
        expect(percentile).toBe(50);
      }
    });

    it("should calculate percentile for measurement at 5th percentile", () => {
      const age12 = heightInfants.boys.find((p) => p.age === 12);
      if (age12) {
        const percentile = calculatePercentile(heightInfants.boys, 12, age12.p5);
        expect(percentile).toBe(5);
      }
    });

    it("should calculate percentile for measurement at 95th percentile", () => {
      const age12 = heightInfants.boys.find((p) => p.age === 12);
      if (age12) {
        const percentile = calculatePercentile(heightInfants.boys, 12, age12.p95);
        expect(percentile).toBe(95);
      }
    });

    it("should classify low measurements as below 5th percentile", () => {
      const age12 = heightInfants.boys.find((p) => p.age === 12);
      if (age12) {
        const percentile = calculatePercentile(heightInfants.boys, 12, age12.p3 - 1);
        expect(percentile).toBe(0);
      }
    });

    it("should classify high measurements as above 97th percentile", () => {
      const age12 = heightInfants.boys.find((p) => p.age === 12);
      if (age12) {
        const percentile = calculatePercentile(heightInfants.boys, 12, age12.p97 + 5);
        expect(percentile).toBe(97);
      }
    });

    it("should calculate percentile for weight", () => {
      const age12 = weightInfants.boys.find((p) => p.age === 12);
      if (age12) {
        const percentile = calculatePercentile(weightInfants.boys, 12, age12.p50);
        expect(percentile).toBe(50);
      }
    });

    it("should calculate percentile for BMI", () => {
      const age36 = bmiChildren.boys.find((p) => p.age === 36);
      if (age36) {
        const percentile = calculatePercentile(bmiChildren.boys, 36, age36.p50);
        expect(percentile).toBe(50);
      }
    });
  });

  describe("Growth Status Classification", () => {
    it("should classify below 5th percentile as growth concern", () => {
      const status = classifyGrowthStatus(3);
      expect(status.status).toContain("Below 5th");
      expect(status.color).toBe("#EF4444");
      expect(status.description).toContain("concern");
    });

    it("should classify 5-10th percentile as low-normal", () => {
      const status = classifyGrowthStatus(7);
      expect(status.status).toContain("5-10th");
      expect(status.color).toBe("#F59E0B");
      expect(status.description).toContain("Monitor");
    });

    it("should classify 10-90th percentile as normal", () => {
      const status = classifyGrowthStatus(50);
      expect(status.status).toContain("Normal");
      expect(status.color).toBe("#22C55E");
      expect(status.description).toContain("normal");
    });

    it("should classify 90-95th percentile as high-normal", () => {
      const status = classifyGrowthStatus(92);
      expect(status.status).toContain("90-95th");
      expect(status.color).toBe("#F59E0B");
      expect(status.description).toContain("obesity");
    });

    it("should classify above 95th percentile as elevated", () => {
      const status = classifyGrowthStatus(96);
      expect(status.status).toContain("Above 95th");
      expect(status.color).toBe("#EF4444");
      expect(status.description).toContain("evaluation");
    });
  });

  describe("Gender Differences", () => {
    it("should have different data for boys and girls", () => {
      const boysHeight = heightInfants.boys[5].p50;
      const girlsHeight = heightInfants.girls[5].p50;
      expect(boysHeight).not.toBe(girlsHeight);
    });

    it("should show boys generally taller than girls", () => {
      let boysTallerCount = 0;
      for (let i = 0; i < Math.min(heightInfants.boys.length, heightInfants.girls.length); i++) {
        if (heightInfants.boys[i].p50 >= heightInfants.girls[i].p50) {
          boysTallerCount++;
        }
      }
      expect(boysTallerCount).toBeGreaterThan(0);
    });

    it("should show boys generally heavier than girls", () => {
      let boysHeavierCount = 0;
      for (let i = 0; i < Math.min(weightInfants.boys.length, weightInfants.girls.length); i++) {
        if (weightInfants.boys[i].p50 >= weightInfants.girls[i].p50) {
          boysHeavierCount++;
        }
      }
      expect(boysHeavierCount).toBeGreaterThan(0);
    });
  });

  describe("Real-world Scenarios", () => {
    it("should handle typical 12-month-old boy height", () => {
      const age12 = heightInfants.boys.find((p) => p.age === 12);
      if (age12) {
        const percentile = calculatePercentile(heightInfants.boys, 12, 74.3); // Median height
        expect(percentile).toBe(50);
      }
    });

    it("should handle typical 24-month-old girl weight", () => {
      const age24 = weightInfants.girls.find((p) => p.age === 24);
      if (age24) {
        const percentile = calculatePercentile(weightInfants.girls, 24, age24.p50);
        expect(percentile).toBe(50);
      }
    });

    it("should handle newborn measurements", () => {
      const age0 = heightInfants.boys.find((p) => p.age === 0);
      if (age0) {
        const percentile = calculatePercentile(heightInfants.boys, 0, age0.p50);
        expect(percentile).toBe(50);
      }
    });

    it("should handle 3-year-old BMI", () => {
      const age36 = bmiChildren.boys.find((p) => p.age === 36);
      if (age36) {
        const percentile = calculatePercentile(bmiChildren.boys, 36, age36.p50);
        expect(percentile).toBe(50);
      }
    });
  });

  describe("Data Consistency", () => {
    it("should have consistent age ordering", () => {
      for (let i = 0; i < heightInfants.boys.length - 1; i++) {
        expect(heightInfants.boys[i].age).toBeLessThan(heightInfants.boys[i + 1].age);
      }
    });

    it("should have consistent percentile ordering within each point", () => {
      heightInfants.boys.forEach((point) => {
        expect(point.p3).toBeLessThan(point.p5);
        expect(point.p5).toBeLessThan(point.p10);
        expect(point.p10).toBeLessThan(point.p25);
        expect(point.p25).toBeLessThan(point.p50);
        expect(point.p50).toBeLessThan(point.p75);
        expect(point.p75).toBeLessThan(point.p90);
        expect(point.p90).toBeLessThan(point.p95);
        expect(point.p95).toBeLessThan(point.p97);
      });
    });

    it("should have positive values for all measurements", () => {
      heightInfants.boys.forEach((point) => {
        expect(point.p50).toBeGreaterThan(0);
      });
      weightInfants.boys.forEach((point) => {
        expect(point.p50).toBeGreaterThan(0);
      });
      bmiChildren.boys.forEach((point) => {
        expect(point.p50).toBeGreaterThan(0);
      });
    });
  });
});
