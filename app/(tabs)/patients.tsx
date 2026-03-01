import { useState, useEffect } from "react";
import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
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
    <ScreenContainer className="bg-black">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-3xl font-bold text-white">Patients</Text>
            <Pressable
              onPress={handleAddPatient}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#00dd00" : "#00ff00",
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text className="text-sm font-semibold text-black">+ Add</Text>
            </Pressable>
          </View>

          {/* Search Bar */}
          <TextInput
            placeholder="Search patients..."
            placeholderTextColor="#666666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              backgroundColor: "#1a1a1a",
              borderWidth: 1,
              borderColor: "#00ff00",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              color: "#ffffff",
              fontSize: 14,
            }}
          />

          {/* Patient List */}
          <View className="gap-3">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <Pressable
                  key={patient.id}
                  onPress={() => handlePatientPress(patient.id)}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#0f3a0f" : "#0a2a0a",
                      borderWidth: 1,
                      borderColor: "#00ff00",
                      borderRadius: 10,
                      padding: 14,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-green-500">{patient.name}</Text>
                      <Text className="text-xs text-gray-400 mt-1">
                        Age: {getAgeString(patient.dateOfBirth)} | DOB: {patient.dateOfBirth}
                      </Text>
                    </View>
                    <Text className="text-green-500 text-lg">→</Text>
                  </View>
                </Pressable>
              ))
            ) : (
              <View className="bg-gray-900 rounded-xl p-8 items-center">
                <Text className="text-gray-400 text-center">No patients yet. Add your first patient to get started.</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
