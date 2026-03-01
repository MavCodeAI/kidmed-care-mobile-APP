import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

const SYMPTOMS = [
  { id: "fever", name: "Fever", desc: "Temperature > 38°C" },
  { id: "cough", name: "Cough", desc: "Persistent cough" },
  { id: "diarrhea", name: "Diarrhea", desc: "Frequent loose stools" },
  { id: "rash", name: "Rash", desc: "Skin rash assessment" },
];

export default function DecisionTreesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const startTree = (symptom: string) => {
    setSelectedSymptom(symptom);
    setStep(1);
    setAnswers({});
  };

  const answerQuestion = (answer: string) => {
    setAnswers({ ...answers, [`step${step}`]: answer });
    setStep(step + 1);
  };

  const getRecommendation = () => {
    // Mock recommendation based on answers
    return "Based on your answers, recommend consulting pediatrician. Red flags detected.";
  };

  const reset = () => {
    setSelectedSymptom(null);
    setStep(0);
    setAnswers({});
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Clinical Decision Trees</Text>
            <Text className="text-sm text-muted">Interactive symptom assessment</Text>
          </View>

          {!selectedSymptom ? (
            <View className="gap-4">
              <Text className="text-lg font-semibold text-foreground">Select Symptom</Text>
              {SYMPTOMS.map((symptom) => (
                <TouchableOpacity
                  key={symptom.id}
                  className="bg-surface rounded-lg p-4 border border-border"
                  onPress={() => startTree(symptom.id)}
                >
                  <Text className="text-lg font-semibold text-primary">{symptom.name}</Text>
                  <Text className="text-sm text-muted">{symptom.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="gap-4">
              <Text className="text-lg font-semibold text-foreground">Decision Tree: {SYMPTOMS.find(s => s.id === selectedSymptom)?.name}</Text>

              {step === 1 && (
                <View className="gap-4">
                  <Text className="text-base text-foreground">What is the child&apos;s age?</Text>
                  <View className="flex-row gap-2">
                    <TouchableOpacity className="bg-primary p-3 rounded flex-1" onPress={() => answerQuestion("<2 years")}>
                      <Text className="text-white text-center">{"<2 years"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-primary p-3 rounded flex-1" onPress={() => answerQuestion("2-5 years")}>
                      <Text className="text-white text-center">2-5 years</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-primary p-3 rounded flex-1" onPress={() => answerQuestion(">5 years")}>
                      <Text className="text-white text-center">{">5 years"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {step === 2 && (
                <View className="gap-4">
                  <Text className="text-base text-foreground">Duration of symptoms?</Text>
                  <View className="gap-2">
                    <TouchableOpacity className="bg-primary p-3 rounded" onPress={() => answerQuestion("<24 hours")}>
                      <Text className="text-white">{"<24 hours"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-primary p-3 rounded" onPress={() => answerQuestion("1-3 days")}>
                      <Text className="text-white">1-3 days</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-primary p-3 rounded" onPress={() => answerQuestion(">3 days")}>
                      <Text className="text-white">{">3 days"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {step > 2 && (
                <View className="bg-surface rounded-xl border border-border p-4 gap-2">
                  <Text className="text-lg font-semibold text-foreground">Assessment Complete</Text>
                  <Text className="text-sm text-muted">{getRecommendation()}</Text>
                  <TouchableOpacity className="bg-primary p-3 rounded mt-2" onPress={reset}>
                    <Text className="text-white text-center">Start New Assessment</Text>
                  </TouchableOpacity>
                </View>
              )}
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
