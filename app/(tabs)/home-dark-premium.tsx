import { ScrollView, Text, View, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { PremiumCard } from "@/components/premium-card";
import { PremiumButton } from "@/components/premium-button";
import { LucideIcon } from "@/components/lucide-icon";
import { useColors } from "@/hooks/use-colors";
import { DARK_MODE_COLORS } from "@/lib/dark-mode-theme";

/**
 * Dark Mode Premium Home Screen
 * Modern dark theme with neon green accents
 */
export default function HomeDarkPremiumScreen() {
  const colors = useColors();
  const isDark = colors.background === "#0a0a0a";

  const stats = [
    { label: "Patients Today", value: "12", icon: "users", color: "#00ff00" },
    { label: "Pending Cases", value: "3", icon: "alert-circle", color: "#00ffff" },
    { label: "Tools Used", value: "8", icon: "tool", color: "#FFE66D" },
  ];

  const quickTools = [
    { name: "BMI Calculator", icon: "calculator", color: "#00ff00" },
    { name: "Growth Charts", icon: "trending-up", color: "#00ffff" },
    { name: "Vaccine Scheduler", icon: "calendar", color: "#FF922B" },
    { name: "Dev Milestones", icon: "target", color: "#51CF66" },
  ];

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-8">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-4xl font-bold text-foreground">
              Welcome Back
            </Text>
            <Text className="text-base text-muted">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>

          {/* Stats Grid */}
          <View className="gap-3">
            {stats.map((stat, idx) => (
              <PremiumCard
                key={idx}
                glassmorphism
                elevated
                className="p-4 flex-row items-center gap-4"
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: `${stat.color}20`,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LucideIcon name={stat.icon as any} size={28} color={stat.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-muted">{stat.label}</Text>
                  <Text className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </Text>
                </View>
              </PremiumCard>
            ))}
          </View>

          {/* Quick Access */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Quick Access</Text>
            <View className="gap-2">
              {quickTools.map((tool, idx) => (
                <Pressable
                  key={idx}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <PremiumCard
                    glassmorphism
                    className="p-4 flex-row items-center justify-between"
                  >
                    <View className="flex-row items-center gap-3 flex-1">
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: `${tool.color}20`,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <LucideIcon
                          name={tool.icon as any}
                          size={20}
                          color={tool.color}
                        />
                      </View>
                      <Text className="text-base font-semibold text-foreground">
                        {tool.name}
                      </Text>
                    </View>
                    <LucideIcon
                      name="arrow-right"
                      size={20}
                      color={colors.muted}
                    />
                  </PremiumCard>
                </Pressable>
              ))}
            </View>
          </View>

          {/* AI Guidance Card */}
          <PremiumCard
            glassmorphism
            elevated
            className="p-6 gap-4"
            style={{
              borderColor: isDark ? "rgba(0, 255, 0, 0.3)" : undefined,
              borderWidth: isDark ? 1 : 0,
            }}
          >
            <View className="flex-row items-start gap-3">
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: isDark ? "rgba(0, 255, 0, 0.2)" : "#0a7ea420",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LucideIcon
                  name="brain"
                  size={24}
                  color={isDark ? "#00ff00" : colors.primary}
                />
              </View>
              <View className="flex-1 gap-2">
                <Text className="text-lg font-bold text-foreground">
                  AI Clinical Guidance
                </Text>
                <Text className="text-sm text-muted">
                  Evidence-based recommendations with citations
                </Text>
              </View>
            </View>
            <PremiumButton
              label="Access AI Tools"
              variant="primary"
              size="md"
              icon="arrow-right"
              iconPosition="right"
              onPress={() => {}}
            />
          </PremiumCard>

          {/* Recent Activity */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Recent Activity</Text>
            {[
              { action: "Calculated BMI for patient", time: "2 hours ago" },
              { action: "Reviewed vaccine schedule", time: "5 hours ago" },
              { action: "Added new patient case", time: "1 day ago" },
            ].map((activity, idx) => (
              <PremiumCard key={idx} glassmorphism className="p-3">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-foreground flex-1">
                    {activity.action}
                  </Text>
                  <Text className="text-xs text-muted">{activity.time}</Text>
                </View>
              </PremiumCard>
            ))}
          </View>

          {/* Spacer */}
          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
