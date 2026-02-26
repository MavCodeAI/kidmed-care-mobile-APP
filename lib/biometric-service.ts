/**
 * Biometric Authentication Service
 * Mock implementation for Face ID / Touch ID
 */

export type BiometricType = "faceId" | "fingerprint" | "iris" | "none";

export interface BiometricResult {
  success: boolean;
  biometricType: BiometricType;
  message: string;
  timestamp: string;
}

class BiometricService {
  private isAvailable: boolean = true;
  private biometricType: BiometricType = "fingerprint";
  private isEnabled: boolean = false;

  /**
   * Check if biometric authentication is available on device
   */
  async isBiometricAvailable(): Promise<boolean> {
    return this.isAvailable;
  }

  /**
   * Get the type of biometric available
   */
  async getBiometricType(): Promise<BiometricType> {
    return this.biometricType;
  }

  /**
   * Authenticate using biometric
   */
  async authenticate(): Promise<BiometricResult> {
    if (!this.isAvailable) {
      return {
        success: false,
        biometricType: "none",
        message: "Biometric authentication not available",
        timestamp: new Date().toISOString(),
      };
    }

    // Mock: 95% success rate
    const isSuccess = Math.random() < 0.95;

    return {
      success: isSuccess,
      biometricType: this.biometricType,
      message: isSuccess
        ? `${this.biometricType === "faceId" ? "Face" : "Fingerprint"} recognized`
        : "Authentication failed. Please try again.",
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Enable biometric authentication
   */
  async enableBiometric(password: string): Promise<boolean> {
    // Mock: Validate password (in real app, would hash and verify)
    if (password.length < 6) {
      return false;
    }

    this.isEnabled = true;
    return true;
  }

  /**
   * Disable biometric authentication
   */
  async disableBiometric(): Promise<boolean> {
    this.isEnabled = false;
    return true;
  }

  /**
   * Check if biometric is enabled
   */
  async isBiometricEnabled(): Promise<boolean> {
    return this.isEnabled;
  }

  /**
   * Get biometric settings
   */
  async getBiometricSettings(): Promise<{
    available: boolean;
    enabled: boolean;
    type: BiometricType;
  }> {
    return {
      available: this.isAvailable,
      enabled: this.isEnabled,
      type: this.biometricType,
    };
  }
}

export const biometricService = new BiometricService();
