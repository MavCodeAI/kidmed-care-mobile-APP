import { View, Text, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { ScreenContainer } from "@/components/screen-container";
import { PremiumButton } from "@/components/premium-button";
import { LucideIcon } from "@/components/lucide-icon";
import { useColors } from "@/hooks/use-colors";
import { hapticLight, hapticSuccess } from "@/lib/haptics";

const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: "Welcome to KidMed Care",
    description: "Evidence-based pediatric clinical decision support at your fingertips",
    icon: "heart",
    color: "#FF6B6B",
  },
  {
    id: 2,
    title: "13 Clinical Tools",
    description: "BMI Calculator, Growth Charts, Vaccine Scheduler, and more",
    icon: "tool",
    color: "#00ff00",
  },
  {
    id: 3,
    title: "AI-Powered Guidance",
    description: "Get evidence-based recommendations with citations",
    icon: "brain",
    color: "#4ECDC4",
  },
  {
    id: 4,
    title: "Patient Management",
    description: "Track cases, manage patients, and share with your team",
    icon: "users",
    color: "#FFE66D",
  },
  {
    id: 5,
    title: "Ready to Start?",
    description: "Choose your plan and start making better clinical decisions",
    icon: "rocket",
    color: "#A8E6CF",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const colors = useColors();
  const [currentSlide, setCurrentSlide] = useState(0);
  const progress = useSharedValue(0);

  const slide = ONBOARDING_SLIDES[currentSlide];
  const isLastSlide = currentSlide === ONBOARDING_SLIDES.length - 1;

  const handleNext = async () => {
    await hapticLight();
    if (isLastSlide) {
      await hapticSuccess();
      router.replace("/(tabs)");
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleSkip = async () => {
    await hapticLight();
    router.replace("/(tabs)");
  };

  const progressStyle = useAnimatedStyle(() => ({
    width: `${((currentSlide + 1) / ONBOARDING_SLIDES.length) * 100}%`,
  }));

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1 gap-6 p-6">
        {/* Progress Bar */}
        <View className="h-1 bg-surface rounded-full overflow-hidden">
          <Animated.View
            style={[
              progressStyle,
              {
                height: "100%",
                backgroundColor: colors.primary,
              },
            ]}
          />
        </View>

        {/* Skip Button */}
        <View className="flex-row justify-end">
          <Pressable
            onPress={handleSkip}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text className="text-sm font-semibold text-muted">Skip</Text>
          </Pressable>
        </View>

        {/* Content */}
        <Animated.View
          key={slide.id}
          entering={SlideInRight}
          exiting={SlideOutLeft}
          className="flex-1 items-center justify-center gap-6"
        >
          {/* Icon */}
          <Animated.View
            entering={FadeIn.delay(100)}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: `${slide.color}20`,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LucideIcon name={slide.icon as any} size={60} color={slide.color} />
          </Animated.View>

          {/* Title */}
          <Animated.View entering={FadeIn.delay(200)} className="gap-3 items-center">
            <Text className="text-3xl font-bold text-foreground text-center">
              {slide.title}
            </Text>
            <Text className="text-base text-muted text-center leading-relaxed">
              {slide.description}
            </Text>
          </Animated.View>

          {/* Dots */}
          <View className="flex-row gap-2">
            {ONBOARDING_SLIDES.map((_, idx) => (
              <Animated.View
                key={idx}
                entering={FadeIn.delay(300 + idx * 50)}
                style={{
                  width: idx === currentSlide ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    idx === currentSlide ? colors.primary : colors.border,
                }}
              />
            ))}
          </View>
        </Animated.View>

        {/* Buttons */}
        <Animated.View entering={FadeIn.delay(400)} className="gap-3">
          <PremiumButton
            label={isLastSlide ? "Get Started" : "Next"}
            variant="primary"
            size="lg"
            icon={isLastSlide ? "arrow-right" : "chevron-right"}
            iconPosition="right"
            onPress={handleNext}
          />
          {!isLastSlide && (
            <PremiumButton
              label="Back"
              variant="outline"
              size="lg"
              disabled={currentSlide === 0}
              onPress={async () => {
                await hapticLight();
                setCurrentSlide((prev) => Math.max(0, prev - 1));
              }}
            />
          )}
        </Animated.View>
      </View>
    </ScreenContainer>
  );
}
