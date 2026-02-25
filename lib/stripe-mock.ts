/**
 * Mock Stripe Client
 * This is a mock implementation for development/testing.
 * Replace with real Stripe client when ready for production.
 */

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: "succeeded" | "processing" | "requires_payment_method" | "requires_action" | "failed";
  clientSecret: string;
  createdAt: string;
}

export interface Charge {
  id: string;
  amount: number;
  currency: string;
  status: "succeeded" | "failed" | "pending";
  description: string;
  receiptEmail: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  paymentMethods: string[];
  createdAt: string;
}

class StripeMock {
  private paymentIntents: Map<string, PaymentIntent> = new Map();
  private charges: Map<string, Charge> = new Map();
  private customers: Map<string, Customer> = new Map();

  // Payment Intent Methods
  async createPaymentIntent(
    amount: number,
    currency: string = "usd"
  ): Promise<PaymentIntent> {
    const id = `pi_${Date.now()}`;
    const clientSecret = `${id}_secret_${Math.random().toString(36).substr(2, 9)}`;

    const intent: PaymentIntent = {
      id,
      amount,
      currency,
      status: "requires_payment_method",
      clientSecret,
      createdAt: new Date().toISOString(),
    };

    this.paymentIntents.set(id, intent);
    return intent;
  }

  async confirmPaymentIntent(id: string): Promise<PaymentIntent | null> {
    const intent = this.paymentIntents.get(id);
    if (!intent) return null;

    // Mock: 95% success rate
    const isSuccess = Math.random() < 0.95;

    const updated: PaymentIntent = {
      ...intent,
      status: isSuccess ? "succeeded" : "failed",
    };

    this.paymentIntents.set(id, updated);

    if (isSuccess) {
      // Create a charge record
      const chargeId = `ch_${Date.now()}`;
      const charge: Charge = {
        id: chargeId,
        amount: intent.amount,
        currency: intent.currency,
        status: "succeeded",
        description: "Subscription payment",
        receiptEmail: "",
        createdAt: new Date().toISOString(),
      };
      this.charges.set(chargeId, charge);
    }

    return updated;
  }

  // Charge Methods
  async createCharge(
    amount: number,
    currency: string,
    description: string,
    receiptEmail: string
  ): Promise<Charge> {
    const id = `ch_${Date.now()}`;
    // Mock: 95% success rate
    const isSuccess = Math.random() < 0.95;

    const charge: Charge = {
      id,
      amount,
      currency,
      status: isSuccess ? "succeeded" : "failed",
      description,
      receiptEmail,
      createdAt: new Date().toISOString(),
    };

    this.charges.set(id, charge);
    return charge;
  }

  async getCharge(id: string): Promise<Charge | null> {
    return this.charges.get(id) || null;
  }

  async listCharges(limit: number = 10): Promise<Charge[]> {
    return Array.from(this.charges.values()).slice(-limit).reverse();
  }

  // Customer Methods
  async createCustomer(
    email: string,
    name: string
  ): Promise<Customer> {
    const id = `cus_${Date.now()}`;

    const customer: Customer = {
      id,
      email,
      name,
      paymentMethods: [],
      createdAt: new Date().toISOString(),
    };

    this.customers.set(id, customer);
    return customer;
  }

  async getCustomer(id: string): Promise<Customer | null> {
    return this.customers.get(id) || null;
  }

  async updateCustomer(
    id: string,
    updates: Partial<Customer>
  ): Promise<Customer | null> {
    const customer = this.customers.get(id);
    if (!customer) return null;

    const updated: Customer = {
      ...customer,
      ...updates,
    };

    this.customers.set(id, updated);
    return updated;
  }

  // Subscription Methods
  async createSubscription(
    customerId: string,
    priceId: string
  ): Promise<{ id: string; status: string; currentPeriodEnd: string }> {
    const id = `sub_${Date.now()}`;
    const currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    return {
      id,
      status: "active",
      currentPeriodEnd,
    };
  }

  // Webhook Simulation
  async simulateWebhook(event: string, data: Record<string, any>): Promise<void> {
    console.log(`[Stripe Mock] Webhook: ${event}`, data);
    // In production, this would trigger real webhook handlers
  }

  // Health check
  async health(): Promise<boolean> {
    return true;
  }
}

export const stripeMock = new StripeMock();
