import { ScrollView, Text, View, TouchableOpacity, Alert, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAIGuidance } from "@/lib/ai-guidance-context";
import { useAuth } from "@/lib/auth-context";
import { useSubscription } from "@/lib/subscription-context";

export default function AIGuidanceScreen() {
  const router = useRouter();
  const { generateClinicalGuidance, saveRecommendation } = useAIGuidance();
  const { user } = useAuth();
  const { hasFeature } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");

  // Check if user has access to AI features
  useEffect(() => {
    if (user && !hasFeature(user.subscriptionTier, "aiGuidance")) {
      Alert.alert("Feature Locked", "AI Clinical Guidance is available in Pro and Clinic plans");
      router.back();
    }
  }, [user, hasFeature]);

  const handleGenerateGuidance = async () => {
    if (!age || !symptoms) {
      Alert.alert("Error", "Please enter patient age and symptoms");
      return;
    }

    setIsLoading(true);
    try {
      const guidance = await generateClinicalGuidance({
        age: parseInt(age),
        symptoms: symptoms.split(",").map((s) => s.trim()),
      });
      setRecommendation(guidance);
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "Failed to generate guidance");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRecommendation = async () => {
    if (!recommendation || !user) return;

    try {
      await saveRecommendation({
        ...recommendation,
        createdBy: user.id,
      });
      Alert.alert("Success", "Recommendation saved to audit trail");
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "Failed to save recommendation");
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">AI Clinical Guidance</Text>
            <Text className="text-sm text-muted">Evidence-based recommendations powered by AI</Text>
          </View>

          {!recommendation ? (
            <>
              {/* Input Section */}
              <View className="bg-surface rounded-xl p-4 border border-border gap-4">
                <Text className="text-lg font-semibold text-foreground">Patient Information</Text>

                {/* Age Input */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">Age (years)</Text>
                  <TextInput
                    className="bg-background border border-border rounded-lg p-3 text-foreground"
                    placeholder="e.g., 5"
                    placeholderTextColor="#687076"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    editable={!isLoading}
                  />
                </View>

                {/* Symptoms Input */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">Symptoms (comma-separated)</Text>
                  <TextInput
                    className="bg-background border border-border rounded-lg p-3 text-foreground"
                    placeholder="e.g., fever, cough, runny nose"
                    placeholderTextColor="#687076"
                    value={symptoms}
                    onChangeText={setSymptoms}
                    multiline
                    numberOfLines={3}
                    editable={!isLoading}
                  />
                </View>

                {/* Generate Button */}
                <TouchableOpacity
                  className="bg-primary rounded-lg p-4 items-center active:opacity-80"
                  onPress={handleGenerateGuidance}
                  disabled={isLoading}
                >
                  <Text className="text-white font-semibold">{isLoading ? "Generating..." : "Generate Guidance"}</Text>
                </TouchableOpacity>
              </View>

              {/* Disclaimer */}
              <View className="bg-warning/10 border border-warning rounded-lg p-4">
                <Text className="text-xs font-semibold text-warning mb-2">CLINICAL DECISION SUPPORT</Text>
                <Text className="text-xs text-muted leading-relaxed">
                  This tool provides evidence-based recommendations only. All recommendations must be reviewed and
                  approved by a qualified healthcare provider before clinical use.
                </Text>
              </View>
            </>
          ) : (
            <>
              {/* Recommendation Display */}
              <View className="bg-surface rounded-xl p-4 border border-border gap-4">
                <View className="flex-row justify-between items-start gap-2">
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-foreground">{recommendation.primaryDiagnosis.condition}</Text>
                    <Text className="text-xs text-muted mt-1">{recommendation.primaryDiagnosis.icd10Code}</Text>
                  </View>
                  <View className="bg-success/20 rounded-full px-3 py-1">
                    <Text className="text-sm font-bold text-success">{recommendation.primaryDiagnosis.confidence}%</Text>
                  </View>
                </View>

                <Text className="text-sm text-muted">{recommendation.primaryDiagnosis.description}</Text>
              </View>

              {/* Recommended Treatment */}
              <View className="bg-surface rounded-xl p-4 border border-border gap-3">
                <Text className="text-base font-semibold text-foreground">Recommended Treatment</Text>
                <Text className="text-sm text-foreground font-semibold">{recommendation.recommendedTreatment.primary}</Text>

                {recommendation.recommendedTreatment.medications && recommendation.recommendedTreatment.medications.length > 0 && (
                  <View className="gap-2">
                    <Text className="text-xs font-semibold text-muted mt-2">Medications:</Text>
                    {recommendation.recommendedTreatment.medications.map((med: any, idx: number) => (
                      <View key={idx} className="bg-background rounded-lg p-3 gap-1">
                        <Text className="text-sm font-semibold text-foreground">{med.name}</Text>
                        <Text className="text-xs text-muted">{med.dosage} • {med.frequency}</Text>
                        <Text className="text-xs text-warning">{med.warnings.join(", ")}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {recommendation.recommendedTreatment.nonPharmacological.length > 0 && (
                  <View className="gap-2">
                    <Text className="text-xs font-semibold text-muted mt-2">Non-Pharmacological:</Text>
                    {recommendation.recommendedTreatment.nonPharmacological.map((item: string, idx: number) => (
                      <Text key={idx} className="text-sm text-foreground">
                        • {item}
                      </Text>
                    ))}
                  </View>
                )}
              </View>

              {/* Red Flags */}
              {recommendation.redFlags.length > 0 && (
                <View className="bg-error/10 border border-error rounded-lg p-4 gap-2">
                  <Text className="text-sm font-bold text-error">Red Flags to Monitor</Text>
                  {recommendation.redFlags.map((flag: string, idx: number) => (
                    <Text key={idx} className="text-xs text-foreground">
                      • {flag}
                    </Text>
                  ))}
                </View>
              )}

              {/* Citations */}
              {recommendation.citations.length > 0 && (
                <View className="bg-surface rounded-xl p-4 border border-border gap-3">
                  <Text className="text-base font-semibold text-foreground">Evidence-Based Citations</Text>
                  {recommendation.citations.map((citation: any, idx: number) => (
                    <View key={idx} className="border-b border-border pb-3 last:border-b-0">
                      <Text className="text-sm font-semibold text-foreground">{citation.title}</Text>
                      <Text className="text-xs text-muted mt-1">
                        {citation.authors} ({citation.year})
                      </Text>
                      <Text className="text-xs text-primary mt-1">{citation.source}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Action Buttons */}
              <View className="gap-3">
                <TouchableOpacity
                  className="bg-primary rounded-lg p-4 items-center active:opacity-80"
                  onPress={handleSaveRecommendation}
                >
                  <Text className="text-white font-semibold">Save to Audit Trail</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-surface border border-border rounded-lg p-4 items-center active:opacity-80"
                  onPress={() => setRecommendation(null)}
                >
                  <Text className="text-foreground font-semibold">Generate New</Text>
                </TouchableOpacity>
              </View>

              {/* Disclaimer */}
              <View className="bg-warning/10 border border-warning rounded-lg p-4">
                <Text className="text-xs text-muted leading-relaxed">{recommendation.disclaimer}</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
