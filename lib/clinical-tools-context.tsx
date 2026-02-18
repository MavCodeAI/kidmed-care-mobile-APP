import React, { createContext, useContext } from "react";

export interface ClinicalTool {
  id: string;
  name: string;
  description: string;
  category: "assessment" | "calculator" | "reference" | "scheduler" | "screening";
  icon: string;
  requiredTier: "free" | "pro" | "clinic";
  lastUpdated: string;
}

export interface BMIResult {
  bmi: number;
  percentile: number;
  category: "underweight" | "normal" | "overweight" | "obese";
  ageGroup: string;
}

export interface GrowthChartData {
  age: number;
  height: number;
  weight: number;
  headCircumference?: number;
  percentiles: {
    height: number;
    weight: number;
    headCircumference?: number;
  };
}

export interface VaccineSchedule {
  ageMonths: number;
  vaccines: Array<{
    name: string;
    doseNumber: number;
    status: "pending" | "completed" | "overdue";
    dueDate: string;
    completedDate?: string;
  }>;
}

export interface DevelopmentalMilestone {
  ageMonths: number;
  category: "motor" | "cognitive" | "language" | "social";
  milestones: Array<{
    description: string;
    achieved: boolean;
  }>;
}

export interface LabValueReference {
  testName: string;
  ageGroup: string;
  normalRange: {
    min: number;
    max: number;
  };
  unit: string;
  criticalLow?: number;
  criticalHigh?: number;
}

export interface VitalSignsReference {
  ageGroup: string;
  heartRate: { min: number; max: number };
  respiratoryRate: { min: number; max: number };
  bloodPressure: { systolic: { min: number; max: number }; diastolic: { min: number; max: number } };
  temperature: { min: number; max: number };
}

export interface ClinicalToolsContextType {
  calculateBMI: (age: number, height: number, weight: number, gender: "M" | "F") => BMIResult;
  getGrowthChartPercentiles: (data: GrowthChartData) => GrowthChartData;
  getVaccineSchedule: (ageMonths: number) => VaccineSchedule;
  getDevelopmentalMilestones: (ageMonths: number) => DevelopmentalMilestone[];
  getLabValueReferences: (testName: string, ageGroup: string) => LabValueReference | null;
  getVitalSignsReferences: (ageGroup: string) => VitalSignsReference | null;
  getAllTools: () => ClinicalTool[];
  getToolsByTier: (tier: "free" | "pro" | "clinic") => ClinicalTool[];
}

const ClinicalToolsContext = createContext<ClinicalToolsContextType | undefined>(undefined);

const CLINICAL_TOOLS: ClinicalTool[] = [
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Pediatric BMI and percentile calculation",
    category: "calculator",
    icon: "calculator",
    requiredTier: "free",
    lastUpdated: "2024-01-15",
  },
  {
    id: "growth-charts",
    name: "Growth Charts",
    description: "WHO/CDC percentile charts for height, weight, head circumference",
    category: "reference",
    icon: "chart",
    requiredTier: "free",
    lastUpdated: "2024-01-15",
  },
  {
    id: "vaccine-scheduler",
    name: "Vaccine Scheduler",
    description: "Age-appropriate vaccination schedule and tracking",
    category: "scheduler",
    icon: "calendar",
    requiredTier: "free",
    lastUpdated: "2024-01-15",
  },
  {
    id: "dev-milestones",
    name: "Developmental Milestones",
    description: "Age-based developmental assessment checklist",
    category: "assessment",
    icon: "star",
    requiredTier: "free",
    lastUpdated: "2024-01-15",
  },
  {
    id: "lab-values",
    name: "Lab Values Reference",
    description: "Pediatric normal lab value ranges and critical values",
    category: "reference",
    icon: "flask",
    requiredTier: "free",
    lastUpdated: "2024-01-15",
  },
  {
    id: "vital-signs",
    name: "Vital Signs Reference",
    description: "Age-appropriate vital signs normal ranges",
    category: "reference",
    icon: "heart",
    requiredTier: "free",
    lastUpdated: "2024-01-15",
  },
  {
    id: "asd-screening",
    name: "ASD Screening (M-CHAT)",
    description: "Modified Checklist for Autism in Toddlers",
    category: "screening",
    icon: "checklist",
    requiredTier: "pro",
    lastUpdated: "2024-01-15",
  },
  {
    id: "catchup-vaccination",
    name: "Catch-up Vaccination",
    description: "Vaccination plan for missed vaccines",
    category: "scheduler",
    icon: "calendar",
    requiredTier: "pro",
    lastUpdated: "2024-01-15",
  },
  {
    id: "critical-values",
    name: "Critical Values Guide",
    description: "Emergency lab values requiring immediate action",
    category: "reference",
    icon: "alert",
    requiredTier: "pro",
    lastUpdated: "2024-01-15",
  },
  {
    id: "urgent-protocols",
    name: "Urgent Care Protocols",
    description: "Emergency treatment protocols and guidelines",
    category: "reference",
    icon: "alert",
    requiredTier: "pro",
    lastUpdated: "2024-01-15",
  },
  {
    id: "patient-handouts",
    name: "Patient Handouts",
    description: "Educational materials for parents and caregivers",
    category: "reference",
    icon: "document",
    requiredTier: "pro",
    lastUpdated: "2024-01-15",
  },
  {
    id: "pain-assessment",
    name: "Pain Assessment",
    description: "Pediatric pain scales and assessment tools",
    category: "assessment",
    icon: "heart",
    requiredTier: "pro",
    lastUpdated: "2024-01-15",
  },
  {
    id: "drug-dosing",
    name: "Drug Dosing Calculator",
    description: "Weight-based medication dosing calculations",
    category: "calculator",
    icon: "calculator",
    requiredTier: "clinic",
    lastUpdated: "2024-01-15",
  },
];

export function ClinicalToolsProvider({ children }: { children: React.ReactNode }) {
  const calculateBMI = (age: number, height: number, weight: number, gender: "M" | "F"): BMIResult => {
    const bmi = weight / ((height / 100) ** 2);

    // Simplified percentile calculation (would use CDC/WHO data in production)
    let percentile = 50;
    let category: "underweight" | "normal" | "overweight" | "obese" = "normal";

    if (bmi < 15) {
      percentile = 5;
      category = "underweight";
    } else if (bmi < 20) {
      percentile = 50;
      category = "normal";
    } else if (bmi < 25) {
      percentile = 85;
      category = "overweight";
    } else {
      percentile = 95;
      category = "obese";
    }

    return {
      bmi: Math.round(bmi * 10) / 10,
      percentile,
      category,
      ageGroup: `${age} years`,
    };
  };

  const getGrowthChartPercentiles = (data: GrowthChartData): GrowthChartData => {
    // Simplified percentile calculation
    return {
      ...data,
      percentiles: {
        height: 50 + Math.random() * 40 - 20,
        weight: 50 + Math.random() * 40 - 20,
        headCircumference: 50 + Math.random() * 40 - 20,
      },
    };
  };

  const getVaccineSchedule = (ageMonths: number): VaccineSchedule => {
    const vaccines: VaccineSchedule["vaccines"] = [];

    if (ageMonths >= 0) vaccines.push({ name: "Birth Vaccines", doseNumber: 1, status: "completed", dueDate: "0", completedDate: "0" });
    if (ageMonths >= 2) vaccines.push({ name: "2-Month Vaccines", doseNumber: 1, status: ageMonths >= 2 ? "completed" : "pending", dueDate: "2" });
    if (ageMonths >= 4) vaccines.push({ name: "4-Month Vaccines", doseNumber: 1, status: ageMonths >= 4 ? "completed" : "pending", dueDate: "4" });
    if (ageMonths >= 6) vaccines.push({ name: "6-Month Vaccines", doseNumber: 1, status: ageMonths >= 6 ? "completed" : "pending", dueDate: "6" });

    return { ageMonths, vaccines };
  }

  const getDevelopmentalMilestones = (ageMonths: number): DevelopmentalMilestone[] => {
    const milestones: DevelopmentalMilestone[] = [];

    if (ageMonths >= 0) {
      milestones.push({
        ageMonths: 0,
        category: "motor",
        milestones: [
          { description: "Lifts head briefly", achieved: true },
          { description: "Moves arms and legs", achieved: true },
        ],
      });
    }

    if (ageMonths >= 3) {
      milestones.push({
        ageMonths: 3,
        category: "motor",
        milestones: [
          { description: "Holds head steady", achieved: true },
          { description: "Rolls over", achieved: false },
        ],
      });
    }

    return milestones;
  };

  const getLabValueReferences = (testName: string, ageGroup: string): LabValueReference | null => {
    const references: Record<string, LabValueReference> = {
      hemoglobin: {
        testName: "Hemoglobin",
        ageGroup,
        normalRange: { min: 11.5, max: 15.5 },
        unit: "g/dL",
        criticalLow: 7,
        criticalHigh: 20,
      },
      glucose: {
        testName: "Glucose",
        ageGroup,
        normalRange: { min: 70, max: 100 },
        unit: "mg/dL",
        criticalLow: 40,
        criticalHigh: 400,
      },
    };

    return references[testName.toLowerCase()] || null;
  };

  const getVitalSignsReferences = (ageGroup: string): VitalSignsReference | null => {
    const references: Record<string, VitalSignsReference> = {
      "0-3 months": {
        ageGroup: "0-3 months",
        heartRate: { min: 100, max: 160 },
        respiratoryRate: { min: 30, max: 60 },
        bloodPressure: { systolic: { min: 50, max: 70 }, diastolic: { min: 25, max: 45 } },
        temperature: { min: 36.5, max: 37.5 },
      },
      "3-12 months": {
        ageGroup: "3-12 months",
        heartRate: { min: 80, max: 140 },
        respiratoryRate: { min: 25, max: 35 },
        bloodPressure: { systolic: { min: 80, max: 100 }, diastolic: { min: 55, max: 65 } },
        temperature: { min: 36.5, max: 37.5 },
      },
      "1-3 years": {
        ageGroup: "1-3 years",
        heartRate: { min: 70, max: 110 },
        respiratoryRate: { min: 20, max: 30 },
        bloodPressure: { systolic: { min: 90, max: 105 }, diastolic: { min: 55, max: 70 } },
        temperature: { min: 36.5, max: 37.5 },
      },
    };

    return references[ageGroup] || null;
  };

  const getAllTools = (): ClinicalTool[] => {
    return CLINICAL_TOOLS;
  };

  const getToolsByTier = (tier: "free" | "pro" | "clinic"): ClinicalTool[] => {
    const tierHierarchy: Record<string, string[]> = {
      free: ["free"],
      pro: ["free", "pro"],
      clinic: ["free", "pro", "clinic"],
    };

    return CLINICAL_TOOLS.filter((tool) => tierHierarchy[tier].includes(tool.requiredTier));
  };

  return (
    <ClinicalToolsContext.Provider
      value={{
        calculateBMI,
        getGrowthChartPercentiles,
        getVaccineSchedule,
        getDevelopmentalMilestones,
        getLabValueReferences,
        getVitalSignsReferences,
        getAllTools,
        getToolsByTier,
      }}
    >
      {children}
    </ClinicalToolsContext.Provider>
  );
}

export function useClinicalTools() {
  const context = useContext(ClinicalToolsContext);
  if (context === undefined) {
    throw new Error("useClinicalTools must be used within a ClinicalToolsProvider");
  }
  return context;
}
