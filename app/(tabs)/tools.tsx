import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

const TOOLS = [
  { id: "1", name: "BMI Calculator", desc: "Pediatric BMI calculation", route: "/tools/bmi-calculator" },
  { id: "2", name: "Growth Charts", desc: "WHO/CDC percentile charts", route: "/tools/growth-charts" },
  { id: "3", name: "Vaccine Scheduler", desc: "Age-based vaccine schedule", route: "/tools/vaccine-scheduler" },
  { id: "4", name: "Dev Milestones", desc: "Developmental assessment", route: "/tools/developmental-milestones" },
  { id: "5", name: "Lab Values", desc: "Reference ranges", route: "/tools/lab-values" },
  { id: "6", name: "Vital Signs", desc: "Normal vital signs", route: "/tools/vital-signs" },
  { id: "7", name: "ASD Screening", desc: "M-CHAT autism screening", route: "/tools/asd-screening" },
  { id: "8", name: "Catch-up Vaccines", desc: "Missed vaccine planning", route: "/tools/catchup-vaccination" },
  { id: "9", name: "Critical Values", desc: "Emergency lab thresholds", route: "/tools/critical-values" },
  { id: "10", name: "Pain Assessment", desc: "Pediatric pain scales", route: "/tools/pain-assessment" },
  { id: "11", name: "Drug Dosing", desc: "Medication calculator", route: "/tools/drug-dosing" },
];

export default function ToolsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-4">
          <Text className="text-2xl font-bold text-foreground">Clinical Tools</Text>
          
          <View className="gap-3">
            {TOOLS.map((tool) => (
              <Pressable
                key={tool.id}
                onPress={() => router.push(tool.route as any)}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#e8e8e8" : "#f5f5f5",
                    borderRadius: 12,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text className="text-base font-semibold text-foreground">{tool.name}</Text>
                <Text className="text-xs text-muted mt-1">{tool.desc}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
