import { useState } from "react";
import { ScrollView, Text, View, Pressable, Alert, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { LucideIcon } from "@/components/lucide-icon";
import { useColors } from "@/hooks/use-colors";

const SUBSCRIPTION_PLANS = [
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
  },
];

const WHATSAPP_NUMBER = "03168076207";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

export default function ManualPaymentScreen() {
  const router = useRouter();
  const colors = useColors();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleWhatsAppContact = async () => {
    if (!selectedPlan) {
      Alert.alert("Select Plan", "Please select a subscription plan first");
      return;
    }

    const plan = SUBSCRIPTION_PLANS.find((p) => p.name === selectedPlan);
    const message = `Hi! I&apos;m interested in upgrading to the ${selectedPlan} plan (${plan?.price}${plan?.period}). Please assist with the manual payment process.`;

    try {
      const encodedMessage = encodeURIComponent(message);
      const url = `${WHATSAPP_LINK}?text=${encodedMessage}`;
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Error", "Could not open WhatsApp. Please try again.");
    }
  };

  const handleCopyNumber = () => {
    // Note: In real app, use react-native-clipboard
    Alert.alert("WhatsApp Number", `${WHATSAPP_NUMBER}\n\nCopy this number to contact us on WhatsApp`);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Pressable onPress={() => router.back()} className="flex-row items-center gap-2 mb-4">
              <LucideIcon name="chevron-left" size={24} color={colors.foreground} />
              <Text className="text-lg font-semibold text-foreground">Back</Text>
            </Pressable>
            <Text className="text-3xl font-bold text-foreground">Manual Payment</Text>
            <Text className="text-base text-muted">
              Select a plan and contact us via WhatsApp for payment assistance
            </Text>
          </View>

          {/* Plans */}
          <View className="gap-4">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <Pressable
                key={plan.name}
                onPress={() => setSelectedPlan(plan.name)}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                    backgroundColor: selectedPlan === plan.name ? colors.primary : colors.surface,
                    borderColor: selectedPlan === plan.name ? colors.primary : colors.border,
                    borderWidth: 2,
                  },
                ]}
                className="rounded-xl p-4 gap-3"
              >
                <View className="flex-row items-center justify-between">
                  <View className="gap-1 flex-1">
                    <Text
                      className={`text-xl font-bold ${
                        selectedPlan === plan.name ? "text-background" : "text-foreground"
                      }`}
                    >
                      {plan.name}
                    </Text>
                    <Text
                      className={`text-sm ${
                        selectedPlan === plan.name ? "text-background opacity-80" : "text-muted"
                      }`}
                    >
                      {plan.description}
                    </Text>
                  </View>
                  <View className="items-end gap-1">
                    <Text
                      className={`text-2xl font-bold ${
                        selectedPlan === plan.name ? "text-background" : "text-primary"
                      }`}
                    >
                      {plan.price}
                    </Text>
                    <Text
                      className={`text-xs ${
                        selectedPlan === plan.name ? "text-background opacity-80" : "text-muted"
                      }`}
                    >
                      {plan.period}
                    </Text>
                  </View>
                </View>

                {/* Features */}
                <View className="gap-2 mt-2 border-t border-opacity-20" style={{ borderTopColor: colors.border }}>
                  {plan.features.map((feature, idx) => (
                    <View key={idx} className="flex-row items-center gap-2 mt-2">
                      <LucideIcon
                        name="check"
                        size={16}
                        color={selectedPlan === plan.name ? colors.background : colors.primary}
                      />
                      <Text
                        className={`text-sm flex-1 ${
                          selectedPlan === plan.name ? "text-background" : "text-foreground"
                        }`}
                      >
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              </Pressable>
            ))}
          </View>

          {/* Contact Methods */}
          <View className="gap-3 mt-4">
            <Text className="text-lg font-semibold text-foreground">Contact Us</Text>

            {/* WhatsApp Button */}
            <Pressable
              onPress={handleWhatsAppContact}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.8 : 1,
                  backgroundColor: "#25D366",
                },
              ]}
              className="flex-row items-center justify-center gap-3 p-4 rounded-lg"
            >
              <LucideIcon name="message-circle" size={24} color="white" />
              <View className="gap-1">
                <Text className="text-white font-semibold">Contact via WhatsApp</Text>
                <Text className="text-white text-xs opacity-80">{WHATSAPP_NUMBER}</Text>
              </View>
            </Pressable>

            {/* Copy Number Button */}
            <Pressable
              onPress={handleCopyNumber}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                  borderColor: colors.primary,
                  borderWidth: 1.5,
                },
              ]}
              className="flex-row items-center justify-center gap-2 p-3 rounded-lg bg-surface"
            >
              <LucideIcon name="copy" size={20} color={colors.primary} />
              <Text className="text-foreground font-semibold">Copy WhatsApp Number</Text>
            </Pressable>
          </View>

          {/* Payment Process Info */}
          <View className="gap-3 p-4 rounded-lg bg-surface border border-border">
            <Text className="text-lg font-semibold text-foreground">Payment Process</Text>
            <View className="gap-2">
              <View className="flex-row gap-3">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                  <Text className="text-background text-xs font-bold">1</Text>
                </View>
                <View className="flex-1 gap-1">
                  <Text className="font-semibold text-foreground">Select Your Plan</Text>
                  <Text className="text-sm text-muted">Choose Pro or Clinic tier above</Text>
                </View>
              </View>
              <View className="flex-row gap-3">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                  <Text className="text-background text-xs font-bold">2</Text>
                </View>
                <View className="flex-1 gap-1">
                  <Text className="font-semibold text-foreground">Contact Us on WhatsApp</Text>
                  <Text className="text-sm text-muted">Click the button above to message us</Text>
                </View>
              </View>
              <View className="flex-row gap-3">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                  <Text className="text-background text-xs font-bold">3</Text>
                </View>
                <View className="flex-1 gap-1">
                  <Text className="font-semibold text-foreground">Complete Payment</Text>
                  <Text className="text-sm text-muted">We&apos;ll send you payment instructions</Text>
                </View>
              </View>
              <View className="flex-row gap-3">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                  <Text className="text-background text-xs font-bold">4</Text>
                </View>
                <View className="flex-1 gap-1">
                  <Text className="font-semibold text-foreground">Activate Your Plan</Text>
                  <Text className="text-sm text-muted">Enjoy all premium features immediately</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Support Info */}
          <View className="gap-2 p-4 rounded-lg bg-surface border border-border">
            <View className="flex-row items-start gap-2">
              <LucideIcon name="info" size={20} color={colors.primary} />
              <Text className="text-sm text-muted flex-1">
                Our team responds to WhatsApp messages within 2 hours during business hours (9 AM - 6 PM PKT)
              </Text>
            </View>
          </View>

          {/* Spacer */}
          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
