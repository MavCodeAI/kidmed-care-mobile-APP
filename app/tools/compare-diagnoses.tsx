import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function CompareDiagnosesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [diagnoses, setDiagnoses] = useState<string[]>(["", ""]);
  const [comparison, setComparison] = useState("");

  const addDiagnosis = () => {
    setDiagnoses([...diagnoses, ""]);
  };

  const updateDiagnosis = (index: number, value: string) => {
    const newDiagnoses = [...diagnoses];
    newDiagnoses[index] = value;
    setDiagnoses(newDiagnoses);
  };

  const removeDiagnosis = (index: number) => {
    if (diagnoses.length > 2) {
      setDiagnoses(diagnoses.filter((_, i) => i !== index));
    }
  };

  const compareDiagnoses = () => {
    const validDiagnoses = diagnoses.filter(d => d.trim());
    if (validDiagnoses.length < 2) {
      Alert.alert("Error", "Please enter at least 2 diagnoses");
      return;
    }

    // Mock comparison
    setComparison(`Diagnosis Comparison:

${validDiagnoses[0]} vs ${validDiagnoses[1]}

Similarities:
- Both present with fever
- Require similar diagnostic workup

Differences:
- ${validDiagnoses[0]} typically responds better to antibiotics
- ${validDiagnoses[1]} may require hospitalization in severe cases

Treatment Approach:
- Start with supportive care for both
- Consider specific therapy based on clinical presentation

This comparison is AI-generated. Please verify with clinical guidelines.`);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Compare & Explain</Text>
            <Text className="text-sm text-muted">Compare different diagnoses with explanations</Text>
          </View>

          <View className="bg-surface rounded-xl border border-border p-4 gap-4">
            <Text className="text-sm font-semibold text-foreground">Diagnoses to Compare</Text>
            {diagnoses.map((diagnosis, index) => (
              <View key={index} className="flex-row gap-2 items-center">
                <TextInput
                  className="bg-background border border-border rounded-lg p-3 text-foreground flex-1"
                  placeholder={`Diagnosis ${index + 1}`}
                  placeholderTextColor={colors.muted}
                  value={diagnosis}
                  onChangeText={(text) => updateDiagnosis(index, text)}
                />
                {diagnoses.length > 2 && (
                  <TouchableOpacity
                    className="bg-red-500 p-3 rounded-lg"
                    onPress={() => removeDiagnosis(index)}
                  >
                    <Text className="text-white font-semibold">-</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <TouchableOpacity
              className="bg-secondary rounded-lg p-3 items-center"
              onPress={addDiagnosis}
            >
              <Text className="text-foreground font-semibold">Add Diagnosis</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-primary rounded-lg p-4 items-center active:opacity-80"
              onPress={compareDiagnoses}
            >
              <Text className="text-white font-semibold">Compare Diagnoses</Text>
            </TouchableOpacity>
          </View>

          {comparison ? (
            <View className="bg-surface rounded-xl border border-border p-4 gap-2">
              <Text className="text-sm font-semibold text-foreground">Comparison Results</Text>
              <Text className="text-sm text-muted">{comparison}</Text>
            </View>
          ) : null}

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
