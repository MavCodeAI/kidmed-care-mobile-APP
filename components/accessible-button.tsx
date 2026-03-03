import { Pressable, Text, View, PressableProps } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { LucideIcon } from "./lucide-icon";
import {
  createAccessibleButtonProps,
  announceForAccessibility,
} from "@/lib/accessibility";

interface AccessibleButtonProps extends PressableProps {
  label: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  onPress?: (e: any) => void;
}

/**
 * Accessible Button Component
 * Button with full accessibility support
 */
export function AccessibleButton({
  label,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  disabled = false,
  loading = false,
  accessibilityLabel,
  accessibilityHint,
  onPress,
  ...props
}: AccessibleButtonProps) {
  const colors = useColors();

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
    },
    secondary: {
      backgroundColor: colors.surface,
      textColor: colors.foreground,
      borderColor: colors.border,
      borderWidth: 0,
    },
    outline: {
      backgroundColor: "transparent",
      textColor: colors.primary,
      borderColor: colors.primary,
      borderWidth: 1.5,
    },
    ghost: {
      backgroundColor: "transparent",
      textColor: colors.foreground,
      borderColor: "transparent",
      borderWidth: 0,
    },
  };

  const vConfig = variantConfig[variant];

  const handlePress = async (e: any) => {
    if (!disabled && !loading) {
      // Announce button press
      await announceForAccessibility(`${label} activated`);
      onPress?.(e);
    }
  };

  return (
    <Pressable
      accessible={true}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint}
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
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
          opacity: disabled || loading ? 0.5 : pressed ? 0.8 : 1,
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
  );
}
