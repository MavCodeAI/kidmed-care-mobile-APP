import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { PremiumCard } from "@/components/premium-card";
import { PremiumButton } from "@/components/premium-button";
import { LucideIcon } from "@/components/lucide-icon";
import { useColors } from "@/hooks/use-colors";

const MOCK_PATIENTS = [
  {
    id: "1",
    name: "Ahmed Ali",
    age: 5,
    gender: "M",
    lastVisit: "2 days ago",
    status: "active",
    nextAppointment: "March 5, 2026",
  },
  {
    id: "2",
    name: "Fatima Khan",
    age: 3,
    gender: "F",
    lastVisit: "1 week ago",
    status: "active",
    nextAppointment: "March 10, 2026",
  },
  {
    id: "3",
    name: "Hassan Ahmed",
    age: 7,
    gender: "M",
    lastVisit: "3 weeks ago",
    status: "pending",
    nextAppointment: "March 15, 2026",
  },
];

export default function PatientsRedesignedScreen() {
  const router = useRouter();
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredPatients = MOCK_PATIENTS.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#51CF66";
      case "pending":
        return "#FF922B";
      case "inactive":
        return colors.muted;
      default:
        return colors.muted;
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Patient Cases</Text>
            <Text className="text-base text-muted">{filteredPatients.length} patients</Text>
          </View>

          {/* Search and Add Button */}
          <View className="gap-3">
            <View className="flex-row gap-3">
              <PremiumCard glassmorphism className="flex-1 px-4 py-3 flex-row items-center gap-3">
                <LucideIcon name="search" size={20} color={colors.muted} />
                <TextInput
                  placeholder="Search patients..."
                  placeholderTextColor={colors.muted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1 text-foreground"
                  style={{ fontSize: 16 }}
                />
              </PremiumCard>
              <PremiumButton
                label="Add"
                variant="primary"
                size="md"
                icon="plus"
                onPress={() => router.push("/(tabs)/patients")}
              />
            </View>

            {/* Filter Buttons */}
            <View className="flex-row gap-2">
              {["all", "active", "pending"].map((status) => (
                <Pressable
                  key={status}
                  onPress={() => setFilterStatus(status)}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.8 : 1,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 20,
                      backgroundColor:
                        filterStatus === status ? colors.primary : colors.surface,
                      borderWidth: 1,
                      borderColor:
                        filterStatus === status ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    className={`text-xs font-semibold uppercase ${
                      filterStatus === status ? "text-background" : "text-foreground"
                    }`}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Patients List */}
          <View className="gap-3">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <Pressable
                  key={patient.id}
                  onPress={() => router.push("/(tabs)/patients")}
                  style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                >
                  <PremiumCard glassmorphism elevated className="p-4">
                    <View className="gap-3">
                      {/* Header Row */}
                      <View className="flex-row items-start justify-between">
                        <View className="flex-row items-center gap-3 flex-1">
                          {/* Avatar */}
                          <View
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: 22,
                              backgroundColor: `${colors.primary}20`,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text className="text-base font-bold text-primary">
                              {patient.name.charAt(0)}
                            </Text>
                          </View>

                          {/* Info */}
                          <View className="flex-1">
                            <Text className="text-base font-semibold text-foreground">
                              {patient.name}
                            </Text>
                            <Text className="text-sm text-muted">
                              {patient.age} years • {patient.gender}
                            </Text>
                          </View>
                        </View>

                        {/* Status Badge */}
                        <View
                          style={{
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 6,
                            backgroundColor: `${getStatusColor(patient.status)}20`,
                          }}
                        >
                          <Text
                            className="text-xs font-bold uppercase"
                            style={{ color: getStatusColor(patient.status) }}
                          >
                            {patient.status}
                          </Text>
                        </View>
                      </View>

                      {/* Details Row */}
                      <View className="border-t border-opacity-20" style={{ borderTopColor: colors.border }}>
                        <View className="flex-row gap-4 mt-3">
                          <View className="flex-1 gap-1">
                            <Text className="text-xs text-muted uppercase">Last Visit</Text>
                            <Text className="text-sm font-semibold text-foreground">
                              {patient.lastVisit}
                            </Text>
                          </View>
                          <View className="flex-1 gap-1">
                            <Text className="text-xs text-muted uppercase">Next Appointment</Text>
                            <Text className="text-sm font-semibold text-foreground">
                              {patient.nextAppointment}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Action Buttons */}
                      <View className="flex-row gap-2 mt-2">
                        <Pressable
                          style={({ pressed }) => [
                            {
                              flex: 1,
                              opacity: pressed ? 0.7 : 1,
                              paddingVertical: 8,
                              paddingHorizontal: 12,
                              borderRadius: 8,
                              backgroundColor: `${colors.primary}20`,
                              alignItems: "center",
                              flexDirection: "row",
                              justifyContent: "center",
                              gap: 6,
                            },
                          ]}
                        >
                          <LucideIcon name="file-text" size={14} color={colors.primary} />
                          <Text className="text-xs font-semibold text-primary">Notes</Text>
                        </Pressable>
                        <Pressable
                          style={({ pressed }) => [
                            {
                              flex: 1,
                              opacity: pressed ? 0.7 : 1,
                              paddingVertical: 8,
                              paddingHorizontal: 12,
                              borderRadius: 8,
                              backgroundColor: `${colors.primary}20`,
                              alignItems: "center",
                              flexDirection: "row",
                              justifyContent: "center",
                              gap: 6,
                            },
                          ]}
                        >
                          <LucideIcon name="calendar" size={14} color={colors.primary} />
                          <Text className="text-xs font-semibold text-primary">Schedule</Text>
                        </Pressable>
                      </View>
                    </View>
                  </PremiumCard>
                </Pressable>
              ))
            ) : (
              <PremiumCard glassmorphism className="p-8 items-center gap-3">
                <LucideIcon name="users" size={32} color={colors.muted} />
                <Text className="text-base font-semibold text-foreground">No patients found</Text>
                <Text className="text-sm text-muted text-center">
                  Add your first patient to get started
                </Text>
              </PremiumCard>
            )}
          </View>

          {/* Spacer */}
          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
