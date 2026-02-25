/**
 * Mock Supabase Client
 * This is a mock implementation for development/testing.
 * Replace with real Supabase client when ready for production.
 */

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: "M" | "F";
  parentName: string;
  parentEmail: string;
  medicalHistory: string;
  allergies: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: "free" | "pro" | "clinic";
  status: "active" | "cancelled" | "expired";
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  timestamp: string;
}

class SupabaseMock {
  private patients: Map<string, Patient> = new Map();
  private subscriptions: Map<string, Subscription> = new Map();
  private auditLogs: AuditLog[] = [];

  // Patient Methods
  async getPatients(userId: string): Promise<Patient[]> {
    return Array.from(this.patients.values()).filter(
      (p) => p.id.startsWith(userId)
    );
  }

  async getPatient(id: string): Promise<Patient | null> {
    return this.patients.get(id) || null;
  }

  async createPatient(patient: Omit<Patient, "id" | "createdAt" | "updatedAt">): Promise<Patient> {
    const id = `patient_${Date.now()}`;
    const now = new Date().toISOString();
    const newPatient: Patient = {
      ...patient,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.patients.set(id, newPatient);
    return newPatient;
  }

  async updatePatient(id: string, updates: Partial<Patient>): Promise<Patient | null> {
    const patient = this.patients.get(id);
    if (!patient) return null;

    const updated: Patient = {
      ...patient,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.patients.set(id, updated);
    return updated;
  }

  async deletePatient(id: string): Promise<boolean> {
    return this.patients.delete(id);
  }

  // Subscription Methods
  async getSubscription(userId: string): Promise<Subscription | null> {
    return Array.from(this.subscriptions.values()).find(
      (s) => s.userId === userId
    ) || null;
  }

  async createSubscription(
    subscription: Omit<Subscription, "id" | "createdAt" | "updatedAt">
  ): Promise<Subscription> {
    const id = `sub_${Date.now()}`;
    const now = new Date().toISOString();
    const newSubscription: Subscription = {
      ...subscription,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.subscriptions.set(id, newSubscription);
    return newSubscription;
  }

  async updateSubscription(
    id: string,
    updates: Partial<Subscription>
  ): Promise<Subscription | null> {
    const subscription = this.subscriptions.get(id);
    if (!subscription) return null;

    const updated: Subscription = {
      ...subscription,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.subscriptions.set(id, updated);
    return updated;
  }

  // Audit Log Methods
  async logAction(
    userId: string,
    action: string,
    resource: string,
    details: Record<string, any>
  ): Promise<AuditLog> {
    const log: AuditLog = {
      id: `log_${Date.now()}`,
      userId,
      action,
      resource,
      details,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.push(log);
    return log;
  }

  async getAuditLogs(userId: string, limit: number = 50): Promise<AuditLog[]> {
    return this.auditLogs
      .filter((log) => log.userId === userId)
      .slice(-limit)
      .reverse();
  }

  // Health check
  async health(): Promise<boolean> {
    return true;
  }
}

export const supabaseMock = new SupabaseMock();
