import { ScrollView, Text, View, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import { analyticsService, AnalyticsDashboard, PatientReport } from "@/lib/analytics-service";

export default function AnalyticsDashboardScreen() {
  const colors = useColors();
  const [dashboard, setDashboard] = useState<AnalyticsDashboard | null>(null);
  const [reports, setReports] = useState<PatientReport[]>([]);
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("month");
  const [selectedReport, setSelectedReport] = useState<PatientReport | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  const loadAnalytics = async () => {
    const dash = await analyticsService.getAnalyticsDashboard("user1", period);
    setDashboard(dash);

    // Mock reports
    const report1 = await analyticsService.generatePatientReport(
      "patient1",
      "John Doe",
      "doctor1",
      "summary"
    );
    const report2 = await analyticsService.generatePatientReport(
      "patient2",
      "Jane Smith",
      "doctor1",
      "detailed"
    );

    setReports([report1, report2]);
  };

  const handleExportReport = async (reportId: string) => {
    const exported = await analyticsService.exportReport(reportId, "json");
    if (exported.success) {
      alert(`Report exported as ${exported.fileName}`);
    }
  };

  if (!dashboard) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">Loading...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Analytics</Text>
            <Text className="text-sm text-muted">Usage and performance metrics</Text>
          </View>

          {/* Period Selector */}
          <View className="flex-row gap-2">
            {(["day", "week", "month", "year"] as const).map((p) => (
              <Pressable
                key={p}
                onPress={() => setPeriod(p)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 6,
                  backgroundColor: period === p ? colors.primary : colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  className={
                    period === p
                      ? "text-background text-xs font-semibold"
                      : "text-foreground text-xs"
                  }
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Key Metrics */}
          <View className="gap-2">
            <Text className="font-semibold text-foreground">Key Metrics</Text>
            <View className="gap-2">
              {/* Patients */}
              <View className="bg-surface rounded-lg p-4 border border-border flex-row justify-between items-center">
                <View>
                  <Text className="text-sm text-muted">Total Patients</Text>
                  <Text className="text-2xl font-bold text-foreground mt-1">
                    {dashboard.totalPatients}
                  </Text>
                </View>
                <View
                  className="w-12 h-12 rounded-lg items-center justify-center"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text className="text-xl">👥</Text>
                </View>
              </View>

              {/* Sessions */}
              <View className="bg-surface rounded-lg p-4 border border-border flex-row justify-between items-center">
                <View>
                  <Text className="text-sm text-muted">Total Sessions</Text>
                  <Text className="text-2xl font-bold text-foreground mt-1">
                    {dashboard.totalSessions}
                  </Text>
                </View>
                <View
                  className="w-12 h-12 rounded-lg items-center justify-center"
                  style={{ backgroundColor: colors.success }}
                >
                  <Text className="text-xl">📊</Text>
                </View>
              </View>

              {/* Avg Duration */}
              <View className="bg-surface rounded-lg p-4 border border-border flex-row justify-between items-center">
                <View>
                  <Text className="text-sm text-muted">Avg Session Duration</Text>
                  <Text className="text-2xl font-bold text-foreground mt-1">
                    {Math.round(dashboard.averageSessionDuration)} min
                  </Text>
                </View>
                <View
                  className="w-12 h-12 rounded-lg items-center justify-center"
                  style={{ backgroundColor: colors.warning }}
                >
                  <Text className="text-xl">⏱️</Text>
                </View>
              </View>

              {/* AI Usage */}
              <View className="bg-surface rounded-lg p-4 border border-border flex-row justify-between items-center">
                <View>
                  <Text className="text-sm text-muted">AI Guidance Requests</Text>
                  <Text className="text-2xl font-bold text-foreground mt-1">
                    {dashboard.aiGuidanceUsage}
                  </Text>
                </View>
                <View
                  className="w-12 h-12 rounded-lg items-center justify-center"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text className="text-xl">🤖</Text>
                </View>
              </View>

              {/* Compliance */}
              <View className="bg-surface rounded-lg p-4 border border-border flex-row justify-between items-center">
                <View>
                  <Text className="text-sm text-muted">Compliance Score</Text>
                  <Text className="text-2xl font-bold text-foreground mt-1">
                    {dashboard.complianceScore}%
                  </Text>
                </View>
                <View
                  className="w-12 h-12 rounded-lg items-center justify-center"
                  style={{ backgroundColor: colors.success }}
                >
                  <Text className="text-xl">✓</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Most Used Tools */}
          <View className="gap-2">
            <Text className="font-semibold text-foreground">Most Used Tools</Text>
            <View className="bg-surface rounded-lg p-4 border border-border gap-2">
              {dashboard.mostUsedTools.length === 0 ? (
                <Text className="text-sm text-muted">No tools used yet</Text>
              ) : (
                dashboard.mostUsedTools.map((tool, idx) => (
                  <View key={idx} className="flex-row justify-between items-center">
                    <Text className="text-sm text-foreground">{tool}</Text>
                    <View
                      className="h-2 rounded-full"
                      style={{
                        width: `${(idx + 1) * 30}%`,
                        backgroundColor: colors.primary,
                      }}
                    />
                  </View>
                ))
              )}
            </View>
          </View>

          {/* Patient Reports */}
          <View className="gap-2">
            <Text className="font-semibold text-foreground">Recent Reports</Text>
            <View className="gap-2">
              {reports.length === 0 ? (
                <Text className="text-sm text-muted">No reports generated</Text>
              ) : (
                reports.map((report) => (
                  <View
                    key={report.id}
                    className="bg-surface rounded-lg p-3 border border-border"
                  >
                    <View className="flex-row justify-between items-start gap-2">
                      <View className="flex-1">
                        <Text className="font-semibold text-foreground">
                          {report.patientName}
                        </Text>
                        <Text className="text-sm text-muted mt-1">
                          Type: {report.reportType}
                        </Text>
                        <Text className="text-xs text-muted mt-1">
                          {new Date(report.generatedAt).toLocaleString()}
                        </Text>
                      </View>
                      <View
                        className="px-3 py-2 rounded"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Pressable onPress={() => handleExportReport(report.id)}>
                          <Text className="text-background text-xs font-semibold">
                            Export
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
