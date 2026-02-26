/**
 * Offline & Sync Service
 * Mock implementation for offline data caching and synchronization
 */

export interface CachedData {
  id: string;
  key: string;
  data: Record<string, any>;
  timestamp: string;
  synced: boolean;
  version: number;
}

export interface SyncQueue {
  id: string;
  action: "create" | "update" | "delete";
  resource: string;
  resourceId: string;
  data: Record<string, any>;
  timestamp: string;
  synced: boolean;
  retries: number;
}

export interface SyncStatus {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncTime: string | null;
  pendingChanges: number;
  conflictCount: number;
}

class OfflineSyncService {
  private cache: Map<string, CachedData> = new Map();
  private syncQueue: Map<string, SyncQueue> = new Map();
  private isOnline: boolean = true;
  private isSyncing: boolean = false;
  private lastSyncTime: string | null = null;

  /**
   * Cache data locally
   */
  async cacheData(key: string, data: Record<string, any>): Promise<CachedData> {
    const id = `cache_${Date.now()}`;
    const cached: CachedData = {
      id,
      key,
      data,
      timestamp: new Date().toISOString(),
      synced: this.isOnline,
      version: 1,
    };

    this.cache.set(key, cached);
    return cached;
  }

  /**
   * Get cached data
   */
  async getCachedData(key: string): Promise<CachedData | null> {
    return this.cache.get(key) || null;
  }

  /**
   * Queue a change for sync
   */
  async queueChange(
    action: "create" | "update" | "delete",
    resource: string,
    resourceId: string,
    data: Record<string, any>
  ): Promise<SyncQueue> {
    const id = `sync_${Date.now()}`;
    const queueItem: SyncQueue = {
      id,
      action,
      resource,
      resourceId,
      data,
      timestamp: new Date().toISOString(),
      synced: false,
      retries: 0,
    };

    this.syncQueue.set(id, queueItem);

    // Auto-sync if online
    if (this.isOnline) {
      await this.syncPendingChanges();
    }

    return queueItem;
  }

  /**
   * Get pending changes
   */
  async getPendingChanges(): Promise<SyncQueue[]> {
    return Array.from(this.syncQueue.values()).filter((item) => !item.synced);
  }

  /**
   * Sync pending changes
   */
  async syncPendingChanges(): Promise<{ synced: number; failed: number }> {
    if (!this.isOnline || this.isSyncing) {
      return { synced: 0, failed: 0 };
    }

    this.isSyncing = true;
    let synced = 0;
    let failed = 0;

    try {
      const pending = await this.getPendingChanges();

      for (const item of pending) {
        // Mock: 90% success rate
        const isSuccess = Math.random() < 0.9;

        if (isSuccess) {
          item.synced = true;
          synced++;
        } else {
          item.retries++;
          if (item.retries >= 3) {
            item.synced = false; // Mark as failed after 3 retries
            failed++;
          }
        }

        this.syncQueue.set(item.id, item);
      }

      this.lastSyncTime = new Date().toISOString();
    } finally {
      this.isSyncing = false;
    }

    return { synced, failed };
  }

  /**
   * Set online/offline status
   */
  async setOnlineStatus(isOnline: boolean): Promise<void> {
    this.isOnline = isOnline;

    if (isOnline) {
      // Auto-sync when coming online
      await this.syncPendingChanges();
    }
  }

  /**
   * Get sync status
   */
  async getSyncStatus(): Promise<SyncStatus> {
    const pending = await this.getPendingChanges();

    return {
      isOnline: this.isOnline,
      isSyncing: this.isSyncing,
      lastSyncTime: this.lastSyncTime,
      pendingChanges: pending.length,
      conflictCount: 0, // Mock: no conflicts
    };
  }

  /**
   * Clear cache
   */
  async clearCache(): Promise<number> {
    const count = this.cache.size;
    this.cache.clear();
    return count;
  }

  /**
   * Clear sync queue
   */
  async clearSyncQueue(): Promise<number> {
    const count = this.syncQueue.size;
    this.syncQueue.clear();
    return count;
  }

  /**
   * Get cache size
   */
  async getCacheSize(): Promise<number> {
    let size = 0;
    this.cache.forEach((item) => {
      size += JSON.stringify(item).length;
    });
    return size;
  }

  /**
   * Resolve conflict (keep local or remote)
   */
  async resolveConflict(
    resourceId: string,
    keepLocal: boolean
  ): Promise<boolean> {
    // Mock implementation
    const items = Array.from(this.syncQueue.values()).filter(
      (item) => item.resourceId === resourceId
    );

    if (keepLocal) {
      // Keep local version, mark as synced
      items.forEach((item) => {
        item.synced = true;
        this.syncQueue.set(item.id, item);
      });
    } else {
      // Remove local version, fetch from server
      items.forEach((item) => {
        this.syncQueue.delete(item.id);
      });
    }

    return true;
  }

  /**
   * Backup data
   */
  async backupData(): Promise<{ fileName: string; size: number }> {
    const backup = {
      cache: Array.from(this.cache.values()),
      syncQueue: Array.from(this.syncQueue.values()),
      timestamp: new Date().toISOString(),
    };

    const data = JSON.stringify(backup);
    const fileName = `backup_${Date.now()}.json`;

    return {
      fileName,
      size: data.length,
    };
  }

  /**
   * Restore from backup
   */
  async restoreFromBackup(backupData: string): Promise<boolean> {
    try {
      const backup = JSON.parse(backupData);

      this.cache.clear();
      this.syncQueue.clear();

      backup.cache.forEach((item: CachedData) => {
        this.cache.set(item.key, item);
      });

      backup.syncQueue.forEach((item: SyncQueue) => {
        this.syncQueue.set(item.id, item);
      });

      return true;
    } catch {
      return false;
    }
  }
}

export const offlineSyncService = new OfflineSyncService();
