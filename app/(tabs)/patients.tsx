import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function PatientsScreen() {
  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-foreground">Patient Cases</Text>
            <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg active:opacity-80">
              <Text className="text-white text-sm font-semibold">+ Add</Text>
            </TouchableOpacity>
          </View>
          
          <View className="bg-surface rounded-xl p-6 border border-border items-center justify-center py-12">
            <Text className="text-sm text-muted">No patients yet</Text>
            <Text className="text-xs text-muted mt-2">Create your first patient case to get started</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
