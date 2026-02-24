import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

const MCHAT_QUESTIONS = [
  {
    id: 1,
    question: "Does your child enjoy being swung, bounced on your knee, etc.?",
    category: "Social Interaction",
  },
  {
    id: 2,
    question: "Does your child take an interest in other children?",
    category: "Social Interaction",
  },
  {
    id: 3,
    question: "Does your child like to climb on things?",
    category: "Motor Skills",
  },
  {
    id: 4,
    question: "Does your child enjoy playing peek-a-boo/hide-and-seek?",
    category: "Social Interaction",
  },
  {
    id: 5,
    question: "Does your child ever pretend to 'feed' a doll or stuffed animal?",
    category: "Imagination",
  },
  {
    id: 6,
    question: "Does your child ever point to indicate that s/he wants something?",
    category: "Communication",
  },
  {
    id: 7,
    question: "Does your child ever point to indicate that s/he wants to show you something?",
    category: "Communication",
  },
  {
    id: 8,
    question: "Can your child play properly with small toys (e.g. cars, blocks)?",
    category: "Play Skills",
  },
  {
    id: 9,
    question: "Does your child ever bring things to show you?",
    category: "Social Interaction",
  },
  {
    id: 10,
    question: "Does your child look you in the eye for more than a second or two?",
    category: "Eye Contact",
  },
  {
    id: 11,
    question: "Does your child ever seem oversensitive to noise?",
    category: "Sensory",
  },
  {
    id: 12,
    question: "Does your child smile in response to your face or your smiling at them?",
    category: "Social Interaction",
  },
  {
    id: 13,
    question: "Does your child imitate you?",
    category: "Imitation",
  },
  {
    id: 14,
    question: "Does your child respond to his/her name when you call?",
    category: "Communication",
  },
  {
    id: 15,
    question: "If you point at a toy across the room, does your child look at it?",
    category: "Joint Attention",
  },
  {
    id: 16,
    question: "Does your child walk?",
    category: "Motor Skills",
  },
  {
    id: 17,
    question: "Does your child look at things you are looking at?",
    category: "Joint Attention",
  },
  {
    id: 18,
    question: "Does your child make unusual finger movements near his/her face?",
    category: "Stereotyped Behaviors",
  },
  {
    id: 19,
    question: "Does your child try to attract your attention to his/her own activity?",
    category: "Social Interaction",
  },
  {
    id: 20,
    question: "Have you ever wondered if your child is deaf?",
    category: "Hearing",
  },
];

export default function ASDScreeningScreen() {
  const router = useRouter();
  const [responses, setResponses] = useState<Record<number, boolean | null>>({});
  const [showResults, setShowResults] = useState(false);

  const handleResponse = (id: number, response: boolean) => {
    setResponses((prev) => ({
      ...prev,
      [id]: response,
    }));
  };

  const calculateScore = () => {
    return Object.values(responses).filter((v) => v === false).length;
  };

  const getInterpretation = (score: number) => {
    if (score <= 2) {
      return {
        level: "Low Risk",
        color: "#22C55E",
        description:
          "Child is at low risk for autism. Continue routine developmental monitoring.",
      };
    } else if (score <= 7) {
      return {
        level: "Medium Risk",
        color: "#F59E0B",
        description:
          "Child is at medium risk. Consider follow-up evaluation with developmental specialist.",
      };
    } else {
      return {
        level: "High Risk",
        color: "#EF4444",
        description:
          "Child is at higher risk. Recommend comprehensive developmental evaluation.",
      };
    }
  };

  const score = calculateScore();
  const interpretation = getInterpretation(score);
  const completedCount = Object.keys(responses).length;

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="gap-2">
              <Text className="text-2xl font-bold text-foreground">
                ASD Screening (M-CHAT)
              </Text>
              <Text className="text-sm text-muted">
                Modified Checklist for Autism
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Text className="text-xl">←</Text>
            </TouchableOpacity>
          </View>

          {/* Progress */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-foreground">
                Progress
              </Text>
              <Text className="text-sm font-semibold text-primary">
                {completedCount}/{MCHAT_QUESTIONS.length}
              </Text>
            </View>
            <View className="w-full h-2 bg-border rounded-full overflow-hidden">
              <View
                className="h-full bg-primary rounded-full"
                style={{ width: `${(completedCount / MCHAT_QUESTIONS.length) * 100}%` }}
              />
            </View>
          </View>

          {/* Questions */}
          <View className="gap-3">
            {MCHAT_QUESTIONS.map((q, idx) => (
              <View
                key={q.id}
                className="bg-surface rounded-lg border border-border p-4 gap-3"
              >
                <View className="gap-2">
                  <View className="flex-row justify-between items-start">
                    <Text className="text-sm font-semibold text-foreground flex-1">
                      {q.id}. {q.question}
                    </Text>
                  </View>
                  <Text className="text-xs text-muted">{q.category}</Text>
                </View>

                {/* Response Buttons */}
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    className={`flex-1 p-2 rounded-lg border ${
                      responses[q.id] === true
                        ? "bg-primary border-primary"
                        : "bg-background border-border"
                    }`}
                    onPress={() => handleResponse(q.id, true)}
                  >
                    <Text
                      className={`text-center text-sm font-semibold ${
                        responses[q.id] === true ? "text-white" : "text-foreground"
                      }`}
                    >
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 p-2 rounded-lg border ${
                      responses[q.id] === false
                        ? "bg-error border-error"
                        : "bg-background border-border"
                    }`}
                    onPress={() => handleResponse(q.id, false)}
                  >
                    <Text
                      className={`text-center text-sm font-semibold ${
                        responses[q.id] === false ? "text-white" : "text-foreground"
                      }`}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Results Button */}
          {completedCount === MCHAT_QUESTIONS.length && (
            <TouchableOpacity
              className="bg-primary rounded-lg p-4 items-center active:opacity-80"
              onPress={() => setShowResults(!showResults)}
            >
              <Text className="text-white font-semibold">
                {showResults ? "Hide Results" : "View Results"}
              </Text>
            </TouchableOpacity>
          )}

          {/* Results */}
          {showResults && (
            <View className="gap-4">
              {/* Score Card */}
              <View
                className="rounded-xl border-2 p-6 items-center gap-3"
                style={{
                  borderColor: interpretation.color,
                  backgroundColor: interpretation.color + "15",
                }}
              >
                <Text className="text-xs font-semibold text-primary">
                  SCREENING RESULT
                </Text>
                <Text
                  className="text-3xl font-bold"
                  style={{ color: interpretation.color }}
                >
                  {interpretation.level}
                </Text>
                <Text className="text-sm text-center text-muted">
                  Risk Score: {score}/20
                </Text>
              </View>

              {/* Interpretation */}
              <View className="bg-surface rounded-xl border border-border p-4 gap-2">
                <Text className="text-sm font-semibold text-foreground">
                  Interpretation
                </Text>
                <Text className="text-sm text-muted leading-relaxed">
                  {interpretation.description}
                </Text>
              </View>

              {/* Clinical Notes */}
              <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
                <Text className="text-xs font-semibold text-primary">
                  IMPORTANT NOTES
                </Text>
                <Text className="text-xs text-muted leading-relaxed">
                  • M-CHAT is a screening tool, not a diagnostic instrument{"\n"}
                  • Results should be discussed with pediatrician{"\n"}
                  • Positive screen requires comprehensive evaluation{"\n"}
                  • Early intervention improves outcomes significantly
                </Text>
              </View>
            </View>
          )}

          {/* Information */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-3">
            <Text className="text-sm font-semibold text-foreground">
              About M-CHAT
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              The Modified Checklist for Autism in Toddlers (M-CHAT) is a
              validated screening tool for identifying children at risk for autism
              spectrum disorder. It is recommended for children 16-30 months of age.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
