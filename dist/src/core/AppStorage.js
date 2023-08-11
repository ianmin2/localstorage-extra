"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const parser_1 = require("./helpers/parser");
class AppStorage {
    static set(key, value = '') {
        localStorage.setItem(key, (0, parser_1.str)(value));
    }
    static update(key, subKey, value = undefined) {
        const payload = this.get(key) || {};
        lodash_1.default.set(payload, subKey, value);
        this.set(key, payload);
    }
    static get(key, subKey) {
        const payload = (0, parser_1.json)(localStorage.getItem(key));
        return !subKey ? payload : lodash_1.default.get(payload, subKey);
    }
    static del(key, subKey) {
        if (!subKey)
            return localStorage.removeItem(key);
        return this.update(key, subKey);
    }
    static reset() {
        localStorage.clear();
    }
    static push(key, value) {
        if (!value)
            return false;
        const storageValue = this.get(key);
        if (!Array.isArray(storageValue))
            return false;
        storageValue.push(value);
        this.set(key, storageValue);
        return true;
    }
    static count(key, subKey) {
        let data = this.get(key, subKey);
        const length = data === null || data === void 0 ? void 0 : data.length;
        data = undefined;
        return length ? length : 0;
    }
    static countWhere(key, filter, subKey) {
        const allRecords = this.get(key, subKey);
        if (!allRecords)
            return 0;
        if (typeof filter === 'function') {
            return filter(allRecords).length;
        }
        return lodash_1.default.filter(allRecords, filter).length;
    }
    static getWhere(key, filter, subKey) {
        const allRecords = this.get(key, subKey);
        return typeof filter === 'function'
            ? filter(allRecords)
            : lodash_1.default.filter(allRecords, filter);
    }
    static delWhere(key, filter, subKey) {
        const allRecords = this.get(key, subKey);
        if (!allRecords)
            return false;
        const filteredRecords = typeof filter === 'function'
            ? filter(allRecords)
            : lodash_1.default.filter(allRecords, filter);
        lodash_1.default.pullAll(allRecords, filteredRecords);
        if (subKey) {
            this.update(key, subKey, allRecords);
        }
        else {
            this.set(key, allRecords);
        }
        return true;
    }
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
