/**
 * API Configuration Service
 * Manages API keys, endpoints, and configuration for external services
 */

export interface ApiConfig {
  aiApiKey?: string;
  aiApiEndpoint?: string;
  aiModel?: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

class ApiConfigService {
  private config: ApiConfig = {
    aiModel: "gpt-4",
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  };

  /**
   * Initialize API configuration
   */
  initialize(config: Partial<ApiConfig>) {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  /**
   * Set AI API key
   */
  setAiApiKey(key: string) {
    this.config.aiApiKey = key;
  }

  /**
   * Get AI API key
   */
  getAiApiKey(): string | undefined {
    return this.config.aiApiKey;
  }

  /**
   * Set AI API endpoint
   */
  setAiApiEndpoint(endpoint: string) {
    this.config.aiApiEndpoint = endpoint;
  }

  /**
   * Get AI API endpoint
   */
  getAiApiEndpoint(): string | undefined {
    return this.config.aiApiEndpoint;
  }

  /**
   * Set AI model
   */
  setAiModel(model: string) {
    this.config.aiModel = model;
  }

  /**
   * Get AI model
   */
  getAiModel(): string {
    return this.config.aiModel || "gpt-4";
  }

  /**
   * Get full configuration
   */
  getConfig(): ApiConfig {
    return { ...this.config };
  }

  /**
   * Check if API is properly configured
   */
  isConfigured(): boolean {
    return !!(this.config.aiApiKey && this.config.aiApiEndpoint);
  }

  /**
   * Validate configuration
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.config.aiApiKey) {
      errors.push("AI API key is not configured");
    }

    if (!this.config.aiApiEndpoint) {
      errors.push("AI API endpoint is not configured");
    }

    if (!this.config.aiModel) {
      errors.push("AI model is not configured");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export const apiConfig = new ApiConfigService();
