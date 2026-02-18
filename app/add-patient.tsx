import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { usePatient } from "@/lib/patient-context";

export default function AddPatientScreen() {
  const router = useRouter();
  const { addPatient } = usePatient();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "M" as "M" | "F",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    medicalHistory: "",
    allergies: "",
    currentMedications: "",
  });

  const handleAddPatient = async () => {
    if (!formData.name || !formData.dateOfBirth || !formData.parentName) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await addPatient({
        ...formData,
        age: calculateAge(formData.dateOfBirth),
        status: "active",
      });
      Alert.alert("Success", "Patient added successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to add patient");
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Add New Patient</Text>
            <Text className="text-sm text-muted">Create a new patient record</Text>
          </View>

          {/* Form */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-4">
            {/* Patient Name */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Patient Name *</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="e.g., John Doe"
                placeholderTextColor="#687076"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
            </View>

            {/* Date of Birth */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Date of Birth (YYYY-MM-DD) *</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="e.g., 2015-05-20"
                placeholderTextColor="#687076"
                value={formData.dateOfBirth}
                onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
              />
            </View>

            {/* Gender */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Gender</Text>
              <View className="flex-row gap-3">
                {["M", "F"].map((g) => (
                  <TouchableOpacity
                    key={g}
                    className={`flex-1 p-3 rounded-lg border ${
                      formData.gender === g ? "bg-primary border-primary" : "bg-background border-border"
                    }`}
                    onPress={() => setFormData({ ...formData, gender: g as "M" | "F" })}
                  >
                    <Text className={`text-center font-semibold ${formData.gender === g ? "text-white" : "text-foreground"}`}>
                      {g === "M" ? "Male" : "Female"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Parent Name */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Parent/Guardian Name *</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="e.g., Jane Doe"
                placeholderTextColor="#687076"
                value={formData.parentName}
                onChangeText={(text) => setFormData({ ...formData, parentName: text })}
              />
            </View>

            {/* Parent Email */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Parent Email</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="e.g., jane@example.com"
                placeholderTextColor="#687076"
                value={formData.parentEmail}
                onChangeText={(text) => setFormData({ ...formData, parentEmail: text })}
                keyboardType="email-address"
              />
            </View>

            {/* Parent Phone */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Parent Phone</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="e.g., +1-555-0123"
                placeholderTextColor="#687076"
                value={formData.parentPhone}
                onChangeText={(text) => setFormData({ ...formData, parentPhone: text })}
                keyboardType="phone-pad"
              />
            </View>

            {/* Medical History */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Medical History</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="e.g., Asthma, eczema..."
                placeholderTextColor="#687076"
                value={formData.medicalHistory}
                onChangeText={(text) => setFormData({ ...formData, medicalHistory: text })}
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Allergies */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Allergies</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="e.g., Peanuts, penicillin..."
                placeholderTextColor="#687076"
                value={formData.allergies}
                onChangeText={(text) => setFormData({ ...formData, allergies: text })}
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Current Medications */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Current Medications</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="e.g., Albuterol inhaler..."
                placeholderTextColor="#687076"
                value={formData.currentMedications}
                onChangeText={(text) => setFormData({ ...formData, currentMedications: text })}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View className="gap-3">
            <TouchableOpacity
              className="bg-primary rounded-lg p-4 items-center active:opacity-80"
              onPress={handleAddPatient}
              disabled={loading}
            >
              <Text className="text-white font-semibold">{loading ? "Adding..." : "Add Patient"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface border border-border rounded-lg p-4 items-center active:opacity-80"
              onPress={() => router.back()}
              disabled={loading}
            >
              <Text className="text-foreground font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
            <Text className="text-xs font-semibold text-primary">REQUIRED FIELDS</Text>
            <Text className="text-xs text-muted">Fields marked with * are required to create a patient record.</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
