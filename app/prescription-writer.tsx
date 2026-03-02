import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { LucideIcon } from "@/components/lucide-icon";
import { prescriptionWriterService } from "@/lib/prescription-writer-service";

export default function PrescriptionWriterScreen() {
  const router = useRouter();
  const [diagnosis, setDiagnosis] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientWeight, setPatientWeight] = useState("");
  const [prescription, setPrescription] = useState<any>(null);

  const handleGeneratePrescription = () => {
    if (!diagnosis || !patientName || !patientAge || !patientWeight) {
      alert("Please fill all fields");
      return;
    }

    const newPrescription = prescriptionWriterService.generatePrescription(
      diagnosis,
      patientName,
      parseInt(patientAge),
      parseFloat(patientWeight),
      "Dr. User"
    );

    setPrescription(newPrescription);
  };

  const handleExport = () => {
    if (prescription) {
      const text = prescriptionWriterService.exportPrescriptionAsText(prescription);
      alert("Prescription exported:\n\n" + text);
    }
  };

  return (
    <ScreenContainer className="bg-black">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-4">
          <View className="flex-row items-center gap-2">
            <LucideIcon name="prescription" size={32} color="#00ff00" />
            <Text className="text-3xl font-bold text-white">Prescription Writer</Text>
          </View>
          <Text className="text-sm text-gray-400">AI-powered prescription generation</Text>

          {!prescription ? (
            <>
              {/* Input Form */}
              <View className="gap-4 mt-4">
                <View>
                  <Text className="text-sm font-semibold text-green-500 mb-2">Diagnosis</Text>
                  <TextInput
                    placeholder="e.g., Acute Otitis Media"
                    placeholderTextColor="#666666"
                    value={diagnosis}
                    onChangeText={setDiagnosis}
                    style={{
                      backgroundColor: "#1a1a1a",
                      borderWidth: 1,
                      borderColor: "#00ff00",
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      color: "#ffffff",
                    }}
                  />
                </View>

                <View>
                  <Text className="text-sm font-semibold text-green-500 mb-2">Patient Name</Text>
                  <TextInput
                    placeholder="Patient name"
                    placeholderTextColor="#666666"
                    value={patientName}
                    onChangeText={setPatientName}
                    style={{
                      backgroundColor: "#1a1a1a",
                      borderWidth: 1,
                      borderColor: "#00ff00",
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      color: "#ffffff",
                    }}
                  />
                </View>

                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-green-500 mb-2">Age (years)</Text>
                    <TextInput
                      placeholder="Age"
                      placeholderTextColor="#666666"
                      value={patientAge}
                      onChangeText={setPatientAge}
                      keyboardType="numeric"
                      style={{
                        backgroundColor: "#1a1a1a",
                        borderWidth: 1,
                        borderColor: "#00ff00",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        color: "#ffffff",
                      }}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-green-500 mb-2">Weight (kg)</Text>
                    <TextInput
                      placeholder="Weight"
                      placeholderTextColor="#666666"
                      value={patientWeight}
                      onChangeText={setPatientWeight}
                      keyboardType="decimal-pad"
                      style={{
                        backgroundColor: "#1a1a1a",
                        borderWidth: 1,
                        borderColor: "#00ff00",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        color: "#ffffff",
                      }}
                    />
                  </View>
                </View>

                <Pressable
                  onPress={handleGeneratePrescription}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#00dd00" : "#00ff00",
                      paddingVertical: 12,
                      borderRadius: 8,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text className="text-base font-semibold text-black text-center">Generate Prescription</Text>
                </Pressable>
              </View>

              {/* Common Diagnoses */}
              <View className="gap-3 mt-6">
                <Text className="text-sm font-semibold text-green-500">Quick Select</Text>
                {["Acute Otitis Media", "Pneumonia", "Gastroenteritis", "Urinary Tract Infection"].map((diag) => (
                  <Pressable
                    key={diag}
                    onPress={() => setDiagnosis(diag)}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? "#0f3a0f" : "#0a2a0a",
                        borderWidth: 1,
                        borderColor: "#00ff00",
                        borderRadius: 8,
                        padding: 10,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                  >
                    <Text className="text-sm text-green-500">{diag}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          ) : (
            <>
              {/* Prescription Display */}
              <View className="bg-gray-900 rounded-xl p-6 border border-green-500 gap-4 mt-4">
                <View className="flex-row items-center gap-2">
                  <LucideIcon name="prescription" size={24} color="#00ff00" />
                  <Text className="text-xl font-bold text-green-500">PRESCRIPTION</Text>
                </View>

                <View className="gap-2">
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-400">Patient:</Text>
                    <Text className="text-sm font-semibold text-white">{prescription.patientName}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-400">Age:</Text>
                    <Text className="text-sm font-semibold text-white">{prescription.patientAge} years</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-400">Weight:</Text>
                    <Text className="text-sm font-semibold text-white">{prescription.patientWeight}kg</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-400">Diagnosis:</Text>
                    <Text className="text-sm font-semibold text-white">{prescription.diagnosis}</Text>
                  </View>
                </View>

                <View className="border-t border-gray-700 pt-4">
                  <Text className="text-base font-semibold text-green-500 mb-3">Medications:</Text>
                  {prescription.medications.map((med: any, idx: number) => (
                    <View key={idx} className="mb-4 pb-4 border-b border-gray-700">
                      <Text className="text-sm font-semibold text-white">{idx + 1}. {med.name}</Text>
                      <Text className="text-xs text-gray-400 mt-1">Dosage: {med.dosage}</Text>
                      <Text className="text-xs text-gray-400">Frequency: {med.frequency}</Text>
                      <Text className="text-xs text-gray-400">Duration: {med.duration}</Text>
                      {med.instructions && (
                        <View className="flex-row items-start gap-2 mt-1">
                          <LucideIcon name="lightbulb" size={14} color="#eab308" />
                          <Text className="text-xs text-yellow-500 flex-1">{med.instructions}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>

                <View className="bg-yellow-900 rounded-lg p-3 border border-yellow-600 flex-row items-start gap-2">
                  <LucideIcon name="alertTriangle" size={16} color="#fbbf24" />
                  <Text className="text-xs text-yellow-200 flex-1">
                    Disclaimer: This is a decision-support tool. All prescriptions must be reviewed by a clinician.
                  </Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="gap-3 mt-4">
                <Pressable
                  onPress={handleExport}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#0066cc" : "#0077dd",
                      paddingVertical: 12,
                      borderRadius: 8,
                      opacity: pressed ? 0.8 : 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 8,
                    },
                  ]}
                >
                  <LucideIcon name="download" size={20} color="#ffffff" />
                  <Text className="text-base font-semibold text-white">Export as PDF</Text>
                </Pressable>

                <Pressable
                  onPress={() => setPrescription(null)}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#333333" : "#1a1a1a",
                      borderWidth: 1,
                      borderColor: "#00ff00",
                      paddingVertical: 12,
                      borderRadius: 8,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text className="text-base font-semibold text-green-500 text-center">Create New</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
