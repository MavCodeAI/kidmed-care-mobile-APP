import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

/**
 * Haptics Utility
 * Trigger haptic feedback on different interactions
 */

/**
 * Light tap haptic (button press)
 */
export async function hapticLight() {
  if (Platform.OS !== "web") {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.warn("Haptics not available:", error);
    }
  }
}

/**
 * Medium tap haptic (toggle, selection)
 */
export async function hapticMedium() {
  if (Platform.OS !== "web") {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.warn("Haptics not available:", error);
    }
  }
}

/**
 * Heavy tap haptic (important action)
 */
export async function hapticHeavy() {
  if (Platform.OS !== "web") {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.warn("Haptics not available:", error);
    }
  }
}

/**
 * Success notification haptic
 */
export async function hapticSuccess() {
  if (Platform.OS !== "web") {
    try {
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    } catch (error) {
      console.warn("Haptics not available:", error);
    }
  }
}

/**
 * Warning notification haptic
 */
export async function hapticWarning() {
  if (Platform.OS !== "web") {
    try {
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Warning
      );
    } catch (error) {
      console.warn("Haptics not available:", error);
    }
  }
}

/**
 * Error notification haptic
 */
export async function hapticError() {
  if (Platform.OS !== "web") {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      console.warn("Haptics not available:", error);
    }
  }
}

/**
 * Selection haptic (for list selection, etc.)
 */
export async function hapticSelection() {
  if (Platform.OS !== "web") {
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      console.warn("Haptics not available:", error);
    }
  }
}

/**
 * Haptic configuration for different interactions
 */
export const HAPTICS = {
  buttonPress: hapticLight,
  toggle: hapticMedium,
  important: hapticHeavy,
  success: hapticSuccess,
  warning: hapticWarning,
  error: hapticError,
  selection: hapticSelection,
};

/**
 * Trigger haptic with delay
 */
export async function hapticWithDelay(
  hapticFn: () => Promise<void>,
  delay: number = 0
) {
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  await hapticFn();
}

/**
 * Trigger multiple haptics in sequence
 */
export async function hapticSequence(
  hapticFns: Array<() => Promise<void>>,
  delayBetween: number = 100
) {
  for (const hapticFn of hapticFns) {
    await hapticFn();
    if (delayBetween > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayBetween));
    }
  }
}
