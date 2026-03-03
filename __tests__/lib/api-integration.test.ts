import { describe, it, expect, beforeEach } from "vitest";
import { apiConfig } from "../../lib/api-config";
import { apiClient } from "../../lib/api-client";
import { aiService } from "../../lib/ai-service";

describe("API Configuration", () => {
  beforeEach(() => {
    apiConfig.initialize({
      aiApiKey: undefined,
      aiApiEndpoint: undefined,
    });
  });

  it("should initialize with default config", () => {
    const config = apiConfig.getConfig();
    expect(config.aiModel).toBe("gpt-4");
    expect(config.timeout).toBe(30000);
    expect(config.retryAttempts).toBe(3);
  });

  it("should set and get AI API key", () => {
    apiConfig.setAiApiKey("test-key-123");
    expect(apiConfig.getAiApiKey()).toBe("test-key-123");
  });

  it("should set and get AI API endpoint", () => {
    apiConfig.setAiApiEndpoint("https://api.example.com");
    expect(apiConfig.getAiApiEndpoint()).toBe("https://api.example.com");
  });

  it("should set and get AI model", () => {
    apiConfig.setAiModel("gpt-3.5-turbo");
    expect(apiConfig.getAiModel()).toBe("gpt-3.5-turbo");
  });

  it("should validate configuration", () => {
    let validation = apiConfig.validate();
    expect(validation.valid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);

    apiConfig.setAiApiKey("test-key");
    apiConfig.setAiApiEndpoint("https://api.example.com");
    validation = apiConfig.validate();
    expect(validation.valid).toBe(true);
    expect(validation.errors.length).toBe(0);
  });

  it("should check if API is configured", () => {
    expect(apiConfig.isConfigured()).toBe(false);

    apiConfig.setAiApiKey("test-key");
    apiConfig.setAiApiEndpoint("https://api.example.com");
    expect(apiConfig.isConfigured()).toBe(true);
  });

  it("should initialize with partial config", () => {
    apiConfig.initialize({
      aiApiKey: "partial-key",
      timeout: 60000,
      aiModel: "gpt-4",
    });

    const config = apiConfig.getConfig();
    expect(config.aiApiKey).toBe("partial-key");
    expect(config.timeout).toBe(60000);
    expect(config.aiModel).toBe("gpt-4");
  });
});

describe("AI Service", () => {
  it("should get mock clinical guidance when API not configured", async () => {
    const response = await aiService.getClinicalGuidance({
      symptoms: ["fever"],
      patientAge: 5,
      patientGender: "M",
    });

    expect(response.success).toBe(true);
    expect(response.data).toBeDefined();
    expect(response.data?.diagnosis).toBeDefined();
    expect(response.data?.recommendations).toBeDefined();
    expect(response.data?.urgency).toBeDefined();
    expect(response.data?.confidence).toBeGreaterThan(0);
  });

  it("should return mock fever guidance", async () => {
    const response = await aiService.getClinicalGuidance({
      symptoms: ["fever"],
      patientAge: 5,
      patientGender: "M",
      vitalSigns: {
        temperature: 39.5,
      },
    });

    expect(response.success).toBe(true);
    expect(response.data?.diagnosis).toContain("Viral infection");
    expect(response.data?.urgency).toBe("moderate");
  });

  it("should return mock cough guidance", async () => {
    const response = await aiService.getClinicalGuidance({
      symptoms: ["cough"],
      patientAge: 3,
      patientGender: "F",
    });

    expect(response.success).toBe(true);
    expect(response.data?.diagnosis).toContain("Upper respiratory infection");
    expect(response.data?.urgency).toBe("low");
  });

  it("should return mock diarrhea guidance", async () => {
    const response = await aiService.getClinicalGuidance({
      symptoms: ["diarrhea"],
      patientAge: 2,
      patientGender: "M",
    });

    expect(response.success).toBe(true);
    expect(response.data?.diagnosis).toContain("Viral gastroenteritis");
    expect(response.data?.urgency).toBe("moderate");
  });

  it("should include references in guidance", async () => {
    const response = await aiService.getClinicalGuidance({
      symptoms: ["fever"],
      patientAge: 5,
      patientGender: "M",
    });

    expect(response.data?.references).toBeDefined();
    expect(response.data?.references?.length).toBeGreaterThan(0);
    expect(response.data?.references?.[0]).toHaveProperty("title");
    expect(response.data?.references?.[0]).toHaveProperty("source");
  });

  it("should include disclaimer in mock response", async () => {
    const response = await aiService.getClinicalGuidance({
      symptoms: ["fever"],
      patientAge: 5,
      patientGender: "M",
    });

    expect(response.data?.disclaimer).toBeDefined();
    expect(response.data?.disclaimer?.length).toBeGreaterThan(0);
  });

  it("should generate mock prescription", async () => {
    const response = await aiService.generatePrescription({
      diagnosis: "Viral infection",
      patientAge: 5,
      patientWeight: 20,
      medications: [
        {
          name: "Paracetamol",
          dose: "15mg/kg",
          frequency: "Every 6 hours",
          duration: "5 days",
        },
      ],
    });

    expect(response.success).toBe(true);
    expect(response.data?.prescriptionId).toBeDefined();
    expect(response.data?.medications).toBeDefined();
  });

  it("should check drug interactions", async () => {
    const response = await aiService.checkDrugInteractions(["Paracetamol", "Ibuprofen"]);

    expect(response.success).toBe(true);
    expect(response.data?.interactions).toBeDefined();
    expect(response.data?.warnings).toBeDefined();
  });

  it("should get clinical decision tree", async () => {
    const response = await aiService.getClinicalDecisionTree("fever");

    expect(response.success).toBe(true);
    expect(response.data?.condition).toBeDefined();
    expect(response.data?.steps).toBeDefined();
  });
});

describe("API Client", () => {
  it("should handle POST requests", async () => {
    // This test verifies the structure, actual API calls would fail without endpoint
    expect(apiClient.post).toBeDefined();
    expect(typeof apiClient.post).toBe("function");
  });

  it("should handle GET requests", async () => {
    expect(apiClient.get).toBeDefined();
    expect(typeof apiClient.get).toBe("function");
  });

  it("should handle PUT requests", async () => {
    expect(apiClient.put).toBeDefined();
    expect(typeof apiClient.put).toBe("function");
  });

  it("should handle DELETE requests", async () => {
    expect(apiClient.delete).toBeDefined();
    expect(typeof apiClient.delete).toBe("function");
  });

  it("should handle PATCH requests", async () => {
    expect(apiClient.patch).toBeDefined();
    expect(typeof apiClient.patch).toBe("function");
  });
});
