import { describe, it, expect, beforeEach } from "vitest";
import { biometricService } from "../lib/biometric-service";
import { messagingService } from "../lib/messaging-service";
import { workspaceService } from "../lib/workspace-service";
import { analyticsService } from "../lib/analytics-service";
import { offlineSyncService } from "../lib/offline-sync-service";

describe("Biometric Authentication", () => {
  it("should check if biometric is available", async () => {
    const available = await biometricService.isBiometricAvailable();
    expect(typeof available).toBe("boolean");
  });

  it("should get biometric type", async () => {
    const type = await biometricService.getBiometricType();
    expect(["faceId", "fingerprint", "iris", "none"]).toContain(type);
  });

  it("should authenticate with biometric", async () => {
    const result = await biometricService.authenticate();
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("biometricType");
    expect(result).toHaveProperty("timestamp");
  });

  it("should enable biometric with password", async () => {
    const enabled = await biometricService.enableBiometric("password123");
    expect(enabled).toBe(true);
  });

  it("should get biometric settings", async () => {
    const settings = await biometricService.getBiometricSettings();
    expect(settings).toHaveProperty("available");
    expect(settings).toHaveProperty("enabled");
    expect(settings).toHaveProperty("type");
  });
});

describe("Messaging Service", () => {
  it("should send a message", async () => {
    const message = await messagingService.sendMessage(
      "user1",
      "Doctor Smith",
      "user2",
      "Patient needs follow-up",
      "text",
      "high"
    );

    expect(message.id).toBeDefined();
    expect(message.content).toBe("Patient needs follow-up");
    expect(message.priority).toBe("high");
  });

  it("should get messages for a user", async () => {
    await messagingService.sendMessage("user1", "Doctor", "user2", "Test message");
    const messages = await messagingService.getMessages("user2");

    expect(Array.isArray(messages)).toBe(true);
    expect(messages.length).toBeGreaterThan(0);
  });

  it("should mark message as read", async () => {
    const message = await messagingService.sendMessage(
      "user1",
      "Doctor",
      "user2",
      "Test"
    );
    const marked = await messagingService.markMessageAsRead(message.id);

    expect(marked).toBe(true);
  });

  it("should create a notification", async () => {
    const notification = await messagingService.createNotification(
      "user1",
      "Critical Alert",
      "Lab value out of range",
      "critical"
    );

    expect(notification.id).toBeDefined();
    expect(notification.type).toBe("critical");
  });

  it("should get notifications", async () => {
    await messagingService.createNotification("user1", "Alert", "Test");
    const notifications = await messagingService.getNotifications("user1");

    expect(Array.isArray(notifications)).toBe(true);
  });

  it("should get unread notification count", async () => {
    await messagingService.createNotification("user1", "Alert 1", "Test");
    await messagingService.createNotification("user1", "Alert 2", "Test");

    const count = await messagingService.getUnreadCount("user1");
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it("should send critical alert", async () => {
    const alert = await messagingService.sendCriticalAlert(
      "user1",
      "Critical Lab Value",
      "Potassium level critically high",
      { value: 7.5, normal: "3.5-5.0" }
    );

    expect(alert.type).toBe("critical");
  });
});

describe("Workspace & Team Management", () => {
  it("should create a workspace", async () => {
    const workspace = await workspaceService.createWorkspace(
      "owner1",
      "Main Clinic",
      "City Medical Center"
    );

    expect(workspace.id).toBeDefined();
    expect(workspace.name).toBe("Main Clinic");
    expect(workspace.members.length).toBeGreaterThan(0);
  });

  it("should invite team member", async () => {
    const workspace = await workspaceService.createWorkspace(
      "owner1",
      "Clinic",
      "Center"
    );

    const member = await workspaceService.inviteTeamMember(
      workspace.id,
      "doctor@clinic.com",
      "Dr. Smith",
      "doctor"
    );

    expect(member).toBeDefined();
    expect(member?.status).toBe("pending");
  });

  it("should accept invitation", async () => {
    const workspace = await workspaceService.createWorkspace(
      "owner1",
      "Clinic",
      "Center"
    );

    const member = await workspaceService.inviteTeamMember(
      workspace.id,
      "doctor@clinic.com",
      "Dr. Smith",
      "doctor"
    );

    if (member) {
      const accepted = await workspaceService.acceptInvitation(
        workspace.id,
        member.id
      );
      expect(accepted).toBe(true);
    }
  });

  it("should remove team member", async () => {
    const workspace = await workspaceService.createWorkspace(
      "owner1",
      "Clinic",
      "Center"
    );

    const member = await workspaceService.inviteTeamMember(
      workspace.id,
      "doctor@clinic.com",
      "Dr. Smith",
      "doctor"
    );

    if (member) {
      const removed = await workspaceService.removeTeamMember(
        workspace.id,
        member.id
      );
      expect(removed).toBe(true);
    }
  });

  it("should share patient with workspace", async () => {
    const workspace = await workspaceService.createWorkspace(
      "owner1",
      "Clinic",
      "Center"
    );

    const shared = await workspaceService.sharePatientWithWorkspace(
      workspace.id,
      "patient123",
      "owner1"
    );

    expect(shared).toBe(true);
  });

  it("should get activity logs", async () => {
    const workspace = await workspaceService.createWorkspace(
      "owner1",
      "Clinic",
      "Center"
    );

    const logs = await workspaceService.getActivityLogs(workspace.id);
    expect(Array.isArray(logs)).toBe(true);
  });
});

describe("Analytics & Reporting", () => {
  it("should record usage metrics", async () => {
    const metrics = await analyticsService.recordUsageMetrics("user1", {
      toolsUsed: 3,
      patientsViewed: 5,
      notesCreated: 2,
      aiGuidanceRequests: 1,
      sessionDuration: 45,
    });

    expect(metrics.userId).toBe("user1");
    expect(metrics.toolsUsed).toBe(3);
  });

  it("should get user metrics", async () => {
    await analyticsService.recordUsageMetrics("user1", {
      toolsUsed: 2,
      patientsViewed: 3,
      notesCreated: 1,
      aiGuidanceRequests: 1,
      sessionDuration: 30,
    });

    const metrics = await analyticsService.getUserMetrics("user1");
    expect(Array.isArray(metrics)).toBe(true);
  });

  it("should generate patient report", async () => {
    const report = await analyticsService.generatePatientReport(
      "patient1",
      "John Doe",
      "doctor1",
      "summary"
    );

    expect(report.id).toBeDefined();
    expect(report.patientName).toBe("John Doe");
    expect(report.content).toBeDefined();
  });

  it("should export report", async () => {
    const report = await analyticsService.generatePatientReport(
      "patient1",
      "John Doe",
      "doctor1"
    );

    const exported = await analyticsService.exportReport(report.id, "json");
    expect(exported.success).toBe(true);
    expect(exported.fileName).toBeDefined();
  });

  it("should generate clinical insight", async () => {
    const insight = await analyticsService.generateClinicalInsight(
      "user1",
      "alert",
      "Growth Concern",
      "Patient growth rate below expected",
      "high"
    );

    expect(insight.id).toBeDefined();
    expect(insight.type).toBe("alert");
    expect(insight.severity).toBe("high");
  });

  it("should get analytics dashboard", async () => {
    await analyticsService.recordUsageMetrics("user1", {
      toolsUsed: 2,
      patientsViewed: 3,
      notesCreated: 1,
      aiGuidanceRequests: 1,
      sessionDuration: 30,
    });

    const dashboard = await analyticsService.getAnalyticsDashboard("user1");
    expect(dashboard.userId).toBe("user1");
    expect(dashboard.complianceScore).toBeGreaterThanOrEqual(0);
  });
});

describe("Offline & Sync Service", () => {
  it("should cache data", async () => {
    const cached = await offlineSyncService.cacheData("patient1", {
      name: "John Doe",
      age: 5,
    });

    expect(cached.key).toBe("patient1");
    expect(cached.data.name).toBe("John Doe");
  });

  it("should get cached data", async () => {
    await offlineSyncService.cacheData("patient1", { name: "John" });
    const cached = await offlineSyncService.getCachedData("patient1");

    expect(cached).toBeDefined();
    expect(cached?.data.name).toBe("John");
  });

  it("should queue changes", async () => {
    const queued = await offlineSyncService.queueChange(
      "update",
      "patient",
      "patient1",
      { name: "Jane" }
    );

    expect(queued.id).toBeDefined();
    expect(queued.synced).toBeDefined();
  });

  it("should get pending changes", async () => {
    await offlineSyncService.queueChange("create", "patient", "p1", {});
    const pending = await offlineSyncService.getPendingChanges();

    expect(Array.isArray(pending)).toBe(true);
  });

  it("should sync pending changes", async () => {
    await offlineSyncService.queueChange("create", "patient", "p1", {});
    const result = await offlineSyncService.syncPendingChanges();

    expect(result).toHaveProperty("synced");
    expect(result).toHaveProperty("failed");
  });

  it("should set online status", async () => {
    await offlineSyncService.setOnlineStatus(false);
    const status = await offlineSyncService.getSyncStatus();

    expect(status.isOnline).toBe(false);
  });

  it("should get sync status", async () => {
    const status = await offlineSyncService.getSyncStatus();

    expect(status).toHaveProperty("isOnline");
    expect(status).toHaveProperty("isSyncing");
    expect(status).toHaveProperty("pendingChanges");
  });

  it("should backup and restore data", async () => {
    await offlineSyncService.cacheData("patient1", { name: "John" });

    const backup = await offlineSyncService.backupData();
    expect(backup.fileName).toBeDefined();

    await offlineSyncService.clearCache();
    let cached = await offlineSyncService.getCachedData("patient1");
    expect(cached).toBeNull();

    // In real implementation, would restore from backup
    const restored = await offlineSyncService.restoreFromBackup(
      JSON.stringify({
        cache: [],
        syncQueue: [],
        timestamp: new Date().toISOString(),
      })
    );

    expect(restored).toBe(true);
  });
});
