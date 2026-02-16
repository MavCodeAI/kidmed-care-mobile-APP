import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const TOOLS = [
  { id: "1", name: "BMI Calculator", desc: "Pediatric BMI calculation" },
  { id: "2", name: "Growth Charts", desc: "WHO/CDC percentile charts" },
  { id: "3", name: "Vaccine Scheduler", desc: "Age-based vaccine schedule" },
  { id: "4", name: "Dev Milestones", desc: "Developmental assessment" },
  { id: "5", name: "Lab Values", desc: "Reference ranges" },
  { id: "6", name: "Vital Signs", desc: "Normal vital signs" },
  { id: "7", name: "ASD Screening", desc: "M-CHAT autism screening" },
  { id: "8", name: "Catch-up Vaccines", desc: "Missed vaccine planning" },
];

export default function ToolsScreen() {
  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-4">
          <Text className="text-2xl font-bold text-foreground">Clinical Tools</Text>
          
          <View className="gap-3">
            {TOOLS.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                className="bg-surface rounded-xl p-4 border border-border active:opacity-80"
              >
                <Text className="text-base font-semibold text-foreground">{tool.name}</Text>
                <Text className="text-xs text-muted mt-1">{tool.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
