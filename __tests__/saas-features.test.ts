import { describe, it, expect, beforeEach } from 'vitest';
import { emailService, type PatientReport } from '../lib/email-service';
import { clinicalDecisionTreeService } from '../lib/clinical-decision-trees';
import { riskScoringService } from '../lib/risk-scoring-service';
import { cohortAnalysisService } from '../lib/cohort-analysis-service';

describe('Email Notification Service', () => {
  beforeEach(() => {
    // Reset service state
  });

  it('should send patient report email', async () => {
    const report: PatientReport = {
      patientId: 'patient-1',
      patientName: 'John Doe',
      reportDate: new Date(),
      clinicalSummary: 'Patient shows good progress',
      recommendations: ['Continue current treatment', 'Follow-up in 2 weeks'],
    };

    const email = await emailService.sendPatientReport('doctor@example.com', report);

    expect(email.recipientEmail).toBe('doctor@example.com');
    expect(email.type).toBe('report');
    expect(email.status).toBe('sent');
    expect(email.body).toContain('John Doe');
  });

  it('should send critical alert email', async () => {
    const email = await emailService.sendCriticalAlert(
      'doctor@example.com',
      'Jane Smith',
      'Critical Lab Value',
      'Potassium level critically high at 7.5 (normal 3.5-5.0)'
    );

    expect(email.type).toBe('alert');
    expect(email.subject).toContain('CRITICAL');
    expect(email.body).toContain('Jane Smith');
  });

  it('should get email history', async () => {
    const report: PatientReport = {
      patientId: 'patient-1',
      patientName: 'Test Patient',
      reportDate: new Date(),
      clinicalSummary: 'Test',
      recommendations: [],
    };

    await emailService.sendPatientReport('test@example.com', report);
    const history = emailService.getEmailHistory();

    expect(history.length).toBeGreaterThan(0);
    expect(history[history.length - 1].recipientEmail).toBe('test@example.com');
  });

  it('should get email statistics', () => {
    const stats = emailService.getEmailStatistics();

    expect(stats).toHaveProperty('totalEmails');
    expect(stats).toHaveProperty('sentEmails');
    expect(stats).toHaveProperty('byType');
  });
});

describe('Clinical Decision Trees', () => {
  it('should get fever diagnosis tree', () => {
    const tree = clinicalDecisionTreeService.getTree('fever-diagnosis');

    expect(tree).toBeDefined();
    expect(tree?.name).toBe('Pediatric Fever Diagnosis Tree');
    expect(tree?.nodes.length).toBeGreaterThan(0);
  });

  it('should navigate decision tree', () => {
    const node = clinicalDecisionTreeService.navigateTree('fever-diagnosis', 'fever-1');

    expect(node).toBeDefined();
    expect(node?.type).toBe('question');
    expect(node?.answers?.length).toBeGreaterThan(0);
  });

  it('should get diagnosis from decision path', () => {
    const diagnosis = clinicalDecisionTreeService.getDiagnosis('fever-diagnosis', 'fever-infant-well');

    expect(diagnosis).toBeDefined();
    expect(diagnosis?.diagnosis).toBe('Possible Occult Bacteremia');
    expect(diagnosis?.recommendations.length).toBeGreaterThan(0);
  });

  it('should list all decision trees', () => {
    const trees = clinicalDecisionTreeService.listTrees();

    expect(trees.length).toBeGreaterThan(0);
    expect(trees[0]).toHaveProperty('id');
    expect(trees[0]).toHaveProperty('name');
  });

  it('should get usage statistics', () => {
    clinicalDecisionTreeService.getDiagnosis('fever-diagnosis', 'fever-infant-well');
    const stats = clinicalDecisionTreeService.getUsageStatistics();

    expect(stats).toHaveProperty('totalDecisions');
    expect(stats).toHaveProperty('treeUsage');
    expect(stats).toHaveProperty('averageConfidence');
  });
});

describe('Predictive Risk Scoring', () => {
  it('should calculate patient risk profile', () => {
    const profile = riskScoringService.calculateRiskProfile(
      'patient-1',
      {
        'chronic-disease': 60,
        'recent-hospitalization': 80,
        'multiple-medications': 50,
      },
      {
        'low-birth-weight': true,
        'prematurity': false,
      },
      {
        'low-income': true,
        'limited-access': false,
      },
      {
        'missed-appointments': 40,
        'poor-medication-adherence': 30,
      }
    );

    expect(profile).toBeDefined();
    expect(profile.patientId).toBe('patient-1');
    expect(profile.overallRiskScore).toBeGreaterThan(0);
    expect(profile.overallRiskScore).toBeLessThanOrEqual(100);
    expect(['low', 'moderate', 'high', 'critical']).toContain(profile.riskLevel);
    expect(profile.recommendations.length).toBeGreaterThan(0);
  });

  it('should predict patient outcomes', () => {
    riskScoringService.calculateRiskProfile(
      'patient-2',
      { 'chronic-disease': 70 },
      { 'low-birth-weight': true },
      { 'low-income': true },
      { 'missed-appointments': 50 }
    );

    const prediction = riskScoringService.predictOutcome('patient-2', 'hospitalization', '6 months');

    expect(prediction).toBeDefined();
    expect(prediction.outcome).toBe('hospitalization');
    expect(prediction.probability).toBeGreaterThanOrEqual(0);
    expect(prediction.probability).toBeLessThanOrEqual(1);
    expect(prediction.confidence).toBeGreaterThanOrEqual(0);
    expect(prediction.confidence).toBeLessThanOrEqual(1);
  });

  it('should get patient profile', () => {
    riskScoringService.calculateRiskProfile(
      'patient-3',
      { 'chronic-disease': 50 },
      {},
      {},
      {}
    );

    const profile = riskScoringService.getPatientProfile('patient-3');

    expect(profile).toBeDefined();
    expect(profile?.patientId).toBe('patient-3');
  });

  it('should get risk statistics', () => {
    riskScoringService.calculateRiskProfile('patient-4', {}, {}, {}, {});
    const stats = riskScoringService.getRiskStatistics();

    expect(stats).toHaveProperty('totalPatientsAssessed');
    expect(stats).toHaveProperty('riskDistribution');
    expect(stats).toHaveProperty('averageRiskScore');
  });
});

describe('Cohort Analysis Service', () => {
  it('should list default cohorts', () => {
    const cohorts = cohortAnalysisService.listCohorts();

    expect(cohorts.length).toBeGreaterThan(0);
    expect(cohorts[0]).toHaveProperty('id');
    expect(cohorts[0]).toHaveProperty('name');
  });

  it('should create custom cohort', () => {
    const cohort = cohortAnalysisService.createCohort(
      'Custom Cohort',
      'Test cohort',
      { ageRange: [2, 5] }
    );

    expect(cohort).toBeDefined();
    expect(cohort.name).toBe('Custom Cohort');
    expect(cohort.criteria.ageRange).toEqual([2, 5]);
  });

  it('should analyze cohort', () => {
    const patientData = [
      {
        id: 'p1',
        age: 2,
        gender: 'M',
        conditions: ['asthma'],
        riskLevel: 'moderate',
        subscriptionTier: 'pro',
        hospitalizations: 1,
        readmissions: 0,
        outcome: 'improved',
      },
      {
        id: 'p2',
        age: 3,
        gender: 'F',
        conditions: ['diabetes'],
        riskLevel: 'high',
        subscriptionTier: 'clinic',
        hospitalizations: 2,
        readmissions: 1,
        outcome: 'positive',
      },
    ];

    const analysis = cohortAnalysisService.analyzeCohort('toddlers', patientData);

    expect(analysis).toBeDefined();
    expect(analysis.patientCount).toBeGreaterThan(0);
    expect(analysis.demographics).toHaveProperty('averageAge');
    expect(analysis.clinicalMetrics).toHaveProperty('commonConditions');
    expect(analysis.outcomes).toHaveProperty('successRate');
  });

  it('should compare to benchmark', () => {
    const patientData = [
      {
        id: 'p1',
        age: 2,
        gender: 'M',
        conditions: [],
        riskLevel: 'low',
        subscriptionTier: 'free',
        hospitalizations: 0,
        readmissions: 0,
        outcome: 'positive',
      },
    ];

    cohortAnalysisService.analyzeCohort('infants', patientData);
    const comparison = cohortAnalysisService.compareToBenchmark('infants', 'hospitalization-rate');

    expect(comparison).toBeDefined();
    expect(comparison.metric).toBe('hospitalization-rate');
    expect(comparison).toHaveProperty('cohortValue');
    expect(comparison).toHaveProperty('nationalBenchmark');
    expect(comparison).toHaveProperty('percentilRank');
  });

  it('should get cohort analysis', () => {
    const patientData = [
      {
        id: 'p1',
        age: 4,
        gender: 'M',
        conditions: ['asthma'],
        riskLevel: 'moderate',
        subscriptionTier: 'pro',
        hospitalizations: 1,
        readmissions: 0,
        outcome: 'improved',
      },
    ];

    cohortAnalysisService.analyzeCohort('preschool', patientData);
    const analysis = cohortAnalysisService.getCohortAnalysis('preschool');

    expect(analysis).toBeDefined();
    expect(analysis?.cohortId).toBe('preschool');
  });
});
