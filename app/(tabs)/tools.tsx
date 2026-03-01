import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

const TOOLS = [
  { id: "1", name: "BMI Calculator", desc: "Pediatric BMI calculation", route: "/tools/bmi-calculator", accessibilityLabel: "BMI Calculator tool" },
  { id: "2", name: "Growth Charts", desc: "WHO/CDC percentile charts", route: "/tools/growth-charts", accessibilityLabel: "Growth Charts tool" },
  { id: "3", name: "Vaccine Scheduler", desc: "Age-based vaccine schedule", route: "/tools/vaccine-scheduler", accessibilityLabel: "Vaccine Scheduler tool" },
  { id: "4", name: "Dev Milestones", desc: "Developmental assessment", route: "/tools/developmental-milestones", accessibilityLabel: "Developmental Milestones tool" },
  { id: "5", name: "Lab Values", desc: "Reference ranges", route: "/tools/lab-values", accessibilityLabel: "Lab Values reference tool" },
  { id: "6", name: "Vital Signs", desc: "Normal vital signs", route: "/tools/vital-signs", accessibilityLabel: "Vital Signs reference tool" },
  { id: "7", name: "ASD Screening", desc: "M-CHAT autism screening", route: "/tools/asd-screening", accessibilityLabel: "ASD Screening tool" },
  { id: "8", name: "Catch-up Vaccines", desc: "Missed vaccine planning", route: "/tools/catchup-vaccination", accessibilityLabel: "Catch-up Vaccines tool" },
  { id: "9", name: "Critical Values", desc: "Emergency lab thresholds", route: "/tools/critical-values", accessibilityLabel: "Critical Values reference tool" },
  { id: "10", name: "Pain Assessment", desc: "Pediatric pain scales", route: "/tools/pain-assessment", accessibilityLabel: "Pain Assessment tool" },
  { id: "12", name: "AI Prescription Writer", desc: "AI-powered prescription generator", route: "/tools/ai-prescription-writer", accessibilityLabel: "AI Prescription Writer tool" },
  { id: "13", name: "Clinical Decision Trees", desc: "Interactive symptom flowcharts", route: "/tools/decision-trees", accessibilityLabel: "Clinical Decision Trees tool" },
  { id: "14", name: "Drug Interaction Checker", desc: "Check medication interactions", route: "/tools/drug-interactions", accessibilityLabel: "Drug Interaction Checker tool" },
  { id: "15", name: "Patient Handouts", desc: "PDF educational materials", route: "/tools/patient-handouts", accessibilityLabel: "Patient Handouts tool" },
  { id: "16", name: "AI Clinical Summary", desc: "Automated visit summaries", route: "/tools/clinical-summary", accessibilityLabel: "AI Clinical Summary tool" },
  { id: "17", name: "Compare & Explain", desc: "Compare diagnoses", route: "/tools/compare-diagnoses", accessibilityLabel: "Compare and Explain tool" },
];

export default function ToolsScreen() {
  const router = useRouter();
  const colors = useColors();

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-4">
          <Text className="text-3xl font-bold text-foreground" accessibilityRole="header">Clinical Tools</Text>
          <Text className="text-sm text-muted">19 evidence-based pediatric tools</Text>
          
          <View className="gap-3 mt-2">
            {TOOLS.map((tool) => (
              <Pressable
                key={tool.id}
                onPress={() => router.push(tool.route as any)}
                accessibilityLabel={tool.accessibilityLabel}
                accessibilityRole="button"
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? colors.primary : colors.surface,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    borderRadius: 10,
                    padding: 16,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-primary">{tool.name}</Text>
                    <Text className="text-xs text-muted mt-1">{tool.desc}</Text>
                  </View>
                  <Text className="text-primary text-lg" accessibilityLabel="Navigate">→</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
