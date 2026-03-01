import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function AIPrescriptionWriterScreen() {
  const router = useRouter();
  const colors = useColors();
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [weight, setWeight] = useState("");
  const [prescription, setPrescription] = useState("");

  const generatePrescription = async () => {
    if (!diagnosis || !weight) {
      Alert.alert("Error", "Please enter diagnosis and weight");
      return;
    }

    setLoading(true);
    // Mock AI prescription generation
    setTimeout(() => {
      setPrescription(`AI-Generated Prescription for ${diagnosis}:
      
Patient Weight: ${weight} kg

Recommended Medications:
- Ibuprofen 10mg/kg every 6-8 hours for fever
- Amoxicillin 50mg/kg/day divided every 8 hours for infection

Note: This is AI-generated. Please verify with clinical guidelines.`);
      setLoading(false);
    }, 2000);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">AI Prescription Writer</Text>
            <Text className="text-sm text-muted">Generate prescriptions with AI assistance</Text>
          </View>

          {/* Form */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-4">
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Diagnosis</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="e.g., Acute otitis media"
                placeholderTextColor={colors.muted}
                value={diagnosis}
                onChangeText={setDiagnosis}
              />
            </View>

            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Patient Weight (kg)</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="e.g., 15"
                placeholderTextColor={colors.muted}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              className="bg-primary rounded-lg p-4 items-center active:opacity-80"
              onPress={generatePrescription}
              disabled={loading}
            >
              <Text className="text-white font-semibold">{loading ? "Generating..." : "Generate Prescription"}</Text>
            </TouchableOpacity>
          </View>

          {/* Result */}
          {prescription ? (
            <View className="bg-surface rounded-xl border border-border p-4 gap-2">
              <Text className="text-sm font-semibold text-foreground">Generated Prescription</Text>
              <Text className="text-sm text-muted">{prescription}</Text>
            </View>
          ) : null}

          {/* Back Button */}
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
