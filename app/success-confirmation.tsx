import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  Easing,
  FadeIn,
  ZoomIn,
} from "react-native-reanimated";
import { useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { PremiumButton } from "@/components/premium-button";
import { LucideIcon } from "@/components/lucide-icon";
import { useColors } from "@/hooks/use-colors";
import { hapticSuccess } from "@/lib/haptics";

interface SuccessConfirmationProps {
  title?: string;
  message?: string;
  icon?: string;
  actionLabel?: string;
  actionRoute?: string;
}

export default function SuccessConfirmationScreen() {
  const router = useRouter();
  const colors = useColors();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    hapticSuccess();

    // Celebration animation
    scale.value = withSequence(
      withTiming(1.2, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      }),
      withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.cubic),
      })
    );

    opacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });

    rotate.value = withTiming(360, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1 items-center justify-center gap-6 p-6">
        {/* Success Icon */}
        <Animated.View
          style={animatedStyle}
          entering={ZoomIn}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#51CF6620",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LucideIcon name="check-circle" size={60} color="#51CF66" />
          </View>
        </Animated.View>

        {/* Content */}
        <Animated.View
          entering={FadeIn.delay(300)}
          className="items-center gap-3"
        >
          <Text className="text-3xl font-bold text-foreground text-center">
            Success!
          </Text>
          <Text className="text-base text-muted text-center leading-relaxed">
            Your action has been completed successfully
          </Text>
        </Animated.View>

        {/* Checkmarks */}
        <Animated.View
          entering={FadeIn.delay(500)}
          className="gap-3 w-full"
        >
          {[
            "Payment processed",
            "Account updated",
            "Ready to use",
          ].map((item, idx) => (
            <View key={idx} className="flex-row items-center gap-3">
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: "#51CF6620",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LucideIcon name="check" size={14} color="#51CF66" />
              </View>
              <Text className="text-base text-foreground">{item}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Action Button */}
        <Animated.View
          entering={FadeIn.delay(700)}
          className="w-full gap-3"
        >
          <PremiumButton
            label="Continue"
            variant="primary"
            size="lg"
            icon="arrow-right"
            iconPosition="right"
            onPress={() => router.replace("/(tabs)")}
          />
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text className="text-center text-base font-semibold text-primary">
              Go Back
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </ScreenContainer>
  );
}
