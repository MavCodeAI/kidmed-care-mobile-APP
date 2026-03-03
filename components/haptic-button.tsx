import { Pressable, Text, View, PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useColors } from "@/hooks/use-colors";
import { LucideIcon } from "./lucide-icon";
import { hapticLight, hapticSuccess, hapticError } from "@/lib/haptics";

interface HapticButtonProps extends PressableProps {
  label: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  hapticFeedback?: "light" | "success" | "error" | "none";
}

/**
 * Haptic Button Component
 * Button with smooth animations and haptic feedback
 */
export function HapticButton({
  label,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  disabled = false,
  loading = false,
  hapticFeedback = "light",
  onPress,
  ...props
}: HapticButtonProps) {
  const colors = useColors();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Size configurations
  const sizeConfig = {
    sm: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: 14,
      iconSize: 16,
      borderRadius: 8,
    },
    md: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      fontSize: 16,
      iconSize: 20,
      borderRadius: 12,
    },
    lg: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      fontSize: 18,
      iconSize: 24,
      borderRadius: 14,
    },
  };

  const config = sizeConfig[size];

  // Variant configurations
  const variantConfig: Record<string, any> = {
    primary: {
      backgroundColor: colors.primary,
      textColor: colors.background,
      borderColor: colors.primary,
      borderWidth: 0,
      pressedOpacity: 0.8,
    },
    secondary: {
      backgroundColor: colors.surface,
      textColor: colors.foreground,
      borderColor: colors.border,
      borderWidth: 0,
      pressedOpacity: 0.7,
    },
    outline: {
      backgroundColor: "transparent",
      textColor: colors.primary,
      borderColor: colors.primary,
      borderWidth: 1.5,
      pressedOpacity: 0.7,
    },
    ghost: {
      backgroundColor: "transparent",
      textColor: colors.foreground,
      borderColor: "transparent",
      borderWidth: 0,
      pressedOpacity: 0.6,
    },
  };

  const vConfig = variantConfig[variant];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = async () => {
    if (!disabled && !loading) {
      scale.value = withTiming(0.97, {
        duration: 100,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(0.9, {
        duration: 100,
        easing: Easing.out(Easing.cubic),
      });

      // Trigger haptic feedback
      if (hapticFeedback === "light") {
        await hapticLight();
      } else if (hapticFeedback === "success") {
        await hapticSuccess();
      } else if (hapticFeedback === "error") {
        await hapticError();
      }
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading) {
      scale.value = withTiming(1, {
        duration: 150,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, {
        duration: 150,
        easing: Easing.out(Easing.cubic),
      });
    }
  };

  const handlePress = (e: any) => {
    if (!disabled && !loading && onPress) {
      onPress(e);
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            paddingVertical: config.paddingVertical,
            paddingHorizontal: config.paddingHorizontal,
            borderRadius: config.borderRadius,
            backgroundColor: vConfig.backgroundColor,
            borderColor: vConfig.borderColor,
            borderWidth: vConfig.borderWidth || 0,
            opacity: disabled || loading ? 0.5 : 1,
          },
        ]}
        {...props}
      >
        {loading ? (
          <View
            style={{
              width: config.iconSize,
              height: config.iconSize,
              borderRadius: config.iconSize / 2,
              borderWidth: 2,
              borderColor: vConfig.textColor,
              borderTopColor: "transparent",
              borderRightColor: "transparent",
            }}
          />
        ) : icon && iconPosition === "left" ? (
          <LucideIcon name={icon as any} size={config.iconSize} color={vConfig.textColor} />
        ) : null}

        <Text
          style={{
            fontSize: config.fontSize,
            fontWeight: "600",
            color: vConfig.textColor,
          }}
        >
          {label}
        </Text>

        {icon && iconPosition === "right" ? (
          <LucideIcon name={icon as any} size={config.iconSize} color={vConfig.textColor} />
        ) : null}
      </Pressable>
    </Animated.View>
  );
}
