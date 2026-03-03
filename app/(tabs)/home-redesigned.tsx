import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { PremiumCard } from "@/components/premium-card";
import { PremiumButton } from "@/components/premium-button";
import { LucideIcon } from "@/components/lucide-icon";
import { useColors } from "@/hooks/use-colors";

export default function HomeRedesignedScreen() {
  const router = useRouter();
  const colors = useColors();

  const quickStats = [
    { label: "Patients Today", value: "0", icon: "users", color: colors.primary },
    { label: "Pending Cases", value: "0", icon: "alert-circle", color: "#FF6B6B" },
    { label: "Completed", value: "0", icon: "check-circle", color: "#51CF66" },
  ];

  const quickTools = [
    { name: "BMI Calculator", icon: "calculator", color: "#00ff00" },
    { name: "Growth Charts", icon: "trending-up", color: "#00ff00" },
    { name: "Vaccine Scheduler", icon: "calendar", color: "#00ff00" },
    { name: "Dev Milestones", icon: "target", color: "#00ff00" },
  ];

  const features = [
    { name: "AI Guidance", icon: "brain", description: "Evidence-based recommendations" },
    { name: "Patient Cases", icon: "folder", description: "Manage clinical cases" },
    { name: "Messaging", icon: "message-square", description: "Team communication" },
    { name: "Analytics", icon: "bar-chart-2", description: "Usage insights" },
  ];

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-8">
          {/* Header Section */}
          <View className="gap-2">
            <Text className="text-4xl font-bold text-foreground">Welcome Back</Text>
            <Text className="text-base text-muted">March 3, 2026</Text>
          </View>

          {/* Quick Stats */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Today's Overview</Text>
            <View className="gap-3">
              {quickStats.map((stat, idx) => (
                <PremiumCard key={idx} glassmorphism elevated className="p-4">
                  <View className="flex-row items-center justify-between">
                    <View className="gap-1 flex-1">
                      <Text className="text-sm text-muted">{stat.label}</Text>
                      <Text className="text-2xl font-bold text-foreground">{stat.value}</Text>
                    </View>
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: `${stat.color}20`,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LucideIcon name={stat.icon as any} size={24} color={stat.color} />
                    </View>
                  </View>
                </PremiumCard>
              ))}
            </View>
          </View>

          {/* Quick Access Tools */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">Quick Tools</Text>
              <Pressable
                onPress={() => router.push("/(tabs)/tools")}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text className="text-sm font-semibold text-primary">View All</Text>
              </Pressable>
            </View>
            <View className="gap-3">
              {quickTools.map((tool, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => router.push("/(tabs)/tools")}
                  style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                >
                  <PremiumCard glassmorphism className="p-4 flex-row items-center gap-3">
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        backgroundColor: `${tool.color}20`,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LucideIcon name={tool.icon as any} size={20} color={tool.color} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">{tool.name}</Text>
                    </View>
                    <LucideIcon name="chevron-right" size={20} color={colors.muted} />
                  </PremiumCard>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Features Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Features</Text>
            <View className="gap-3">
              {features.map((feature, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => {
                    if (feature.name === "AI Guidance") router.push("/ai-guidance");
                    else if (feature.name === "Patient Cases") router.push("/(tabs)/patients");
                    else if (feature.name === "Messaging") router.push("/(tabs)/messages");
                    else if (feature.name === "Analytics") router.push("/analytics-dashboard");
                  }}
                  style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                >
                  <PremiumCard glassmorphism className="p-4">
                    <View className="flex-row items-center gap-3">
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          backgroundColor: `${colors.primary}20`,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <LucideIcon name={feature.icon as any} size={20} color={colors.primary} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-foreground">{feature.name}</Text>
                        <Text className="text-xs text-muted mt-1">{feature.description}</Text>
                      </View>
                      <LucideIcon name="arrow-right" size={18} color={colors.primary} />
                    </View>
                  </PremiumCard>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Subscription Banner */}
          <PremiumCard glassmorphism elevated className="p-6 gap-3">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 gap-2">
                <Text className="text-lg font-bold text-foreground">Upgrade to Pro</Text>
                <Text className="text-sm text-muted">Unlock all 13 clinical tools and AI guidance</Text>
              </View>
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 20,
                  backgroundColor: `${colors.primary}20`,
                }}
              >
                <Text className="text-xs font-bold text-primary">$39/mo</Text>
              </View>
            </View>
            <PremiumButton
              label="Upgrade Now"
              variant="primary"
              size="md"
              icon="zap"
              onPress={() => router.push("/manual-payment")}
            />
          </PremiumCard>

          {/* Spacer */}
          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
