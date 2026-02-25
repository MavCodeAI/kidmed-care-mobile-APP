import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/lib/auth-context";
import { ScreenContainer } from "@/components/screen-container";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login" as any);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="p-6 gap-6">
          <Text className="text-2xl font-bold text-foreground">Profile</Text>

          {/* User Info */}
          <View className="bg-surface rounded-xl p-4 border border-border gap-3">
            <View
              style={{
                width: 64,
                height: 64,
                backgroundColor: "#0a7ea4",
                borderRadius: 32,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text className="text-white text-2xl font-bold">
                {user?.email?.[0]?.toUpperCase() || "?"}
              </Text>
            </View>
            <View>
              <Text className="text-lg font-semibold text-foreground">
                {user?.email || "Not Logged In"}
              </Text>
              <Text className="text-sm text-muted mt-1">
                {user ? "Manage your account" : "Sign in to access your profile"}
              </Text>
            </View>
          </View>

          {/* Settings */}
          <View className="gap-3">
            <Pressable
              onPress={() => router.push("/subscription-management" as any)}
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
              <Text className="text-base font-semibold text-foreground">
                Subscription
              </Text>
              <Text className="text-xs text-muted mt-1">Manage your plan</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/audit-trail" as any)}
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
              <Text className="text-base font-semibold text-foreground">
                Activity Log
              </Text>
              <Text className="text-xs text-muted mt-1">View your audit trail</Text>
            </Pressable>

            <Pressable
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
              <Text className="text-base font-semibold text-foreground">
                Security
              </Text>
              <Text className="text-xs text-muted mt-1">Password & privacy</Text>
            </Pressable>

            <Pressable
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
              <Text className="text-base font-semibold text-foreground">
                Preferences
              </Text>
              <Text className="text-xs text-muted mt-1">Theme & notifications</Text>
            </Pressable>
          </View>

          {/* Logout */}
          {user && (
            <Pressable
              onPress={handleLogout}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#dc2626" : "#ef4444",
                  borderRadius: 12,
                  padding: 16,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text className="text-white text-center font-semibold">Sign Out</Text>
            </Pressable>
          )}

          {!user && (
            <Pressable
              onPress={() => router.push("/auth/login" as any)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#0a6a8f" : "#0a7ea4",
                  borderRadius: 12,
                  padding: 16,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text className="text-white text-center font-semibold">Sign In</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
