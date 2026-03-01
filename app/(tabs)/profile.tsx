import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/lib/auth-context";
import { useSubscription } from "@/lib/subscription-context";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const subscription = useSubscription();
  const colors = useColors();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login" as any);
  };

  const handleSettings = () => {
    router.push("/subscription-management" as any);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          <Text className="text-3xl font-bold text-foreground" accessibilityRole="header">Profile</Text>

          {/* User Info Card */}
          <View className="bg-surface rounded-xl p-6 border border-primary gap-4">
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: colors.primary,
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
              accessibilityLabel={`User avatar for ${user?.name || 'User'}`}
            >
              <Text className="text-3xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </Text>
            </View>

            <View>
              <Text className="text-xl font-bold text-foreground">{user?.name || "User"}</Text>
              <Text className="text-sm text-muted mt-1">{user?.email || "No email"}</Text>
            </View>

            <View className="bg-surface rounded-lg p-3 mt-2">
              <Text className="text-xs text-muted mb-1">Subscription Tier</Text>
              <Text className="text-base font-semibold text-primary capitalize">Free</Text>
            </View>
          </View>

          {/* Settings Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Settings</Text>

            <Pressable
              onPress={handleSettings}
              accessibilityLabel="Subscription and billing settings"
              accessibilityRole="button"
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? colors.primary : colors.surface,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: 10,
                  padding: 14,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-semibold text-primary">⚙️ Subscription & Billing</Text>
                <Text className="text-primary">→</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.push("/audit-trail" as any)}
              accessibilityLabel="View audit trail"
              accessibilityRole="button"
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? colors.primary : colors.surface,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: 10,
                  padding: 14,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-semibold text-primary">📋 Audit Trail</Text>
                <Text className="text-primary">→</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.push("/offline-sync" as any)}
              accessibilityLabel="Offline and sync settings"
              accessibilityRole="button"
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? colors.primary : colors.surface,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: 10,
                  padding: 14,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-semibold text-primary">🔄 Offline & Sync</Text>
                <Text className="text-primary">→</Text>
              </View>
            </Pressable>
          </View>

          {/* About Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">About</Text>

            <View className="bg-surface rounded-xl p-4 border border-border gap-2">
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">App Version</Text>
                <Text className="text-sm font-semibold text-foreground">1.0.0</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Last Updated</Text>
                <Text className="text-sm font-semibold text-foreground">Today</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Platform</Text>
                <Text className="text-sm font-semibold text-foreground">Expo</Text>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <Pressable
            onPress={handleLogout}
            accessibilityLabel="Logout from account"
            accessibilityRole="button"
            accessibilityHint="Sign out of your account"
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.error : colors.error,
                paddingVertical: 14,
                paddingHorizontal: 16,
                borderRadius: 8,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-base font-semibold text-white text-center">🚪 Logout</Text>
          </Pressable>

          <View className="h-6" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
