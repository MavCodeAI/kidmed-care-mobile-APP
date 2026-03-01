import { ScrollView, Text, View, Pressable } from "react-native";
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
    <ScreenContainer className="bg-black">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-4xl font-bold text-white">KidMed Care</Text>
            <Text className="text-sm text-gray-400">Pediatric Clinical Decision Support</Text>
          </View>

          {/* Quick Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-gray-900 rounded-xl p-4 border border-green-500">
              <Text className="text-2xl font-bold text-green-500">0</Text>
              <Text className="text-xs text-gray-400 mt-1">Patients Today</Text>
            </View>
            <View className="flex-1 bg-gray-900 rounded-xl p-4 border border-green-500">
              <Text className="text-2xl font-bold text-green-500">0</Text>
              <Text className="text-xs text-gray-400 mt-1">Pending Cases</Text>
            </View>
          </View>

          {/* Quick Access Tools */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-white">Quick Access</Text>
            <View className="flex-row flex-wrap gap-2">
              {CLINICAL_TOOLS.map((tool) => (
                <Pressable
                  key={tool.id}
                  onPress={() => router.push(tool.route as any)}
                  style={({ pressed }) => [
                    {
                      flex: 1,
                      minWidth: "48%",
                      backgroundColor: pressed ? "#00dd00" : "#00ff00",
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text className="text-sm font-semibold text-black text-center">{tool.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Features Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-white">Features</Text>
            <View className="flex-row flex-wrap gap-2">
              {FEATURES.map((feature) => (
                <Pressable
                  key={feature.id}
                  onPress={() => router.push(feature.route as any)}
                  style={({ pressed }) => [
                    {
                      flex: 1,
                      minWidth: "48%",
                      backgroundColor: pressed ? "#1a6b1a" : "#1a7a1a",
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: "#00ff00",
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text className="text-sm font-semibold text-green-500 text-center">{feature.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* AI Guidance Card */}
          <Pressable
            onPress={() => router.push("/ai-guidance")}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#0f3a0f" : "#0a2a0a",
                borderWidth: 1,
                borderColor: "#00ff00",
                borderRadius: 12,
                padding: 16,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-base font-semibold text-green-500 mb-2">🤖 AI Clinical Guidance</Text>
            <Text className="text-sm text-gray-300 mb-4">Evidence-based recommendations</Text>
            <View className="bg-green-500 rounded-lg px-4 py-2 self-start">
              <Text className="text-sm font-semibold text-black">Access</Text>
            </View>
          </Pressable>

          {/* Subscription Status */}
          <View className="bg-gray-900 rounded-xl p-4 border border-yellow-500">
            <Text className="text-base font-semibold text-white mb-2">Free Plan</Text>
            <Text className="text-sm text-gray-400 mb-3">Upgrade to unlock all tools</Text>
            <Pressable
              onPress={() => router.push("/subscription-management")}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#0066cc" : "#0077dd",
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text className="text-sm font-semibold text-white text-center">Upgrade</Text>
            </Pressable>
          </View>

          {/* Recent Patients */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-white">Recent Patients</Text>
            <View className="bg-gray-900 rounded-xl p-4 border border-gray-700">
              <Text className="text-sm text-gray-400 text-center">No patients yet</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
