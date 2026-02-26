import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import { messagingService, Message, Notification } from "@/lib/messaging-service";

export default function MessagingScreen() {
  const colors = useColors();
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"messages" | "notifications">("messages");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const msgs = await messagingService.getMessages("current_user", 20);
    const notifs = await messagingService.getNotifications("current_user", 20);
    const unread = await messagingService.getUnreadCount("current_user");

    setMessages(msgs);
    setNotifications(notifs);
    setUnreadCount(unread);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    await messagingService.sendMessage(
      "current_user",
      "Dr. Smith",
      "recipient_user",
      newMessage,
      "text",
      "normal"
    );

    setNewMessage("");
    loadData();
  };

  const handleMarkAsRead = async (id: string) => {
    await messagingService.markNotificationAsRead(id);
    loadData();
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Messages</Text>
            {unreadCount > 0 && (
              <Text className="text-sm text-warning">
                {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
              </Text>
            )}
          </View>

          {/* Tabs */}
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => setActiveTab("messages")}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor:
                  activeTab === "messages" ? colors.primary : colors.surface,
              }}
            >
              <Text
                className={
                  activeTab === "messages" ? "text-background font-semibold" : "text-foreground"
                }
              >
                Messages
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab("notifications")}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor:
                  activeTab === "notifications" ? colors.primary : colors.surface,
              }}
            >
              <Text
                className={
                  activeTab === "notifications"
                    ? "text-background font-semibold"
                    : "text-foreground"
                }
              >
                Notifications
              </Text>
            </Pressable>
          </View>

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <View className="gap-3">
              {messages.length === 0 ? (
                <View className="items-center justify-center py-8">
                  <Text className="text-muted">No messages yet</Text>
                </View>
              ) : (
                messages.map((msg) => (
                  <View
                    key={msg.id}
                    className="bg-surface rounded-lg p-3 border border-border"
                  >
                    <View className="flex-row justify-between items-start gap-2">
                      <View className="flex-1">
                        <Text className="font-semibold text-foreground">
                          {msg.senderName}
                        </Text>
                        <Text className="text-sm text-muted mt-1">{msg.content}</Text>
                      </View>
                      <View
                        className="px-2 py-1 rounded"
                        style={{
                          backgroundColor:
                            msg.priority === "critical"
                              ? colors.error
                              : msg.priority === "high"
                                ? colors.warning
                                : colors.primary,
                        }}
                      >
                        <Text className="text-xs text-background font-semibold">
                          {msg.priority.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-xs text-muted mt-2">
                      {new Date(msg.createdAt).toLocaleString()}
                    </Text>
                  </View>
                ))
              )}
            </View>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <View className="gap-3">
              {notifications.length === 0 ? (
                <View className="items-center justify-center py-8">
                  <Text className="text-muted">No notifications</Text>
                </View>
              ) : (
                notifications.map((notif) => (
                  <Pressable
                    key={notif.id}
                    onPress={() => handleMarkAsRead(notif.id)}
                    style={{
                      opacity: notif.read ? 0.6 : 1,
                    }}
                  >
                    <View className="bg-surface rounded-lg p-3 border border-border">
                      <View className="flex-row justify-between items-start gap-2">
                        <View className="flex-1">
                          <View className="flex-row items-center gap-2">
                            <Text className="font-semibold text-foreground flex-1">
                              {notif.title}
                            </Text>
                            <View
                              className="px-2 py-1 rounded"
                              style={{
                                backgroundColor:
                                  notif.type === "critical"
                                    ? colors.error
                                    : notif.type === "warning"
                                      ? colors.warning
                                      : notif.type === "success"
                                        ? colors.success
                                        : colors.primary,
                              }}
                            >
                              <Text className="text-xs text-background font-semibold">
                                {notif.type.toUpperCase()}
                              </Text>
                            </View>
                          </View>
                          <Text className="text-sm text-muted mt-2">{notif.body}</Text>
                        </View>
                      </View>
                      <Text className="text-xs text-muted mt-2">
                        {new Date(notif.createdAt).toLocaleString()}
                      </Text>
                      {!notif.read && (
                        <Text className="text-xs text-primary mt-2 font-semibold">
                          Tap to mark as read
                        </Text>
                      )}
                    </View>
                  </Pressable>
                ))
              )}
            </View>
          )}

          {/* Send Message Section */}
          {activeTab === "messages" && (
            <View className="gap-2 mt-4 border-t border-border pt-4">
              <Text className="font-semibold text-foreground">Send Message</Text>
              <TextInput
                placeholder="Type your message..."
                value={newMessage}
                onChangeText={setNewMessage}
                multiline
                numberOfLines={3}
                className="bg-surface border border-border rounded-lg p-3 text-foreground"
                placeholderTextColor={colors.muted}
              />
              <Pressable
                onPress={handleSendMessage}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text className="text-background font-semibold">Send Message</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
