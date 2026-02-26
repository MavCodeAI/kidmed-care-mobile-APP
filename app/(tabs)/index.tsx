import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

const CLINICAL_TOOLS = [
  { id: "1", name: "BMI Calculator", route: "/tools/bmi-calculator" },
  { id: "2", name: "Growth Charts", route: "/tools/growth-charts" },
  { id: "3", name: "Vaccine Scheduler", route: "/tools/vaccine-scheduler" },
  { id: "4", name: "Dev Milestones", route: "/tools/developmental-milestones" },
];

const FEATURES = [
  { id: "1", name: "💬 Messaging", route: "/messaging" },
  { id: "2", name: "👥 Workspace", route: "/workspace-management" },
  { id: "3", name: "📊 Analytics", route: "/analytics-dashboard" },
  { id: "4", name: "🔄 Offline & Sync", route: "/offline-sync" },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">KidMed Care</Text>
            <Text className="text-sm text-muted">Pediatric Clinical Decision Support</Text>
          </View>

          {/* Quick Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
              <Text className="text-2xl font-bold text-primary">0</Text>
              <Text className="text-xs text-muted mt-1">Patients Today</Text>
            </View>
            <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
              <Text className="text-2xl font-bold text-primary">0</Text>
              <Text className="text-xs text-muted mt-1">Pending Cases</Text>
            </View>
          </View>

          {/* Quick Access Tools */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Quick Access</Text>
            <View className="flex-row flex-wrap gap-2">
              {CLINICAL_TOOLS.map((tool) => (
                <Pressable
                  key={tool.id}
                  onPress={() => router.push(tool.route as any)}
                  style={({ pressed }) => [
                    {
                      flex: 1,
                      minWidth: "45%",
                      backgroundColor: pressed ? "#0a6a8f" : "#0a7ea4",
                      borderRadius: 8,
                      padding: 12,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text className="text-white text-xs font-semibold text-center">
                    {tool.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Features Access */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Features</Text>
            <View className="flex-row flex-wrap gap-2">
              {FEATURES.map((feature) => (
                <Pressable
                  key={feature.id}
                  onPress={() => router.push(feature.route as any)}
                  style={({ pressed }) => [
                    {
                      flex: 1,
                      minWidth: "45%",
                      backgroundColor: pressed ? "#059669" : "#10b981",
                      borderRadius: 8,
                      padding: 12,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text className="text-white text-xs font-semibold text-center">
                    {feature.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* AI Insights Card */}
          <View className="bg-primary/10 border border-primary rounded-xl p-4 gap-3">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-semibold text-foreground">
                  AI Clinical Guidance
                </Text>
                <Text className="text-xs text-muted mt-1">
                  Evidence-based recommendations
                </Text>
              </View>
              <Pressable
                onPress={() => router.push("/ai-guidance" as any)}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#0a6a8f" : "#0a7ea4",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 8,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text className="text-white text-xs font-semibold">Access</Text>
              </Pressable>
            </View>
          </View>

          {/* Subscription Status */}
          <View className="bg-surface rounded-xl p-4 border border-border gap-3">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-semibold text-foreground">Free Plan</Text>
                <Text className="text-xs text-muted mt-1">Upgrade to unlock all tools</Text>
              </View>
              <Pressable
                onPress={() => router.push("/subscription-management" as any)}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#0a6a8f" : "#0a7ea4",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 8,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text className="text-white text-xs font-semibold">Upgrade</Text>
              </Pressable>
            </View>
          </View>

          {/* Recent Patients */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Recent Patients</Text>
            <Pressable
              onPress={() => router.push("/(tabs)/patients" as any)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#f5f5f5" : "#ffffff",
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 32,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text className="text-sm text-muted">No patients yet</Text>
              <Text className="text-xs text-muted mt-2">Tap to add a patient</Text>
            </Pressable>
          </View>

          {/* Tools Hub */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">All Tools</Text>
            <Pressable
              onPress={() => router.push("/tools-hub" as any)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#0a6a8f" : "#0a7ea4",
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text className="text-white text-sm font-semibold">Browse All Clinical Tools</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
