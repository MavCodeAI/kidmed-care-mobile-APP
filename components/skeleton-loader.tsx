import { View, ViewProps } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface SkeletonLoaderProps extends ViewProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  count?: number;
  gap?: number;
}

/**
 * Skeleton Loader Component
 * Modern loading placeholder with shimmer effect
 */
export function SkeletonLoader({
  width = "100%",
  height = 16,
  borderRadius = 8,
  count = 1,
  gap = 8,
  className,
  style,
  ...props
}: SkeletonLoaderProps) {
  const colors = useColors();

  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <View className={className} {...props}>
      {skeletons.map((index) => (
        <View
          key={index}
          style={[
            {
              width: width as any,
              height: height as any,
              borderRadius,
              backgroundColor: colors.surface,
              opacity: 0.6,
              marginBottom: index < skeletons.length - 1 ? gap : 0,
              overflow: "hidden" as const,
            } as any,
            style,
          ]}
        >
          {/* Shimmer effect */}
          <View
            style={{
              position: "absolute" as const,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            } as any}
          />
        </View>
      ))}
    </View>
  );
}

/**
 * Card Skeleton Loader
 * Skeleton for card-based layouts
 */
export function CardSkeletonLoader() {
  const colors = useColors();

  return (
    <View
      style={{
        borderRadius: 16,
        overflow: "hidden" as const,
        backgroundColor: colors.surface,
        padding: 16,
        gap: 12,
      } as any}
    >
      {/* Header */}
      <View style={{ flexDirection: "row" as const, gap: 12, alignItems: "center" }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: colors.border,
          }}
        />
        <View style={{ flex: 1, gap: 8 }}>
          <SkeletonLoader width="80%" height={16} borderRadius={4} />
          <SkeletonLoader width="60%" height={12} borderRadius={4} />
        </View>
      </View>

      {/* Content */}
      <View style={{ gap: 8 }}>
        <SkeletonLoader width="100%" height={12} borderRadius={4} />
        <SkeletonLoader width="90%" height={12} borderRadius={4} />
        <SkeletonLoader width="70%" height={12} borderRadius={4} />
      </View>

      {/* Footer */}
      <View style={{ flexDirection: "row" as const, gap: 8, marginTop: 8 }}>
        <SkeletonLoader width="48%" height={40} borderRadius={8} />
        <SkeletonLoader width="48%" height={40} borderRadius={8} />
      </View>
    </View>
  );
}

/**
 * List Skeleton Loader
 * Multiple card skeletons for list loading
 */
export function ListSkeletonLoader({ count = 3 }: { count?: number }) {
  return (
    <View style={{ gap: 12 }}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeletonLoader key={i} />
      ))}
    </View>
  );
}
