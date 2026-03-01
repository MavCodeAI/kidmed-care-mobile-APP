import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

const HANDOUTS = [
  { id: "1", title: "Fever Management", content: "How to manage fever in children..." },
  { id: "2", title: "Asthma Action Plan", content: "Asthma management plan..." },
  { id: "3", title: "Vaccination Schedule", content: "Recommended vaccines..." },
];

export default function PatientHandoutsScreen() {
  const router = useRouter();
  const colors = useColors();

  const downloadPDF = (title: string) => {
    Alert.alert("Download", `Downloading PDF for ${title}`);
    // Mock PDF download
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Patient Handouts</Text>
            <Text className="text-sm text-muted">Downloadable educational materials for parents</Text>
          </View>

          <View className="gap-4">
            {HANDOUTS.map((handout) => (
              <View key={handout.id} className="bg-surface rounded-xl border border-border p-4 gap-4">
                <Text className="text-lg font-semibold text-foreground">{handout.title}</Text>
                <Text className="text-sm text-muted">{handout.content}</Text>
                <TouchableOpacity
                  className="bg-primary rounded-lg p-3 items-center"
                  onPress={() => downloadPDF(handout.title)}
                >
                  <Text className="text-white font-semibold">Download PDF</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            className="bg-surface border border-border rounded-lg p-4 items-center active:opacity-80"
            onPress={() => router.back()}
          >
            <Text className="text-foreground font-semibold">Back to Tools</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
