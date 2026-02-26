/**
 * Analytics & Reporting Service
 * Mock implementation for usage analytics and patient reports
 */

export interface UsageMetrics {
  userId: string;
  date: string;
  toolsUsed: number;
  patientsViewed: number;
  notesCreated: number;
  aiGuidanceRequests: number;
  sessionDuration: number; // in minutes
}

export interface PatientReport {
  id: string;
  patientId: string;
  patientName: string;
  generatedBy: string;
  generatedAt: string;
  reportType: "summary" | "detailed" | "clinical";
  content: {
    demographics: Record<string, any>;
    medicalHistory: string[];
    recentVisits: string[];
    clinicalNotes: string[];
    assessments: Record<string, any>;
    recommendations: string[];
  };
  exportFormat?: "pdf" | "json" | "csv";
}

export interface ClinicalInsight {
  id: string;
  userId: string;
  type: "trend" | "alert" | "recommendation" | "milestone";
  title: string;
  description: string;
  severity: "low" | "normal" | "high" | "critical";
  actionable: boolean;
  createdAt: string;
}

export interface AnalyticsDashboard {
  userId: string;
  period: "day" | "week" | "month" | "year";
  totalPatients: number;
  totalSessions: number;
  averageSessionDuration: number;
  toolsUsedCount: Record<string, number>;
  mostUsedTools: string[];
  aiGuidanceUsage: number;
  complianceScore: number;
}

class AnalyticsService {
  private usageMetrics: Map<string, UsageMetrics> = new Map();
  private patientReports: Map<string, PatientReport> = new Map();
  private clinicalInsights: ClinicalInsight[] = [];

  /**
   * Record usage metrics
   */
  async recordUsageMetrics(
    userId: string,
    metrics: Omit<UsageMetrics, "userId" | "date">
  ): Promise<UsageMetrics> {
    const id = `metrics_${userId}_${Date.now()}`;
    const usageMetric: UsageMetrics = {
      userId,
      date: new Date().toISOString(),
      ...metrics,
    };

    this.usageMetrics.set(id, usageMetric);
    return usageMetric;
  }

  /**
   * Get usage metrics for a user
   */
  async getUserMetrics(userId: string, days: number = 30): Promise<UsageMetrics[]> {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    return Array.from(this.usageMetrics.values())
      .filter((m) => m.userId === userId && new Date(m.date) > cutoffDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  /**
   * Generate patient report
   */
  async generatePatientReport(
    patientId: string,
    patientName: string,
    generatedBy: string,
    reportType: "summary" | "detailed" | "clinical" = "summary"
  ): Promise<PatientReport> {
    const id = `report_${Date.now()}`;

    const report: PatientReport = {
      id,
      patientId,
      patientName,
      generatedBy,
      generatedAt: new Date().toISOString(),
      reportType,
      content: {
        demographics: {
          name: patientName,
          dob: "2020-01-15",
          gender: "M",
          parentName: "Jane Doe",
        },
        medicalHistory: ["No known allergies", "Asthma (controlled)"],
        recentVisits: [
          "2026-02-20: Routine checkup",
          "2026-02-10: Vaccination",
        ],
        clinicalNotes: [
          "Patient doing well",
          "Continue current medications",
        ],
        assessments: {
          bmi: "50th percentile",
          height: "75th percentile",
          weight: "60th percentile",
        },
        recommendations: [
          "Continue current treatment plan",
          "Follow-up in 3 months",
          "Monitor growth trajectory",
        ],
      },
    };

    this.patientReports.set(id, report);
    return report;
  }

  /**
   * Get patient reports
   */
  async getPatientReports(patientId: string): Promise<PatientReport[]> {
    return Array.from(this.patientReports.values())
      .filter((r) => r.patientId === patientId)
      .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime());
  }

  /**
   * Export report to PDF/JSON/CSV
   */
  async exportReport(
    reportId: string,
    format: "pdf" | "json" | "csv" = "pdf"
  ): Promise<{ success: boolean; fileName: string; data?: string }> {
    const report = this.patientReports.get(reportId);
    if (!report) {
      return { success: false, fileName: "" };
    }

    const fileName = `report_${report.patientId}_${Date.now()}.${format}`;

    let data = "";
    if (format === "json") {
      data = JSON.stringify(report, null, 2);
    } else if (format === "csv") {
      data = this.convertToCSV(report);
    } else {
      // PDF would be generated in real implementation
      data = `PDF Report: ${report.patientName}`;
    }

    return { success: true, fileName, data };
  }

  /**
   * Generate clinical insights
   */
  async generateClinicalInsight(
    userId: string,
    type: "trend" | "alert" | "recommendation" | "milestone",
    title: string,
    description: string,
    severity: "low" | "normal" | "high" | "critical" = "normal"
  ): Promise<ClinicalInsight> {
    const insight: ClinicalInsight = {
      id: `insight_${Date.now()}`,
      userId,
      type,
      title,
      description,
      severity,
      actionable: severity !== "low",
      createdAt: new Date().toISOString(),
    };

    this.clinicalInsights.push(insight);
    return insight;
  }

  /**
   * Get clinical insights for user
   */
  async getClinicalInsights(userId: string, limit: number = 10): Promise<ClinicalInsight[]> {
    return this.clinicalInsights
      .filter((i) => i.userId === userId)
      .slice(-limit)
      .reverse();
  }

  /**
   * Get analytics dashboard
   */
  async getAnalyticsDashboard(
    userId: string,
    period: "day" | "week" | "month" | "year" = "month"
  ): Promise<AnalyticsDashboard> {
    const metrics = await this.getUserMetrics(userId, this.getPeriodDays(period));

    const toolsUsed: Record<string, number> = {};
    let totalSessions = 0;
    let totalDuration = 0;
    let totalAiRequests = 0;

    metrics.forEach((m) => {
      totalSessions++;
      totalDuration += m.sessionDuration;
      totalAiRequests += m.aiGuidanceRequests;
    });

    return {
      userId,
      period,
      totalPatients: Math.floor(Math.random() * 50) + 10,
      totalSessions,
      averageSessionDuration: totalSessions > 0 ? totalDuration / totalSessions : 0,
      toolsUsedCount: toolsUsed,
      mostUsedTools: ["BMI Calculator", "Growth Charts", "Vaccine Scheduler"],
      aiGuidanceUsage: totalAiRequests,
      complianceScore: Math.floor(Math.random() * 20) + 80, // 80-100
    };
  }

  /**
   * Convert report to CSV
   */
  private convertToCSV(report: PatientReport): string {
    const lines: string[] = [];
    lines.push("Patient Report");
    lines.push(`Patient Name,${report.patientName}`);
    lines.push(`Report Type,${report.reportType}`);
    lines.push(`Generated At,${report.generatedAt}`);
    lines.push("");
    lines.push("Medical History");
    report.content.medicalHistory.forEach((h) => {
      lines.push(`,${h}`);
    });
    lines.push("");
    lines.push("Recommendations");
    report.content.recommendations.forEach((r) => {
      lines.push(`,${r}`);
    });

    return lines.join("\n");
  }

  /**
   * Get period days
   */
  private getPeriodDays(period: string): number {
    const periods: Record<string, number> = {
      day: 1,
      week: 7,
      month: 30,
      year: 365,
    };
    return periods[period] || 30;
  }
}

export const analyticsService = new AnalyticsService();
