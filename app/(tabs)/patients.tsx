import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
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
    // Navigate to add patient screen - will create this route
    alert("Add patient feature coming soon");
  };

  const handlePatientPress = (patientId: string) => {
    // Navigate to patient detail screen - will create this route
    alert(`Patient ${patientId} details coming soon`);
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
            <TouchableOpacity
              className="bg-primary rounded-full p-3 active:opacity-80"
              onPress={handleAddPatient}
            >
              <Text className="text-white text-xl font-bold">+</Text>
            </TouchableOpacity>
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
                <TouchableOpacity
                  key={patient.id}
                  className="bg-surface rounded-lg border border-border p-4 active:opacity-80"
                  onPress={() => handlePatientPress(patient.id)}
                >
                  <View className="flex-row items-start justify-between">
                    {/* Patient Info */}
                    <View className="flex-1 gap-2">
                      <Text className="text-base font-semibold text-foreground">{patient.name}</Text>
                      <View className="flex-row items-center gap-2">
                        <View className="bg-primary/20 rounded px-2 py-1">
                          <Text className="text-xs font-semibold text-primary">
                            {getAgeString(patient.dateOfBirth)} yrs • {patient.gender === "M" ? "Boy" : "Girl"}
                          </Text>
                        </View>
                        <Text className="text-xs text-muted">DOB: {patient.dateOfBirth}</Text>
                      </View>
                      <Text className="text-xs text-muted">Parent: {patient.parentName}</Text>
                      {patient.lastVisit && (
                        <Text className="text-xs text-muted">Last visit: {patient.lastVisit}</Text>
                      )}
                    </View>

                    {/* Notes Count */}
                    <View className="items-center justify-center bg-primary/10 rounded-lg p-2 min-w-12">
                      <Text className="text-sm font-bold text-primary">{patient.notes.length}</Text>
                      <Text className="text-xs text-muted">notes</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="bg-surface rounded-lg border border-border p-8 items-center justify-center gap-3">
              <Text className="text-2xl">👶</Text>
              <Text className="text-sm font-semibold text-foreground">No Patients Yet</Text>
              <Text className="text-xs text-muted text-center">
                {searchQuery ? "No patients match your search" : "Add your first patient to get started"}
              </Text>
              {!searchQuery && (
                <TouchableOpacity
                  className="bg-primary rounded-lg px-4 py-2 mt-2 active:opacity-80"
                  onPress={handleAddPatient}
                >
                  <Text className="text-white text-sm font-semibold">Add Patient</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Info Card */}
          <View className="bg-primary/10 border border-primary rounded-lg p-4 gap-2">
            <Text className="text-xs font-semibold text-primary">PATIENT MANAGEMENT</Text>
            <Text className="text-xs text-muted">
              Tap a patient to view details, add clinical notes, and track medical history. All patient data is securely stored locally.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
