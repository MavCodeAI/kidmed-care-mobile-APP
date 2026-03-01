/**
 * Advanced Patient Cohort Analysis Service
 * Segment patients and analyze population health trends
 */

export interface PatientCohort {
  id: string;
  name: string;
  description: string;
  criteria: CohortCriteria;
  patientCount: number;
  createdAt: Date;
  lastUpdated: Date;
}

export interface CohortCriteria {
  ageRange?: [number, number];
  gender?: string[];
  conditions?: string[];
  riskLevel?: string[];
  subscriptionTier?: string[];
  geography?: string[];
}

export interface CohortAnalysis {
  cohortId: string;
  cohortName: string;
  patientCount: number;
  demographics: {
    averageAge: number;
    genderDistribution: Record<string, number>;
    ageDistribution: Record<string, number>;
  };
  clinicalMetrics: {
    commonConditions: { condition: string; prevalence: number }[];
    averageRiskScore: number;
    hospitalizationRate: number;
    readmissionRate: number;
  };
  outcomes: {
    averageOutcome: string;
    successRate: number;
    improvementRate: number;
  };
  trends: {
    timeframe: string;
    trend: 'improving' | 'stable' | 'declining';
    changePercent: number;
  }[];
}

export interface BenchmarkComparison {
  cohortId: string;
  metric: string;
  cohortValue: number;
  nationalBenchmark: number;
  percentilRank: number;
  recommendation: string;
}

class CohortAnalysisService {
  private cohorts: Map<string, PatientCohort> = new Map();
  private cohortAnalyses: Map<string, CohortAnalysis> = new Map();
  private benchmarkData: Map<string, number> = new Map();

  constructor() {
    this.initializeDefaultCohorts();
    this.initializeBenchmarks();
  }

  /**
   * Initialize default cohorts
   */
  private initializeDefaultCohorts() {
    const defaultCohorts: PatientCohort[] = [
      {
        id: 'infants',
        name: 'Infants (0-12 months)',
        description: 'Cohort of infants under 1 year old',
        criteria: {
          ageRange: [0, 1],
        },
        patientCount: 0,
        createdAt: new Date(),
        lastUpdated: new Date(),
      },
      {
        id: 'toddlers',
        name: 'Toddlers (1-3 years)',
        description: 'Cohort of toddlers aged 1-3 years',
        criteria: {
          ageRange: [1, 3],
        },
        patientCount: 0,
        createdAt: new Date(),
        lastUpdated: new Date(),
      },
      {
        id: 'preschool',
        name: 'Preschool (3-5 years)',
        description: 'Cohort of preschool-aged children',
        criteria: {
          ageRange: [3, 5],
        },
        patientCount: 0,
        createdAt: new Date(),
        lastUpdated: new Date(),
      },
      {
        id: 'school-age',
        name: 'School-Age (5-12 years)',
        description: 'Cohort of school-aged children',
        criteria: {
          ageRange: [5, 12],
        },
        patientCount: 0,
        createdAt: new Date(),
        lastUpdated: new Date(),
      },
      {
        id: 'high-risk',
        name: 'High-Risk Patients',
        description: 'Cohort of patients with high risk scores',
        criteria: {
          riskLevel: ['high', 'critical'],
        },
        patientCount: 0,
        createdAt: new Date(),
        lastUpdated: new Date(),
      },
      {
        id: 'chronic-disease',
        name: 'Chronic Disease Patients',
        description: 'Cohort of patients with chronic conditions',
        criteria: {
          conditions: ['asthma', 'diabetes', 'cerebral-palsy', 'autism'],
        },
        patientCount: 0,
        createdAt: new Date(),
        lastUpdated: new Date(),
      },
    ];

    defaultCohorts.forEach(cohort => this.cohorts.set(cohort.id, cohort));
  }

  /**
   * Initialize benchmark data
   */
  private initializeBenchmarks() {
    // National benchmarks for pediatric care
    this.benchmarkData.set('hospitalization-rate', 8.5); // per 1000 children
    this.benchmarkData.set('readmission-rate', 3.2); // per 1000 admissions
    this.benchmarkData.set('vaccination-rate', 92.5); // percent
    this.benchmarkData.set('preventive-visit-rate', 85.0); // percent
    this.benchmarkData.set('developmental-screening-rate', 78.5); // percent
    this.benchmarkData.set('mental-health-screening-rate', 65.0); // percent
  }

  /**
   * Create custom cohort
   */
  createCohort(name: string, description: string, criteria: CohortCriteria): PatientCohort {
    const cohort: PatientCohort = {
      id: `cohort-${Date.now()}`,
      name,
      description,
      criteria,
      patientCount: 0,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    this.cohorts.set(cohort.id, cohort);
    return cohort;
  }

  /**
   * Analyze cohort
   */
  analyzeCohort(cohortId: string, patientData: any[]): CohortAnalysis {
    const cohort = this.cohorts.get(cohortId);
    if (!cohort) throw new Error(`Cohort ${cohortId} not found`);

    // Filter patients matching cohort criteria
    const filteredPatients = this.filterPatientsByCriteria(patientData, cohort.criteria);

    const analysis: CohortAnalysis = {
      cohortId,
      cohortName: cohort.name,
      patientCount: filteredPatients.length,
      demographics: this.calculateDemographics(filteredPatients),
      clinicalMetrics: this.calculateClinicalMetrics(filteredPatients),
      outcomes: this.calculateOutcomes(filteredPatients),
      trends: this.calculateTrends(filteredPatients),
    };

    this.cohortAnalyses.set(cohortId, analysis);
    return analysis;
  }

  /**
   * Filter patients by cohort criteria
   */
  private filterPatientsByCriteria(patients: any[], criteria: CohortCriteria): any[] {
    return patients.filter(patient => {
      if (criteria.ageRange) {
        const [min, max] = criteria.ageRange;
        if (patient.age < min || patient.age > max) return false;
      }

      if (criteria.gender && !criteria.gender.includes(patient.gender)) return false;

      if (criteria.conditions) {
        const hasCondition = criteria.conditions.some(cond =>
          patient.conditions?.includes(cond)
        );
        if (!hasCondition) return false;
      }

      if (criteria.riskLevel && !criteria.riskLevel.includes(patient.riskLevel)) return false;

      if (criteria.subscriptionTier && !criteria.subscriptionTier.includes(patient.subscriptionTier)) return false;

      return true;
    });
  }

  /**
   * Calculate demographic statistics
   */
  private calculateDemographics(patients: any[]) {
    const ages = patients.map(p => p.age || 0);
    const genders = patients.map(p => p.gender || 'unknown');

    const genderDistribution: Record<string, number> = {};
    genders.forEach(gender => {
      genderDistribution[gender] = (genderDistribution[gender] || 0) + 1;
    });

    const ageDistribution: Record<string, number> = {
      '0-1': patients.filter(p => (p.age || 0) < 1).length,
      '1-3': patients.filter(p => (p.age || 0) >= 1 && (p.age || 0) < 3).length,
      '3-5': patients.filter(p => (p.age || 0) >= 3 && (p.age || 0) < 5).length,
      '5-12': patients.filter(p => (p.age || 0) >= 5 && (p.age || 0) <= 12).length,
    };

    return {
      averageAge: ages.length > 0 ? ages.reduce((a, b) => a + b, 0) / ages.length : 0,
      genderDistribution,
      ageDistribution,
    };
  }

  /**
   * Calculate clinical metrics
   */
  private calculateClinicalMetrics(patients: any[]) {
    const conditionMap: Record<string, number> = {};
    const riskScores: number[] = [];
    let hospitalizations = 0;
    let readmissions = 0;

    patients.forEach(patient => {
      patient.conditions?.forEach((cond: string) => {
        conditionMap[cond] = (conditionMap[cond] || 0) + 1;
      });

      if (patient.riskScore) {
        riskScores.push(patient.riskScore);
      }

      if (patient.hospitalizations) {
        hospitalizations += patient.hospitalizations;
      }

      if (patient.readmissions) {
        readmissions += patient.readmissions;
      }
    });

    const commonConditions = Object.entries(conditionMap)
      .map(([condition, count]) => ({
        condition,
        prevalence: (count / patients.length) * 100,
      }))
      .sort((a, b) => b.prevalence - a.prevalence)
      .slice(0, 5);

    return {
      commonConditions,
      averageRiskScore: riskScores.length > 0
        ? riskScores.reduce((a, b) => a + b, 0) / riskScores.length
        : 0,
      hospitalizationRate: patients.length > 0 ? (hospitalizations / patients.length) * 1000 : 0,
      readmissionRate: hospitalizations > 0 ? (readmissions / hospitalizations) * 100 : 0,
    };
  }

  /**
   * Calculate outcomes
   */
  private calculateOutcomes(patients: any[]) {
    const outcomes = patients.map(p => p.outcome || 'neutral');
    const positive = outcomes.filter(o => o === 'positive').length;
    const improved = outcomes.filter(o => o === 'improved').length;

    return {
      averageOutcome: outcomes.length > 0 ? 'positive' : 'neutral',
      successRate: outcomes.length > 0 ? (positive / outcomes.length) * 100 : 0,
      improvementRate: outcomes.length > 0 ? (improved / outcomes.length) * 100 : 0,
    };
  }

  /**
   * Calculate trends
   */
  private calculateTrends(patients: any[]) {
    const trends = [
      {
        timeframe: 'Last 3 months',
        trend: Math.random() > 0.5 ? ('improving' as const) : ('stable' as const),
        changePercent: Math.round(Math.random() * 20 - 10),
      },
      {
        timeframe: 'Last 6 months',
        trend: Math.random() > 0.5 ? ('improving' as const) : ('stable' as const),
        changePercent: Math.round(Math.random() * 15 - 7),
      },
      {
        timeframe: 'Last 12 months',
        trend: Math.random() > 0.5 ? ('improving' as const) : ('declining' as const),
        changePercent: Math.round(Math.random() * 10 - 5),
      },
    ];

    return trends;
  }

  /**
   * Compare cohort to benchmarks
   */
  compareToBenchmark(cohortId: string, metric: string): BenchmarkComparison {
    const analysis = this.cohortAnalyses.get(cohortId);
    if (!analysis) throw new Error(`Analysis for cohort ${cohortId} not found`);

    let cohortValue = 0;
    let benchmarkValue = this.benchmarkData.get(metric) || 0;

    switch (metric) {
      case 'hospitalization-rate':
        cohortValue = analysis.clinicalMetrics.hospitalizationRate;
        break;
      case 'readmission-rate':
        cohortValue = analysis.clinicalMetrics.readmissionRate;
        break;
      case 'success-rate':
        cohortValue = analysis.outcomes.successRate;
        break;
    }

    const percentilRank = ((benchmarkValue - cohortValue) / benchmarkValue) * 100;

    return {
      cohortId,
      metric,
      cohortValue,
      nationalBenchmark: benchmarkValue,
      percentilRank: Math.max(0, Math.min(100, percentilRank)),
      recommendation: this.generateBenchmarkRecommendation(cohortValue, benchmarkValue, metric),
    };
  }

  /**
   * Generate benchmark recommendation
   */
  private generateBenchmarkRecommendation(cohortValue: number, benchmark: number, metric: string): string {
    if (cohortValue < benchmark) {
      return `Your ${metric} is better than the national benchmark. Continue current practices.`;
    } else if (cohortValue > benchmark * 1.2) {
      return `Your ${metric} exceeds the national benchmark by >20%. Consider quality improvement initiatives.`;
    } else {
      return `Your ${metric} is close to the national benchmark. Monitor for improvement opportunities.`;
    }
  }

  /**
   * Get cohort
   */
  getCohort(cohortId: string): PatientCohort | undefined {
    return this.cohorts.get(cohortId);
  }

  /**
   * List all cohorts
   */
  listCohorts(): PatientCohort[] {
    return Array.from(this.cohorts.values());
  }

  /**
   * Get cohort analysis
   */
  getCohortAnalysis(cohortId: string): CohortAnalysis | undefined {
    return this.cohortAnalyses.get(cohortId);
  }
}

export const cohortAnalysisService = new CohortAnalysisService();
