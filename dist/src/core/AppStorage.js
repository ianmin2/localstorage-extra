"use strict";
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
            return Object.keys(filter).every(key => item[key] === filter[key]);
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
                return Object.keys(filter).every(key => item[key] === filter[key]);
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
                return Object.keys(filter).every(key => item[key] === filter[key]);
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
}
exports.default = AppStorage;
