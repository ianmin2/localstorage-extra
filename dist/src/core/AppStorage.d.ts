type TDataFilterInvokable<T> = (dataArray: T[]) => T[];
type TDataFilterMap = {
    [x: string]: any;
};
type TStorageEventCallback = (key: string, oldValue: any, newValue: any) => void;
interface IAppStorage {
    set<T = any>(key: string, value: T): void;
    get<T = any>(key?: string, subKey?: string): T | null;
    update<T = any>(key: string, subKey: string, value: T): void;
    del(key: string, subKey?: string): void;
    reset(): void;
    count(key: string, subKey?: string): number;
    push<T = any>(key: string, value: T): boolean;
    getWhere<T = any>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): T[];
    countWhere<T = any>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): number;
    delWhere<T = any>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): boolean;
    size(): number;
    keys(): string[];
    usage(): {
        used: number;
        total: number;
        percentage: number;
    };
    onChange(callback: TStorageEventCallback): () => void;
    onChange(key: string, callback: TStorageEventCallback): () => void;
    setAsync<T = any>(key: string, value: T): Promise<void>;
    getAsync<T = any>(key?: string, subKey?: string): Promise<T | null>;
    updateAsync<T = any>(key: string, subKey: string, value: T): Promise<void>;
    delAsync(key: string, subKey?: string): Promise<void>;
}
declare class AppStorage implements IAppStorage {
    private static eventListeners;
    private static keySpecificListeners;
    static set<T = any>(key: string, value: T): void;
    static update<T = any>(key: string, subKey: string, value: T): void;
    static get<T = any>(key?: string, subKey?: string): T | null;
    static del(key: string, subKey?: string): void;
    static reset(): void;
    static push<T = any>(key: string, value: T): boolean;
    static count(key: string, subKey?: string): number;
    static countWhere<T = any>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): number;
    static getWhere<T = any>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): T[];
    static delWhere<T = any>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): boolean;
    /**
     * Get the total size of localStorage in bytes
     */
    static size(): number;
    /**
     * Get all keys currently in localStorage
     */
    static keys(): string[];
    /**
     * Detect and cache the localStorage quota limit for this browser
     */
    private static getQuotaLimit;
    /**
     * Get localStorage usage information with cached browser limits
     */
    static usage(): {
        used: number;
        total: number;
        percentage: number;
    };
    /**
     * Listen for localStorage changes from other tabs/windows
     * Can listen to all changes or specific key changes
     */
    static onChange(keyOrCallback: string | TStorageEventCallback, callback?: TStorageEventCallback): () => void;
    /**
     * Initialize storage event listener (automatically called)
     */
    static initStorageEvents(): void;
    /**
     * Async versions of storage methods for future compatibility
     */
    static setAsync<T = any>(key: string, value: T): Promise<void>;
    static getAsync<T = any>(key?: string, subKey?: string): Promise<T | null>;
    static updateAsync<T = any>(key: string, subKey: string, value: T): Promise<void>;
    static delAsync(key: string, subKey?: string): Promise<void>;
    set<T = any>(key: string, value: T): void;
    get<T = any>(key?: string, subKey?: string): T | null;
    update<T = any>(key: string, subKey: string, value: T): void;
    del(key: string, subKey?: string): void;
    reset(): void;
    count(key: string, subKey?: string): number;
    push<T = any>(key: string, value: T): boolean;
    getWhere<T = any>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): T[];
    countWhere<T = any>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): number;
    delWhere<T = any>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): boolean;
    size(): number;
    keys(): string[];
    usage(): {
        used: number;
        total: number;
        percentage: number;
    };
    onChange(keyOrCallback: string | TStorageEventCallback, callback?: TStorageEventCallback): () => void;
    setAsync<T = any>(key: string, value: T): Promise<void>;
    getAsync<T = any>(key?: string, subKey?: string): Promise<T | null>;
    updateAsync<T = any>(key: string, subKey: string, value: T): Promise<void>;
    delAsync(key: string, subKey?: string): Promise<void>;
}
export default AppStorage;
export type { IAppStorage, TDataFilterMap, TStorageEventCallback };
