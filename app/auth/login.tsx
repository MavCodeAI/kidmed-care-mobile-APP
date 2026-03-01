import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter, Link } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/lib/auth-context";
import { useColors } from "@/hooks/use-colors";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const colors = useColors();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Login Failed", error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 justify-center p-6 gap-6">
          {/* Header */}
          <View className="gap-2 mb-4">
            <Text className="text-4xl font-bold text-foreground">KidMed Care</Text>
            <Text className="text-sm text-muted">Pediatric Clinical Decision Support</Text>
          </View>

          {/* Email Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Email</Text>
            <TextInput
              className="bg-surface border border-border rounded-lg p-4 text-foreground"
              placeholder="your@email.com"
              placeholderTextColor={colors.muted}
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Email address"
              accessibilityHint="Enter your email address"
              autoComplete="email"
            />
          </View>

          {/* Password Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Password</Text>
            <TextInput
              className="bg-surface border border-border rounded-lg p-4 text-foreground"
              placeholder="••••••••"
              placeholderTextColor={colors.muted}
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
              secureTextEntry
              accessibilityLabel="Password"
              accessibilityHint="Enter your password"
              autoComplete="password"
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity 
            disabled={isLoading}
            accessibilityLabel="Forgot password"
            accessibilityRole="link"
          >
            <Text className="text-sm text-primary font-semibold">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            className="bg-primary rounded-lg p-4 items-center active:opacity-80"
            onPress={handleLogin}
            disabled={isLoading}
            accessibilityLabel="Sign in to account"
            accessibilityRole="button"
            accessibilityState={{ disabled: isLoading }}
          >
            <Text className="text-white font-semibold">{isLoading ? "Signing In..." : "Sign In"}</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center gap-3">
            <View className="flex-1 h-px bg-border" />
            <Text className="text-xs text-muted">OR</Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          {/* Social Login */}
          <View className="gap-3">
            <TouchableOpacity 
              className="bg-surface border border-border rounded-lg p-4 items-center active:opacity-80"
              accessibilityLabel="Continue with Google"
              accessibilityRole="button"
            >
              <Text className="text-foreground font-semibold">Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-surface border border-border rounded-lg p-4 items-center active:opacity-80"
              accessibilityLabel="Continue with Apple"
              accessibilityRole="button"
            >
              <Text className="text-foreground font-semibold">Continue with Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center gap-1">
            <Text className="text-sm text-muted">Don&apos;t have an account?</Text>
            <Link href="./signup" asChild>
              <TouchableOpacity disabled={isLoading} accessibilityLabel="Sign up for new account" accessibilityRole="link">
                <Text className="text-sm text-primary font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
