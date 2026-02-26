import { ScrollView, Text, View, Pressable, TextInput, Modal } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import { workspaceService, Workspace, TeamMember } from "@/lib/workspace-service";

export default function WorkspaceManagementScreen() {
  const colors = useColors();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<"doctor" | "nurse" | "staff">("doctor");
  const [activityLogs, setActivityLogs] = useState<any[]>([]);

  useEffect(() => {
    loadWorkspace();
  }, []);

  const loadWorkspace = async () => {
    const ws = await workspaceService.createWorkspace(
      "owner1",
      "Main Clinic",
      "City Medical Center"
    );
    setWorkspace(ws);

    const logs = await workspaceService.getActivityLogs(ws.id, 10);
    setActivityLogs(logs);
  };

  const handleInviteMember = async () => {
    if (!workspace || !inviteEmail.trim() || !inviteName.trim()) return;

    await workspaceService.inviteTeamMember(
      workspace.id,
      inviteEmail,
      inviteName,
      inviteRole
    );

    setInviteEmail("");
    setInviteName("");
    setShowInviteModal(false);
    loadWorkspace();
  };

  if (!workspace) {
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
            <Text className="text-3xl font-bold text-foreground">Workspace</Text>
            <Text className="text-sm text-muted">{workspace.clinicName}</Text>
          </View>

          {/* Workspace Info */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-2">
            <Text className="font-semibold text-foreground">Workspace Info</Text>
            <View className="gap-1">
              <Text className="text-sm text-muted">Name: {workspace.name}</Text>
              <Text className="text-sm text-muted">
                Clinic: {workspace.clinicName}
              </Text>
              <Text className="text-sm text-muted">
                Members: {workspace.members.length}
              </Text>
              <Text className="text-sm text-muted">
                Shared Patients: {workspace.sharedPatients.length}
              </Text>
            </View>
          </View>

          {/* Team Members */}
          <View className="gap-2">
            <View className="flex-row justify-between items-center">
              <Text className="font-semibold text-foreground">Team Members</Text>
              <Pressable
                onPress={() => setShowInviteModal(true)}
                style={{
                  backgroundColor: colors.primary,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
              >
                <Text className="text-background text-sm font-semibold">+ Invite</Text>
              </Pressable>
            </View>

            <View className="gap-2">
              {workspace.members.map((member) => (
                <View
                  key={member.id}
                  className="bg-surface rounded-lg p-3 border border-border"
                >
                  <View className="flex-row justify-between items-start gap-2">
                    <View className="flex-1">
                      <Text className="font-semibold text-foreground">
                        {member.name}
                      </Text>
                      <Text className="text-sm text-muted">{member.email}</Text>
                    </View>
                    <View
                      className="px-2 py-1 rounded"
                      style={{
                        backgroundColor:
                          member.role === "admin"
                            ? colors.primary
                            : member.role === "doctor"
                              ? colors.success
                              : colors.warning,
                      }}
                    >
                      <Text className="text-xs text-background font-semibold">
                        {member.role.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-xs text-muted">
                      Status: {member.status}
                    </Text>
                    {member.status === "pending" && (
                      <Text className="text-xs text-warning">Pending Acceptance</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Activity Log */}
          <View className="gap-2">
            <Text className="font-semibold text-foreground">Recent Activity</Text>
            <View className="gap-2">
              {activityLogs.length === 0 ? (
                <Text className="text-sm text-muted">No activity yet</Text>
              ) : (
                activityLogs.map((log) => (
                  <View
                    key={log.id}
                    className="bg-surface rounded-lg p-3 border border-border"
                  >
                    <View className="flex-row justify-between items-start gap-2">
                      <View className="flex-1">
                        <Text className="font-semibold text-foreground">
                          {log.action.replace(/_/g, " ")}
                        </Text>
                        <Text className="text-sm text-muted">{log.userName}</Text>
                      </View>
                      <Text className="text-xs text-muted">
                        {new Date(log.timestamp).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>

          {/* Workspace Settings */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-3">
            <Text className="font-semibold text-foreground">Settings</Text>
            <View className="gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-foreground">Allow Shared Patients</Text>
                <View
                  className="w-12 h-6 rounded-full"
                  style={{
                    backgroundColor: workspace.settings.allowSharedPatients
                      ? colors.success
                      : colors.border,
                  }}
                />
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-foreground">Require Approval</Text>
                <View
                  className="w-12 h-6 rounded-full"
                  style={{
                    backgroundColor: workspace.settings.requireApproval
                      ? colors.success
                      : colors.border,
                  }}
                />
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-foreground">Data Encryption</Text>
                <View
                  className="w-12 h-6 rounded-full"
                  style={{
                    backgroundColor: workspace.settings.dataEncryption
                      ? colors.success
                      : colors.border,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Invite Modal */}
      <Modal
        visible={showInviteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowInviteModal(false)}
      >
        <View
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View className="bg-background rounded-lg p-6 w-4/5 gap-4 border border-border">
            <Text className="text-xl font-bold text-foreground">Invite Team Member</Text>

            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Name</Text>
              <TextInput
                placeholder="Enter name"
                value={inviteName}
                onChangeText={setInviteName}
                className="bg-surface border border-border rounded-lg p-3 text-foreground"
                placeholderTextColor="#999"
              />
            </View>

            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Email</Text>
              <TextInput
                placeholder="Enter email"
                value={inviteEmail}
                onChangeText={setInviteEmail}
                keyboardType="email-address"
                className="bg-surface border border-border rounded-lg p-3 text-foreground"
                placeholderTextColor="#999"
              />
            </View>

            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Role</Text>
              <View className="flex-row gap-2">
                {(["doctor", "nurse", "staff"] as const).map((role) => (
                  <Pressable
                    key={role}
                    onPress={() => setInviteRole(role)}
                    style={{
                      flex: 1,
                      paddingVertical: 8,
                      borderRadius: 6,
                      backgroundColor:
                        inviteRole === role ? colors.primary : colors.surface,
                      borderWidth: 1,
                      borderColor: colors.border,
                    }}
                  >
                    <Text
                      className={
                        inviteRole === role
                          ? "text-background text-center font-semibold"
                          : "text-foreground text-center"
                      }
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View className="flex-row gap-2 mt-4">
              <Pressable
                onPress={() => setShowInviteModal(false)}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  backgroundColor: colors.border,
                }}
              >
                <Text className="text-foreground text-center font-semibold">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleInviteMember}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  backgroundColor: colors.primary,
                }}
              >
                <Text className="text-background text-center font-semibold">Invite</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
