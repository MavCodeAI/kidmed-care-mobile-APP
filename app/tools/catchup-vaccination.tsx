import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

const CATCHUP_VACCINES = [
  {
    name: "Hepatitis B",
    abbreviation: "HepB",
    schedule: [
      { dose: 1, minAge: "0 weeks", spacing: "Initial" },
      { dose: 2, minAge: "4 weeks", spacing: "4 weeks after dose 1" },
      { dose: 3, minAge: "8 weeks", spacing: "8 weeks after dose 1" },
    ],
  },
  {
    name: "Rotavirus",
    abbreviation: "RV",
    schedule: [
      { dose: 1, minAge: "6 weeks", spacing: "Initial" },
      { dose: 2, minAge: "10 weeks", spacing: "4 weeks after dose 1" },
      { dose: 3, minAge: "14 weeks", spacing: "4 weeks after dose 2" },
    ],
  },
  {
    name: "Diphtheria, Tetanus, Pertussis",
    abbreviation: "DTaP",
    schedule: [
      { dose: 1, minAge: "6 weeks", spacing: "Initial" },
      { dose: 2, minAge: "10 weeks", spacing: "4 weeks after dose 1" },
      { dose: 3, minAge: "14 weeks", spacing: "4 weeks after dose 2" },
      { dose: 4, minAge: "12 months", spacing: "6 months after dose 3" },
      { dose: 5, minAge: "4-6 years", spacing: "6 months after dose 4" },
    ],
  },
  {
    name: "Haemophilus influenzae type b",
    abbreviation: "Hib",
    schedule: [
      { dose: 1, minAge: "6 weeks", spacing: "Initial" },
      { dose: 2, minAge: "10 weeks", spacing: "4 weeks after dose 1" },
      { dose: 3, minAge: "14 weeks", spacing: "4 weeks after dose 2" },
      { dose: 4, minAge: "12-15 months", spacing: "6 months after dose 3" },
    ],
  },
  {
    name: "Pneumococcal",
    abbreviation: "PCV13",
    schedule: [
      { dose: 1, minAge: "6 weeks", spacing: "Initial" },
      { dose: 2, minAge: "10 weeks", spacing: "4 weeks after dose 1" },
      { dose: 3, minAge: "14 weeks", spacing: "4 weeks after dose 2" },
      { dose: 4, minAge: "12-15 months", spacing: "6 months after dose 3" },
    ],
  },
  {
    name: "Inactivated Poliovirus",
    abbreviation: "IPV",
    schedule: [
      { dose: 1, minAge: "6 weeks", spacing: "Initial" },
      { dose: 2, minAge: "10 weeks", spacing: "4 weeks after dose 1" },
      { dose: 3, minAge: "14 weeks", spacing: "4 weeks after dose 2" },
      { dose: 4, minAge: "4-6 years", spacing: "6 months after dose 3" },
    ],
  },
  {
    name: "Measles, Mumps, Rubella",
    abbreviation: "MMR",
    schedule: [
      { dose: 1, minAge: "12 months", spacing: "Initial" },
      { dose: 2, minAge: "4-6 years", spacing: "28 days after dose 1" },
    ],
  },
  {
    name: "Varicella",
    abbreviation: "VAR",
    schedule: [
      { dose: 1, minAge: "12 months", spacing: "Initial" },
      { dose: 2, minAge: "4-6 years", spacing: "3 months after dose 1" },
    ],
  },
];

export default function CatchupVaccinationScreen() {
  const router = useRouter();
  const [ageMonths, setAgeMonths] = useState("");
  const [selectedVaccine, setSelectedVaccine] = useState<number | null>(null);

  const handleAgeChange = (text: string) => {
    setAgeMonths(text);
  };

  const getRecommendedSchedule = (vaccine: (typeof CATCHUP_VACCINES)[0]) => {
    const age = parseInt(ageMonths);
    if (isNaN(age)) return [];

    return vaccine.schedule.filter((s) => {
      const minAge = parseInt(s.minAge);
      return age >= minAge;
    });
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="gap-2">
              <Text className="text-2xl font-bold text-foreground">
                Catch-up Vaccination
              </Text>
              <Text className="text-sm text-muted">
                Accelerated vaccine schedule
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Text className="text-xl">←</Text>
            </TouchableOpacity>
          </View>

          {/* Age Input */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-3">
            <Text className="text-sm font-semibold text-foreground">
              Child Age (months)
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="e.g., 12"
              placeholderTextColor="#687076"
              value={ageMonths}
              onChangeText={handleAgeChange}
              keyboardType="decimal-pad"
            />
          </View>

          {/* Vaccine Selection */}
          {ageMonths && (
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground">
                Select Vaccine
              </Text>
              <View className="gap-2">
                {CATCHUP_VACCINES.map((vaccine, idx) => (
                  <TouchableOpacity
                    key={idx}
                    className={`p-3 rounded-lg border ${
                      selectedVaccine === idx
                        ? "bg-primary border-primary"
                        : "bg-surface border-border"
                    }`}
                    onPress={() => setSelectedVaccine(idx)}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        selectedVaccine === idx ? "text-white" : "text-foreground"
                      }`}
                    >
                      {vaccine.name}
                    </Text>
                    <Text
                      className={`text-xs mt-1 ${
                        selectedVaccine === idx ? "text-white/80" : "text-muted"
                      }`}
                    >
                      {vaccine.abbreviation}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Recommended Schedule */}
          {selectedVaccine !== null && ageMonths && (
            <View className="gap-4">
              <View className="bg-primary rounded-xl p-4 gap-2">
                <Text className="text-xs font-semibold text-white">
                  CATCH-UP SCHEDULE
                </Text>
                <Text className="text-lg font-bold text-white">
                  {CATCHUP_VACCINES[selectedVaccine].name}
                </Text>
              </View>

              {getRecommendedSchedule(CATCHUP_VACCINES[selectedVaccine])
                .length > 0 ? (
                <View className="gap-3">
                  {getRecommendedSchedule(
                    CATCHUP_VACCINES[selectedVaccine]
                  ).map((dose, idx) => (
                    <View
                      key={idx}
                      className="bg-surface rounded-lg border border-border p-4 gap-2"
                    >
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm font-semibold text-foreground">
                          Dose {dose.dose}
                        </Text>
                        <View className="bg-primary/20 px-2 py-1 rounded">
                          <Text className="text-xs font-semibold text-primary">
                            {idx === 0 ? "ASAP" : "Next"}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-xs text-muted">
                        Minimum age: {dose.minAge}
                      </Text>
                      <Text className="text-xs text-muted">
                        Spacing: {dose.spacing}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <View className="bg-surface rounded-xl border border-border p-6 items-center gap-3">
                  <Text className="text-sm font-semibold text-foreground">
                    No doses recommended yet
                  </Text>
                  <Text className="text-xs text-muted text-center">
                    Child is too young for this vaccine
                  </Text>
                </View>
              )}

              {/* Clinical Notes */}
              <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
                <Text className="text-xs font-semibold text-primary">
                  CATCH-UP GUIDELINES
                </Text>
                <Text className="text-xs text-muted leading-relaxed">
                  • Minimum intervals must be observed between doses{"\n"}
                  • Multiple vaccines can be given at same visit{"\n"}
                  • Use accelerated schedule to complete series quickly{"\n"}
                  • Document all doses in immunization record{"\n"}
                  • Review contraindications before administration
                </Text>
              </View>
            </View>
          )}

          {/* Information */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-3">
            <Text className="text-sm font-semibold text-foreground">
              About Catch-up Vaccination
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              Catch-up vaccination allows children who are behind on their
              immunizations to complete their series on an accelerated schedule
              while maintaining minimum intervals between doses.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
