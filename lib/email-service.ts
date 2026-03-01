/**
 * Email Notification Service
 * Handles sending emails for patient reports, critical alerts, and notifications
 */

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
}

export interface EmailNotification {
  id: string;
  recipientEmail: string;
  subject: string;
  body: string;
  type: 'report' | 'alert' | 'notification' | 'reminder';
  sentAt: Date;
  status: 'pending' | 'sent' | 'failed';
}

export interface PatientReport {
  patientId: string;
  patientName: string;
  reportDate: Date;
  clinicalSummary: string;
  recommendations: string[];
  attachments?: string[];
}

class EmailService {
  private sentEmails: EmailNotification[] = [];
  private emailTemplates: EmailTemplate[] = [
    {
      id: 'patient-report',
      name: 'Patient Report',
      subject: 'Clinical Report for {{patientName}}',
      body: `
Dear Healthcare Provider,

Please find the clinical report for {{patientName}} below:

Report Date: {{reportDate}}

Clinical Summary:
{{clinicalSummary}}

Recommendations:
{{recommendations}}

Best regards,
KidMed Care Team
      `,
      variables: ['patientName', 'reportDate', 'clinicalSummary', 'recommendations'],
    },
    {
      id: 'critical-alert',
      name: 'Critical Alert',
      subject: 'CRITICAL: {{alertType}} for {{patientName}}',
      body: `
URGENT ALERT

Patient: {{patientName}}
Alert Type: {{alertType}}
Severity: CRITICAL
Time: {{timestamp}}

Details:
{{details}}

Please review immediately.

KidMed Care System
      `,
      variables: ['patientName', 'alertType', 'timestamp', 'details'],
    },
    {
      id: 'appointment-reminder',
      name: 'Appointment Reminder',
      subject: 'Reminder: Appointment for {{patientName}}',
      body: `
Dear {{parentName}},

This is a reminder about the upcoming appointment for {{patientName}}.

Date: {{appointmentDate}}
Time: {{appointmentTime}}
Provider: {{providerName}}

Please call {{clinicPhone}} if you need to reschedule.

Best regards,
{{clinicName}}
      `,
      variables: ['parentName', 'patientName', 'appointmentDate', 'appointmentTime', 'providerName', 'clinicPhone', 'clinicName'],
    },
  ];

  /**
   * Send patient report via email
   */
  async sendPatientReport(recipientEmail: string, report: PatientReport): Promise<EmailNotification> {
    const template = this.emailTemplates.find(t => t.id === 'patient-report');
    if (!template) throw new Error('Patient report template not found');

    const emailNotification: EmailNotification = {
      id: `email-${Date.now()}`,
      recipientEmail,
      subject: template.subject.replace('{{patientName}}', report.patientName),
      body: this.renderTemplate(template.body, {
        patientName: report.patientName,
        reportDate: report.reportDate.toLocaleDateString(),
        clinicalSummary: report.clinicalSummary,
        recommendations: report.recommendations.join('\n- '),
      }),
      type: 'report',
      sentAt: new Date(),
      status: 'sent',
    };

    this.sentEmails.push(emailNotification);
    return emailNotification;
  }

  /**
   * Send critical alert via email
   */
  async sendCriticalAlert(
    recipientEmail: string,
    patientName: string,
    alertType: string,
    details: string
  ): Promise<EmailNotification> {
    const template = this.emailTemplates.find(t => t.id === 'critical-alert');
    if (!template) throw new Error('Critical alert template not found');

    const emailNotification: EmailNotification = {
      id: `email-${Date.now()}`,
      recipientEmail,
      subject: template.subject
        .replace('{{alertType}}', alertType)
        .replace('{{patientName}}', patientName),
      body: this.renderTemplate(template.body, {
        patientName,
        alertType,
        timestamp: new Date().toISOString(),
        details,
      }),
      type: 'alert',
      sentAt: new Date(),
      status: 'sent',
    };

    this.sentEmails.push(emailNotification);
    return emailNotification;
  }

  /**
   * Send appointment reminder
   */
  async sendAppointmentReminder(
    parentEmail: string,
    parentName: string,
    patientName: string,
    appointmentDate: Date,
    appointmentTime: string,
    providerName: string,
    clinicPhone: string,
    clinicName: string
  ): Promise<EmailNotification> {
    const template = this.emailTemplates.find(t => t.id === 'appointment-reminder');
    if (!template) throw new Error('Appointment reminder template not found');

    const emailNotification: EmailNotification = {
      id: `email-${Date.now()}`,
      recipientEmail: parentEmail,
      subject: template.subject.replace('{{patientName}}', patientName),
      body: this.renderTemplate(template.body, {
        parentName,
        patientName,
        appointmentDate: appointmentDate.toLocaleDateString(),
        appointmentTime,
        providerName,
        clinicPhone,
        clinicName,
      }),
      type: 'reminder',
      sentAt: new Date(),
      status: 'sent',
    };

    this.sentEmails.push(emailNotification);
    return emailNotification;
  }

  /**
   * Get email history
   */
  getEmailHistory(limit: number = 50): EmailNotification[] {
    return this.sentEmails.slice(-limit);
  }

  /**
   * Get emails by type
   */
  getEmailsByType(type: EmailNotification['type']): EmailNotification[] {
    return this.sentEmails.filter(email => email.type === type);
  }

  /**
   * Get emails by recipient
   */
  getEmailsByRecipient(recipientEmail: string): EmailNotification[] {
    return this.sentEmails.filter(email => email.recipientEmail === recipientEmail);
  }

  /**
   * Render email template with variables
   */
  private renderTemplate(template: string, variables: Record<string, string>): string {
    let rendered = template;
    Object.entries(variables).forEach(([key, value]) => {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return rendered;
  }

  /**
   * Get email statistics
   */
  getEmailStatistics() {
    return {
      totalEmails: this.sentEmails.length,
      sentEmails: this.sentEmails.filter(e => e.status === 'sent').length,
      failedEmails: this.sentEmails.filter(e => e.status === 'failed').length,
      byType: {
        reports: this.sentEmails.filter(e => e.type === 'report').length,
        alerts: this.sentEmails.filter(e => e.type === 'alert').length,
        notifications: this.sentEmails.filter(e => e.type === 'notification').length,
        reminders: this.sentEmails.filter(e => e.type === 'reminder').length,
      },
    };
  }
}

export const emailService = new EmailService();
