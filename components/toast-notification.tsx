import { View, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { useColors } from "@/hooks/use-colors";
import { LucideIcon } from "./lucide-icon";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastNotificationProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onDismiss?: () => void;
}

/**
 * Toast Notification Component
 * Animated toast with auto-dismiss
 */
export function ToastNotification({
  message,
  type = "info",
  duration = 3000,
  onDismiss,
}: ToastNotificationProps) {
  const colors = useColors();
  const translateY = useSharedValue(200);
  const opacity = useSharedValue(0);

  const getToastConfig = (toastType: ToastType) => {
    switch (toastType) {
      case "success":
        return {
          backgroundColor: "#51CF66",
          icon: "check-circle",
          textColor: "#fff",
        };
      case "error":
        return {
          backgroundColor: "#FF6B6B",
          icon: "alert-circle",
          textColor: "#fff",
        };
      case "warning":
        return {
          backgroundColor: "#FF922B",
          icon: "alert-triangle",
          textColor: "#fff",
        };
      case "info":
      default:
        return {
          backgroundColor: colors.primary,
          icon: "info",
          textColor: colors.background,
        };
    }
  };

  const config = getToastConfig(type);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    // Show animation
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });

    // Auto dismiss
    const timer = setTimeout(() => {
      translateY.value = withTiming(200, {
        duration: 300,
        easing: Easing.in(Easing.cubic),
      });
      opacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.cubic),
      });

      setTimeout(() => {
        onDismiss?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: "absolute",
          bottom: 20,
          left: 16,
          right: 16,
          zIndex: 1000,
        },
      ]}
    >
      <View
        style={{
          backgroundColor: config.backgroundColor,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <LucideIcon name={config.icon as any} size={20} color={config.textColor} />
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: "500",
            color: config.textColor,
          }}
          numberOfLines={2}
        >
          {message}
        </Text>
        <Pressable
          onPress={() => {
            translateY.value = withTiming(200, {
              duration: 300,
              easing: Easing.in(Easing.cubic),
            });
            opacity.value = withTiming(0, {
              duration: 300,
              easing: Easing.in(Easing.cubic),
            });
            setTimeout(() => {
              onDismiss?.();
            }, 300);
          }}
        >
          <LucideIcon name="x" size={18} color={config.textColor} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

/**
 * Toast Manager Hook
 * Manage multiple toasts
 */
export function useToast() {
  const [toasts, setToasts] = React.useState<
    Array<{ id: string; message: string; type: ToastType; duration?: number }>
  >([]);

  const show = (
    message: string,
    type: ToastType = "info",
    duration: number = 3000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (message: string, duration?: number) =>
    show(message, "success", duration);
  const error = (message: string, duration?: number) =>
    show(message, "error", duration);
  const warning = (message: string, duration?: number) =>
    show(message, "warning", duration);
  const info = (message: string, duration?: number) =>
    show(message, "info", duration);

  return { toasts, show, dismiss, success, error, warning, info };
}

import React from "react";
