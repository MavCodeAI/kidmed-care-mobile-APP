/**
 * Dark Mode Theme
 * Premium dark theme with neon green accents
 */

export const DARK_MODE_COLORS = {
  // Base colors
  background: "#0a0a0a",
  surface: "#1a1a1a",
  surfaceLight: "#2a2a2a",
  foreground: "#f5f5f5",
  muted: "#a0a0a0",
  border: "#333333",

  // Primary (Neon Green)
  primary: "#00ff00",
  primaryLight: "#33ff33",
  primaryDark: "#00cc00",
  primaryGlow: "#00ff0040",

  // Accent colors
  accent: "#00ffff",
  accentGlow: "#00ffff40",

  // Status colors
  success: "#51CF66",
  warning: "#FF922B",
  error: "#FF6B6B",
  info: "#4ECDC4",

  // Gradients
  gradientPrimary: "linear-gradient(135deg, #00ff00 0%, #00cc00 100%)",
  gradientAccent: "linear-gradient(135deg, #00ff00 0%, #00ffff 100%)",
  gradientBackground: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",

  // Shadows with glow effect
  glowSm: "0 0 10px rgba(0, 255, 0, 0.2)",
  glowMd: "0 0 20px rgba(0, 255, 0, 0.3)",
  glowLg: "0 0 30px rgba(0, 255, 0, 0.4)",
};

/**
 * Light Mode Colors (existing)
 */
export const LIGHT_MODE_COLORS = {
  background: "#ffffff",
  surface: "#f5f5f5",
  surfaceLight: "#fafafa",
  foreground: "#11181C",
  muted: "#687076",
  border: "#E5E7EB",

  primary: "#0a7ea4",
  primaryLight: "#0a9ec4",
  primaryDark: "#086a8f",

  accent: "#4ECDC4",

  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  gradientPrimary: "linear-gradient(135deg, #0a7ea4 0%, #086a8f 100%)",
  gradientAccent: "linear-gradient(135deg, #0a7ea4 0%, #4ECDC4 100%)",
  gradientBackground: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
};

/**
 * Get theme colors based on mode
 */
export function getThemeColors(isDarkMode: boolean) {
  return isDarkMode ? DARK_MODE_COLORS : LIGHT_MODE_COLORS;
}

/**
 * Dark mode card styles with glow
 */
export const DARK_CARD_STYLES = {
  glassmorphism: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    backdropFilter: "blur(10px)",
    borderColor: "rgba(0, 255, 0, 0.15)",
    borderWidth: 1,
    boxShadow: "0 0 20px rgba(0, 255, 0, 0.1)",
  },
  elevated: {
    backgroundColor: "rgba(42, 42, 42, 0.9)",
    boxShadow: "0 0 30px rgba(0, 255, 0, 0.15)",
  },
  interactive: {
    borderColor: "rgba(0, 255, 0, 0.3)",
    boxShadow: "0 0 15px rgba(0, 255, 0, 0.2)",
  },
};

/**
 * Dark mode button styles
 */
export const DARK_BUTTON_STYLES = {
  primary: {
    backgroundColor: "#00ff00",
    textColor: "#0a0a0a",
    hoverGlow: "0 0 20px rgba(0, 255, 0, 0.4)",
  },
  secondary: {
    backgroundColor: "#1a1a1a",
    textColor: "#00ff00",
    borderColor: "#00ff00",
    hoverGlow: "0 0 15px rgba(0, 255, 0, 0.3)",
  },
  outline: {
    backgroundColor: "transparent",
    textColor: "#00ff00",
    borderColor: "#00ff00",
    hoverGlow: "0 0 15px rgba(0, 255, 0, 0.3)",
  },
};

/**
 * Neon text effect
 */
export const NEON_TEXT_EFFECT = {
  textShadow: "0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.3)",
  color: "#00ff00",
};

/**
 * Neon glow animation
 */
export const NEON_GLOW_ANIMATION = `
  @keyframes neon-glow {
    0%, 100% {
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.2), 0 0 20px rgba(0, 255, 0, 0.1);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.4), 0 0 30px rgba(0, 255, 0, 0.2);
    }
  }

  @keyframes neon-flicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
      text-shadow: 0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.3);
    }
    20%, 24%, 55% {
      text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
    }
  }
`;
