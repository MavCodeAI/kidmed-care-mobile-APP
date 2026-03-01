import { ScrollView, Text, View, Pressable } from "react-native";

import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";



const CLINICAL_TOOLS = [

  { id: "1", name: "BMI Calculator", route: "/tools/bmi-calculator", accessibilityLabel: "BMI Calculator tool" },

  { id: "2", name: "Growth Charts", route: "/tools/growth-charts", accessibilityLabel: "Growth Charts tool" },

  { id: "3", name: "Vaccine Scheduler", route: "/tools/vaccine-scheduler", accessibilityLabel: "Vaccine Scheduler tool" },

  { id: "4", name: "Dev Milestones", route: "/tools/developmental-milestones", accessibilityLabel: "Developmental Milestones tool" },

];



const FEATURES = [

  { id: "1", name: "💬 Messaging", route: "/messaging", accessibilityLabel: "Messaging feature" },

  { id: "2", name: "👥 Workspace", route: "/workspace-management", accessibilityLabel: "Workspace management" },

  { id: "3", name: "📊 Analytics", route: "/analytics-dashboard", accessibilityLabel: "Analytics dashboard" },

  { id: "4", name: "🔄 Offline & Sync", route: "/offline-sync", accessibilityLabel: "Offline and sync settings" },

];



export default function HomeScreen() {

  const router = useRouter();
  const colors = useColors();



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

            <Text className="text-lg font-semibold text-foreground" accessibilityRole="header">Quick Access</Text>

            <View className="flex-row flex-wrap gap-2">

              {CLINICAL_TOOLS.map((tool) => (

                <Pressable

                  key={tool.id}

                  onPress={() => router.push(tool.route as any)}

                  accessibilityLabel={tool.accessibilityLabel}

                  accessibilityRole="button"

                  accessibilityState={{ disabled: false }}

                  style={({ pressed }) => [

                    {

                      flex: 1,

                      minWidth: "48%",

                      backgroundColor: pressed ? colors.primary : colors.primary,

                      paddingVertical: 14,

                      paddingHorizontal: 16,

                      borderRadius: 10,

                      opacity: pressed ? 0.8 : 1,

                    },

                  ]}

                >

                  <Text className="text-sm font-semibold text-white text-center">{tool.name}</Text>

                </Pressable>

              ))}

            </View>

          </View>



          {/* Features Section */}

          <View className="gap-3">

            <Text className="text-lg font-semibold text-foreground" accessibilityRole="header">Features</Text>

            <View className="flex-row flex-wrap gap-2">

              {FEATURES.map((feature) => (

                <Pressable

                  key={feature.id}

                  onPress={() => router.push(feature.route as any)}

                  accessibilityLabel={feature.accessibilityLabel}

                  accessibilityRole="button"

                  style={({ pressed }) => [

                    {

                      flex: 1,

                      minWidth: "48%",

                      backgroundColor: pressed ? colors.primary : colors.surface,

                      paddingVertical: 14,

                      paddingHorizontal: 16,

                      borderRadius: 10,

                      borderWidth: 1,

                      borderColor: colors.primary,

                      opacity: pressed ? 0.8 : 1,

                    },

                  ]}

                >

                  <Text className="text-sm font-semibold text-primary text-center">{feature.name}</Text>

                </Pressable>

              ))}

            </View>

          </View>



          {/* AI Guidance Card */}

          <Pressable

            onPress={() => router.push("/ai-guidance")}

            accessibilityLabel="AI Clinical Guidance"

            accessibilityRole="button"

            accessibilityHint="Access evidence-based AI recommendations"

            style={({ pressed }) => [

              {

                backgroundColor: pressed ? colors.primary : colors.surface,

                borderWidth: 1,

                borderColor: colors.primary,

                borderRadius: 12,

                padding: 16,

                opacity: pressed ? 0.8 : 1,

              },

            ]}

          >

            <Text className="text-base font-semibold text-primary mb-2">🤖 AI Clinical Guidance</Text>

            <Text className="text-sm text-muted mb-4">Evidence-based recommendations</Text>

            <View className="bg-primary rounded-lg px-4 py-2 self-start">

              <Text className="text-sm font-semibold text-white">Access</Text>

            </View>

          </Pressable>



          {/* Subscription Status */}

          <View className="bg-surface rounded-xl p-4 border border-warning">

            <Text className="text-base font-semibold text-foreground mb-2">Free Plan</Text>

            <Text className="text-sm text-muted mb-3">Upgrade to unlock all tools</Text>

            <Pressable

              onPress={() => router.push("/subscription-management")}

              accessibilityLabel="Upgrade to premium plan"

              accessibilityRole="button"

              style={({ pressed }) => [

                {

                  backgroundColor: pressed ? colors.primary : colors.primary,

                  paddingVertical: 12,

                  paddingHorizontal: 16,

                  borderRadius: 8,

                  opacity: pressed ? 0.8 : 1,

                },

              ]}

            >

              <Text className="text-sm font-semibold text-white text-center">Upgrade</Text>

            </Pressable>

          </View>



          {/* Recent Patients */}

          <View className="gap-3">

            <Text className="text-lg font-semibold text-foreground" accessibilityRole="header">Recent Patients</Text>

            <View className="bg-surface rounded-xl p-4 border border-border">

              <Text className="text-sm text-muted text-center">No patients yet</Text>

            </View>

          </View>

        </View>

      </ScrollView>

    </ScreenContainer>

  );

}

