import { View, ViewProps, Pressable } from "react-native";
import { useCallback, useRef } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { createSwipeHandler, detectSwipeDirection } from "@/lib/gesture-handlers";

interface SwipeableCarouselProps extends ViewProps {
  slides: React.ReactNode[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

/**
 * Swipeable Carousel Component
 * Carousel with swipe gesture support
 */
export function SwipeableCarousel({
  slides,
  currentIndex,
  onIndexChange,
  onSwipeLeft,
  onSwipeRight,
  autoScroll = false,
  autoScrollInterval = 5000,
  ...props
}: SwipeableCarouselProps) {
  const translateX = useSharedValue(0);
  const startX = useRef(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleSwipeLeft = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      onIndexChange(nextIndex);
      onSwipeLeft?.();
    }
  }, [currentIndex, slides.length, onIndexChange, onSwipeLeft]);

  const handleSwipeRight = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      onIndexChange(prevIndex);
      onSwipeRight?.();
    }
  }, [currentIndex, onIndexChange, onSwipeRight]);

  const handleTouchStart = (e: any) => {
    startX.current = e.nativeEvent.touches[0].pageX;
  };

  const handleTouchEnd = (e: any) => {
    const endX = e.nativeEvent.changedTouches[0].pageX;
    const deltaX = endX - startX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handleSwipeRight();
      } else {
        handleSwipeLeft();
      }
    }
  };

  return (
    <View
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      {...props}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            flexDirection: "row",
            width: `${slides.length * 100}%`,
          },
        ]}
      >
        {slides.map((slide, idx) => (
          <View
            key={idx}
            style={{
              width: `${100 / slides.length}%`,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {slide}
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

/**
 * Carousel Dots Component
 */
interface CarouselDotsProps {
  count: number;
  currentIndex: number;
  onDotPress: (index: number) => void;
  dotColor?: string;
  activeDotColor?: string;
}

export function CarouselDots({
  count,
  currentIndex,
  onDotPress,
  dotColor = "#ccc",
  activeDotColor = "#000",
}: CarouselDotsProps) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}>
      {Array.from({ length: count }).map((_, idx) => (
        <Pressable
          key={idx}
          onPress={() => onDotPress(idx)}
          style={{
            width: idx === currentIndex ? 24 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor:
              idx === currentIndex ? activeDotColor : dotColor,
          }}
        />
      ))}
    </View>
  );
}
