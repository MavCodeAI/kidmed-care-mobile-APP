import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function ProfileScreen() {
  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          <Text className="text-2xl font-bold text-foreground">Profile</Text>
          
          {/* User Info */}
          <View className="bg-surface rounded-xl p-4 border border-border gap-3">
            <View className="w-16 h-16 bg-primary rounded-full items-center justify-center">
              <Text className="text-white text-2xl font-bold">?</Text>
            </View>
            <View>
              <Text className="text-lg font-semibold text-foreground">Not Logged In</Text>
              <Text className="text-sm text-muted mt-1">Sign in to access your profile</Text>
            </View>
          </View>

          {/* Settings */}
          <View className="gap-3">
            <TouchableOpacity className="bg-surface rounded-xl p-4 border border-border active:opacity-80">
              <Text className="text-base font-semibold text-foreground">Account Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface rounded-xl p-4 border border-border active:opacity-80">
              <Text className="text-base font-semibold text-foreground">Subscription</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface rounded-xl p-4 border border-border active:opacity-80">
              <Text className="text-base font-semibold text-foreground">Security</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface rounded-xl p-4 border border-border active:opacity-80">
              <Text className="text-base font-semibold text-foreground">Preferences</Text>
            </TouchableOpacity>
          </View>

          {/* Logout */}
          <TouchableOpacity className="bg-error rounded-xl p-4 active:opacity-80">
            <Text className="text-white text-center font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
