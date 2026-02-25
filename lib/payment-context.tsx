import React, { createContext, useContext, useState } from "react";
import { stripeMock, PaymentIntent, Charge } from "./stripe-mock";
import { supabaseMock } from "./supabase-mock";

interface PaymentContextType {
  isProcessing: boolean;
  error: string | null;
  createPaymentIntent: (amount: number) => Promise<PaymentIntent | null>;
  processPayment: (
    amount: number,
    description: string,
    email: string
  ) => Promise<{ success: boolean; chargeId?: string; error?: string }>;
  getChargeHistory: () => Promise<Charge[]>;
  upgradeSubscription: (
    userId: string,
    tier: "pro" | "clinic",
    email: string
  ) => Promise<{ success: boolean; subscriptionId?: string; error?: string }>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentIntent = async (amount: number): Promise<PaymentIntent | null> => {
    try {
      setIsProcessing(true);
      setError(null);
      const intent = await stripeMock.createPaymentIntent(amount);
      return intent;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create payment intent";
      setError(message);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const processPayment = async (
    amount: number,
    description: string,
    email: string
  ): Promise<{ success: boolean; chargeId?: string; error?: string }> => {
    try {
      setIsProcessing(true);
      setError(null);

      const charge = await stripeMock.createCharge(
        amount,
        "usd",
        description,
        email
      );

      if (charge.status === "succeeded") {
        return {
          success: true,
          chargeId: charge.id,
        };
      } else {
        const errorMsg = "Payment processing failed";
        setError(errorMsg);
        return {
          success: false,
          error: errorMsg,
        };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Payment failed";
      setError(message);
      return {
        success: false,
        error: message,
      };
    } finally {
      setIsProcessing(false);
    }
  };

  const getChargeHistory = async (): Promise<Charge[]> => {
    try {
      return await stripeMock.listCharges(20);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch charge history");
      return [];
    }
  };

  const upgradeSubscription = async (
    userId: string,
    tier: "pro" | "clinic",
    email: string
  ): Promise<{ success: boolean; subscriptionId?: string; error?: string }> => {
    try {
      setIsProcessing(true);
      setError(null);

      // Get pricing for tier
      const pricing = {
        pro: 3900, // $39.00
        clinic: 24900, // $249.00
      };

      const amount = pricing[tier];

      // Create payment
      const charge = await stripeMock.createCharge(
        amount,
        "usd",
        `${tier.toUpperCase()} Subscription`,
        email
      );

      if (charge.status === "succeeded") {
        // Create subscription in database
        const subscription = await supabaseMock.createSubscription({
          userId,
          tier,
          status: "active",
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });

        // Log action
        await supabaseMock.logAction(
          userId,
          "SUBSCRIPTION_UPGRADE",
          "subscription",
          { tier, chargeId: charge.id, amount }
        );

        return {
          success: true,
          subscriptionId: subscription.id,
        };
      } else {
        const errorMsg = "Payment failed";
        setError(errorMsg);
        return {
          success: false,
          error: errorMsg,
        };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upgrade failed";
      setError(message);
      return {
        success: false,
        error: message,
      };
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        isProcessing,
        error,
        createPaymentIntent,
        processPayment,
        getChargeHistory,
        upgradeSubscription,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment(): PaymentContextType {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
}
