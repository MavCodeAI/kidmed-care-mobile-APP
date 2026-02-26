import { ScrollView, Text, View, Pressable, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import { offlineSyncService, SyncStatus, SyncQueue } from "@/lib/offline-sync-service";

export default function OfflineSyncScreen() {
  const colors = useColors();
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [pendingChanges, setPendingChanges] = useState<SyncQueue[]>([]);
  const [cacheSize, setCacheSize] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    const status = await offlineSyncService.getSyncStatus();
    setSyncStatus(status);

    const pending = await offlineSyncService.getPendingChanges();
    setPendingChanges(pending);

    const size = await offlineSyncService.getCacheSize();
    setCacheSize(size);
  };

  const handleToggleOnline = async (value: boolean) => {
    setIsOnline(value);
    await offlineSyncService.setOnlineStatus(value);
    loadStatus();
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    const result = await offlineSyncService.syncPendingChanges();
    setIsSyncing(false);
    loadStatus();
    alert(`Synced: ${result.synced}, Failed: ${result.failed}`);
  };

  const handleClearCache = async () => {
    const count = await offlineSyncService.clearCache();
    alert(`Cleared ${count} items from cache`);
    loadStatus();
  };

  const handleBackupData = async () => {
    const backup = await offlineSyncService.backupData();
    alert(`Backup created: ${backup.fileName} (${backup.size} bytes)`);
  };

  if (!syncStatus) {
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
            <Text className="text-3xl font-bold text-foreground">Offline & Sync</Text>
            <Text className="text-sm text-muted">Manage data synchronization</Text>
          </View>

          {/* Connection Status */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-3">
            <View className="flex-row justify-between items-center">
              <View className="gap-1">
                <Text className="font-semibold text-foreground">Connection Status</Text>
                <Text className="text-sm text-muted">
                  {isOnline ? "Online" : "Offline"}
                </Text>
              </View>
              <View
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: isOnline ? colors.success : colors.error,
                }}
              />
            </View>

            <View className="flex-row justify-between items-center pt-2 border-t border-border">
              <Text className="text-sm text-foreground">Toggle Offline Mode</Text>
              <Switch
                value={!isOnline}
                onValueChange={(value) => handleToggleOnline(!value)}
              />
            </View>
          </View>

          {/* Sync Status */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-3">
            <Text className="font-semibold text-foreground">Sync Status</Text>

            <View className="gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted">Syncing</Text>
                <View
                  className="px-3 py-1 rounded"
                  style={{
                    backgroundColor: isSyncing ? colors.warning : colors.success,
                  }}
                >
                  <Text className="text-xs text-background font-semibold">
                    {isSyncing ? "IN PROGRESS" : "IDLE"}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted">Last Sync</Text>
                <Text className="text-sm text-foreground">
                  {syncStatus.lastSyncTime
                    ? new Date(syncStatus.lastSyncTime).toLocaleTimeString()
                    : "Never"}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted">Pending Changes</Text>
                <View
                  className="px-3 py-1 rounded"
                  style={{
                    backgroundColor:
                      syncStatus.pendingChanges > 0 ? colors.warning : colors.success,
                  }}
                >
                  <Text className="text-xs text-background font-semibold">
                    {syncStatus.pendingChanges}
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={handleManualSync}
                disabled={isSyncing}
                style={{
                  backgroundColor: isSyncing ? colors.border : colors.primary,
                  paddingVertical: 10,
                  borderRadius: 6,
                  marginTop: 8,
                }}
              >
                <Text className="text-background text-center font-semibold">
                  {isSyncing ? "Syncing..." : "Sync Now"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Pending Changes */}
          <View className="gap-2">
            <Text className="font-semibold text-foreground">
              Pending Changes ({pendingChanges.length})
            </Text>
            {pendingChanges.length === 0 ? (
              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted text-center">
                  All changes synced
                </Text>
              </View>
            ) : (
              <View className="gap-2">
                {pendingChanges.map((change) => (
                  <View
                    key={change.id}
                    className="bg-surface rounded-lg p-3 border border-border"
                  >
                    <View className="flex-row justify-between items-start gap-2">
                      <View className="flex-1">
                        <Text className="font-semibold text-foreground">
                          {change.action.toUpperCase()}
                        </Text>
                        <Text className="text-sm text-muted mt-1">
                          {change.resource}: {change.resourceId}
                        </Text>
                      </View>
                      <View
                        className="px-2 py-1 rounded"
                        style={{
                          backgroundColor: change.synced ? colors.success : colors.warning,
                        }}
                      >
                        <Text className="text-xs text-background font-semibold">
                          {change.synced ? "SYNCED" : `RETRY ${change.retries}`}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-xs text-muted mt-2">
                      {new Date(change.timestamp).toLocaleString()}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Cache Management */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-3">
            <Text className="font-semibold text-foreground">Cache Management</Text>

            <View className="gap-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted">Cache Size</Text>
                <Text className="text-sm text-foreground">
                  {(cacheSize / 1024).toFixed(2)} KB
                </Text>
              </View>

              <Pressable
                onPress={handleClearCache}
                style={{
                  backgroundColor: colors.error,
                  paddingVertical: 10,
                  borderRadius: 6,
                  marginTop: 8,
                }}
              >
                <Text className="text-background text-center font-semibold">
                  Clear Cache
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Backup & Restore */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-3">
            <Text className="font-semibold text-foreground">Backup & Restore</Text>

            <View className="gap-2">
              <Pressable
                onPress={handleBackupData}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 10,
                  borderRadius: 6,
                }}
              >
                <Text className="text-background text-center font-semibold">
                  Create Backup
                </Text>
              </Pressable>

              <Text className="text-xs text-muted text-center">
                Backup includes all cached data and pending changes
              </Text>
            </View>
          </View>

          {/* Offline Tips */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-2">
            <Text className="font-semibold text-foreground">Tips</Text>
            <View className="gap-1">
              <Text className="text-xs text-muted">
                • Enable offline mode to test sync functionality
              </Text>
              <Text className="text-xs text-muted">
                • Changes are queued automatically when offline
              </Text>
              <Text className="text-xs text-muted">
                • Sync happens automatically when back online
              </Text>
              <Text className="text-xs text-muted">
                • Use manual sync for immediate synchronization
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
