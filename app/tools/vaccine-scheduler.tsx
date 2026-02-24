import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

const VACCINE_SCHEDULE = [
  {
    age: "Birth",
    ageMonths: 0,
    vaccines: [
      { name: "Hepatitis B", abbreviation: "HepB", status: "due" },
      { name: "Vitamin K", abbreviation: "VitK", status: "due" },
      { name: "Eye Prophylaxis", abbreviation: "Eye", status: "due" },
    ],
  },
  {
    age: "2 Months",
    ageMonths: 2,
    vaccines: [
      { name: "Rotavirus", abbreviation: "RV", status: "due" },
      { name: "Diphtheria, Tetanus, Pertussis", abbreviation: "DTaP", status: "due" },
      { name: "Haemophilus influenzae type b", abbreviation: "Hib", status: "due" },
      { name: "Pneumococcal", abbreviation: "PCV13", status: "due" },
      { name: "Inactivated Poliovirus", abbreviation: "IPV", status: "due" },
      { name: "Hepatitis B", abbreviation: "HepB", status: "due" },
    ],
  },
  {
    age: "4 Months",
    ageMonths: 4,
    vaccines: [
      { name: "Rotavirus", abbreviation: "RV", status: "due" },
      { name: "Diphtheria, Tetanus, Pertussis", abbreviation: "DTaP", status: "due" },
      { name: "Haemophilus influenzae type b", abbreviation: "Hib", status: "due" },
      { name: "Pneumococcal", abbreviation: "PCV13", status: "due" },
      { name: "Inactivated Poliovirus", abbreviation: "IPV", status: "due" },
    ],
  },
  {
    age: "6 Months",
    ageMonths: 6,
    vaccines: [
      { name: "Rotavirus", abbreviation: "RV", status: "due" },
      { name: "Diphtheria, Tetanus, Pertussis", abbreviation: "DTaP", status: "due" },
      { name: "Haemophilus influenzae type b", abbreviation: "Hib", status: "due" },
      { name: "Pneumococcal", abbreviation: "PCV13", status: "due" },
      { name: "Inactivated Poliovirus", abbreviation: "IPV", status: "due" },
      { name: "Hepatitis B", abbreviation: "HepB", status: "due" },
      { name: "Influenza", abbreviation: "Flu", status: "due" },
    ],
  },
  {
    age: "12 Months",
    ageMonths: 12,
    vaccines: [
      { name: "Haemophilus influenzae type b", abbreviation: "Hib", status: "due" },
      { name: "Pneumococcal", abbreviation: "PCV13", status: "due" },
      { name: "Hepatitis A", abbreviation: "HepA", status: "due" },
      { name: "Measles, Mumps, Rubella", abbreviation: "MMR", status: "due" },
      { name: "Varicella", abbreviation: "VAR", status: "due" },
    ],
  },
  {
    age: "18 Months",
    ageMonths: 18,
    vaccines: [
      { name: "Diphtheria, Tetanus, Pertussis", abbreviation: "DTaP", status: "due" },
      { name: "Inactivated Poliovirus", abbreviation: "IPV", status: "due" },
      { name: "Hepatitis A", abbreviation: "HepA", status: "due" },
    ],
  },
  {
    age: "24 Months",
    ageMonths: 24,
    vaccines: [
      { name: "Pneumococcal", abbreviation: "PCV13", status: "due" },
    ],
  },
];

export default function VaccineSchedulerScreen() {
  const router = useRouter();
  const [ageMonths, setAgeMonths] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState<(typeof VACCINE_SCHEDULE)[0] | null>(null);

  const handleAgeChange = (text: string) => {
    setAgeMonths(text);
    const age = parseInt(text);
    if (!isNaN(age)) {
      const schedule = VACCINE_SCHEDULE.find((s) => s.ageMonths === age);
      setSelectedSchedule(schedule || null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "due":
        return "#EF4444";
      case "given":
        return "#22C55E";
      case "overdue":
        return "#F59E0B";
      default:
        return "#687076";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "due":
        return "Due";
      case "given":
        return "Given";
      case "overdue":
        return "Overdue";
      default:
        return "Pending";
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
                Vaccine Scheduler
              </Text>
              <Text className="text-sm text-muted">
                CDC Recommended Schedule
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

          {/* Schedule Display */}
          {selectedSchedule ? (
            <View className="gap-4">
              {/* Age Header */}
              <View className="bg-primary rounded-xl p-4 gap-2">
                <Text className="text-xs font-semibold text-white">
                  RECOMMENDED VACCINES
                </Text>
                <Text className="text-2xl font-bold text-white">
                  {selectedSchedule.age}
                </Text>
              </View>

              {/* Vaccines List */}
              <View className="gap-3">
                {selectedSchedule.vaccines.map((vaccine, idx) => (
                  <View
                    key={idx}
                    className="bg-surface rounded-lg border border-border p-4 flex-row justify-between items-center"
                  >
                    <View className="gap-1 flex-1">
                      <Text className="text-sm font-semibold text-foreground">
                        {vaccine.name}
                      </Text>
                      <Text className="text-xs text-muted">
                        {vaccine.abbreviation}
                      </Text>
                    </View>
                    <View
                      className="px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: getStatusColor(vaccine.status) + "20",
                      }}
                    >
                      <Text
                        className="text-xs font-semibold"
                        style={{ color: getStatusColor(vaccine.status) }}
                      >
                        {getStatusLabel(vaccine.status)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Clinical Notes */}
              <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
                <Text className="text-xs font-semibold text-primary">
                  CLINICAL NOTES
                </Text>
                <Text className="text-xs text-muted leading-relaxed">
                  • Schedule vaccines at recommended ages for optimal protection{"\n"}
                  • Minimum intervals between doses must be observed{"\n"}
                  • Catch-up vaccination is available for delayed schedules{"\n"}
                  • Contraindications and precautions should be reviewed
                </Text>
              </View>
            </View>
          ) : (
            <View className="bg-surface rounded-xl border border-border p-6 items-center gap-3">
              <Text className="text-lg font-semibold text-foreground">
                Enter Age to View Schedule
              </Text>
              <Text className="text-sm text-muted text-center">
                Available ages: Birth, 2, 4, 6, 12, 18, 24 months
              </Text>
            </View>
          )}

          {/* Quick Access Buttons */}
          <View className="gap-2">
            <Text className="text-xs font-semibold text-primary">
              QUICK ACCESS
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {[
                { label: "Birth", value: "0" },
                { label: "2 mo", value: "2" },
                { label: "4 mo", value: "4" },
                { label: "6 mo", value: "6" },
                { label: "12 mo", value: "12" },
                { label: "18 mo", value: "18" },
                { label: "24 mo", value: "24" },
              ].map((btn) => (
                <TouchableOpacity
                  key={btn.value}
                  className={`flex-1 min-w-[30%] p-2 rounded-lg border ${
                    ageMonths === btn.value
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => handleAgeChange(btn.value)}
                >
                  <Text
                    className={`text-xs font-semibold text-center ${
                      ageMonths === btn.value ? "text-white" : "text-foreground"
                    }`}
                  >
                    {btn.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Information */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-3">
            <Text className="text-sm font-semibold text-foreground">
              About This Schedule
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              This vaccine schedule is based on CDC recommendations for children
              ages 0-24 months. It includes routine vaccines recommended for all
              children. Individual circumstances may require modifications to
              this schedule.
            </Text>
            <TouchableOpacity className="mt-2 p-2 active:opacity-80">
              <Text className="text-sm text-primary font-semibold">
                View Full CDC Schedule →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
