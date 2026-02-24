import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

const MILESTONES_BY_AGE = [
  {
    age: "3 Months",
    ageMonths: 3,
    category: "Motor",
    milestones: [
      { item: "Lifts head and chest when lying on stomach", status: "unchecked" },
      { item: "Reaches for objects", status: "unchecked" },
      { item: "Opens and closes hands", status: "unchecked" },
      { item: "Pushes down on legs when feet are on hard surface", status: "unchecked" },
    ],
  },
  {
    age: "3 Months",
    ageMonths: 3,
    category: "Social/Emotional",
    milestones: [
      { item: "Smiles at the sound of your voice", status: "unchecked" },
      { item: "Begins to coo", status: "unchecked" },
      { item: "Turns head toward sounds", status: "unchecked" },
    ],
  },
  {
    age: "6 Months",
    ageMonths: 6,
    category: "Motor",
    milestones: [
      { item: "Rolls over in both directions", status: "unchecked" },
      { item: "Sits up with minimal support", status: "unchecked" },
      { item: "Supports some weight on legs", status: "unchecked" },
      { item: "Transfers objects from one hand to the other", status: "unchecked" },
    ],
  },
  {
    age: "6 Months",
    ageMonths: 6,
    category: "Cognitive",
    milestones: [
      { item: "Looks for objects when dropped", status: "unchecked" },
      { item: "Rakes objects with fingers", status: "unchecked" },
      { item: "Begins to use sounds with meaning", status: "unchecked" },
    ],
  },
  {
    age: "12 Months",
    ageMonths: 12,
    category: "Motor",
    milestones: [
      { item: "Stands with minimal support", status: "unchecked" },
      { item: "Walks holding onto furniture", status: "unchecked" },
      { item: "Picks up objects with thumb and finger", status: "unchecked" },
      { item: "Claps hands", status: "unchecked" },
    ],
  },
  {
    age: "12 Months",
    ageMonths: 12,
    category: "Language",
    milestones: [
      { item: "Says first words (mama, dada)", status: "unchecked" },
      { item: "Understands simple words", status: "unchecked" },
      { item: "Responds to own name", status: "unchecked" },
    ],
  },
  {
    age: "18 Months",
    ageMonths: 18,
    category: "Motor",
    milestones: [
      { item: "Walks alone", status: "unchecked" },
      { item: "Climbs stairs with help", status: "unchecked" },
      { item: "Scribbles with crayon", status: "unchecked" },
    ],
  },
  {
    age: "18 Months",
    ageMonths: 18,
    category: "Social/Emotional",
    milestones: [
      { item: "Shows affection", status: "unchecked" },
      { item: "Plays simple pretend games", status: "unchecked" },
      { item: "Points to show things to others", status: "unchecked" },
    ],
  },
  {
    age: "24 Months",
    ageMonths: 24,
    category: "Motor",
    milestones: [
      { item: "Runs", status: "unchecked" },
      { item: "Kicks a ball", status: "unchecked" },
      { item: "Climbs onto and down from furniture", status: "unchecked" },
    ],
  },
  {
    age: "24 Months",
    ageMonths: 24,
    category: "Language",
    milestones: [
      { item: "Uses 50+ words", status: "unchecked" },
      { item: "Follows 2-step instructions", status: "unchecked" },
      { item: "Names familiar people and objects", status: "unchecked" },
    ],
  },
];

export default function DevelopmentalMilestonesScreen() {
  const router = useRouter();
  const [ageMonths, setAgeMonths] = useState("");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleAgeChange = (text: string) => {
    setAgeMonths(text);
  };

  const toggleMilestone = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const selectedMilestones = ageMonths
    ? MILESTONES_BY_AGE.filter((m) => m.ageMonths === parseInt(ageMonths))
    : [];

  const totalMilestones = selectedMilestones.reduce(
    (sum, m) => sum + m.milestones.length,
    0
  );
  const checkedMilestones = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage =
    totalMilestones > 0 ? Math.round((checkedMilestones / totalMilestones) * 100) : 0;

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="gap-2">
              <Text className="text-2xl font-bold text-foreground">
                Developmental Milestones
              </Text>
              <Text className="text-sm text-muted">
                Track child development progress
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

          {/* Progress */}
          {selectedMilestones.length > 0 && (
            <View className="bg-surface rounded-xl border border-border p-4 gap-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-semibold text-foreground">
                  Progress
                </Text>
                <Text className="text-lg font-bold text-primary">
                  {completionPercentage}%
                </Text>
              </View>
              <View className="w-full h-2 bg-border rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </View>
              <Text className="text-xs text-muted text-center">
                {checkedMilestones} of {totalMilestones} milestones achieved
              </Text>
            </View>
          )}

          {/* Milestones Display */}
          {selectedMilestones.length > 0 ? (
            <View className="gap-4">
              {selectedMilestones.map((section, sectionIdx) => (
                <View key={sectionIdx} className="gap-3">
                  {/* Category Header */}
                  <View className="bg-primary/10 rounded-lg px-3 py-2">
                    <Text className="text-xs font-bold text-primary">
                      {section.category}
                    </Text>
                  </View>

                  {/* Milestones */}
                  {section.milestones.map((milestone, idx) => {
                    const key = `${sectionIdx}-${idx}`;
                    const isChecked = checkedItems[key] || false;
                    return (
                      <TouchableOpacity
                        key={key}
                        className={`flex-row gap-3 p-3 rounded-lg border ${
                          isChecked
                            ? "bg-primary/10 border-primary"
                            : "bg-surface border-border"
                        }`}
                        onPress={() => toggleMilestone(key)}
                      >
                        <View
                          className={`w-5 h-5 rounded border-2 items-center justify-center ${
                            isChecked
                              ? "bg-primary border-primary"
                              : "border-border"
                          }`}
                        >
                          {isChecked && (
                            <Text className="text-white text-xs font-bold">
                              ✓
                            </Text>
                          )}
                        </View>
                        <Text
                          className={`flex-1 text-sm ${
                            isChecked
                              ? "text-foreground font-semibold line-through opacity-60"
                              : "text-foreground"
                          }`}
                        >
                          {milestone.item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}

              {/* Clinical Notes */}
              <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
                <Text className="text-xs font-semibold text-primary">
                  CLINICAL NOTES
                </Text>
                <Text className="text-xs text-muted leading-relaxed">
                  • Milestones are guidelines, not rigid rules{"\n"}
                  • Children develop at different rates{"\n"}
                  • Prematurity should be considered for infants under 2 years{"\n"}
                  • Discuss concerns with pediatrician
                </Text>
              </View>
            </View>
          ) : (
            <View className="bg-surface rounded-xl border border-border p-6 items-center gap-3">
              <Text className="text-lg font-semibold text-foreground">
                Enter Age to View Milestones
              </Text>
              <Text className="text-sm text-muted text-center">
                Available ages: 3, 6, 12, 18, 24 months
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
                { label: "3 mo", value: "3" },
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
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
