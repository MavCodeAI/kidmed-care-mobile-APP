import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

const PAIN_SCALES = [
  {
    name: "FLACC Scale",
    ageRange: "0-3 years",
    description: "Face, Legs, Activity, Cry, Consolability",
    categories: [
      {
        name: "Face",
        scores: [
          { score: 0, description: "No particular expression or smile" },
          { score: 1, description: "Occasional grimace or frown, withdrawn" },
          { score: 2, description: "Frequent to constant quivering chin, clenched jaw" },
        ],
      },
      {
        name: "Legs",
        scores: [
          { score: 0, description: "Normal position or relaxed" },
          { score: 1, description: "Uneasy, restless, tense" },
          { score: 2, description: "Kicking or legs drawn up" },
        ],
      },
      {
        name: "Activity",
        scores: [
          { score: 0, description: "Lying quietly, normal position" },
          { score: 1, description: "Squirming, shifting back and forth" },
          { score: 2, description: "Arched, rigid or jerking" },
        ],
      },
      {
        name: "Cry",
        scores: [
          { score: 0, description: "No cry" },
          { score: 1, description: "Moaning or whimpering" },
          { score: 2, description: "Crying steadily or screaming" },
        ],
      },
      {
        name: "Consolability",
        scores: [
          { score: 0, description: "Content, relaxed" },
          { score: 1, description: "Reassured by touch or voice" },
          { score: 2, description: "Difficult to console or comfort" },
        ],
      },
    ],
  },
  {
    name: "Numeric Rating Scale",
    ageRange: "4+ years",
    description: "0-10 scale with faces",
    categories: [
      {
        name: "Pain Level",
        scores: [
          { score: 0, description: "No pain" },
          { score: 5, description: "Moderate pain" },
          { score: 10, description: "Worst pain ever" },
        ],
      },
    ],
  },
];

export default function PainAssessmentScreen() {
  const router = useRouter();
  const [selectedScale, setSelectedScale] = useState<number>(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [totalScore, setTotalScore] = useState<number | null>(null);

  const handleScoreSelect = (category: string, score: number) => {
    const newScores = { ...scores, [category]: score };
    setScores(newScores);

    // Calculate total
    const total = Object.values(newScores).reduce((sum, s) => sum + (s || 0), 0);
    setTotalScore(total);
  };

  const scale = PAIN_SCALES[selectedScale];

  const getInterpretation = (score: number, scale: number) => {
    if (scale === 0) {
      // FLACC
      if (score === 0) {
        return {
          level: "No pain",
          color: "#22C55E",
          description: "Child appears comfortable",
        };
      } else if (score <= 3) {
        return {
          level: "Mild pain",
          color: "#84CC16",
          description: "Child has minimal pain, may need comfort measures",
        };
      } else if (score <= 6) {
        return {
          level: "Moderate pain",
          color: "#F59E0B",
          description: "Child has moderate pain, consider pain management",
        };
      } else {
        return {
          level: "Severe pain",
          color: "#EF4444",
          description: "Child has severe pain, immediate intervention needed",
        };
      }
    } else {
      // Numeric
      if (score === 0) {
        return {
          level: "No pain",
          color: "#22C55E",
          description: "Child is pain-free",
        };
      } else if (score <= 3) {
        return {
          level: "Mild pain",
          color: "#84CC16",
          description: "Minimal discomfort, monitor closely",
        };
      } else if (score <= 6) {
        return {
          level: "Moderate pain",
          color: "#F59E0B",
          description: "Significant discomfort, consider intervention",
        };
      } else {
        return {
          level: "Severe pain",
          color: "#EF4444",
          description: "Severe pain, urgent intervention required",
        };
      }
    }
  };

  const interpretation =
    totalScore !== null ? getInterpretation(totalScore, selectedScale) : null;

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="gap-2">
              <Text className="text-2xl font-bold text-foreground">
                Pain Assessment
              </Text>
              <Text className="text-sm text-muted">
                Pediatric pain evaluation tools
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Text className="text-xl">←</Text>
            </TouchableOpacity>
          </View>

          {/* Scale Selection */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">
              Select Pain Scale
            </Text>
            <View className="gap-2">
              {PAIN_SCALES.map((s, idx) => (
                <TouchableOpacity
                  key={idx}
                  className={`p-4 rounded-lg border ${
                    selectedScale === idx
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => {
                    setSelectedScale(idx);
                    setScores({});
                    setTotalScore(null);
                  }}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      selectedScale === idx ? "text-white" : "text-foreground"
                    }`}
                  >
                    {s.name}
                  </Text>
                  <Text
                    className={`text-xs mt-1 ${
                      selectedScale === idx ? "text-white/80" : "text-muted"
                    }`}
                  >
                    {s.ageRange} • {s.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Assessment */}
          <View className="gap-4">
            {scale.categories.map((category, catIdx) => (
              <View key={catIdx} className="gap-2">
                <Text className="text-sm font-semibold text-foreground">
                  {category.name}
                </Text>
                <View className="gap-2">
                  {category.scores.map((item, itemIdx) => (
                    <TouchableOpacity
                      key={itemIdx}
                      className={`p-3 rounded-lg border ${
                        scores[category.name] === item.score
                          ? "bg-primary border-primary"
                          : "bg-surface border-border"
                      }`}
                      onPress={() =>
                        handleScoreSelect(category.name, item.score)
                      }
                    >
                      <View className="flex-row justify-between items-start">
                        <Text
                          className={`flex-1 text-sm ${
                            scores[category.name] === item.score
                              ? "text-white font-semibold"
                              : "text-foreground"
                          }`}
                        >
                          {item.description}
                        </Text>
                        <Text
                          className={`text-lg font-bold ml-2 ${
                            scores[category.name] === item.score
                              ? "text-white"
                              : "text-primary"
                          }`}
                        >
                          {item.score}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Results */}
          {totalScore !== null && (
            <View className="gap-4">
              {/* Score Card */}
              <View
                className="rounded-xl border-2 p-6 items-center gap-3"
                style={{
                  borderColor: interpretation?.color,
                  backgroundColor: interpretation?.color + "15",
                }}
              >
                <Text className="text-xs font-semibold text-primary">
                  PAIN ASSESSMENT
                </Text>
                <Text
                  className="text-4xl font-bold"
                  style={{ color: interpretation?.color }}
                >
                  {totalScore}
                </Text>
                <Text
                  className="text-lg font-semibold"
                  style={{ color: interpretation?.color }}
                >
                  {interpretation?.level}
                </Text>
              </View>

              {/* Interpretation */}
              <View className="bg-surface rounded-xl border border-border p-4 gap-2">
                <Text className="text-sm font-semibold text-foreground">
                  Assessment
                </Text>
                <Text className="text-sm text-muted leading-relaxed">
                  {interpretation?.description}
                </Text>
              </View>

              {/* Recommendations */}
              <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
                <Text className="text-xs font-semibold text-primary">
                  MANAGEMENT RECOMMENDATIONS
                </Text>
                <Text className="text-xs text-muted leading-relaxed">
                  • Assess pain regularly using same scale{"\n"}
                  • Document pain scores in patient record{"\n"}
                  • Implement age-appropriate pain relief measures{"\n"}
                  • Re-assess after intervention{"\n"}
                  • Involve parents/caregivers in comfort measures
                </Text>
              </View>
            </View>
          )}

          {/* Information */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-3">
            <Text className="text-sm font-semibold text-foreground">
              About Pain Scales
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              FLACC is recommended for non-verbal children and those unable to
              self-report pain. Numeric scales work best for children 4+ years who
              can understand numbers and concepts.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
