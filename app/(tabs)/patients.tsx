import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { usePatient } from "@/lib/patient-context";

export default function PatientsScreen() {
  const router = useRouter();
  const { patients, getActivePatients, searchPatients } = usePatient();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(patients);

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredPatients(searchPatients(searchQuery));
    } else {
      setFilteredPatients(getActivePatients());
    }
  }, [searchQuery, patients]);

  const handleAddPatient = () => {
    router.push("/add-patient" as any);
  };

  const handlePatientPress = (patientId: string) => {
    router.push({
      pathname: "/patient-detail",
      params: { id: patientId },
    } as any);
  };

  const getAgeString = (dob: string) => {
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
        <View className="p-6 gap-4">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="gap-1">
              <Text className="text-2xl font-bold text-foreground">Patients</Text>
              <Text className="text-sm text-muted">{filteredPatients.length} active patients</Text>
            </View>
            <Pressable
              onPress={handleAddPatient}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#0a6a8f" : "#0a7ea4",
                  borderRadius: 50,
                  padding: 12,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text className="text-white text-xl font-bold">+</Text>
            </Pressable>
          </View>

          {/* Search Bar */}
          <View className="bg-surface rounded-lg border border-border p-3 flex-row items-center gap-2">
            <Text className="text-lg text-muted">🔍</Text>
            <TextInput
              className="flex-1 text-foreground"
              placeholder="Search by name or parent..."
              placeholderTextColor="#687076"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Patients List */}
          {filteredPatients.length > 0 ? (
            <View className="gap-3">
              {filteredPatients.map((patient) => (
                <Pressable
                  key={patient.id}
                  onPress={() => handlePatientPress(patient.id)}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#e8e8e8" : "#f5f5f5",
                      borderRadius: 12,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">
                        {patient.name}
                      </Text>
                      <Text className="text-xs text-muted mt-1">
                        Age: {getAgeString(patient.dateOfBirth)} | {patient.gender}
                      </Text>
                      <Text className="text-xs text-muted mt-1">
                        Parent: {patient.parentName}
                      </Text>
                    </View>
                    <Text className="text-lg">→</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View className="bg-surface rounded-xl border border-border p-8 items-center justify-center gap-3">
              <Text className="text-lg font-semibold text-foreground">No Patients Yet</Text>
              <Text className="text-sm text-muted text-center">
                Add your first patient to get started with clinical assessments
              </Text>
              <Pressable
                onPress={handleAddPatient}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#0a6a8f" : "#0a7ea4",
                    borderRadius: 8,
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text className="text-white text-sm font-semibold">Add Patient</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
