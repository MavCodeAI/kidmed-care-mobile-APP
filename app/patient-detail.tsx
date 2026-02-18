import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { usePatient } from "@/lib/patient-context";

export default function PatientDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getPatient, addNote, getPatientNotes, updatePatient } = usePatient();
  const [noteContent, setNoteContent] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  const patient = id ? getPatient(id as string) : null;
  const notes = id ? getPatientNotes(id as string) : [];

  if (!patient) {
    return (
      <ScreenContainer className="bg-background">
        <View className="flex-1 items-center justify-center">
          <Text className="text-foreground">Patient not found</Text>
          <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-primary px-4 py-2 rounded-lg">
            <Text className="text-white">Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  const handleAddNote = async () => {
    if (!noteContent.trim()) {
      Alert.alert("Error", "Please enter a note");
      return;
    }

    setAddingNote(true);
    try {
      await addNote(patient.id, {
        date: new Date().toISOString().split("T")[0],
        content: noteContent,
      });
      setNoteContent("");
      Alert.alert("Success", "Note added successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to add note");
    } finally {
      setAddingNote(false);
    }
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
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View className="gap-2">
              <Text className="text-2xl font-bold text-foreground">{patient.name}</Text>
              <Text className="text-sm text-muted">
                {getAgeString(patient.dateOfBirth)} years old • {patient.gender === "M" ? "Boy" : "Girl"}
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Text className="text-xl">←</Text>
            </TouchableOpacity>
          </View>

          {/* Patient Info Card */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-4">
            <View className="gap-2">
              <Text className="text-xs font-semibold text-primary">PATIENT INFORMATION</Text>
              <View className="gap-3">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-muted">Date of Birth:</Text>
                  <Text className="text-sm font-semibold text-foreground">{patient.dateOfBirth}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-muted">Parent/Guardian:</Text>
                  <Text className="text-sm font-semibold text-foreground">{patient.parentName}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-muted">Email:</Text>
                  <Text className="text-sm font-semibold text-foreground">{patient.parentEmail || "N/A"}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-muted">Phone:</Text>
                  <Text className="text-sm font-semibold text-foreground">{patient.parentPhone || "N/A"}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Medical History */}
          {(patient.medicalHistory || patient.allergies || patient.currentMedications) && (
            <View className="bg-surface rounded-xl border border-border p-4 gap-3">
              <Text className="text-xs font-semibold text-primary">MEDICAL HISTORY</Text>
              {patient.medicalHistory && (
                <View className="gap-1">
                  <Text className="text-xs text-muted">Conditions:</Text>
                  <Text className="text-sm text-foreground">{patient.medicalHistory}</Text>
                </View>
              )}
              {patient.allergies && (
                <View className="gap-1">
                  <Text className="text-xs text-muted">Allergies:</Text>
                  <Text className="text-sm text-foreground">{patient.allergies}</Text>
                </View>
              )}
              {patient.currentMedications && (
                <View className="gap-1">
                  <Text className="text-xs text-muted">Current Medications:</Text>
                  <Text className="text-sm text-foreground">{patient.currentMedications}</Text>
                </View>
              )}
            </View>
          )}

          {/* Add Note Section */}
          <View className="bg-surface rounded-xl border border-border p-4 gap-3">
            <Text className="text-sm font-semibold text-foreground">Add Clinical Note</Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Enter clinical findings, observations, or recommendations..."
              placeholderTextColor="#687076"
              value={noteContent}
              onChangeText={setNoteContent}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity
              className="bg-primary rounded-lg p-3 items-center active:opacity-80"
              onPress={handleAddNote}
              disabled={addingNote}
            >
              <Text className="text-white font-semibold">{addingNote ? "Adding..." : "Add Note"}</Text>
            </TouchableOpacity>
          </View>

          {/* Clinical Notes */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-foreground">Clinical Notes ({notes.length})</Text>
            </View>

            {notes.length > 0 ? (
              notes.map((note) => (
                <View key={note.id} className="bg-surface rounded-lg border border-border p-4 gap-2">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs font-semibold text-primary">{note.date}</Text>
                    {note.toolUsed && <Text className="text-xs text-muted">Tool: {note.toolUsed}</Text>}
                  </View>
                  <Text className="text-sm text-foreground leading-relaxed">{note.content}</Text>
                  {note.findings && (
                    <View className="bg-primary/10 rounded p-2 mt-2">
                      <Text className="text-xs text-primary">Findings: {note.findings}</Text>
                    </View>
                  )}
                </View>
              ))
            ) : (
              <View className="bg-surface rounded-lg border border-border p-6 items-center justify-center">
                <Text className="text-sm text-muted">No clinical notes yet</Text>
              </View>
            )}
          </View>

          {/* Export Button */}
          <TouchableOpacity className="bg-surface border border-border rounded-lg p-4 items-center active:opacity-80">
            <Text className="text-foreground font-semibold">📥 Export Patient Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
