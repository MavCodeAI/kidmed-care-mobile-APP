/**
 * AI Service
 * Handles AI-powered clinical guidance with API integration
 */

import { apiClient, ApiResponse } from "./api-client";
import { apiConfig } from "./api-config";

export interface ClinicalGuidanceRequest {
  symptoms: string[];
  patientAge: number;
  patientGender: "M" | "F";
  medicalHistory?: string[];
  currentMedications?: string[];
  vitalSigns?: {
    temperature?: number;
    heartRate?: number;
    respiratoryRate?: number;
    bloodPressure?: string;
  };
}

export interface ClinicalGuidanceResponse {
  diagnosis: string[];
  recommendations: string[];
  urgency: "low" | "moderate" | "high" | "critical";
  references: Array<{
    title: string;
    url?: string;
    source: string;
  }>;
  confidence: number;
  disclaimer: string;
}

export interface MockAiResponse {
  diagnosis: string[];
  recommendations: string[];
  urgency: "low" | "moderate" | "high" | "critical";
  references: Array<{
    title: string;
    source: string;
  }>;
  confidence: number;
}

class AiService {
  /**
   * Get clinical guidance from AI
   */
  async getClinicalGuidance(request: ClinicalGuidanceRequest): Promise<ApiResponse<ClinicalGuidanceResponse>> {
    // Check if API is configured
    if (!apiConfig.isConfigured()) {
      // Return mock response for development
      return this.getMockClinicalGuidance(request);
    }

    try {
      const response = await apiClient.post<ClinicalGuidanceResponse>("/clinical-guidance", {
        symptoms: request.symptoms,
        patientAge: request.patientAge,
        patientGender: request.patientGender,
        medicalHistory: request.medicalHistory,
        currentMedications: request.currentMedications,
        vitalSigns: request.vitalSigns,
      });

      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get clinical guidance",
      };
    }
  }

  /**
   * Get mock clinical guidance for development
   */
  private getMockClinicalGuidance(request: ClinicalGuidanceRequest): ApiResponse<ClinicalGuidanceResponse> {
    const mockResponses: Record<string, MockAiResponse> = {
      fever: {
        diagnosis: ["Viral infection", "Bacterial infection (possible)"],
        recommendations: [
          "Monitor temperature every 4 hours",
          "Ensure adequate hydration",
          "Consider antipyretics if temperature > 38.5°C",
          "Seek medical attention if fever persists > 3 days",
        ],
        urgency: "moderate",
        references: [
          {
            title: "Fever Management in Pediatrics",
            source: "AAP Guidelines",
          },
          {
            title: "Fever in Children",
            source: "WHO Clinical Handbook",
          },
        ],
        confidence: 0.85,
      },
      cough: {
        diagnosis: ["Upper respiratory infection", "Bronchitis (possible)", "Asthma (consider)"],
        recommendations: [
          "Monitor for signs of respiratory distress",
          "Ensure adequate hydration",
          "Use humidifier if available",
          "Avoid irritants and allergens",
          "Seek medical attention if cough persists > 2 weeks",
        ],
        urgency: "low",
        references: [
          {
            title: "Cough in Children",
            source: "AAP Guidelines",
          },
          {
            title: "Respiratory Infections",
            source: "CDC Guidelines",
          },
        ],
        confidence: 0.78,
      },
      diarrhea: {
        diagnosis: ["Viral gastroenteritis", "Bacterial gastroenteritis (possible)"],
        recommendations: [
          "Maintain hydration with ORS",
          "Continue age-appropriate feeding",
          "Monitor for signs of dehydration",
          "Seek medical attention if diarrhea persists > 7 days",
        ],
        urgency: "moderate",
        references: [
          {
            title: "Acute Diarrhea in Children",
            source: "WHO Guidelines",
          },
          {
            title: "Gastroenteritis Management",
            source: "AAP Guidelines",
          },
        ],
        confidence: 0.82,
      },
    };

    // Find matching response based on symptoms
    const symptomKey = request.symptoms[0]?.toLowerCase() || "fever";
    const mockResponse = mockResponses[symptomKey] || mockResponses.fever;

    return {
      success: true,
      data: {
        ...mockResponse,
        disclaimer:
          "This is a mock response for development. Always consult with a qualified healthcare provider for clinical decisions.",
      },
    };
  }

  /**
   * Generate prescription
   */
  async generatePrescription(request: {
    diagnosis: string;
    patientAge: number;
    patientWeight?: number;
    medications: Array<{
      name: string;
      dose: string;
      frequency: string;
      duration: string;
    }>;
  }): Promise<ApiResponse<any>> {
    if (!apiConfig.isConfigured()) {
      return {
        success: true,
        data: {
          prescriptionId: `RX-${Date.now()}`,
          medications: request.medications,
          generatedAt: new Date().toISOString(),
        },
      };
    }

    try {
      const response = await apiClient.post("/prescriptions", request);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate prescription",
      };
    }
  }

  /**
   * Check drug interactions
   */
  async checkDrugInteractions(medications: string[]): Promise<ApiResponse<any>> {
    if (!apiConfig.isConfigured()) {
      return {
        success: true,
        data: {
          interactions: [],
          warnings: [],
        },
      };
    }

    try {
      const response = await apiClient.post("/drug-interactions", { medications });
      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to check drug interactions",
      };
    }
  }

  /**
   * Get clinical decision tree
   */
  async getClinicalDecisionTree(condition: string): Promise<ApiResponse<any>> {
    if (!apiConfig.isConfigured()) {
      return {
        success: true,
        data: {
          condition,
          steps: [
            {
              id: 1,
              question: "What are the primary symptoms?",
              options: ["Option 1", "Option 2", "Option 3"],
            },
          ],
        },
      };
    }

    try {
      const response = await apiClient.get(`/decision-trees/${condition}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get decision tree",
      };
    }
  }
}

export const aiService = new AiService();
