import { describe, it, expect, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SUBSCRIPTION_FEATURES, SUBSCRIPTION_PRICING } from "@/lib/subscription-context";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage");

describe("Authentication and Subscription", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Subscription Features", () => {
    it("should have correct free tier features", () => {
      const freeFeatures = SUBSCRIPTION_FEATURES.free;
      expect(freeFeatures.maxPatients).toBe(10);
      expect(freeFeatures.maxClinicalTools).toBe(5);
      expect(freeFeatures.aiGuidance).toBe(false);
      expect(freeFeatures.advancedAnalytics).toBe(false);
      expect(freeFeatures.teamManagement).toBe(false);
    });

    it("should have correct pro tier features", () => {
      const proFeatures = SUBSCRIPTION_FEATURES.pro;
      expect(proFeatures.maxPatients).toBe(500);
      expect(proFeatures.maxClinicalTools).toBe(13);
      expect(proFeatures.aiGuidance).toBe(true);
      expect(proFeatures.advancedAnalytics).toBe(true);
      expect(proFeatures.teamManagement).toBe(false);
      expect(proFeatures.prioritySupport).toBe(true);
    });

    it("should have correct clinic tier features", () => {
      const clinicFeatures = SUBSCRIPTION_FEATURES.clinic;
      expect(clinicFeatures.maxPatients).toBe(-1); // unlimited
      expect(clinicFeatures.maxClinicalTools).toBe(13);
      expect(clinicFeatures.aiGuidance).toBe(true);
      expect(clinicFeatures.advancedAnalytics).toBe(true);
      expect(clinicFeatures.teamManagement).toBe(true);
      expect(clinicFeatures.customBranding).toBe(true);
      expect(clinicFeatures.apiAccess).toBe(true);
    });
  });

  describe("Subscription Pricing", () => {
    it("should have correct free tier pricing", () => {
      const freePricing = SUBSCRIPTION_PRICING.free;
      expect(freePricing.price).toBe(0);
      expect(freePricing.currency).toBe("USD");
      expect(freePricing.billingPeriod).toBe("forever");
    });

    it("should have correct pro tier pricing", () => {
      const proPricing = SUBSCRIPTION_PRICING.pro;
      expect(proPricing.price).toBe(39);
      expect(proPricing.currency).toBe("USD");
      expect(proPricing.billingPeriod).toBe("month");
    });

    it("should have correct clinic tier pricing", () => {
      const clinicPricing = SUBSCRIPTION_PRICING.clinic;
      expect(clinicPricing.price).toBe(249);
      expect(clinicPricing.currency).toBe("USD");
      expect(clinicPricing.billingPeriod).toBe("month");
    });
  });

  describe("Feature Access Logic", () => {
    it("free tier should not have AI guidance", () => {
      const freeFeatures = SUBSCRIPTION_FEATURES.free;
      expect(freeFeatures.aiGuidance).toBe(false);
    });

    it("pro tier should have AI guidance", () => {
      const proFeatures = SUBSCRIPTION_FEATURES.pro;
      expect(proFeatures.aiGuidance).toBe(true);
    });

    it("clinic tier should have all features", () => {
      const clinicFeatures = SUBSCRIPTION_FEATURES.clinic;
      expect(clinicFeatures.aiGuidance).toBe(true);
      expect(clinicFeatures.advancedAnalytics).toBe(true);
      expect(clinicFeatures.teamManagement).toBe(true);
      expect(clinicFeatures.customBranding).toBe(true);
      expect(clinicFeatures.prioritySupport).toBe(true);
      expect(clinicFeatures.apiAccess).toBe(true);
    });

    it("free tier should have limited patient capacity", () => {
      const freeFeatures = SUBSCRIPTION_FEATURES.free;
      expect(freeFeatures.maxPatients).toBeLessThan(SUBSCRIPTION_FEATURES.pro.maxPatients);
    });

    it("clinic tier should have unlimited patients", () => {
      const clinicFeatures = SUBSCRIPTION_FEATURES.clinic;
      expect(clinicFeatures.maxPatients).toBe(-1);
    });
  });

  describe("Clinical Tools Access", () => {
    it("free tier should have limited clinical tools", () => {
      const freeFeatures = SUBSCRIPTION_FEATURES.free;
      expect(freeFeatures.maxClinicalTools).toBe(5);
    });

    it("pro and clinic tiers should have all clinical tools", () => {
      const proFeatures = SUBSCRIPTION_FEATURES.pro;
      const clinicFeatures = SUBSCRIPTION_FEATURES.clinic;
      expect(proFeatures.maxClinicalTools).toBe(13);
      expect(clinicFeatures.maxClinicalTools).toBe(13);
    });
  });
});
