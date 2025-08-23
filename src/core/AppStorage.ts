import { json, str, setNested, getNested, unsetNested, pullAll, validateKey, validateSubKey } from './helpers/parser';

type TDataFilterInvokable<T> = (dataArray: T[]) => T[];
type TDataFilterMap = { [x: string]: any };
type TStorageEventCallback = (key: string, oldValue: any, newValue: any) => void;

interface IAppStorage {
  set<T = any>(key: string, value: T): void;
  get<T = any>(key?: string, subKey?: string): T | null;
  update<T = any>(key: string, subKey: string, value: T): void;
  del(key: string, subKey?: string): void;
  reset(): void;
  count(key: string, subKey?: string): number;
  push<T = any>(key: string, value: T): boolean;
  getWhere<T = any>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): T[];
  countWhere<T = any>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): number;
  delWhere<T = any>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): boolean;
  size(): number;
  keys(): string[];
  usage(): { used: number; total: number; percentage: number };
  onChange(callback: TStorageEventCallback): () => void;
  onChange(key: string, callback: TStorageEventCallback): () => void;
  setAsync<T = any>(key: string, value: T): Promise<void>;
  getAsync<T = any>(key?: string, subKey?: string): Promise<T | null>;
  updateAsync<T = any>(key: string, subKey: string, value: T): Promise<void>;
  delAsync(key: string, subKey?: string): Promise<void>;
}

class AppStorage implements IAppStorage {
  private static eventListeners: TStorageEventCallback[] = [];
  private static keySpecificListeners: { [key: string]: TStorageEventCallback[] } = {};
  static set<T = any>(key: string, value: T): void {
    validateKey(key, 'AppStorage.set()');
    localStorage.setItem(key, str(value));
  }

  static update<T = any>(key: string, subKey: string, value: T): void {
    validateKey(key, 'AppStorage.update()');
    validateSubKey(subKey, 'AppStorage.update()');
    const payload = this.get(key) || {};
    setNested(payload, subKey, value);
    this.set(key, payload);
  }

  static get<T = any>(key?: string, subKey?: string): T | null {
    // If no key provided, return all localStorage as an object
    if (!key) {
      const allData: { [key: string]: any } = {};
      for (let i = 0; i < localStorage.length; i++) {
        const storageKey = localStorage.key(i);
        if (storageKey) {
          allData[storageKey] = json(localStorage.getItem(storageKey));
        }
      }
      return allData as T;
    }
    
    validateKey(key, 'AppStorage.get()');
    validateSubKey(subKey, 'AppStorage.get()');
    
    const payload = json(localStorage.getItem(key));
    return !subKey ? payload : getNested(payload, subKey);
  }

  static del(key: string, subKey?: string): void {
    validateKey(key, 'AppStorage.del()');
    if (!subKey) return localStorage.removeItem(key);
    
    validateSubKey(subKey, 'AppStorage.del()');
    const payload = this.get(key) || {};
    unsetNested(payload, subKey);
    this.set(key, payload);
  }

  static reset(): void {
    localStorage.clear();
  }

  static push<T = any>(key: string, value: T): boolean {
    validateKey(key, 'AppStorage.push()');
    if (value === null || value === undefined) {
      throw new Error('AppStorage.push(): Value cannot be null or undefined');
    }
    
    const storageValue = this.get(key);
    
    // If key doesn't exist, create a new array
    if (!storageValue) {
      this.set(key, [value]);
      return true;
    }
    
    // If existing value is not an array, throw error
    if (!Array.isArray(storageValue)) {
      throw new Error(`AppStorage.push(): Value at key '${key}' is not an array. Current type: ${typeof storageValue}`);
    }
    
    // Push to existing array
    storageValue.push(value);
    this.set(key, storageValue);
    return true;
  }

  static count(key: string, subKey?: string): number {
    validateKey(key, 'AppStorage.count()');
    validateSubKey(subKey, 'AppStorage.count()');
    
    let data = this.get(key, subKey);
    const length = data?.length;
    data = undefined;
    return length ? length : 0;
  }

  static countWhere<T = any>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): number {
    validateKey(key, 'AppStorage.countWhere()');
    validateSubKey(subKey, 'AppStorage.countWhere()');
    
    const allRecords = this.get(key, subKey);

    if (!allRecords) return 0;
    if (typeof filter === 'function') {
      return filter(allRecords).length;
    }
    return allRecords.filter((item: any) => {
      return Object.keys(filter).every(key => item[key] === filter[key]);
    }).length;
  }

  static getWhere<T = any>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): T[] {
    validateKey(key, 'AppStorage.getWhere()');
    validateSubKey(subKey, 'AppStorage.getWhere()');
    
    const allRecords = this.get(key, subKey);
    if (!allRecords) return [];
    
    return typeof filter === 'function'
      ? filter(allRecords)
      : allRecords.filter((item: any) => {
          return Object.keys(filter).every(key => item[key] === filter[key]);
        });
  }

  static delWhere<T = any>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): boolean {
    validateKey(key, 'AppStorage.delWhere()');
    validateSubKey(subKey, 'AppStorage.delWhere()');
    
    const allRecords = this.get(key, subKey);

    if (!allRecords) return false;

    const filteredRecords =
      typeof filter === 'function'
        ? filter(allRecords)
        : allRecords.filter((item: any) => {
            return Object.keys(filter).every(key => item[key] === filter[key]);
          });

    pullAll(allRecords, filteredRecords);

    if (subKey) {
      this.update(key, subKey, allRecords);
    } else {
      this.set(key, allRecords);
    }
    return true;
  }

  /**
   * Get the total size of localStorage in bytes
   */
  static size(): number {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key) || '';
        total += key.length + value.length;
      }
    }
    return total;
  }

  /**
   * Get all keys currently in localStorage
   */
  static keys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  }

  /**
   * Detect and cache the localStorage quota limit for this browser
   */
  private static getQuotaLimit(): number {
    const quotaKey = '__localStorage_quota_limit__';
    
    // Check if we already detected the quota
    const cachedQuota = localStorage.getItem(quotaKey);
    if (cachedQuota) {
      return parseInt(cachedQuota, 10);
    }
    
    // Run quota detection
    let limit = 0;
    const testKey = '__quota_test__';
    
    try {
      let testSize = 1024; // Start with 1KB
      let lastSuccessfulSize = 0;
      
      while (testSize < 50 * 1024 * 1024) { // Max 50MB test
        const testData = 'x'.repeat(testSize);
        
        try {
          localStorage.setItem(testKey, testData);
          lastSuccessfulSize = testSize;
          localStorage.removeItem(testKey);
          testSize *= 2; // Double the size
        } catch (e) {
          // Hit the limit
          limit = lastSuccessfulSize;
          break;
        }
      }
      
      // Cache the detected limit
      const finalLimit = limit || 5 * 1024 * 1024; // 5MB fallback
      localStorage.setItem(quotaKey, finalLimit.toString());
      return finalLimit;
      
    } catch (e) {
      // If detection fails, cache conservative estimate
      const fallbackLimit = 5 * 1024 * 1024; // 5MB
      localStorage.setItem(quotaKey, fallbackLimit.toString());
      return fallbackLimit;
    }
  }

  /**
   * Get localStorage usage information with cached browser limits
   */
  static usage(): { used: number; total: number; percentage: number } {
    const used = this.size();
    const total = this.getQuotaLimit();
    const percentage = Math.round((used / total) * 100);
    
    return { used, total, percentage };
  }

  /**
   * Listen for localStorage changes from other tabs/windows
   * Can listen to all changes or specific key changes
   */
  static onChange(keyOrCallback: string | TStorageEventCallback, callback?: TStorageEventCallback): () => void {
    // Overload 1: onChange(callback) - listen to all changes
    if (typeof keyOrCallback === 'function') {
      const cb = keyOrCallback;
      this.eventListeners.push(cb);
      
      // Return cleanup function
      return () => {
        const index = this.eventListeners.indexOf(cb);
        if (index > -1) {
          this.eventListeners.splice(index, 1);
        }
      };
    }
    
    // Overload 2: onChange(key, callback) - listen to specific key changes
    if (typeof keyOrCallback === 'string' && callback) {
      const key = keyOrCallback;
      if (!this.keySpecificListeners[key]) {
        this.keySpecificListeners[key] = [];
      }
      this.keySpecificListeners[key].push(callback);
      
      // Return cleanup function
      return () => {
        const listeners = this.keySpecificListeners[key];
        if (listeners) {
          const index = listeners.indexOf(callback);
          if (index > -1) {
            listeners.splice(index, 1);
          }
          // Clean up empty arrays
          if (listeners.length === 0) {
            delete this.keySpecificListeners[key];
          }
        }
      };
    }
    
    throw new Error('AppStorage.onChange(): Invalid arguments');
  }

  /**
   * Initialize storage event listener (automatically called)
   */
  static initStorageEvents(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key) {
          const oldValue = e.oldValue ? json(e.oldValue) : null;
          const newValue = e.newValue ? json(e.newValue) : null;
          
          // Notify all global listeners
          this.eventListeners.forEach(callback => {
            try {
              callback(e.key!, oldValue, newValue);
            } catch (error) {
              console.warn('Storage event callback error:', error);
            }
          });
          
          // Notify key-specific listeners
          const keyListeners = this.keySpecificListeners[e.key];
          if (keyListeners) {
            keyListeners.forEach(callback => {
              try {
                callback(e.key!, oldValue, newValue);
              } catch (error) {
                console.warn('Storage event callback error:', error);
              }
            });
          }
        }
      });
    }
  }

  /**
   * Async versions of storage methods for future compatibility
   */
  static async setAsync<T = any>(key: string, value: T): Promise<void> {
    return Promise.resolve(this.set<T>(key, value));
  }

  static async getAsync<T = any>(key?: string, subKey?: string): Promise<T | null> {
    return Promise.resolve(this.get<T>(key, subKey));
  }

  static async updateAsync<T = any>(key: string, subKey: string, value: T): Promise<void> {
    return Promise.resolve(this.update<T>(key, subKey, value));
  }

  static async delAsync(key: string, subKey?: string): Promise<void> {
    return Promise.resolve(this.del(key, subKey));
  }

  // Instance methods that delegate to static methods for consistent API
  set<T = any>(key: string, value: T): void {
    return AppStorage.set<T>(key, value);
  }

  get<T = any>(key?: string, subKey?: string): T | null {
    return AppStorage.get<T>(key, subKey);
  }

  update<T = any>(key: string, subKey: string, value: T): void {
    return AppStorage.update<T>(key, subKey, value);
  }

  del(key: string, subKey?: string): void {
    return AppStorage.del(key, subKey);
  }

  reset(): void {
    return AppStorage.reset();
  }

  count(key: string, subKey?: string): number {
    return AppStorage.count(key, subKey);
  }

  push<T = any>(key: string, value: T): boolean {
    return AppStorage.push<T>(key, value);
  }

  getWhere<T = any>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): T[] {
    return AppStorage.getWhere<T>(key, filter, subKey);
  }

  countWhere<T = any>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): number {
    return AppStorage.countWhere<T>(key, filter, subKey);
  }

  delWhere<T = any>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): boolean {
    return AppStorage.delWhere<T>(key, filter, subKey);
  }

  size(): number {
    return AppStorage.size();
  }

  keys(): string[] {
    return AppStorage.keys();
  }

  usage(): { used: number; total: number; percentage: number } {
    return AppStorage.usage();
  }

  onChange(keyOrCallback: string | TStorageEventCallback, callback?: TStorageEventCallback): () => void {
    return AppStorage.onChange(keyOrCallback, callback);
  }

  async setAsync<T = any>(key: string, value: T): Promise<void> {
    return AppStorage.setAsync<T>(key, value);
  }

  async getAsync<T = any>(key?: string, subKey?: string): Promise<T | null> {
    return AppStorage.getAsync<T>(key, subKey);
  }

  async updateAsync<T = any>(key: string, subKey: string, value: T): Promise<void> {
    return AppStorage.updateAsync<T>(key, subKey, value);
  }

  async delAsync(key: string, subKey?: string): Promise<void> {
    return AppStorage.delAsync(key, subKey);
  }
}

// Initialize storage events when module loads
AppStorage.initStorageEvents();

export default AppStorage;
export type { IAppStorage, TDataFilterMap, TStorageEventCallback };
