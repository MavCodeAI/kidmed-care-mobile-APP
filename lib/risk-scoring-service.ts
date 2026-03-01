/**
 * Predictive Patient Risk Scoring Service
 * Advanced analytics for patient risk assessment and prediction
 */

export interface RiskFactor {
  id: string;
  name: string;
  weight: number;
  category: 'clinical' | 'demographic' | 'social' | 'behavioral';
}

export interface PatientRiskProfile {
  patientId: string;
  overallRiskScore: number; // 0-100
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  admissionRisk: number; // 0-100
  readmissionRisk: number; // 0-100
  chronicDiseaseRisk: number; // 0-100
  developmentalDelayRisk: number; // 0-100
  riskFactors: {
    factor: RiskFactor;
    value: number;
    contribution: number;
  }[];
  recommendations: string[];
  lastUpdated: Date;
}

export interface OutcomePrediction {
  patientId: string;
  outcome: string;
  probability: number; // 0-1
  confidence: number; // 0-1
  timeframe: string;
  factors: string[];
}

class RiskScoringService {
  private riskFactors: Map<string, RiskFactor> = new Map();
  private patientProfiles: Map<string, PatientRiskProfile> = new Map();
  private predictions: Map<string, OutcomePrediction[]> = new Map();

  constructor() {
    this.initializeRiskFactors();
  }

  /**
   * Initialize default risk factors
   */
  private initializeRiskFactors() {
    const factors: RiskFactor[] = [
      // Clinical factors
      { id: 'chronic-disease', name: 'Chronic Disease', weight: 0.25, category: 'clinical' },
      { id: 'recent-hospitalization', name: 'Recent Hospitalization', weight: 0.20, category: 'clinical' },
      { id: 'multiple-medications', name: 'Multiple Medications (>5)', weight: 0.15, category: 'clinical' },
      { id: 'poor-nutrition', name: 'Poor Nutrition Status', weight: 0.10, category: 'clinical' },

      // Demographic factors
      { id: 'age-extremes', name: 'Age <2 or >12 years', weight: 0.15, category: 'demographic' },
      { id: 'low-birth-weight', name: 'Low Birth Weight History', weight: 0.12, category: 'demographic' },
      { id: 'prematurity', name: 'Prematurity (<37 weeks)', weight: 0.10, category: 'demographic' },

      // Social factors
      { id: 'low-income', name: 'Low Socioeconomic Status', weight: 0.12, category: 'social' },
      { id: 'limited-access', name: 'Limited Healthcare Access', weight: 0.10, category: 'social' },
      { id: 'housing-instability', name: 'Housing Instability', weight: 0.08, category: 'social' },

      // Behavioral factors
      { id: 'missed-appointments', name: 'Missed Appointments', weight: 0.08, category: 'behavioral' },
      { id: 'poor-medication-adherence', name: 'Poor Medication Adherence', weight: 0.10, category: 'behavioral' },
      { id: 'limited-parental-support', name: 'Limited Parental Support', weight: 0.08, category: 'behavioral' },
    ];

    factors.forEach(factor => this.riskFactors.set(factor.id, factor));
  }

  /**
   * Calculate patient risk profile
   */
  calculateRiskProfile(
    patientId: string,
    clinicalData: Record<string, number>,
    demographicData: Record<string, boolean>,
    socialData: Record<string, boolean>,
    behavioralData: Record<string, number>
  ): PatientRiskProfile {
    let totalScore = 0;
    const riskFactorDetails: PatientRiskProfile['riskFactors'] = [];

    // Process clinical factors
    Object.entries(clinicalData).forEach(([key, value]) => {
      const factor = this.riskFactors.get(key);
      if (factor) {
        const contribution = (value / 100) * factor.weight * 100;
        totalScore += contribution;
        riskFactorDetails.push({
          factor,
          value,
          contribution,
        });
      }
    });

    // Process demographic factors
    Object.entries(demographicData).forEach(([key, present]) => {
      const factor = this.riskFactors.get(key);
      if (factor && present) {
        const contribution = factor.weight * 100;
        totalScore += contribution;
        riskFactorDetails.push({
          factor,
          value: 100,
          contribution,
        });
      }
    });

    // Process social factors
    Object.entries(socialData).forEach(([key, present]) => {
      const factor = this.riskFactors.get(key);
      if (factor && present) {
        const contribution = factor.weight * 100;
        totalScore += contribution;
        riskFactorDetails.push({
          factor,
          value: 100,
          contribution,
        });
      }
    });

    // Process behavioral factors
    Object.entries(behavioralData).forEach(([key, value]) => {
      const factor = this.riskFactors.get(key);
      if (factor) {
        const contribution = (value / 100) * factor.weight * 100;
        totalScore += contribution;
        riskFactorDetails.push({
          factor,
          value,
          contribution,
        });
      }
    });

    const overallRiskScore = Math.min(100, totalScore);
    const riskLevel = this.getRiskLevel(overallRiskScore);

    const profile: PatientRiskProfile = {
      patientId,
      overallRiskScore,
      riskLevel,
      admissionRisk: this.calculateAdmissionRisk(overallRiskScore, clinicalData),
      readmissionRisk: this.calculateReadmissionRisk(clinicalData, behavioralData),
      chronicDiseaseRisk: this.calculateChronicDiseaseRisk(clinicalData, demographicData),
      developmentalDelayRisk: this.calculateDevelopmentalDelayRisk(clinicalData, demographicData, socialData),
      riskFactors: riskFactorDetails,
      recommendations: this.generateRecommendations(riskLevel, riskFactorDetails),
      lastUpdated: new Date(),
    };

    this.patientProfiles.set(patientId, profile);
    return profile;
  }

  /**
   * Calculate admission risk
   */
  private calculateAdmissionRisk(overallScore: number, clinicalData: Record<string, number>): number {
    const baseRisk = overallScore * 0.7;
    const chronicDisease = clinicalData['chronic-disease'] || 0;
    const recentHosp = clinicalData['recent-hospitalization'] || 0;
    return Math.min(100, baseRisk + (chronicDisease * 0.2) + (recentHosp * 0.15));
  }

  /**
   * Calculate readmission risk
   */
  private calculateReadmissionRisk(clinicalData: Record<string, number>, behavioralData: Record<string, number>): number {
    const recentHosp = clinicalData['recent-hospitalization'] || 0;
    const adherence = behavioralData['poor-medication-adherence'] || 0;
    const appointments = behavioralData['missed-appointments'] || 0;
    return Math.min(100, (recentHosp * 0.5) + (adherence * 0.3) + (appointments * 0.2));
  }

  /**
   * Calculate chronic disease risk
   */
  private calculateChronicDiseaseRisk(clinicalData: Record<string, number>, demographicData: Record<string, boolean>): number {
    const chronic = clinicalData['chronic-disease'] || 0;
    const lowBirthWeight = demographicData['low-birth-weight'] ? 15 : 0;
    const prematurity = demographicData['prematurity'] ? 12 : 0;
    return Math.min(100, chronic * 0.7 + lowBirthWeight + prematurity);
  }

  /**
   * Calculate developmental delay risk
   */
  private calculateDevelopmentalDelayRisk(
    clinicalData: Record<string, number>,
    demographicData: Record<string, boolean>,
    socialData: Record<string, boolean>
  ): number {
    const lowBirthWeight = demographicData['low-birth-weight'] ? 20 : 0;
    const prematurity = demographicData['prematurity'] ? 25 : 0;
    const poorNutrition = clinicalData['poor-nutrition'] || 0;
    const lowIncome = socialData['low-income'] ? 15 : 0;
    return Math.min(100, lowBirthWeight + prematurity + (poorNutrition * 0.5) + lowIncome);
  }

  /**
   * Get risk level from score
   */
  private getRiskLevel(score: number): 'low' | 'moderate' | 'high' | 'critical' {
    if (score >= 75) return 'critical';
    if (score >= 50) return 'high';
    if (score >= 25) return 'moderate';
    return 'low';
  }

  /**
   * Generate recommendations based on risk profile
   */
  private generateRecommendations(
    riskLevel: string,
    riskFactors: PatientRiskProfile['riskFactors']
  ): string[] {
    const recommendations: string[] = [];

    if (riskLevel === 'critical' || riskLevel === 'high') {
      recommendations.push('Schedule urgent comprehensive evaluation');
      recommendations.push('Increase monitoring frequency');
      recommendations.push('Consider case management services');
    }

    // Factor-specific recommendations
    const topFactors = riskFactors.sort((a, b) => b.contribution - a.contribution).slice(0, 3);
    topFactors.forEach(rf => {
      switch (rf.factor.id) {
        case 'chronic-disease':
          recommendations.push('Optimize chronic disease management');
          break;
        case 'recent-hospitalization':
          recommendations.push('Implement post-discharge follow-up protocol');
          break;
        case 'poor-nutrition':
          recommendations.push('Refer to nutrition specialist');
          break;
        case 'low-income':
          recommendations.push('Connect with social services and community resources');
          break;
        case 'poor-medication-adherence':
          recommendations.push('Implement medication adherence support program');
          break;
      }
    });

    return recommendations;
  }

  /**
   * Predict patient outcomes
   */
  predictOutcome(patientId: string, outcome: string, timeframe: string = '6 months'): OutcomePrediction {
    const profile = this.patientProfiles.get(patientId);
    if (!profile) {
      throw new Error(`Patient profile not found for ${patientId}`);
    }

    let probability = 0;
    let factors: string[] = [];

    switch (outcome) {
      case 'hospitalization':
        probability = profile.admissionRisk / 100;
        factors = profile.riskFactors
          .filter(rf => rf.contribution > 5)
          .map(rf => rf.factor.name);
        break;
      case 'readmission':
        probability = profile.readmissionRisk / 100;
        factors = profile.riskFactors
          .filter(rf => rf.contribution > 5)
          .map(rf => rf.factor.name);
        break;
      case 'developmental-delay':
        probability = profile.developmentalDelayRisk / 100;
        factors = profile.riskFactors
          .filter(rf => rf.contribution > 5)
          .map(rf => rf.factor.name);
        break;
    }

    const prediction: OutcomePrediction = {
      patientId,
      outcome,
      probability: Math.min(1, probability),
      confidence: Math.max(0.6, 1 - (factors.length * 0.05)),
      timeframe,
      factors,
    };

    if (!this.predictions.has(patientId)) {
      this.predictions.set(patientId, []);
    }
    this.predictions.get(patientId)!.push(prediction);

    return prediction;
  }

  /**
   * Get patient risk profile
   */
  getPatientProfile(patientId: string): PatientRiskProfile | undefined {
    return this.patientProfiles.get(patientId);
  }

  /**
   * Get patient predictions
   */
  getPatientPredictions(patientId: string): OutcomePrediction[] {
    return this.predictions.get(patientId) || [];
  }

  /**
   * Get risk statistics
   */
  getRiskStatistics() {
    const profiles = Array.from(this.patientProfiles.values());
    return {
      totalPatientsAssessed: profiles.length,
      riskDistribution: {
        low: profiles.filter(p => p.riskLevel === 'low').length,
        moderate: profiles.filter(p => p.riskLevel === 'moderate').length,
        high: profiles.filter(p => p.riskLevel === 'high').length,
        critical: profiles.filter(p => p.riskLevel === 'critical').length,
      },
      averageRiskScore: profiles.length > 0
        ? profiles.reduce((sum, p) => sum + p.overallRiskScore, 0) / profiles.length
        : 0,
    };
  }
}

export const riskScoringService = new RiskScoringService();
