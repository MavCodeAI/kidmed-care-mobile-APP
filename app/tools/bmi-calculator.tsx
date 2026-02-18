import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useClinicalTools } from "@/lib/clinical-tools-context";

export default function BMICalculatorScreen() {
  const { calculateBMI } = useClinicalTools();
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState<"M" | "F">("M");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (!age || !height || !weight) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const bmiResult = calculateBMI(parseInt(age), parseFloat(height), parseFloat(weight), gender);
      setResult(bmiResult);
    } catch (error) {
      Alert.alert("Error", "Invalid input values");
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "underweight":
        return "text-warning";
      case "normal":
        return "text-success";
      case "overweight":
        return "text-warning";
      case "obese":
        return "text-error";
      default:
        return "text-foreground";
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">BMI Calculator</Text>
            <Text className="text-sm text-muted">Pediatric BMI and percentile assessment</Text>
          </View>

          {!result ? (
            <>
              {/* Input Section */}
              <View className="bg-surface rounded-xl p-4 border border-border gap-4">
                {/* Age Input */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">Age (years)</Text>
                  <TextInput
                    className="bg-background border border-border rounded-lg p-3 text-foreground"
                    placeholder="e.g., 10"
                    placeholderTextColor="#687076"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                  />
                </View>

                {/* Height Input */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">Height (cm)</Text>
                  <TextInput
                    className="bg-background border border-border rounded-lg p-3 text-foreground"
                    placeholder="e.g., 140"
                    placeholderTextColor="#687076"
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="decimal-pad"
                  />
                </View>

                {/* Weight Input */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">Weight (kg)</Text>
                  <TextInput
                    className="bg-background border border-border rounded-lg p-3 text-foreground"
                    placeholder="e.g., 35"
                    placeholderTextColor="#687076"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="decimal-pad"
                  />
                </View>

                {/* Gender Selection */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">Gender</Text>
                  <View className="flex-row gap-3">
                    {["M", "F"].map((g) => (
                      <TouchableOpacity
                        key={g}
                        className={`flex-1 p-3 rounded-lg border ${
                          gender === g ? "bg-primary border-primary" : "bg-background border-border"
                        }`}
                        onPress={() => setGender(g as "M" | "F")}
                      >
                        <Text className={`text-center font-semibold ${gender === g ? "text-white" : "text-foreground"}`}>
                          {g === "M" ? "Male" : "Female"}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Calculate Button */}
                <TouchableOpacity className="bg-primary rounded-lg p-4 items-center active:opacity-80" onPress={handleCalculate}>
                  <Text className="text-white font-semibold">Calculate BMI</Text>
                </TouchableOpacity>
              </View>

              {/* Information Card */}
              <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
                <Text className="text-xs font-semibold text-primary">BMI CATEGORIES</Text>
                <Text className="text-xs text-muted">Underweight: BMI &lt; 5th percentile</Text>
                <Text className="text-xs text-muted">Normal: BMI 5th-85th percentile</Text>
                <Text className="text-xs text-muted">Overweight: BMI 85th-95th percentile</Text>
                <Text className="text-xs text-muted">Obese: BMI ≥ 95th percentile</Text>
              </View>
            </>
          ) : (
            <>
              {/* Result Display */}
              <View className="bg-surface rounded-xl p-6 border border-border gap-4">
                <View className="items-center gap-2">
                  <Text className="text-4xl font-bold text-foreground">{result.bmi}</Text>
                  <Text className={`text-lg font-semibold ${getCategoryColor(result.category)}`}>
                    {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
                  </Text>
                </View>

                <View className="border-t border-border pt-4 gap-3">
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-muted">Percentile:</Text>
                    <Text className="text-sm font-semibold text-foreground">{result.percentile}th</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-muted">Age Group:</Text>
                    <Text className="text-sm font-semibold text-foreground">{result.ageGroup}</Text>
                  </View>
                </View>
              </View>

              {/* Interpretation */}
              <View className="bg-surface rounded-xl p-4 border border-border gap-3">
                <Text className="text-base font-semibold text-foreground">Interpretation</Text>
                <Text className="text-sm text-muted leading-relaxed">
                  {result.category === "normal"
                    ? "Child has a healthy weight for their age and height. Continue monitoring growth at regular intervals."
                    : result.category === "underweight"
                      ? "Child is below healthy weight range. Consider nutritional assessment and follow-up."
                      : result.category === "overweight"
                        ? "Child is above healthy weight range. Consider lifestyle modifications and follow-up."
                        : "Child is significantly above healthy weight range. Recommend comprehensive evaluation and intervention."}
                </Text>
              </View>

              {/* Action Button */}
              <TouchableOpacity
                className="bg-surface border border-border rounded-lg p-4 items-center active:opacity-80"
                onPress={() => setResult(null)}
              >
                <Text className="text-foreground font-semibold">Calculate Again</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
