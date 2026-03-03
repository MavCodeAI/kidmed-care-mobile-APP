/**
 * Design System
 * Glassmorphism, animations, and modern SAAS styling
 */

export const DESIGN_SYSTEM = {
  // Glassmorphism colors
  glass: {
    light: "rgba(255, 255, 255, 0.1)",
    medium: "rgba(255, 255, 255, 0.15)",
    dark: "rgba(0, 0, 0, 0.1)",
  },

  // Blur values for glassmorphism
  blur: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "24px",
  },

  // Border radius
  radius: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    full: "9999px",
  },

  // Spacing
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "48px",
  },

  // Typography
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: "700",
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 28,
      fontWeight: "700",
      lineHeight: 36,
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 32,
      letterSpacing: -0.2,
    },
    h4: {
      fontSize: 20,
      fontWeight: "600",
      lineHeight: 28,
      letterSpacing: 0,
    },
    body: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
      letterSpacing: 0,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
      letterSpacing: 0,
    },
    caption: {
      fontSize: 12,
      fontWeight: "500",
      lineHeight: 16,
      letterSpacing: 0.3,
    },
  },

  // Animations
  animations: {
    // Durations (ms)
    fast: 150,
    normal: 300,
    slow: 500,

    // Easing functions
    easing: {
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  },

  // Shadows
  shadows: {
    none: "0 0 0 rgba(0, 0, 0, 0)",
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
    "2xl": "0 25px 50px rgba(0, 0, 0, 0.15)",
  },

  // Gradients
  gradients: {
    primary: "linear-gradient(135deg, #00ff00 0%, #00cc00 100%)",
    secondary: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    accent: "linear-gradient(135deg, #00ff00 0%, #00ffff 100%)",
  },

  // Breakpoints
  breakpoints: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};

// Glassmorphism card style
export const glassCardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.2)",
  overflow: "hidden",
};

// Premium button style
export const premiumButtonStyle = {
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 24,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
};

// Smooth transition helper
export const smoothTransition = (duration = 300) => ({
  transitionDuration: `${duration}ms`,
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
});

// Skeleton loading animation
export const skeletonAnimation = {
  from: { opacity: 0.6 },
  to: { opacity: 1 },
  duration: 1000,
  loop: true,
};
