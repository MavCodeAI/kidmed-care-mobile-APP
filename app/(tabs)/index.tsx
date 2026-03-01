import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

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
  const scheme = useColorScheme();
  const primaryColor = Colors[scheme].primary;

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-4xl font-bold text-foreground">KidMed Care</Text>
            <Text className="text-sm text-muted">Pediatric Clinical Decision Support</Text>
          </View>

          {/* Quick Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface rounded-xl p-4 border border-primary">
              <Text className="text-2xl font-bold text-primary">0</Text>
              <Text className="text-xs text-muted mt-1">Patients Today</Text>
            </View>
            <View className="flex-1 bg-surface rounded-xl p-4 border border-primary">
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
                      minWidth: "48%",
                      backgroundColor: primaryColor,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text className="text-sm font-semibold text-foreground text-center">{tool.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Features Section */}
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
                      minWidth: "48%",
                      backgroundColor: primaryColor,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: primaryColor,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text className="text-sm font-semibold text-foreground text-center">{feature.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* AI Guidance Card */}
          <Pressable
            onPress={() => router.push("/ai-guidance")}
            style={({ pressed }) => [
              {
                backgroundColor: primaryColor,
                borderWidth: 1,
                borderColor: primaryColor,
                borderRadius: 12,
                padding: 16,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-base font-semibold text-foreground mb-2">🤖 AI Clinical Guidance</Text>
            <Text className="text-sm text-muted mb-4">Evidence-based recommendations</Text>
            <View className="bg-primary rounded-lg px-4 py-2 self-start">
              <Text className="text-sm font-semibold text-foreground">Access</Text>
            </View>
          </Pressable>

          {/* Subscription Status */}
          <View className="bg-surface rounded-xl p-4 border border-warning">
            <Text className="text-base font-semibold text-foreground mb-2">Free Plan</Text>
            <Text className="text-sm text-muted mb-3">Upgrade to unlock all tools</Text>
            <Pressable
              onPress={() => router.push("/subscription-management")}
              style={({ pressed }) => [
                {
                  backgroundColor: primaryColor,
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text className="text-sm font-semibold text-foreground text-center">Upgrade</Text>
            </Pressable>
          </View>

          {/* Recent Patients */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Recent Patients</Text>
            <View className="bg-surface rounded-xl p-4 border border-border">
              <Text className="text-sm text-muted text-center">No patients yet</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
