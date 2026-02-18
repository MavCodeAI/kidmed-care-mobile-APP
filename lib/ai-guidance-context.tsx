import React, { createContext, useContext } from "react";

export interface Citation {
  id: string;
  title: string;
  authors: string;
  year: number;
  source: string;
  doi?: string;
  url?: string;
}

export interface AIRecommendation {
  id: string;
  patientId: string;
  timestamp: string;
  clinicalContext: {
    age: number;
    symptoms: string[];
    labValues?: Record<string, number>;
    vitalSigns?: Record<string, number>;
    medicalHistory?: string[];
  };
  primaryDiagnosis: {
    condition: string;
    icd10Code: string;
    confidence: number; // 0-100
    description: string;
  };
  differentialDiagnoses: Array<{
    condition: string;
    icd10Code: string;
    confidence: number;
    reasoning: string;
  }>;
  recommendedTreatment: {
    primary: string;
    alternatives: string[];
    medications?: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
      warnings: string[];
    }>;
    nonPharmacological: string[];
  };
  followUpRecommendations: string[];
  redFlags: string[];
  citations: Citation[];
  disclaimer: string;
  createdBy: string; // user ID
  reviewed: boolean;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface AIGuidanceContextType {
  generateClinicalGuidance: (context: AIRecommendation["clinicalContext"]) => Promise<AIRecommendation>;
  getRecommendationHistory: (patientId: string) => Promise<AIRecommendation[]>;
  saveRecommendation: (recommendation: AIRecommendation) => Promise<void>;
  getAuditTrail: (patientId: string) => Promise<AIRecommendation[]>;
  reviewRecommendation: (recommendationId: string, approved: boolean, notes?: string) => Promise<void>;
}

const AIGuidanceContext = createContext<AIGuidanceContextType | undefined>(undefined);

export function AIGuidanceProvider({ children }: { children: React.ReactNode }) {
  const generateClinicalGuidance = async (context: AIRecommendation["clinicalContext"]): Promise<AIRecommendation> => {
    try {
      // TODO: Replace with actual LLM API call to backend
      // For now, return a mock recommendation based on age and symptoms
      const mockRecommendation: AIRecommendation = {
        id: "rec_" + Date.now(),
        patientId: "patient_mock",
        timestamp: new Date().toISOString(),
        clinicalContext: context,
        primaryDiagnosis: {
          condition: "Acute Upper Respiratory Infection",
          icd10Code: "J06.9",
          confidence: 85,
          description: "Common viral upper respiratory infection with typical presentation",
        },
        differentialDiagnoses: [
          {
            condition: "Acute Otitis Media",
            icd10Code: "H66.001",
            confidence: 45,
            reasoning: "Patient age and symptoms consistent with ear infection",
          },
          {
            condition: "Allergic Rhinitis",
            icd10Code: "J30.9",
            confidence: 30,
            reasoning: "Seasonal symptoms could indicate allergies",
          },
        ],
        recommendedTreatment: {
          primary: "Supportive care with monitoring",
          alternatives: ["Symptomatic treatment with acetaminophen or ibuprofen"],
          medications: [
            {
              name: "Acetaminophen",
              dosage: "15 mg/kg",
              frequency: "Every 4-6 hours",
              duration: "As needed for 3-5 days",
              warnings: ["Do not exceed 5 doses in 24 hours", "Monitor for liver function"],
            },
          ],
          nonPharmacological: ["Rest", "Fluids", "Humidifier use", "Nasal saline drops"],
        },
        followUpRecommendations: [
          "Recheck in 3-5 days if symptoms persist",
          "Monitor for signs of secondary infection",
          "Educate parents on fever management",
        ],
        redFlags: [
          "High fever (>39°C) lasting >3 days",
          "Severe ear pain or drainage",
          "Difficulty breathing",
          "Altered mental status",
        ],
        citations: [
          {
            id: "cite_1",
            title: "Management of Acute Respiratory Infections in Children",
            authors: "American Academy of Pediatrics",
            year: 2023,
            source: "AAP Clinical Practice Guidelines",
            url: "https://www.aap.org",
          },
          {
            id: "cite_2",
            title: "Pediatric Fever Management",
            authors: "Smith J, Johnson K, Williams R",
            year: 2022,
            source: "Journal of Pediatric Medicine",
            doi: "10.1234/jpm.2022.001",
          },
        ],
        disclaimer:
          "This is a clinical decision support tool. All recommendations should be reviewed by a qualified healthcare provider and tailored to individual patient circumstances. This tool does not replace clinical judgment.",
        createdBy: "user_mock",
        reviewed: false,
      };

      return mockRecommendation;
    } catch (error) {
      throw new Error("Failed to generate clinical guidance");
    }
  };

  const getRecommendationHistory = async (patientId: string): Promise<AIRecommendation[]> => {
    try {
      // TODO: Fetch from backend database
      return [];
    } catch (error) {
      throw new Error("Failed to fetch recommendation history");
    }
  };

  const saveRecommendation = async (recommendation: AIRecommendation): Promise<void> => {
    try {
      // TODO: Save to backend database
      console.log("Saving recommendation:", recommendation);
    } catch (error) {
      throw new Error("Failed to save recommendation");
    }
  };

  const getAuditTrail = async (patientId: string): Promise<AIRecommendation[]> => {
    try {
      // TODO: Fetch audit trail from backend
      return [];
    } catch (error) {
      throw new Error("Failed to fetch audit trail");
    }
  };

  const reviewRecommendation = async (recommendationId: string, approved: boolean, notes?: string): Promise<void> => {
    try {
      // TODO: Update recommendation review status in backend
      console.log("Reviewing recommendation:", recommendationId, approved, notes);
    } catch (error) {
      throw new Error("Failed to review recommendation");
    }
  };

  return (
    <AIGuidanceContext.Provider
      value={{
        generateClinicalGuidance,
        getRecommendationHistory,
        saveRecommendation,
        getAuditTrail,
        reviewRecommendation,
      }}
    >
      {children}
    </AIGuidanceContext.Provider>
  );
}

export function useAIGuidance() {
  const context = useContext(AIGuidanceContext);
  if (context === undefined) {
    throw new Error("useAIGuidance must be used within an AIGuidanceProvider");
  }
  return context;
}
