import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useSubscription } from "@/lib/subscription-context";

const SUBSCRIPTION_TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "Forever",
    description: "Perfect for getting started",
    features: [
      "4 clinical tools",
      "Up to 5 patients",
      "Basic AI guidance",
      "Community support",
    ],
    limitations: [
      "Limited tool access",
      "No team features",
      "No priority support",
    ],
    color: "#687076",
  },
  {
    name: "Pro",
    price: "$39",
    period: "/month",
    description: "For individual practitioners",
    features: [
      "All 13 clinical tools",
      "Unlimited patients",
      "Advanced AI guidance",
      "Email support",
      "Patient export",
      "Usage analytics",
    ],
    limitations: ["No team features", "No priority support"],
    color: "#0a7ea4",
    recommended: true,
  },
  {
    name: "Clinic",
    price: "$249",
    period: "/month",
    description: "For clinics and teams",
    features: [
      "All Pro features",
      "Unlimited team members",
      "Role-based access",
      "Shared patient cases",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "API access",
    ],
    limitations: [],
    color: "#22C55E",
  },
];

export default function SubscriptionManagementScreen() {
  const router = useRouter();
  const { getFeatures, getPricing } = useSubscription();
  const [currentTier, setCurrentTier] = useState<"free" | "pro" | "clinic">("free");

  const handleUpgrade = (tier: string) => {
    if (tier.toLowerCase() === currentTier) {
      Alert.alert("Info", "You are already on this plan");
      return;
    }
    Alert.alert(
      "Upgrade",
      `Ready to upgrade to ${tier}? Payment processing coming soon.`
    );
  };

  const handleDowngrade = (tier: string) => {
    Alert.alert(
      "Downgrade",
      `Downgrade to ${tier}? Your account will be downgraded at the end of the billing period.`,
      [
        { text: "Cancel", onPress: () => {} },
        { text: "Confirm", onPress: () => {} },
      ]
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="gap-2">
              <Text className="text-2xl font-bold text-foreground">
                Subscription Plans
              </Text>
              <Text className="text-sm text-muted">
                Choose the right plan for you
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Text className="text-xl">←</Text>
            </TouchableOpacity>
          </View>

          {/* Current Plan Info */}
          <View className="bg-primary/10 border border-primary rounded-xl p-4 gap-2">
            <Text className="text-xs font-semibold text-primary">
              CURRENT PLAN
            </Text>
            <Text className="text-lg font-bold text-foreground capitalize">
              {currentTier}
            </Text>
            <Text className="text-xs text-muted">
              Renews on March 24, 2026
            </Text>
          </View>

          {/* Plans Comparison */}
          <View className="gap-4">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <View
                key={tier.name}
                className={`rounded-xl border-2 overflow-hidden ${
                  tier.recommended
                    ? "border-primary bg-primary/5"
                    : "border-border bg-surface"
                }`}
              >
                {/* Recommended Badge */}
                {tier.recommended && (
                  <View className="bg-primary px-3 py-1 items-center">
                    <Text className="text-xs font-bold text-white">
                      RECOMMENDED
                    </Text>
                  </View>
                )}

                {/* Plan Header */}
                <View className="p-4 gap-2">
                  <Text className="text-lg font-bold text-foreground">
                    {tier.name}
                  </Text>
                  <Text className="text-xs text-muted">{tier.description}</Text>
                  <View className="flex-row items-baseline gap-1 mt-2">
                    <Text className="text-3xl font-bold text-foreground">
                      {tier.price}
                    </Text>
                    <Text className="text-sm text-muted">{tier.period}</Text>
                  </View>
                </View>

                {/* Features List */}
                <View className="px-4 py-3 gap-2 border-t border-border">
                  <Text className="text-xs font-semibold text-primary">
                    INCLUDES
                  </Text>
                  {tier.features.map((feature, idx) => (
                    <View key={idx} className="flex-row gap-2 items-start">
                      <Text className="text-lg text-primary mt-0.5">✓</Text>
                      <Text className="text-sm text-foreground flex-1">
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Limitations */}
                {tier.limitations.length > 0 && (
                  <View className="px-4 py-3 gap-2 border-t border-border">
                    <Text className="text-xs font-semibold text-muted">
                      NOT INCLUDED
                    </Text>
                    {tier.limitations.map((limitation, idx) => (
                      <View key={idx} className="flex-row gap-2 items-start">
                        <Text className="text-lg text-muted mt-0.5">✕</Text>
                        <Text className="text-sm text-muted flex-1">
                          {limitation}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Action Button */}
                <View className="p-4 border-t border-border">
                  {currentTier === tier.name.toLowerCase() ? (
                    <View className="bg-border rounded-lg p-3 items-center">
                      <Text className="text-sm font-semibold text-foreground">
                        Current Plan
                      </Text>
                    </View>
                  ) : currentTier === "free" ||
                    (currentTier === "pro" && tier.name === "Clinic") ? (
                    <TouchableOpacity
                      className="bg-primary rounded-lg p-3 items-center active:opacity-80"
                      onPress={() => handleUpgrade(tier.name)}
                    >
                      <Text className="text-sm font-semibold text-white">
                        Upgrade to {tier.name}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      className="border border-primary rounded-lg p-3 items-center active:opacity-80"
                      onPress={() => handleDowngrade(tier.name)}
                    >
                      <Text className="text-sm font-semibold text-primary">
                        Downgrade to {tier.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Billing Info */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-3">
            <Text className="text-sm font-semibold text-foreground">
              Billing Information
            </Text>
            <View className="gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-xs text-muted">Next Billing Date:</Text>
                <Text className="text-sm font-semibold text-foreground">
                  March 24, 2026
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-xs text-muted">Payment Method:</Text>
                <Text className="text-sm font-semibold text-foreground">
                  Visa •••• 4242
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-xs text-muted">Auto-Renewal:</Text>
                <Text className="text-sm font-semibold text-primary">
                  Enabled
                </Text>
              </View>
            </View>
            <TouchableOpacity className="mt-2 p-2 active:opacity-80">
              <Text className="text-sm text-primary font-semibold">
                Manage Payment Method
              </Text>
            </TouchableOpacity>
          </View>

          {/* Billing History */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-3">
            <Text className="text-sm font-semibold text-foreground">
              Recent Invoices
            </Text>
            {[
              { date: "Feb 24, 2026", amount: "$39.00", status: "Paid" },
              { date: "Jan 24, 2026", amount: "$39.00", status: "Paid" },
              { date: "Dec 24, 2025", amount: "$39.00", status: "Paid" },
            ].map((invoice, idx) => (
              <View
                key={idx}
                className="flex-row justify-between items-center py-2 border-b border-border last:border-b-0"
              >
                <View className="gap-1">
                  <Text className="text-sm font-semibold text-foreground">
                    {invoice.date}
                  </Text>
                  <Text className="text-xs text-muted">{invoice.status}</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                  <Text className="text-sm font-bold text-foreground">
                    {invoice.amount}
                  </Text>
                  <TouchableOpacity className="p-1 active:opacity-80">
                    <Text className="text-primary text-sm">↓</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Help Section */}
          <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
            <Text className="text-xs font-semibold text-primary">NEED HELP?</Text>
            <Text className="text-xs text-muted leading-relaxed">
              Have questions about our plans? Contact our support team at
              support@kidmedcare.com or visit our FAQ page.
            </Text>
            <TouchableOpacity className="mt-2 p-2 active:opacity-80">
              <Text className="text-sm text-primary font-semibold">
                View FAQ →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
