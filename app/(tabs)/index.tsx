import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const CLINICAL_TOOLS = [
  { id: "1", name: "BMI Calculator", category: "Assessment" },
  { id: "2", name: "Growth Charts", category: "Reference" },
  { id: "3", name: "Vaccine Scheduler", category: "Assessment" },
  { id: "4", name: "Dev Milestones", category: "Reference" },
];

export default function HomeScreen() {
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
                <TouchableOpacity
                  key={tool.id}
                  className="flex-1 min-w-[45%] bg-primary rounded-lg p-3 active:opacity-80"
                >
                  <Text className="text-white text-xs font-semibold text-center">{tool.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Subscription Status */}
          <View className="bg-surface rounded-xl p-4 border border-border gap-3">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-semibold text-foreground">Free Plan</Text>
                <Text className="text-xs text-muted mt-1">Upgrade to unlock all tools</Text>
              </View>
              <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg active:opacity-80">
                <Text className="text-white text-xs font-semibold">Upgrade</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Patients */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Recent Patients</Text>
            <View className="bg-surface rounded-xl p-4 border border-border items-center justify-center py-8">
              <Text className="text-sm text-muted">No patients yet</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
