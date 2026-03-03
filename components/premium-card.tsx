import { View, ViewProps } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface PremiumCardProps extends ViewProps {
  glassmorphism?: boolean;
  elevated?: boolean;
  interactive?: boolean;
}

/**
 * Premium Card Component
 * Modern glassmorphism design with optional elevation and interactivity
 */
export function PremiumCard({
  glassmorphism = true,
  elevated = false,
  interactive = false,
  className,
  style,
  children,
  ...props
}: PremiumCardProps) {
  const colors = useColors();

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

  return (
    <View
      style={[
        baseStyle as any,
        glassStyle as any,
        elevationStyle as any,
        interactiveStyle as any,
        style,
      ]}
      className={className}
      {...props}
    >
      {children}
    </View>
  );
}
