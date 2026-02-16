import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function MessagesScreen() {
  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-4">
          <Text className="text-2xl font-bold text-foreground">Messages</Text>
          
          <View className="bg-surface rounded-xl p-6 border border-border items-center justify-center py-12">
            <Text className="text-sm text-muted">No messages</Text>
            <Text className="text-xs text-muted mt-2">You will receive notifications here</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
