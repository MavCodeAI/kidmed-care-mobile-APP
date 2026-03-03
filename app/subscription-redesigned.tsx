import { ScrollView, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { PremiumCard } from "@/components/premium-card";
import { PremiumButton } from "@/components/premium-button";
import { LucideIcon } from "@/components/lucide-icon";
import { useColors } from "@/hooks/use-colors";

const SUBSCRIPTION_PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "Forever",
    description: "Perfect for getting started",
    features: [
      "4 clinical tools",
      "Up to 5 patients",
      "Basic AI guidance",
      "Community support",
      "Email support",
    ],
    limitations: ["Limited tool access", "No team features", "No priority support"],
    color: "#687076",
    recommended: false,
  },
  {
    id: "pro",
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
      "Priority support",
    ],
    limitations: ["No team features"],
    color: "#00ff00",
    recommended: true,
  },
  {
    id: "clinic",
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
    recommended: false,
  },
];

export default function SubscriptionRedesignedScreen() {
  const router = useRouter();
  const colors = useColors();
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const currentPlan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlan);

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-8">
          {/* Header */}
          <View className="gap-2">
            <Pressable onPress={() => router.back()} className="flex-row items-center gap-2 mb-2">
              <LucideIcon name="chevron-left" size={24} color={colors.foreground} />
              <Text className="text-lg font-semibold text-foreground">Back</Text>
            </Pressable>
            <Text className="text-3xl font-bold text-foreground">Choose Your Plan</Text>
            <Text className="text-base text-muted">
              Upgrade anytime to unlock advanced features
            </Text>
          </View>

          {/* Billing Cycle Toggle */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-muted uppercase">Billing Cycle</Text>
            <View className="flex-row gap-2">
              {(["monthly", "annual"] as const).map((cycle) => (
                <Pressable
                  key={cycle}
                  onPress={() => setBillingCycle(cycle)}
                  style={({ pressed }) => [
                    {
                      flex: 1,
                      opacity: pressed ? 0.8 : 1,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 12,
                      backgroundColor:
                        billingCycle === cycle ? colors.primary : colors.surface,
                      borderWidth: 1,
                      borderColor:
                        billingCycle === cycle ? colors.primary : colors.border,
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    className={`text-sm font-semibold capitalize ${
                      billingCycle === cycle ? "text-background" : "text-foreground"
                    }`}
                  >
                    {cycle}
                  </Text>
                  {cycle === "annual" && (
                    <Text
                      className={`text-xs mt-1 ${
                        billingCycle === cycle ? "text-background" : "text-primary"
                      }`}
                    >
                      Save 20%
                    </Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Plans Grid */}
          <View className="gap-4">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <Pressable
                key={plan.id}
                onPress={() => setSelectedPlan(plan.id)}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
              >
                <PremiumCard
                  glassmorphism
                  elevated={selectedPlan === plan.id}
                  className={`p-6 gap-4 ${
                    selectedPlan === plan.id ? "border-2" : ""
                  }`}
                  style={{
                    borderColor:
                      selectedPlan === plan.id ? colors.primary : undefined,
                  }}
                >
                  {/* Recommended Badge */}
                  {plan.recommended && (
                    <View
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 20,
                        backgroundColor: `${colors.primary}30`,
                        alignSelf: "flex-start",
                      }}
                    >
                      <Text
                        className="text-xs font-bold uppercase"
                        style={{ color: colors.primary }}
                      >
                        Most Popular
                      </Text>
                    </View>
                  )}

                  {/* Plan Header */}
                  <View className="gap-1">
                    <Text className="text-2xl font-bold text-foreground">{plan.name}</Text>
                    <Text className="text-sm text-muted">{plan.description}</Text>
                  </View>

                  {/* Price */}
                  <View className="gap-1">
                    <View className="flex-row items-baseline gap-1">
                      <Text className="text-4xl font-bold text-primary">{plan.price}</Text>
                      <Text className="text-base text-muted">{plan.period}</Text>
                    </View>
                    {plan.id === "pro" && billingCycle === "annual" && (
                      <Text className="text-sm text-primary font-semibold">
                        $374.40/year (Save $124.80)
                      </Text>
                    )}
                    {plan.id === "clinic" && billingCycle === "annual" && (
                      <Text className="text-sm text-primary font-semibold">
                        $2,988/year (Save $996)
                      </Text>
                    )}
                  </View>

                  {/* Features */}
                  <View className="gap-3 border-t border-opacity-20 pt-4" style={{ borderTopColor: colors.border }}>
                    {plan.features.map((feature, idx) => (
                      <View key={idx} className="flex-row items-center gap-2">
                        <LucideIcon
                          name="check"
                          size={16}
                          color={colors.primary}
                        />
                        <Text className="text-sm text-foreground flex-1">{feature}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <View className="gap-2">
                      {plan.limitations.map((limitation, idx) => (
                        <View key={idx} className="flex-row items-center gap-2">
                          <LucideIcon
                            name="x"
                            size={16}
                            color={colors.muted}
                          />
                          <Text className="text-sm text-muted flex-1">{limitation}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Action Button */}
                  <PremiumButton
                    label={
                      plan.id === "free"
                        ? "Current Plan"
                        : selectedPlan === plan.id
                          ? "Selected"
                          : "Choose Plan"
                    }
                    variant={selectedPlan === plan.id ? "primary" : "outline"}
                    size="md"
                    disabled={plan.id === "free"}
                    onPress={() => {
                      if (plan.id !== "free") {
                        router.push("/manual-payment");
                      }
                    }}
                  />
                </PremiumCard>
              </Pressable>
            ))}
          </View>

          {/* FAQ Section */}
          <View className="gap-4 mt-4">
            <Text className="text-lg font-bold text-foreground">Frequently Asked Questions</Text>

            {[
              {
                q: "Can I change my plan anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept bank transfers, credit cards, and mobile payments via WhatsApp.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes, all features are available on the Free plan. Upgrade to Pro or Clinic anytime.",
              },
            ].map((faq, idx) => (
              <PremiumCard key={idx} glassmorphism className="p-4 gap-2">
                <Text className="text-base font-semibold text-foreground">{faq.q}</Text>
                <Text className="text-sm text-muted">{faq.a}</Text>
              </PremiumCard>
            ))}
          </View>

          {/* Support */}
          <PremiumCard glassmorphism className="p-4 gap-3 bg-opacity-50">
            <View className="flex-row items-start gap-3">
              <LucideIcon name="help-circle" size={20} color={colors.primary} />
              <View className="flex-1 gap-1">
                <Text className="text-sm font-semibold text-foreground">Need help?</Text>
                <Text className="text-xs text-muted">
                  Contact us on WhatsApp for billing questions or custom plans
                </Text>
              </View>
            </View>
          </PremiumCard>

          {/* Spacer */}
          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
