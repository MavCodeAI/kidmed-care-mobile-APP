import { View, ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useColors } from "@/hooks/use-colors";

interface AnimatedCardProps extends ViewProps {
  glassmorphism?: boolean;
  elevated?: boolean;
  interactive?: boolean;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

/**
 * Animated Card Component
 * Card with smooth scale animation on press
 */
export function AnimatedCard({
  glassmorphism = true,
  elevated = false,
  interactive = false,
  onPressIn,
  onPressOut,
  className,
  style,
  children,
  ...props
}: AnimatedCardProps) {
  const colors = useColors();
  const scale = useSharedValue(1);

  const baseStyle = {
    borderRadius: 16,
    overflow: "hidden" as const,
    borderWidth: 1,
  };

  const glassStyle = glassmorphism
    ? {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
      }
    : {
        backgroundColor: colors.surface,
        borderColor: colors.border,
      };

  const elevationStyle = elevated
    ? {
        shadowColor: colors.foreground,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
      }
    : {};

  const interactiveStyle = interactive
    ? {
        borderColor: colors.primary,
        borderWidth: 1.5,
      }
    : {};

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.98, {
      duration: 100,
      easing: Easing.out(Easing.cubic),
    });
    onPressIn?.();
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.out(Easing.cubic),
    });
    onPressOut?.();
  };

  return (
    <Animated.View style={animatedStyle}>
      <View
        style={[baseStyle, glassStyle, elevationStyle, interactiveStyle, style] as any}
        className={className}
        onTouchStart={handlePressIn}
        onTouchEnd={handlePressOut}
        {...props}
      >
        {children}
      </View>
    </Animated.View>
  );
}
