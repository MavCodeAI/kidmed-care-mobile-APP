/**
 * Gesture Handlers
 * Swipe, pan, and pinch gesture utilities
 */

export interface GestureState {
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
}

/**
 * Detect swipe direction
 */
export function detectSwipeDirection(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  minDistance: number = 50
): "left" | "right" | "up" | "down" | null {
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  // Check if swipe distance is sufficient
  if (Math.abs(deltaX) < minDistance && Math.abs(deltaY) < minDistance) {
    return null;
  }

  // Determine direction based on larger delta
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? "right" : "left";
  } else {
    return deltaY > 0 ? "down" : "up";
  }
}

/**
 * Calculate swipe velocity
 */
export function calculateSwipeVelocity(
  deltaX: number,
  deltaY: number,
  duration: number
): { vx: number; vy: number; speed: number } {
  const vx = deltaX / duration;
  const vy = deltaY / duration;
  const speed = Math.sqrt(vx * vx + vy * vy);

  return { vx, vy, speed };
}

/**
 * Swipe gesture config
 */
export const SWIPE_CONFIG = {
  minDistance: 50,
  maxDuration: 500,
  velocityThreshold: 0.5,
};

/**
 * Pan gesture config
 */
export const PAN_CONFIG = {
  minDistance: 10,
  velocityThreshold: 0.1,
};

/**
 * Pinch gesture config
 */
export const PINCH_CONFIG = {
  minDistance: 10,
  velocityThreshold: 0.1,
};

/**
 * Gesture event handlers
 */
export interface GestureHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPan?: (state: GestureState) => void;
  onPinch?: (scale: number) => void;
}

/**
 * Create swipe handler
 */
export function createSwipeHandler(handlers: GestureHandlers) {
  let startX = 0;
  let startY = 0;
  let startTime = 0;

  return {
    onTouchStart: (e: any) => {
      const touch = e.nativeEvent.touches[0];
      startX = touch.pageX;
      startY = touch.pageY;
      startTime = Date.now();
    },
    onTouchEnd: (e: any) => {
      const touch = e.nativeEvent.changedTouches[0];
      const endX = touch.pageX;
      const endY = touch.pageY;
      const duration = Date.now() - startTime;

      if (duration > SWIPE_CONFIG.maxDuration) {
        return;
      }

      const direction = detectSwipeDirection(
        startX,
        startY,
        endX,
        endY,
        SWIPE_CONFIG.minDistance
      );

      switch (direction) {
        case "left":
          handlers.onSwipeLeft?.();
          break;
        case "right":
          handlers.onSwipeRight?.();
          break;
        case "up":
          handlers.onSwipeUp?.();
          break;
        case "down":
          handlers.onSwipeDown?.();
          break;
      }
    },
  };
}

/**
 * Gesture animation configs
 */
export const GESTURE_ANIMATIONS = {
  swipeOut: {
    duration: 300,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  swipeIn: {
    duration: 300,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  pan: {
    duration: 150,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  pinch: {
    duration: 200,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};
