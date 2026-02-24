import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

const CRITICAL_VALUES = [
  {
    category: "Electrolytes",
    values: [
      {
        test: "Sodium (Na+)",
        critical: "< 120 or > 160 mEq/L",
        action: "Notify physician immediately",
        risk: "Seizures, altered mental status, coma",
      },
      {
        test: "Potassium (K+)",
        critical: "< 2.5 or > 6.5 mEq/L",
        action: "Notify physician immediately",
        risk: "Cardiac arrhythmias, muscle weakness",
      },
      {
        test: "Calcium (Ca2+)",
        critical: "< 6.5 or > 13 mg/dL",
        action: "Notify physician immediately",
        risk: "Seizures, tetany, cardiac arrhythmias",
      },
    ],
  },
  {
    category: "Blood Glucose",
    values: [
      {
        test: "Glucose",
        critical: "< 40 or > 500 mg/dL",
        action: "Notify physician immediately",
        risk: "Hypoglycemic seizures, DKA, HHS",
      },
    ],
  },
  {
    category: "Hematology",
    values: [
      {
        test: "Hemoglobin",
        critical: "< 5 or > 20 g/dL",
        action: "Notify physician immediately",
        risk: "Severe anemia, polycythemia complications",
      },
      {
        test: "Platelet Count",
        critical: "< 20,000 or > 1,000,000/μL",
        action: "Notify physician immediately",
        risk: "Bleeding, thrombosis",
      },
      {
        test: "WBC Count",
        critical: "< 2,000 or > 30,000/μL",
        action: "Notify physician immediately",
        risk: "Infection, leukemia",
      },
    ],
  },
  {
    category: "Coagulation",
    values: [
      {
        test: "INR",
        critical: "> 4",
        action: "Notify physician immediately",
        risk: "Bleeding risk",
      },
      {
        test: "Partial Thromboplastin Time (PTT)",
        critical: "> 100 seconds",
        action: "Notify physician immediately",
        risk: "Bleeding risk",
      },
    ],
  },
  {
    category: "Renal Function",
    values: [
      {
        test: "Creatinine",
        critical: "> 3 mg/dL (age-dependent)",
        action: "Notify physician immediately",
        risk: "Acute kidney injury",
      },
      {
        test: "BUN",
        critical: "> 100 mg/dL",
        action: "Notify physician immediately",
        risk: "Uremia, dehydration",
      },
    ],
  },
  {
    category: "Liver Function",
    values: [
      {
        test: "Bilirubin",
        critical: "> 20 mg/dL (age-dependent)",
        action: "Notify physician immediately",
        risk: "Kernicterus, hepatic failure",
      },
      {
        test: "AST/ALT",
        critical: "> 1000 IU/L",
        action: "Notify physician immediately",
        risk: "Acute hepatitis, liver failure",
      },
    ],
  },
  {
    category: "Arterial Blood Gas",
    values: [
      {
        test: "pH",
        critical: "< 7.0 or > 7.7",
        action: "Notify physician immediately",
        risk: "Severe acidosis/alkalosis",
      },
      {
        test: "pCO2",
        critical: "< 15 or > 90 mmHg",
        action: "Notify physician immediately",
        risk: "Respiratory failure",
      },
      {
        test: "pO2",
        critical: "< 40 mmHg",
        action: "Notify physician immediately",
        risk: "Hypoxemia",
      },
    ],
  },
];

export default function CriticalValuesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="gap-2">
              <Text className="text-2xl font-bold text-foreground">
                Critical Values Guide
              </Text>
              <Text className="text-sm text-muted">
                Lab values requiring immediate action
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Text className="text-xl">←</Text>
            </TouchableOpacity>
          </View>

          {/* Category Selection */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              Select Category
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="gap-2"
              contentContainerStyle={{ gap: 8 }}
            >
              {CRITICAL_VALUES.map((cat, idx) => (
                <TouchableOpacity
                  key={idx}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCategory === idx
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => setSelectedCategory(idx)}
                >
                  <Text
                    className={`text-sm font-semibold whitespace-nowrap ${
                      selectedCategory === idx ? "text-white" : "text-foreground"
                    }`}
                  >
                    {cat.category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Critical Values */}
          <View className="gap-3">
            {CRITICAL_VALUES[selectedCategory].values.map((value, idx) => (
              <View
                key={idx}
                className="bg-surface rounded-lg border-2 border-error p-4 gap-3"
              >
                {/* Test Name */}
                <View className="gap-1">
                  <Text className="text-sm font-bold text-foreground">
                    {value.test}
                  </Text>
                  <View className="bg-error/20 px-2 py-1 rounded self-start">
                    <Text className="text-xs font-bold text-error">
                      CRITICAL
                    </Text>
                  </View>
                </View>

                {/* Critical Range */}
                <View className="gap-1">
                  <Text className="text-xs font-semibold text-muted">
                    CRITICAL RANGE
                  </Text>
                  <Text className="text-sm font-bold text-error">
                    {value.critical}
                  </Text>
                </View>

                {/* Action Required */}
                <View className="gap-1 bg-error/10 p-2 rounded">
                  <Text className="text-xs font-semibold text-error">
                    ACTION REQUIRED
                  </Text>
                  <Text className="text-sm text-foreground">
                    {value.action}
                  </Text>
                </View>

                {/* Risk */}
                <View className="gap-1">
                  <Text className="text-xs font-semibold text-muted">
                    CLINICAL RISK
                  </Text>
                  <Text className="text-sm text-muted">{value.risk}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Important Notes */}
          <View className="bg-error/10 border border-error rounded-lg p-4 gap-2">
            <Text className="text-xs font-semibold text-error">
              IMPORTANT NOTES
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              • Critical values require immediate physician notification{"\n"}
              • Document notification time and person notified{"\n"}
              • Critical values may vary by institution{"\n"}
              • Always follow your facility's critical value policy{"\n"}
              • Age-specific values may apply for pediatric patients
            </Text>
          </View>

          {/* Protocol */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-3">
            <Text className="text-sm font-semibold text-foreground">
              Notification Protocol
            </Text>
            <View className="gap-2">
              <View className="flex-row gap-2 items-start">
                <Text className="text-primary font-bold">1.</Text>
                <Text className="text-sm text-muted flex-1">
                  Verify the result immediately
                </Text>
              </View>
              <View className="flex-row gap-2 items-start">
                <Text className="text-primary font-bold">2.</Text>
                <Text className="text-sm text-muted flex-1">
                  Notify the ordering physician directly
                </Text>
              </View>
              <View className="flex-row gap-2 items-start">
                <Text className="text-primary font-bold">3.</Text>
                <Text className="text-sm text-muted flex-1">
                  Document notification in patient record
                </Text>
              </View>
              <View className="flex-row gap-2 items-start">
                <Text className="text-primary font-bold">4.</Text>
                <Text className="text-sm text-muted flex-1">
                  Follow physician's orders for management
                </Text>
              </View>
              <View className="flex-row gap-2 items-start">
                <Text className="text-primary font-bold">5.</Text>
                <Text className="text-sm text-muted flex-1">
                  Repeat testing as ordered
                </Text>
              </View>
            </View>
          </View>

          {/* Reference */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-3">
            <Text className="text-sm font-semibold text-foreground">
              Reference Information
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              Critical values are laboratory results that indicate a life-threatening
              situation. Immediate notification to the ordering physician is required.
              These values may vary by institution and age group.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
