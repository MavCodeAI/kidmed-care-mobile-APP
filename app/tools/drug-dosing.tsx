import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

const COMMON_MEDICATIONS = [
  {
    name: "Acetaminophen (Tylenol)",
    dosage: "15 mg/kg per dose",
    frequency: "Every 4-6 hours",
    maxDaily: "5 doses/day",
    notes: "Maximum 5000 mg/day",
  },
  {
    name: "Ibuprofen (Advil, Motrin)",
    dosage: "10 mg/kg per dose",
    frequency: "Every 6-8 hours",
    maxDaily: "4 doses/day",
    notes: "Maximum 2400 mg/day",
  },
  {
    name: "Amoxicillin",
    dosage: "25-45 mg/kg/day",
    frequency: "Divided into 2-3 doses",
    maxDaily: "3000 mg/day",
    notes: "For bacterial infections",
  },
  {
    name: "Azithromycin",
    dosage: "10 mg/kg on day 1",
    frequency: "Then 5 mg/kg daily",
    maxDaily: "500 mg/day",
    notes: "For 5 days total",
  },
  {
    name: "Diphenhydramine",
    dosage: "0.5-1 mg/kg per dose",
    frequency: "Every 6 hours",
    maxDaily: "4 doses/day",
    notes: "Maximum 50 mg per dose",
  },
  {
    name: "Omeprazole",
    dosage: "0.5-1 mg/kg per dose",
    frequency: "Once daily",
    maxDaily: "20 mg/day",
    notes: "For GERD",
  },
];

export default function DrugDosingScreen() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [selectedMed, setSelectedMed] = useState<number | null>(null);
  const [calculatedDose, setCalculatedDose] = useState<string | null>(null);

  const handleCalculate = () => {
    if (!weight || selectedMed === null) {
      Alert.alert("Error", "Please enter weight and select medication");
      return;
    }

    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) {
      Alert.alert("Error", "Please enter valid weight");
      return;
    }

    const med = COMMON_MEDICATIONS[selectedMed];
    const dosageMatch = med.dosage.match(/(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?/);

    if (dosageMatch) {
      const minDose = parseFloat(dosageMatch[1]);
      const maxDose = dosageMatch[2] ? parseFloat(dosageMatch[2]) : minDose;

      const calculatedMin = (minDose * w).toFixed(2);
      const calculatedMax = (maxDose * w).toFixed(2);

      if (minDose === maxDose) {
        setCalculatedDose(`${calculatedMin} mg per dose`);
      } else {
        setCalculatedDose(`${calculatedMin} - ${calculatedMax} mg per dose`);
      }
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="gap-2">
              <Text className="text-2xl font-bold text-foreground">
                Drug Dosing Calculator
              </Text>
              <Text className="text-sm text-muted">
                Pediatric medication dosing
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Text className="text-xl">←</Text>
            </TouchableOpacity>
          </View>

          {/* Input Section */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-4">
            {/* Weight Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">
                Child Weight (kg)
              </Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="e.g., 15"
                placeholderTextColor="#687076"
                value={weight}
                onChangeText={setWeight}
                keyboardType="decimal-pad"
              />
            </View>

            {/* Medication Selection */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">
                Select Medication
              </Text>
              <View className="gap-2 max-h-48">
                {COMMON_MEDICATIONS.map((med, idx) => (
                  <TouchableOpacity
                    key={idx}
                    className={`p-3 rounded-lg border ${
                      selectedMed === idx
                        ? "bg-primary border-primary"
                        : "bg-background border-border"
                    }`}
                    onPress={() => setSelectedMed(idx)}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        selectedMed === idx ? "text-white" : "text-foreground"
                      }`}
                    >
                      {med.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Calculate Button */}
            <TouchableOpacity
              className="bg-primary rounded-lg p-4 items-center active:opacity-80 mt-2"
              onPress={handleCalculate}
            >
              <Text className="text-white font-semibold">Calculate Dose</Text>
            </TouchableOpacity>
          </View>

          {/* Results */}
          {selectedMed !== null && (
            <View className="gap-4">
              {/* Selected Medication Details */}
              <View className="bg-surface rounded-xl border border-border p-4 gap-3">
                <Text className="text-sm font-semibold text-foreground">
                  {COMMON_MEDICATIONS[selectedMed].name}
                </Text>
                <View className="gap-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-muted">Dosage:</Text>
                    <Text className="text-sm font-semibold text-foreground">
                      {COMMON_MEDICATIONS[selectedMed].dosage}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-muted">Frequency:</Text>
                    <Text className="text-sm font-semibold text-foreground">
                      {COMMON_MEDICATIONS[selectedMed].frequency}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-muted">Max Daily:</Text>
                    <Text className="text-sm font-semibold text-foreground">
                      {COMMON_MEDICATIONS[selectedMed].maxDaily}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-muted">Notes:</Text>
                    <Text className="text-sm font-semibold text-foreground">
                      {COMMON_MEDICATIONS[selectedMed].notes}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Calculated Dose */}
              {calculatedDose && (
                <View className="bg-primary/10 border border-primary rounded-xl p-6 items-center gap-3">
                  <Text className="text-xs font-semibold text-primary">
                    CALCULATED DOSE
                  </Text>
                  <Text className="text-3xl font-bold text-primary">
                    {calculatedDose}
                  </Text>
                  <Text className="text-xs text-muted text-center">
                    For child weighing {weight} kg
                  </Text>
                </View>
              )}

              {/* Clinical Notes */}
              <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
                <Text className="text-xs font-semibold text-primary">
                  IMPORTANT NOTES
                </Text>
                <Text className="text-xs text-muted leading-relaxed">
                  • Always verify dosing with current references{"\n"}
                  • Check for drug interactions and contraindications{"\n"}
                  • Confirm patient allergies before administration{"\n"}
                  • Use appropriate formulation for age/weight{"\n"}
                  • Document all medications administered
                </Text>
              </View>
            </View>
          )}

          {/* Information */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-3">
            <Text className="text-sm font-semibold text-foreground">
              About This Tool
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              This calculator provides estimated pediatric dosing based on weight.
              Always consult current drug references, package inserts, and clinical
              guidelines. This tool is for educational purposes only.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
