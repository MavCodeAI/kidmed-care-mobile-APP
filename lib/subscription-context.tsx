import React, { createContext, useContext } from "react";

export type SubscriptionTier = "free" | "pro" | "clinic";

export interface SubscriptionFeatures {
  maxPatients: number;
  maxClinicalTools: number;
  aiGuidance: boolean;
  advancedAnalytics: boolean;
  teamManagement: boolean;
  customBranding: boolean;
  prioritySupport: boolean;
  apiAccess: boolean;
}

export const SUBSCRIPTION_FEATURES: Record<SubscriptionTier, SubscriptionFeatures> = {
  free: {
    maxPatients: 10,
    maxClinicalTools: 5,
    aiGuidance: false,
    advancedAnalytics: false,
    teamManagement: false,
    customBranding: false,
    prioritySupport: false,
    apiAccess: false,
  },
  pro: {
    maxPatients: 500,
    maxClinicalTools: 13,
    aiGuidance: true,
    advancedAnalytics: true,
    teamManagement: false,
    customBranding: false,
    prioritySupport: true,
    apiAccess: false,
  },
  clinic: {
    maxPatients: -1, // unlimited
    maxClinicalTools: 13,
    aiGuidance: true,
    advancedAnalytics: true,
    teamManagement: true,
    customBranding: true,
    prioritySupport: true,
    apiAccess: true,
  },
};

export const SUBSCRIPTION_PRICING: Record<SubscriptionTier, { price: number; currency: string; billingPeriod: string }> = {
  free: {
    price: 0,
    currency: "USD",
    billingPeriod: "forever",
  },
  pro: {
    price: 39,
    currency: "USD",
    billingPeriod: "month",
  },
  clinic: {
    price: 249,
    currency: "USD",
    billingPeriod: "month",
  },
};

interface SubscriptionContextType {
  getFeatures: (tier: SubscriptionTier) => SubscriptionFeatures;
  hasFeature: (tier: SubscriptionTier, feature: keyof SubscriptionFeatures) => boolean;
  getPricing: (tier: SubscriptionTier) => typeof SUBSCRIPTION_PRICING[SubscriptionTier];
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const getFeatures = (tier: SubscriptionTier) => SUBSCRIPTION_FEATURES[tier];

  const hasFeature = (tier: SubscriptionTier, feature: keyof SubscriptionFeatures) => {
    return SUBSCRIPTION_FEATURES[tier][feature] as boolean;
  };

  const getPricing = (tier: SubscriptionTier) => SUBSCRIPTION_PRICING[tier];

  return (
    <SubscriptionContext.Provider
      value={{
        getFeatures,
        hasFeature,
        getPricing,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
