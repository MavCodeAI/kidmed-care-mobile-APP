import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function DrugInteractionsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [drugs, setDrugs] = useState<string[]>(["", ""]);
  const [results, setResults] = useState<string[]>([]);

  const addDrug = () => {
    setDrugs([...drugs, ""]);
  };

  const updateDrug = (index: number, value: string) => {
    const newDrugs = [...drugs];
    newDrugs[index] = value;
    setDrugs(newDrugs);
  };

  const removeDrug = (index: number) => {
    if (drugs.length > 2) {
      setDrugs(drugs.filter((_, i) => i !== index));
    }
  };

  const checkInteractions = () => {
    const validDrugs = drugs.filter(d => d.trim());
    if (validDrugs.length < 2) {
      Alert.alert("Error", "Please enter at least 2 medications");
      return;
    }

    // Mock interaction check
    const interactions = [
      "No significant interactions detected.",
      "Potential interaction: Drug A may increase levels of Drug B.",
      "Monitor for side effects when combining these medications."
    ];
    setResults(interactions);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Drug Interaction Checker</Text>
            <Text className="text-sm text-muted">Check for potential medication interactions</Text>
          </View>

          <View className="bg-surface rounded-xl border border-border p-4 gap-4">
            <Text className="text-sm font-semibold text-foreground">Medications</Text>
            {drugs.map((drug, index) => (
              <View key={index} className="flex-row gap-2 items-center">
                <TextInput
                  className="bg-background border border-border rounded-lg p-3 text-foreground flex-1"
                  placeholder={`Medication ${index + 1}`}
                  placeholderTextColor={colors.muted}
                  value={drug}
                  onChangeText={(text) => updateDrug(index, text)}
                />
                {drugs.length > 2 && (
                  <TouchableOpacity
                    className="bg-red-500 p-3 rounded-lg"
                    onPress={() => removeDrug(index)}
                  >
                    <Text className="text-white font-semibold">-</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <TouchableOpacity
              className="bg-secondary rounded-lg p-3 items-center"
              onPress={addDrug}
            >
              <Text className="text-foreground font-semibold">Add Medication</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-primary rounded-lg p-4 items-center active:opacity-80"
              onPress={checkInteractions}
            >
              <Text className="text-white font-semibold">Check Interactions</Text>
            </TouchableOpacity>
          </View>

          {results.length > 0 && (
            <View className="bg-surface rounded-xl border border-border p-4 gap-2">
              <Text className="text-sm font-semibold text-foreground">Interaction Results</Text>
              {results.map((result, index) => (
                <Text key={index} className="text-sm text-muted">• {result}</Text>
              ))}
            </View>
          )}

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
