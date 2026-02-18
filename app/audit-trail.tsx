import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useAIGuidance } from "@/lib/ai-guidance-context";

export default function AuditTrailScreen() {
  const { getAuditTrail } = useAIGuidance();
  const [auditHistory, setAuditHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);

  useEffect(() => {
    const loadAuditTrail = async () => {
      try {
        // TODO: Get patientId from route params
        const history = await getAuditTrail("patient_mock");
        setAuditHistory(history);
      } catch (error) {
        console.error("Failed to load audit trail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuditTrail();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!selectedRecommendation) {
    return (
      <ScreenContainer className="bg-background">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
          <View className="p-6 gap-6">
            {/* Header */}
            <View className="gap-2">
              <Text className="text-2xl font-bold text-foreground">Audit Trail</Text>
              <Text className="text-sm text-muted">Complete history of AI recommendations</Text>
            </View>

            {isLoading ? (
              <View className="bg-surface rounded-xl p-6 border border-border items-center justify-center py-12">
                <Text className="text-sm text-muted">Loading audit trail...</Text>
              </View>
            ) : auditHistory.length === 0 ? (
              <View className="bg-surface rounded-xl p-6 border border-border items-center justify-center py-12">
                <Text className="text-sm text-muted">No recommendations in audit trail</Text>
                <Text className="text-xs text-muted mt-2">AI recommendations will appear here</Text>
              </View>
            ) : (
              <View className="gap-3">
                {auditHistory.map((rec: any, idx: number) => (
                  <TouchableOpacity
                    key={idx}
                    className="bg-surface rounded-xl p-4 border border-border active:opacity-80"
                    onPress={() => setSelectedRecommendation(rec)}
                  >
                    <View className="flex-row justify-between items-start gap-2 mb-2">
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-foreground">{rec.primaryDiagnosis.condition}</Text>
                        <Text className="text-xs text-muted mt-1">{formatDate(rec.timestamp)}</Text>
                      </View>
                      {rec.reviewed && (
                        <View className="bg-success/20 rounded-full px-2 py-1">
                          <Text className="text-xs font-semibold text-success">Reviewed</Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-xs text-muted">{rec.primaryDiagnosis.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Compliance Notice */}
            <View className="bg-primary/10 border border-primary rounded-lg p-4">
              <Text className="text-xs font-semibold text-primary mb-2">HIPAA COMPLIANT</Text>
              <Text className="text-xs text-muted leading-relaxed">
                All AI recommendations are logged with timestamps and user information for audit and compliance purposes.
              </Text>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Back Button */}
          <TouchableOpacity onPress={() => setSelectedRecommendation(null)}>
            <Text className="text-primary font-semibold">← Back to Audit Trail</Text>
          </TouchableOpacity>

          {/* Recommendation Details */}
          <View className="bg-surface rounded-xl p-4 border border-border gap-4">
            <View>
              <Text className="text-lg font-bold text-foreground">{selectedRecommendation.primaryDiagnosis.condition}</Text>
              <Text className="text-xs text-muted mt-1">{selectedRecommendation.primaryDiagnosis.icd10Code}</Text>
              <Text className="text-xs text-muted mt-2">
                Generated: {formatDate(selectedRecommendation.timestamp)}
              </Text>
            </View>

            {selectedRecommendation.reviewed && (
              <View className="bg-success/10 border border-success rounded-lg p-3">
                <Text className="text-xs font-semibold text-success">Reviewed by {selectedRecommendation.reviewedBy}</Text>
                <Text className="text-xs text-muted mt-1">
                  {formatDate(selectedRecommendation.reviewedAt)}
                </Text>
              </View>
            )}
          </View>

          {/* Differential Diagnoses */}
          {selectedRecommendation.differentialDiagnoses.length > 0 && (
            <View className="bg-surface rounded-xl p-4 border border-border gap-3">
              <Text className="text-base font-semibold text-foreground">Differential Diagnoses</Text>
              {selectedRecommendation.differentialDiagnoses.map((diag: any, idx: number) => (
                <View key={idx} className="border-b border-border pb-3 last:border-b-0">
                  <View className="flex-row justify-between items-start gap-2">
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground">{diag.condition}</Text>
                      <Text className="text-xs text-muted mt-1">{diag.reasoning}</Text>
                    </View>
                    <Text className="text-sm font-bold text-warning">{diag.confidence}%</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Treatment Plan */}
          <View className="bg-surface rounded-xl p-4 border border-border gap-3">
            <Text className="text-base font-semibold text-foreground">Treatment Plan</Text>
            <Text className="text-sm text-foreground">{selectedRecommendation.recommendedTreatment.primary}</Text>

            {selectedRecommendation.recommendedTreatment.medications.length > 0 && (
              <View className="gap-2 mt-2">
                <Text className="text-xs font-semibold text-muted">Medications:</Text>
                {selectedRecommendation.recommendedTreatment.medications.map((med: any, idx: number) => (
                  <View key={idx} className="bg-background rounded-lg p-3 gap-1">
                    <Text className="text-sm font-semibold text-foreground">{med.name}</Text>
                    <Text className="text-xs text-muted">{med.dosage} • {med.frequency}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Follow-up Recommendations */}
          {selectedRecommendation.followUpRecommendations.length > 0 && (
            <View className="bg-surface rounded-xl p-4 border border-border gap-3">
              <Text className="text-base font-semibold text-foreground">Follow-up Recommendations</Text>
              {selectedRecommendation.followUpRecommendations.map((rec: string, idx: number) => (
                <Text key={idx} className="text-sm text-foreground">
                  • {rec}
                </Text>
              ))}
            </View>
          )}

          {/* Audit Information */}
          <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
            <Text className="text-xs font-semibold text-primary">AUDIT INFORMATION</Text>
            <Text className="text-xs text-muted">Created by: {selectedRecommendation.createdBy}</Text>
            <Text className="text-xs text-muted">ID: {selectedRecommendation.id}</Text>
            <Text className="text-xs text-muted">Status: {selectedRecommendation.reviewed ? "Reviewed" : "Pending Review"}</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
