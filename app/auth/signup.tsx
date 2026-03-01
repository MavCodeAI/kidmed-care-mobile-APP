import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter, Link } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/lib/auth-context";
import { useColors } from "@/hooks/use-colors";

export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuth();
  const colors = useColors();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      await signup(email, password, name);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Signup Failed", error instanceof Error ? error.message : "An error occurred");
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
            <Text className="text-4xl font-bold text-foreground">Create Account</Text>
            <Text className="text-sm text-muted">Join KidMed Care today</Text>
          </View>

          {/* Name Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Full Name</Text>
            <TextInput
              className="bg-surface border border-border rounded-lg p-4 text-foreground"
              placeholder="Dr. Jane Smith"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
              editable={!isLoading}
              autoCapitalize="words"
              accessibilityLabel="Full name"
              accessibilityHint="Enter your full name"
              autoComplete="name"
            />
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
              accessibilityHint="Enter a password with at least 8 characters"
              autoComplete="password-new"
            />
            <Text className="text-xs text-muted">At least 8 characters</Text>
          </View>

          {/* Confirm Password Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Confirm Password</Text>
            <TextInput
              className="bg-surface border border-border rounded-lg p-4 text-foreground"
              placeholder="••••••••"
              placeholderTextColor={colors.muted}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!isLoading}
              secureTextEntry
              accessibilityLabel="Confirm password"
              accessibilityHint="Re-enter your password to confirm"
              autoComplete="password-new"
            />
          </View>

          {/* Terms */}
          <Text className="text-xs text-muted text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </Text>

          {/* Signup Button */}
          <TouchableOpacity
            className="bg-primary rounded-lg p-4 items-center active:opacity-80"
            onPress={handleSignup}
            disabled={isLoading}
            accessibilityLabel="Create new account"
            accessibilityRole="button"
            accessibilityState={{ disabled: isLoading }}
          >
            <Text className="text-white font-semibold">{isLoading ? "Creating Account..." : "Create Account"}</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center gap-1">
            <Text className="text-sm text-muted">Already have an account?</Text>
            <Link href="./login" asChild>
              <TouchableOpacity disabled={isLoading} accessibilityLabel="Sign in to existing account" accessibilityRole="link">
                <Text className="text-sm text-primary font-semibold">Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
