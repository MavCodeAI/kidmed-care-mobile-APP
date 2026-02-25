import { describe, it, expect, beforeEach } from "vitest";
import { supabaseMock, Patient, Subscription } from "../lib/supabase-mock";
import { stripeMock } from "../lib/stripe-mock";

describe("Supabase Mock Integration", () => {
  beforeEach(() => {
    // Clear data before each test
  });

  describe("Patient Management", () => {
    it("should create a patient", async () => {
      const patient = await supabaseMock.createPatient({
        name: "John Doe",
        dateOfBirth: "2020-01-15",
        gender: "M",
        parentName: "Jane Doe",
        parentEmail: "jane@example.com",
        medicalHistory: "No known allergies",
        allergies: "None",
      });

      expect(patient.id).toBeDefined();
      expect(patient.name).toBe("John Doe");
      expect(patient.createdAt).toBeDefined();
    });

    it("should retrieve a patient", async () => {
      const created = await supabaseMock.createPatient({
        name: "Jane Smith",
        dateOfBirth: "2019-06-20",
        gender: "F",
        parentName: "Bob Smith",
        parentEmail: "bob@example.com",
        medicalHistory: "Asthma",
        allergies: "Penicillin",
      });

      const retrieved = await supabaseMock.getPatient(created.id);
      expect(retrieved).toBeDefined();
      expect(retrieved?.name).toBe("Jane Smith");
    });

    it("should update a patient", async () => {
      const patient = await supabaseMock.createPatient({
        name: "Original Name",
        dateOfBirth: "2020-01-01",
        gender: "M",
        parentName: "Parent",
        parentEmail: "parent@example.com",
        medicalHistory: "None",
        allergies: "None",
      });

      const updated = await supabaseMock.updatePatient(patient.id, {
        name: "Updated Name",
      });

      expect(updated?.name).toBe("Updated Name");
      expect(updated?.updatedAt).toBeDefined();
    });

    it("should delete a patient", async () => {
      const patient = await supabaseMock.createPatient({
        name: "To Delete",
        dateOfBirth: "2020-01-01",
        gender: "M",
        parentName: "Parent",
        parentEmail: "parent@example.com",
        medicalHistory: "None",
        allergies: "None",
      });

      const deleted = await supabaseMock.deletePatient(patient.id);
      expect(deleted).toBe(true);

      const retrieved = await supabaseMock.getPatient(patient.id);
      expect(retrieved).toBeNull();
    });
  });

  describe("Subscription Management", () => {
    it("should create a subscription", async () => {
      const subscription = await supabaseMock.createSubscription({
        userId: "user_123",
        tier: "pro",
        status: "active",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

      expect(subscription.id).toBeDefined();
      expect(subscription.tier).toBe("pro");
      expect(subscription.status).toBe("active");
    });

    it("should retrieve a subscription", async () => {
      const created = await supabaseMock.createSubscription({
        userId: "user_456",
        tier: "clinic",
        status: "active",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

      const retrieved = await supabaseMock.getSubscription("user_456");
      expect(retrieved).toBeDefined();
      expect(retrieved?.tier).toBe("clinic");
    });

    it("should update a subscription", async () => {
      const subscription = await supabaseMock.createSubscription({
        userId: "user_789",
        tier: "free",
        status: "active",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

      const updated = await supabaseMock.updateSubscription(subscription.id, {
        tier: "pro",
      });

      expect(updated?.tier).toBe("pro");
    });
  });

  describe("Audit Logging", () => {
    it("should log an action", async () => {
      const log = await supabaseMock.logAction(
        "user_123",
        "LOGIN",
        "auth",
        { ip: "192.168.1.1" }
      );

      expect(log.id).toBeDefined();
      expect(log.userId).toBe("user_123");
      expect(log.action).toBe("LOGIN");
      expect(log.timestamp).toBeDefined();
    });

    it("should retrieve audit logs", async () => {
      await supabaseMock.logAction("user_123", "LOGIN", "auth", {});
      await supabaseMock.logAction("user_123", "VIEW_PATIENT", "patient", {});
      await supabaseMock.logAction("user_123", "LOGOUT", "auth", {});

      const logs = await supabaseMock.getAuditLogs("user_123");
      expect(logs.length).toBeGreaterThanOrEqual(3);
      expect(logs[0].action).toBe("LOGOUT"); // Most recent first
    });
  });
});

describe("Stripe Mock Integration", () => {
  describe("Payment Intent", () => {
    it("should create a payment intent", async () => {
      const intent = await stripeMock.createPaymentIntent(5000);

      expect(intent.id).toBeDefined();
      expect(intent.amount).toBe(5000);
      expect(intent.currency).toBe("usd");
      expect(intent.status).toBe("requires_payment_method");
      expect(intent.clientSecret).toBeDefined();
    });

    it("should confirm a payment intent", async () => {
      const intent = await stripeMock.createPaymentIntent(3900);
      const confirmed = await stripeMock.confirmPaymentIntent(intent.id);

      expect(confirmed).toBeDefined();
      expect(confirmed?.status).toMatch(/succeeded|failed/);
    });
  });

  describe("Charges", () => {
    it("should create a charge", async () => {
      const charge = await stripeMock.createCharge(
        3900,
        "usd",
        "Pro Subscription",
        "user@example.com"
      );

      expect(charge.id).toBeDefined();
      expect(charge.amount).toBe(3900);
      expect(charge.status).toMatch(/succeeded|failed/);
    });

    it("should retrieve a charge", async () => {
      const created = await stripeMock.createCharge(
        2490,
        "usd",
        "Clinic Subscription",
        "clinic@example.com"
      );

      const retrieved = await stripeMock.getCharge(created.id);
      expect(retrieved).toBeDefined();
      expect(retrieved?.amount).toBe(2490);
    });

    it("should list charges", async () => {
      await stripeMock.createCharge(1000, "usd", "Test 1", "test1@example.com");
      await stripeMock.createCharge(2000, "usd", "Test 2", "test2@example.com");
      await stripeMock.createCharge(3000, "usd", "Test 3", "test3@example.com");

      const charges = await stripeMock.listCharges(10);
      expect(charges.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Customers", () => {
    it("should create a customer", async () => {
      const customer = await stripeMock.createCustomer(
        "customer@example.com",
        "John Customer"
      );

      expect(customer.id).toBeDefined();
      expect(customer.email).toBe("customer@example.com");
      expect(customer.name).toBe("John Customer");
      expect(customer.paymentMethods).toEqual([]);
    });

    it("should retrieve a customer", async () => {
      const created = await stripeMock.createCustomer(
        "john@example.com",
        "John Doe"
      );

      const retrieved = await stripeMock.getCustomer(created.id);
      expect(retrieved).toBeDefined();
      expect(retrieved?.email).toBe("john@example.com");
    });

    it("should update a customer", async () => {
      const customer = await stripeMock.createCustomer(
        "old@example.com",
        "Old Name"
      );

      const updated = await stripeMock.updateCustomer(customer.id, {
        name: "New Name",
      });

      expect(updated?.name).toBe("New Name");
    });
  });

  describe("Subscriptions", () => {
    it("should create a subscription", async () => {
      const customer = await stripeMock.createCustomer(
        "sub@example.com",
        "Sub Customer"
      );

      const subscription = await stripeMock.createSubscription(
        customer.id,
        "price_pro"
      );

      expect(subscription.id).toBeDefined();
      expect(subscription.status).toBe("active");
      expect(subscription.currentPeriodEnd).toBeDefined();
    });
  });
});

describe("Backend Integration Workflow", () => {
  it("should handle a complete subscription upgrade workflow", async () => {
    // 1. Create a customer
    const customer = await stripeMock.createCustomer(
      "upgrade@example.com",
      "Upgrade User"
    );

    // 2. Create a payment intent
    const intent = await stripeMock.createPaymentIntent(3900); // Pro tier

    // 3. Confirm payment
    const confirmed = await stripeMock.confirmPaymentIntent(intent.id);
    expect(confirmed?.status).toBeDefined();

    // 4. Create subscription in database
    if (confirmed?.status === "succeeded") {
      const subscription = await supabaseMock.createSubscription({
        userId: customer.id,
        tier: "pro",
        status: "active",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

      expect(subscription.tier).toBe("pro");

      // 5. Log the action
      const log = await supabaseMock.logAction(
        customer.id,
        "SUBSCRIPTION_UPGRADE",
        "subscription",
        { tier: "pro", chargeId: confirmed.id }
      );

      expect(log.action).toBe("SUBSCRIPTION_UPGRADE");
    }
  });
});
