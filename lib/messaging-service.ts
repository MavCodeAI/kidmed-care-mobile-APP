/**
 * Messaging Service
 * Mock implementation for in-app messaging and notifications
 */

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  type: "text" | "alert" | "notification";
  priority: "low" | "normal" | "high" | "critical";
  read: boolean;
  createdAt: string;
  attachments?: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: "info" | "warning" | "error" | "success" | "critical";
  actionUrl?: string;
  read: boolean;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  participantIds: string[];
  participantNames: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  createdAt: string;
}

class MessagingService {
  private messages: Map<string, Message> = new Map();
  private notifications: Map<string, Notification> = new Map();
  private conversations: Map<string, ChatConversation> = new Map();

  /**
   * Send a message
   */
  async sendMessage(
    senderId: string,
    senderName: string,
    recipientId: string,
    content: string,
    type: "text" | "alert" | "notification" = "text",
    priority: "low" | "normal" | "high" | "critical" = "normal"
  ): Promise<Message> {
    const id = `msg_${Date.now()}`;
    const message: Message = {
      id,
      senderId,
      senderName,
      recipientId,
      content,
      type,
      priority,
      read: false,
      createdAt: new Date().toISOString(),
    };

    this.messages.set(id, message);

    // Auto-create notification for high priority messages
    if (priority === "high" || priority === "critical") {
      await this.createNotification(
        recipientId,
        `New ${priority} message from ${senderName}`,
        content,
        priority === "critical" ? "critical" : "warning"
      );
    }

    return message;
  }

  /**
   * Get messages for a user
   */
  async getMessages(userId: string, limit: number = 50): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter((m) => m.recipientId === userId || m.senderId === userId)
      .slice(-limit)
      .reverse();
  }

  /**
   * Mark message as read
   */
  async markMessageAsRead(messageId: string): Promise<boolean> {
    const message = this.messages.get(messageId);
    if (!message) return false;

    message.read = true;
    this.messages.set(messageId, message);
    return true;
  }

  /**
   * Create a notification
   */
  async createNotification(
    userId: string,
    title: string,
    body: string,
    type: "info" | "warning" | "error" | "success" | "critical" = "info",
    actionUrl?: string
  ): Promise<Notification> {
    const id = `notif_${Date.now()}`;
    const notification: Notification = {
      id,
      userId,
      title,
      body,
      type,
      actionUrl,
      read: false,
      createdAt: new Date().toISOString(),
    };

    this.notifications.set(id, notification);
    return notification;
  }

  /**
   * Get notifications for a user
   */
  async getNotifications(userId: string, limit: number = 20): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter((n) => n.userId === userId)
      .slice(-limit)
      .reverse();
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(userId: string): Promise<number> {
    return Array.from(this.notifications.values()).filter(
      (n) => n.userId === userId && !n.read
    ).length;
  }

  /**
   * Mark notification as read
   */
  async markNotificationAsRead(notificationId: string): Promise<boolean> {
    const notification = this.notifications.get(notificationId);
    if (!notification) return false;

    notification.read = true;
    this.notifications.set(notificationId, notification);
    return true;
  }

  /**
   * Create or get conversation
   */
  async getOrCreateConversation(
    participantIds: string[],
    participantNames: string[]
  ): Promise<ChatConversation> {
    const sortedIds = participantIds.sort().join("_");
    const id = `conv_${sortedIds}`;

    if (this.conversations.has(id)) {
      return this.conversations.get(id)!;
    }

    const conversation: ChatConversation = {
      id,
      participantIds,
      participantNames,
      lastMessage: "",
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0,
      createdAt: new Date().toISOString(),
    };

    this.conversations.set(id, conversation);
    return conversation;
  }

  /**
   * Get conversations for a user
   */
  async getConversations(userId: string): Promise<ChatConversation[]> {
    return Array.from(this.conversations.values()).filter((c) =>
      c.participantIds.includes(userId)
    );
  }

  /**
   * Send critical alert
   */
  async sendCriticalAlert(
    userId: string,
    title: string,
    body: string,
    details: Record<string, any>
  ): Promise<Notification> {
    const notification = await this.createNotification(
      userId,
      title,
      body,
      "critical"
    );

    // Log the critical alert
    console.log("[CRITICAL ALERT]", { userId, title, body, details });

    return notification;
  }

  /**
   * Clear all notifications
   */
  async clearNotifications(userId: string): Promise<number> {
    const before = Array.from(this.notifications.values()).filter(
      (n) => n.userId === userId
    ).length;

    const filtered = Array.from(this.notifications.entries()).filter(
      ([, n]) => n.userId !== userId
    );

    this.notifications.clear();
    filtered.forEach(([key, value]) => this.notifications.set(key, value));

    return before;
  }
}

export const messagingService = new MessagingService();
