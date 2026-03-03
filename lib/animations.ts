/**
 * Animations Utility
 * Smooth transitions and animation configurations
 */

export const ANIMATIONS = {
  // Page transitions
  pageEnter: {
    duration: 300,
    delay: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  pageExit: {
    duration: 200,
    delay: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Button interactions
  buttonPress: {
    scale: 0.97,
    duration: 100,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  buttonRelease: {
    scale: 1,
    duration: 150,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Card interactions
  cardHover: {
    scale: 1.02,
    duration: 200,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  cardPress: {
    scale: 0.98,
    duration: 100,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Fade animations
  fadeIn: {
    opacity: 1,
    duration: 300,
    delay: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  fadeOut: {
    opacity: 0,
    duration: 200,
    delay: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Slide animations
  slideInRight: {
    translateX: 0,
    duration: 300,
    delay: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  slideOutRight: {
    translateX: 100,
    duration: 200,
    delay: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  slideInLeft: {
    translateX: 0,
    duration: 300,
    delay: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  slideOutLeft: {
    translateX: -100,
    duration: 200,
    delay: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Scale animations
  scaleIn: {
    scale: 1,
    opacity: 1,
    duration: 300,
    delay: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  scaleOut: {
    scale: 0.8,
    opacity: 0,
    duration: 200,
    delay: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Loading animations
  spin: {
    duration: 1000,
    easing: "linear",
    loop: true,
  },
  pulse: {
    duration: 2000,
    easing: "ease-in-out",
    loop: true,
  },
  shimmer: {
    duration: 2000,
    easing: "ease-in-out",
    loop: true,
  },

  // Success animations
  successBounce: {
    scale: 1,
    duration: 500,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  successPulse: {
    duration: 600,
    easing: "ease-out",
  },

  // Error animations
  shake: {
    duration: 500,
    easing: "ease-in-out",
  },
  errorPulse: {
    duration: 400,
    easing: "ease-out",
  },
};

/**
 * Get animation config by name
 */
export function getAnimation(name: keyof typeof ANIMATIONS) {
  return ANIMATIONS[name];
}

/**
 * Create smooth transition style
 */
export function createTransition(properties: string[], duration = 300, easing = "ease-out") {
  return {
    transitionProperty: properties.join(", "),
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: easing,
  };
}

/**
 * Create keyframe animation
 */
export function createKeyframes(name: string, frames: Record<string, any>) {
  return `
    @keyframes ${name} {
      ${Object.entries(frames)
        .map(([key, value]) => `${key} { ${Object.entries(value).map(([k, v]) => `${k}: ${v}`).join("; ")} }`)
        .join("\n")}
    }
  `;
}

/**
 * Easing functions
 */
export const EASING = {
  linear: "cubic-bezier(0, 0, 1, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeInQuad: "cubic-bezier(0.11, 0, 0.5, 0)",
  easeOutQuad: "cubic-bezier(0.5, 1, 0.89, 1)",
  easeInCubic: "cubic-bezier(0.32, 0, 0.67, 0)",
  easeOutCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
  easeInQuart: "cubic-bezier(0.5, 0, 0.75, 0)",
  easeOutQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  easeInQuint: "cubic-bezier(0.64, 0, 0.78, 0)",
  easeOutQuint: "cubic-bezier(0.22, 1, 0.36, 1)",
  easeInExpo: "cubic-bezier(0.7, 0, 0.84, 0)",
  easeOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeInCirc: "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
  easeOutCirc: "cubic-bezier(0.075, 0.82, 0.165, 1)",
  easeInBack: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
  easeOutBack: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};
