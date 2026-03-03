import { AccessibilityInfo, Platform } from "react-native";

/**
 * Accessibility Utilities
 * Screen reader support and keyboard navigation
 */

/**
 * Announce message to screen reader
 */
export async function announceForAccessibility(message: string) {
  if (Platform.OS !== "web") {
    try {
      await AccessibilityInfo.announceForAccessibility(message);
    } catch (error) {
      console.warn("Accessibility announcement failed:", error);
    }
  }
}

/**
 * Check if screen reader is enabled
 */
export async function isScreenReaderEnabled(): Promise<boolean> {
  if (Platform.OS !== "web") {
    try {
      return await AccessibilityInfo.isScreenReaderEnabled();
    } catch (error) {
      console.warn("Screen reader check failed:", error);
      return false;
    }
  }
  return false;
}

/**
 * Accessibility labels for common elements
 */
export const ACCESSIBILITY_LABELS = {
  // Navigation
  backButton: "Go back to previous screen",
  skipButton: "Skip to main content",
  nextButton: "Go to next screen",
  previousButton: "Go to previous screen",

  // Buttons
  submitButton: "Submit form",
  cancelButton: "Cancel operation",
  deleteButton: "Delete item",
  editButton: "Edit item",
  saveButton: "Save changes",

  // Forms
  emailInput: "Email address input",
  passwordInput: "Password input",
  searchInput: "Search input",
  textInput: "Text input",

  // Status
  loading: "Loading content",
  error: "Error occurred",
  success: "Operation successful",
  warning: "Warning message",

  // Navigation
  homeTab: "Home tab",
  patientsTab: "Patients tab",
  toolsTab: "Tools tab",
  settingsTab: "Settings tab",
  profileTab: "Profile tab",

  // Patient management
  patientCard: "Patient card",
  addPatient: "Add new patient",
  editPatient: "Edit patient information",
  viewPatientDetails: "View patient details",

  // Clinical tools
  clinicalTool: "Clinical tool",
  toolDescription: "Tool description",
  calculateButton: "Calculate result",
  resetButton: "Reset calculator",

  // Subscription
  upgradePlan: "Upgrade subscription plan",
  selectPlan: "Select subscription plan",
  currentPlan: "Current subscription plan",
};

/**
 * Accessibility hints for common interactions
 */
export const ACCESSIBILITY_HINTS = {
  button: "Double tap to activate",
  link: "Double tap to open",
  slider: "Use left and right arrows to adjust",
  switch: "Double tap to toggle",
  tab: "Double tap to navigate to tab",
  list: "Swipe down to navigate list items",
  modal: "Double tap to close modal",
};

/**
 * Keyboard navigation config
 */
export const KEYBOARD_CONFIG = {
  // Tab order
  tabOrder: {
    primary: 1,
    secondary: 2,
    tertiary: 3,
  },

  // Key codes
  keyCodes: {
    Enter: 13,
    Escape: 27,
    Tab: 9,
    ArrowUp: 38,
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39,
    Space: 32,
  },
};

/**
 * Focus management
 */
export interface FocusableElement {
  id: string;
  label: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

/**
 * Create accessible button props
 */
export function createAccessibleButtonProps(
  label: string,
  hint?: string,
  onPress?: () => void
) {
  return {
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityRole: "button",
    onPress,
  };
}

/**
 * Create accessible input props
 */
export function createAccessibleInputProps(
  label: string,
  placeholder?: string,
  hint?: string
) {
  return {
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityRole: "textbox",
    placeholder,
  };
}

/**
 * Create accessible tab props
 */
export function createAccessibleTabProps(
  label: string,
  selected: boolean,
  onPress?: () => void
) {
  return {
    accessible: true,
    accessibilityLabel: label,
    accessibilityRole: "tab",
    accessibilityState: { selected },
    onPress,
  };
}

/**
 * Create accessible list item props
 */
export function createAccessibleListItemProps(
  label: string,
  description?: string,
  onPress?: () => void
) {
  return {
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: description,
    accessibilityRole: "button",
    onPress,
  };
}

/**
 * Announce screen change
 */
export async function announceScreenChange(screenName: string) {
  await announceForAccessibility(`Navigated to ${screenName} screen`);
}

/**
 * Announce form validation error
 */
export async function announceFormError(fieldName: string, errorMessage: string) {
  await announceForAccessibility(`${fieldName} error: ${errorMessage}`);
}

/**
 * Announce form success
 */
export async function announceFormSuccess(message: string) {
  await announceForAccessibility(`Success: ${message}`);
}

/**
 * Announce loading state
 */
export async function announceLoading(message: string = "Loading") {
  await announceForAccessibility(`${message}, please wait`);
}

/**
 * Announce completion
 */
export async function announceCompletion(message: string) {
  await announceForAccessibility(`${message} complete`);
}
