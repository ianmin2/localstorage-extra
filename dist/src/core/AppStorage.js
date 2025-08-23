"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./helpers/parser");
class AppStorage {
    static set(key, value) {
        (0, parser_1.validateKey)(key, 'AppStorage.set()');
        localStorage.setItem(key, (0, parser_1.str)(value));
    }
    static update(key, subKey, value) {
        (0, parser_1.validateKey)(key, 'AppStorage.update()');
        (0, parser_1.validateSubKey)(subKey, 'AppStorage.update()');
        const payload = this.get(key) || {};
        (0, parser_1.setNested)(payload, subKey, value);
        this.set(key, payload);
    }
    static get(key, subKey) {
        // If no key provided, return all localStorage as an object
        if (!key) {
            const allData = {};
            for (let i = 0; i < localStorage.length; i++) {
                const storageKey = localStorage.key(i);
                if (storageKey) {
                    allData[storageKey] = (0, parser_1.json)(localStorage.getItem(storageKey));
                }
            }
            return allData;
        }
        (0, parser_1.validateKey)(key, 'AppStorage.get()');
        (0, parser_1.validateSubKey)(subKey, 'AppStorage.get()');
        const payload = (0, parser_1.json)(localStorage.getItem(key));
        return !subKey ? payload : (0, parser_1.getNested)(payload, subKey);
    }
    static del(key, subKey) {
        (0, parser_1.validateKey)(key, 'AppStorage.del()');
        if (!subKey)
            return localStorage.removeItem(key);
        (0, parser_1.validateSubKey)(subKey, 'AppStorage.del()');
        const payload = this.get(key) || {};
        (0, parser_1.unsetNested)(payload, subKey);
        this.set(key, payload);
    }
    static reset() {
        localStorage.clear();
    }
    static push(key, value) {
        (0, parser_1.validateKey)(key, 'AppStorage.push()');
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
    static count(key, subKey) {
        (0, parser_1.validateKey)(key, 'AppStorage.count()');
        (0, parser_1.validateSubKey)(subKey, 'AppStorage.count()');
        let data = this.get(key, subKey);
        const length = data === null || data === void 0 ? void 0 : data.length;
        data = undefined;
        return length ? length : 0;
    }
    static countWhere(key, filter, subKey) {
        (0, parser_1.validateKey)(key, 'AppStorage.countWhere()');
        (0, parser_1.validateSubKey)(subKey, 'AppStorage.countWhere()');
        const allRecords = this.get(key, subKey);
        if (!allRecords)
            return 0;
        if (typeof filter === 'function') {
            return filter(allRecords).length;
        }
        return allRecords.filter((item) => {
            return Object.keys(filter).every(filterKey => item[filterKey] === filter[filterKey]);
        }).length;
    }
    static getWhere(key, filter, subKey) {
        (0, parser_1.validateKey)(key, 'AppStorage.getWhere()');
        (0, parser_1.validateSubKey)(subKey, 'AppStorage.getWhere()');
        const allRecords = this.get(key, subKey);
        if (!allRecords)
            return [];
        return typeof filter === 'function'
            ? filter(allRecords)
            : allRecords.filter((item) => {
                return Object.keys(filter).every(filterKey => item[filterKey] === filter[filterKey]);
            });
    }
    static delWhere(key, filter, subKey) {
        (0, parser_1.validateKey)(key, 'AppStorage.delWhere()');
        (0, parser_1.validateSubKey)(subKey, 'AppStorage.delWhere()');
        const allRecords = this.get(key, subKey);
        if (!allRecords)
            return false;
        const filteredRecords = typeof filter === 'function'
            ? filter(allRecords)
            : allRecords.filter((item) => {
                return Object.keys(filter).every(filterKey => item[filterKey] === filter[filterKey]);
            });
        (0, parser_1.pullAll)(allRecords, filteredRecords);
        if (subKey) {
            this.update(key, subKey, allRecords);
        }
        else {
            this.set(key, allRecords);
        }
        return true;
    }
    /**
     * Get the total size of localStorage in bytes
     */
    static size() {
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
    static keys() {
        const keys = [];
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
    static getQuotaLimit() {
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
                }
                catch (e) {
                    // Hit the limit
                    limit = lastSuccessfulSize;
                    break;
                }
            }
            // Cache the detected limit
            const finalLimit = limit || 5 * 1024 * 1024; // 5MB fallback
            localStorage.setItem(quotaKey, finalLimit.toString());
            return finalLimit;
        }
        catch (e) {
            // If detection fails, cache conservative estimate
            const fallbackLimit = 5 * 1024 * 1024; // 5MB
            localStorage.setItem(quotaKey, fallbackLimit.toString());
            return fallbackLimit;
        }
    }
    /**
     * Get localStorage usage information with cached browser limits
     */
    static usage() {
        const used = this.size();
        const total = this.getQuotaLimit();
        const percentage = Math.round((used / total) * 100);
        return { used, total, percentage };
    }
    /**
     * Listen for localStorage changes from other tabs/windows
     * Can listen to all changes or specific key changes
     */
    static onChange(keyOrCallback, callback) {
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
    static initStorageEvents() {
        if (typeof window !== 'undefined') {
            window.addEventListener('storage', (e) => {
                if (e.key) {
                    const oldValue = e.oldValue ? (0, parser_1.json)(e.oldValue) : null;
                    const newValue = e.newValue ? (0, parser_1.json)(e.newValue) : null;
                    // Notify all global listeners
                    this.eventListeners.forEach(callback => {
                        try {
                            callback(e.key, oldValue, newValue);
                        }
                        catch (error) {
                            console.warn('Storage event callback error:', error);
                        }
                    });
                    // Notify key-specific listeners
                    const keyListeners = this.keySpecificListeners[e.key];
                    if (keyListeners) {
                        keyListeners.forEach(callback => {
                            try {
                                callback(e.key, oldValue, newValue);
                            }
                            catch (error) {
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
    static setAsync(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this.set(key, value));
        });
    }
    static getAsync(key, subKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this.get(key, subKey));
        });
    }
    static updateAsync(key, subKey, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this.update(key, subKey, value));
        });
    }
    static delAsync(key, subKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this.del(key, subKey));
        });
    }
    // Instance methods that delegate to static methods for consistent API
    set(key, value) {
        return AppStorage.set(key, value);
    }
    get(key, subKey) {
        return AppStorage.get(key, subKey);
    }
    update(key, subKey, value) {
        return AppStorage.update(key, subKey, value);
    }
    del(key, subKey) {
        return AppStorage.del(key, subKey);
    }
    reset() {
        return AppStorage.reset();
    }
    count(key, subKey) {
        return AppStorage.count(key, subKey);
    }
    push(key, value) {
        return AppStorage.push(key, value);
    }
    getWhere(key, filter, subKey) {
        return AppStorage.getWhere(key, filter, subKey);
    }
    countWhere(key, filter, subKey) {
        return AppStorage.countWhere(key, filter, subKey);
    }
    delWhere(key, filter, subKey) {
        return AppStorage.delWhere(key, filter, subKey);
    }
    size() {
        return AppStorage.size();
    }
    keys() {
        return AppStorage.keys();
    }
    usage() {
        return AppStorage.usage();
    }
    onChange(keyOrCallback, callback) {
        return AppStorage.onChange(keyOrCallback, callback);
    }
    setAsync(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return AppStorage.setAsync(key, value);
        });
    }
    getAsync(key, subKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return AppStorage.getAsync(key, subKey);
        });
    }
    updateAsync(key, subKey, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return AppStorage.updateAsync(key, subKey, value);
        });
    }
    delAsync(key, subKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return AppStorage.delAsync(key, subKey);
        });
    }
}
Object.defineProperty(AppStorage, "eventListeners", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: []
});
Object.defineProperty(AppStorage, "keySpecificListeners", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {}
});
// Initialize storage events when module loads
AppStorage.initStorageEvents();
exports.default = AppStorage;
