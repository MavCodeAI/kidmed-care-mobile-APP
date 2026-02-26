/**
 * Workspace & Team Management Service
 * Mock implementation for clinic workspace features
 */

export type UserRole = "admin" | "doctor" | "nurse" | "staff" | "viewer";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive" | "pending";
  joinedAt: string;
  permissions: string[];
}

export interface Workspace {
  id: string;
  name: string;
  clinicName: string;
  ownerId: string;
  members: TeamMember[];
  sharedPatients: string[];
  settings: {
    allowSharedPatients: boolean;
    requireApproval: boolean;
    dataEncryption: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  workspaceId: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  timestamp: string;
}

class WorkspaceService {
  private workspaces: Map<string, Workspace> = new Map();
  private activityLogs: ActivityLog[] = [];

  /**
   * Create a workspace
   */
  async createWorkspace(
    ownerId: string,
    name: string,
    clinicName: string
  ): Promise<Workspace> {
    const id = `ws_${Date.now()}`;
    const workspace: Workspace = {
      id,
      name,
      clinicName,
      ownerId,
      members: [
        {
          id: ownerId,
          name: "Owner",
          email: "owner@clinic.com",
          role: "admin",
          status: "active",
          joinedAt: new Date().toISOString(),
          permissions: ["all"],
        },
      ],
      sharedPatients: [],
      settings: {
        allowSharedPatients: true,
        requireApproval: true,
        dataEncryption: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.workspaces.set(id, workspace);
    return workspace;
  }

  /**
   * Get workspace
   */
  async getWorkspace(workspaceId: string): Promise<Workspace | null> {
    return this.workspaces.get(workspaceId) || null;
  }

  /**
   * Invite team member
   */
  async inviteTeamMember(
    workspaceId: string,
    email: string,
    name: string,
    role: UserRole
  ): Promise<TeamMember | null> {
    const workspace = this.workspaces.get(workspaceId);
    if (!workspace) return null;

    const member: TeamMember = {
      id: `member_${Date.now()}`,
      name,
      email,
      role,
      status: "pending",
      joinedAt: new Date().toISOString(),
      permissions: this.getPermissionsForRole(role),
    };

    workspace.members.push(member);
    workspace.updatedAt = new Date().toISOString();
    this.workspaces.set(workspaceId, workspace);

    // Log activity
    await this.logActivity(
      workspaceId,
      workspace.ownerId,
      "Owner",
      "INVITE_MEMBER",
      "team_member",
      { email, role }
    );

    return member;
  }

  /**
   * Accept team invitation
   */
  async acceptInvitation(workspaceId: string, memberId: string): Promise<boolean> {
    const workspace = this.workspaces.get(workspaceId);
    if (!workspace) return false;

    const member = workspace.members.find((m) => m.id === memberId);
    if (!member) return false;

    member.status = "active";
    workspace.updatedAt = new Date().toISOString();
    this.workspaces.set(workspaceId, workspace);

    return true;
  }

  /**
   * Remove team member
   */
  async removeTeamMember(workspaceId: string, memberId: string): Promise<boolean> {
    const workspace = this.workspaces.get(workspaceId);
    if (!workspace) return false;

    const index = workspace.members.findIndex((m) => m.id === memberId);
    if (index === -1) return false;

    const removed = workspace.members[index];
    workspace.members.splice(index, 1);
    workspace.updatedAt = new Date().toISOString();
    this.workspaces.set(workspaceId, workspace);

    // Log activity
    await this.logActivity(
      workspaceId,
      workspace.ownerId,
      "Owner",
      "REMOVE_MEMBER",
      "team_member",
      { memberId, memberEmail: removed.email }
    );

    return true;
  }

  /**
   * Update member role
   */
  async updateMemberRole(
    workspaceId: string,
    memberId: string,
    role: UserRole
  ): Promise<boolean> {
    const workspace = this.workspaces.get(workspaceId);
    if (!workspace) return false;

    const member = workspace.members.find((m) => m.id === memberId);
    if (!member) return false;

    member.role = role;
    member.permissions = this.getPermissionsForRole(role);
    workspace.updatedAt = new Date().toISOString();
    this.workspaces.set(workspaceId, workspace);

    return true;
  }

  /**
   * Share patient with workspace
   */
  async sharePatientWithWorkspace(
    workspaceId: string,
    patientId: string,
    sharingUserId: string
  ): Promise<boolean> {
    const workspace = this.workspaces.get(workspaceId);
    if (!workspace) return false;

    if (!workspace.sharedPatients.includes(patientId)) {
      workspace.sharedPatients.push(patientId);
      workspace.updatedAt = new Date().toISOString();
      this.workspaces.set(workspaceId, workspace);

      // Log activity
      await this.logActivity(
        workspaceId,
        sharingUserId,
        "User",
        "SHARE_PATIENT",
        "patient",
        { patientId }
      );
    }

    return true;
  }

  /**
   * Get activity logs
   */
  async getActivityLogs(workspaceId: string, limit: number = 50): Promise<ActivityLog[]> {
    return this.activityLogs
      .filter((log) => log.workspaceId === workspaceId)
      .slice(-limit)
      .reverse();
  }

  /**
   * Log activity
   */
  private async logActivity(
    workspaceId: string,
    userId: string,
    userName: string,
    action: string,
    resource: string,
    details: Record<string, any>
  ): Promise<void> {
    const log: ActivityLog = {
      id: `log_${Date.now()}`,
      workspaceId,
      userId,
      userName,
      action,
      resource,
      details,
      timestamp: new Date().toISOString(),
    };

    this.activityLogs.push(log);
  }

  /**
   * Get permissions for role
   */
  private getPermissionsForRole(role: UserRole): string[] {
    const permissions: Record<UserRole, string[]> = {
      admin: ["all"],
      doctor: ["view_patients", "edit_patients", "view_reports", "create_notes"],
      nurse: ["view_patients", "create_notes", "view_reports"],
      staff: ["view_patients", "view_reports"],
      viewer: ["view_patients"],
    };

    return permissions[role];
  }

  /**
   * Update workspace settings
   */
  async updateWorkspaceSettings(
    workspaceId: string,
    settings: Partial<Workspace["settings"]>
  ): Promise<boolean> {
    const workspace = this.workspaces.get(workspaceId);
    if (!workspace) return false;

    workspace.settings = { ...workspace.settings, ...settings };
    workspace.updatedAt = new Date().toISOString();
    this.workspaces.set(workspaceId, workspace);

    return true;
  }
}

export const workspaceService = new WorkspaceService();
