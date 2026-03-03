/**
 * API Client
 * Handles HTTP requests with retry logic, error handling, and response parsing
 */

import { apiConfig } from "./api-config";

export interface ApiRequest {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  data?: any;
  headers?: Record<string, string>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export interface ApiError extends Error {
  statusCode?: number;
  response?: any;
}

class ApiClient {
  private config = apiConfig.getConfig();

  /**
   * Make API request with retry logic
   */
  async request<T = any>(request: ApiRequest): Promise<ApiResponse<T>> {
    const maxRetries = this.config.retryAttempts || 3;
    let lastError: ApiError | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await this.makeRequest<T>(request);
        return response;
      } catch (error) {
        lastError = error as ApiError;

        // Don't retry on client errors (4xx)
        if (lastError.statusCode && lastError.statusCode >= 400 && lastError.statusCode < 500) {
          throw error;
        }

        // Wait before retrying
        if (attempt < maxRetries - 1) {
          const delay = (this.config.retryDelay || 1000) * Math.pow(2, attempt);
          await this.sleep(delay);
        }
      }
    }

    return {
      success: false,
      error: lastError?.message || "Request failed after retries",
      statusCode: lastError?.statusCode,
    };
  }

  /**
   * Make single API request
   */
  private async makeRequest<T = any>(request: ApiRequest): Promise<ApiResponse<T>> {
    const endpoint = this.config.aiApiEndpoint;
    if (!endpoint) {
      throw new Error("API endpoint not configured");
    }

    const url = `${endpoint}${request.endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.config.aiApiKey}`,
      ...request.headers,
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeout || 30000);

    try {
      const response = await fetch(url, {
        method: request.method,
        headers,
        body: request.data ? JSON.stringify(request.data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const error: ApiError = new Error(`HTTP ${response.status}: ${response.statusText}`);
        error.statusCode = response.status;
        try {
          error.response = await response.json();
        } catch {
          error.response = null;
        }
        throw error;
      }

      const data = await response.json();
      return {
        success: true,
        data,
        statusCode: response.status,
      };
    } catch (error) {
      clearTimeout(timeout);

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          const timeoutError: ApiError = new Error("Request timeout");
          timeoutError.statusCode = 408;
          throw timeoutError;
        }
        throw error;
      }

      throw new Error("Unknown error occurred");
    }
  }

  /**
   * Sleep utility for delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * POST request helper
   */
  async post<T = any>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: "POST",
      endpoint,
      data,
      headers,
    });
  }

  /**
   * GET request helper
   */
  async get<T = any>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: "GET",
      endpoint,
      headers,
    });
  }

  /**
   * PUT request helper
   */
  async put<T = any>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: "PUT",
      endpoint,
      data,
      headers,
    });
  }

  /**
   * DELETE request helper
   */
  async delete<T = any>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: "DELETE",
      endpoint,
      headers,
    });
  }

  /**
   * PATCH request helper
   */
  async patch<T = any>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: "PATCH",
      endpoint,
      data,
      headers,
    });
  }
}

export const apiClient = new ApiClient();
