import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import {
  heightInfants,
  weightInfants,
  bmiChildren,
  interpolateGrowthData,
  calculatePercentile,
  classifyGrowthStatus,
} from "@/lib/growth-data";

export default function GrowthChartsScreen() {
  const router = useRouter();
  const [chartType, setChartType] = useState<"height" | "weight" | "bmi">("height");
  const [gender, setGender] = useState<"M" | "F">("M");
  const [ageMonths, setAgeMonths] = useState("12");
  const [measurement, setMeasurement] = useState("");
  const [result, setResult] = useState<{
    percentile: number;
    status: string;
    color: string;
    description: string;
  } | null>(null);

  const handleCalculate = () => {
    if (!ageMonths || !measurement) {
      Alert.alert("Error", "Please enter age and measurement");
      return;
    }

    const age = parseInt(ageMonths);
    const value = parseFloat(measurement);

    if (isNaN(age) || isNaN(value) || age < 0 || value < 0) {
      Alert.alert("Error", "Please enter valid numbers");
      return;
    }

    let data;
    switch (chartType) {
      case "height":
        data = gender === "M" ? heightInfants.boys : heightInfants.girls;
        break;
      case "weight":
        data = gender === "M" ? weightInfants.boys : weightInfants.girls;
        break;
      case "bmi":
        data = gender === "M" ? bmiChildren.boys : bmiChildren.girls;
        break;
    }

    const percentile = calculatePercentile(data, age, value);
    const status = classifyGrowthStatus(percentile);

    setResult({
      percentile,
      ...status,
    });
  };

  const getChartLabel = () => {
    switch (chartType) {
      case "height":
        return "Height (cm)";
      case "weight":
        return "Weight (kg)";
      case "bmi":
        return "BMI (kg/m²)";
    }
  };

  const getReferenceRange = () => {
    const age = parseInt(ageMonths);
    let data;

    switch (chartType) {
      case "height":
        data = gender === "M" ? heightInfants.boys : heightInfants.girls;
        break;
      case "weight":
        data = gender === "M" ? weightInfants.boys : weightInfants.girls;
        break;
      case "bmi":
        data = gender === "M" ? bmiChildren.boys : bmiChildren.girls;
        break;
    }

    const point = interpolateGrowthData(data, age);
    if (!point) return null;

    return {
      p50: point.p50.toFixed(1),
      p25: point.p25.toFixed(1),
      p75: point.p75.toFixed(1),
      p5: point.p5.toFixed(1),
      p95: point.p95.toFixed(1),
    };
  };

  const reference = getReferenceRange();

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="gap-2">
              <Text className="text-2xl font-bold text-foreground">Growth Charts</Text>
              <Text className="text-sm text-muted">WHO/CDC Percentile Calculator</Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Text className="text-xl">←</Text>
            </TouchableOpacity>
          </View>

          {/* Chart Type Selection */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Chart Type</Text>
            <View className="flex-row gap-2">
              {(["height", "weight", "bmi"] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  className={`flex-1 p-3 rounded-lg border ${
                    chartType === type ? "bg-primary border-primary" : "bg-surface border-border"
                  }`}
                  onPress={() => setChartType(type)}
                >
                  <Text
                    className={`text-center text-xs font-semibold ${
                      chartType === type ? "text-white" : "text-foreground"
                    }`}
                  >
                    {type === "height" ? "Height" : type === "weight" ? "Weight" : "BMI"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Gender Selection */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Gender</Text>
            <View className="flex-row gap-3">
              {["M", "F"].map((g) => (
                <TouchableOpacity
                  key={g}
                  className={`flex-1 p-3 rounded-lg border ${
                    gender === (g as "M" | "F") ? "bg-primary border-primary" : "bg-surface border-border"
                  }`}
                  onPress={() => setGender(g as "M" | "F")}
                >
                  <Text
                    className={`text-center font-semibold ${
                      gender === (g as "M" | "F") ? "text-white" : "text-foreground"
                    }`}
                  >
                    {g === "M" ? "Boy" : "Girl"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Input Fields */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-4">
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Age (months)</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="e.g., 12"
                placeholderTextColor="#687076"
                value={ageMonths}
                onChangeText={setAgeMonths}
                keyboardType="decimal-pad"
              />
            </View>

            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">{getChartLabel()}</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder={`e.g., ${chartType === "height" ? "75" : chartType === "weight" ? "10" : "15"}`}
                placeholderTextColor="#687076"
                value={measurement}
                onChangeText={setMeasurement}
                keyboardType="decimal-pad"
              />
            </View>

            <TouchableOpacity
              className="bg-primary rounded-lg p-4 items-center active:opacity-80 mt-2"
              onPress={handleCalculate}
            >
              <Text className="text-white font-semibold">Calculate Percentile</Text>
            </TouchableOpacity>
          </View>

          {/* Results */}
          {result && (
            <View className="gap-4">
              {/* Percentile Result */}
              <View className="bg-surface rounded-xl border border-border p-6 items-center gap-3">
                <Text className="text-xs font-semibold text-primary">PERCENTILE RESULT</Text>
                <View className="items-center gap-2">
                  <Text className="text-4xl font-bold" style={{ color: result.color }}>
                    {result.percentile}
                  </Text>
                  <Text className="text-sm font-semibold text-foreground">th percentile</Text>
                </View>
                <View className="w-full h-1 bg-border rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${result.percentile}%`,
                      backgroundColor: result.color,
                    }}
                  />
                </View>
              </View>

              {/* Status */}
              <View
                className="rounded-xl border p-4 gap-2"
                style={{
                  borderColor: result.color,
                  backgroundColor: result.color + "15",
                }}
              >
                <Text className="text-sm font-semibold" style={{ color: result.color }}>
                  {result.status}
                </Text>
                <Text className="text-xs text-muted">{result.description}</Text>
              </View>

              {/* Reference Values */}
              {reference && (
                <View className="bg-surface rounded-xl border border-border p-4 gap-3">
                  <Text className="text-xs font-semibold text-primary">REFERENCE PERCENTILES</Text>
                  <View className="gap-2">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-xs text-muted">5th percentile:</Text>
                      <Text className="text-sm font-semibold text-foreground">{reference.p5}</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-xs text-muted">25th percentile:</Text>
                      <Text className="text-sm font-semibold text-foreground">{reference.p25}</Text>
                    </View>
                    <View className="flex-row justify-between items-center bg-primary/10 rounded px-2 py-1">
                      <Text className="text-xs font-semibold text-primary">50th percentile (Median):</Text>
                      <Text className="text-sm font-bold text-primary">{reference.p50}</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-xs text-muted">75th percentile:</Text>
                      <Text className="text-sm font-semibold text-foreground">{reference.p75}</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-xs text-muted">95th percentile:</Text>
                      <Text className="text-sm font-semibold text-foreground">{reference.p95}</Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Clinical Notes */}
              <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
                <Text className="text-xs font-semibold text-primary">CLINICAL NOTES</Text>
                <Text className="text-xs text-muted leading-relaxed">
                  • Growth charts are screening tools, not diagnostic tools{"\n"}
                  • Serial measurements are more valuable than single measurements{"\n"}
                  • Consider genetics, nutrition, and overall health status{"\n"}
                  • Refer to pediatrician if growth concerns persist
                </Text>
              </View>
            </View>
          )}

          {/* Info Card */}
          <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
            <Text className="text-xs font-semibold text-primary">ABOUT THIS TOOL</Text>
            <Text className="text-xs text-muted leading-relaxed">
              This tool uses CDC 2000 growth charts and WHO standards for pediatric growth assessment. It calculates
              percentiles for height, weight, and BMI based on age and gender.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
