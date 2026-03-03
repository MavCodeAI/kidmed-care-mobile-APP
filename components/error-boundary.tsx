import React, { ReactNode } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useColors } from "@/hooks/use-colors";
import { LucideIcon } from "./lucide-icon";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches errors and displays animated error UI
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        this.props.fallback(this.state.error!, this.retry)
      ) : (
        <ErrorFallback error={this.state.error!} onRetry={this.retry} />
      );
    }

    return this.props.children;
  }
}

/**
 * Default Error Fallback UI
 */
function ErrorFallback({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) {
  const colors = useColors();
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Animated.View style={animatedStyle}>
        <View style={{ alignItems: "center", gap: 16 }}>
          {/* Error Icon */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#FF6B6B20",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LucideIcon name="alert-circle" size={40} color="#FF6B6B" />
          </View>

          {/* Error Title */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: colors.foreground,
              textAlign: "center",
            }}
          >
            Oops! Something went wrong
          </Text>

          {/* Error Message */}
          <Text
            style={{
              fontSize: 14,
              color: colors.muted,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            {error?.message || "An unexpected error occurred"}
          </Text>

          {/* Retry Button */}
          <Pressable
            onPress={onRetry}
            style={({ pressed }) => [
              {
                marginTop: 8,
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 12,
                backgroundColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.background,
              }}
            >
              Try Again
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

/**
 * Error Alert Component
 * Inline error message with animation
 */
interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

export function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  const colors = useColors();
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View
        style={{
          backgroundColor: "#FF6B6B15",
          borderRadius: 12,
          borderLeftWidth: 4,
          borderLeftColor: "#FF6B6B",
          padding: 12,
          marginVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <LucideIcon name="alert-circle" size={20} color="#FF6B6B" />
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            color: colors.foreground,
            lineHeight: 20,
          }}
        >
          {message}
        </Text>
        {onDismiss && (
          <Pressable onPress={onDismiss}>
            <LucideIcon name="x" size={18} color={colors.muted} />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

/**
 * Success Alert Component
 */
interface SuccessAlertProps {
  message: string;
  onDismiss?: () => void;
}

export function SuccessAlert({ message, onDismiss }: SuccessAlertProps) {
  const colors = useColors();
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View
        style={{
          backgroundColor: "#51CF6615",
          borderRadius: 12,
          borderLeftWidth: 4,
          borderLeftColor: "#51CF66",
          padding: 12,
          marginVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <LucideIcon name="check-circle" size={20} color="#51CF66" />
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            color: colors.foreground,
            lineHeight: 20,
          }}
        >
          {message}
        </Text>
        {onDismiss && (
          <Pressable onPress={onDismiss}>
            <LucideIcon name="x" size={18} color={colors.muted} />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}
