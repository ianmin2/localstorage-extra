import _ from 'lodash';
import { json, str } from './helpers/parser';

type TDataFilterInvokable<T> = (dataArray: T[]) => T[];
type TDataFilterMap = { [x: string]: any };

interface IAppStorage {
  set(key: string, value: any): void;
  get(key?: string, subKey?: string): any;
  update(key: string, subKey: string, value: any): void;
  del(key: string, subKey?: string): void;
  reset(): void;
  count(key: string, subKey?: any): number;
  push(key: string, value: any): boolean;
  getWhere<T>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): T[];
  countWhere<T>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): number;

  delWhere<T>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): boolean;
}

class AppStorage implements IAppStorage {
  static set(key: string, value: any = ''): void {
    if (!key || typeof key !== 'string') {
      throw new Error('AppStorage.set(): Key must be a non-empty string');
    }
    localStorage.setItem(key, str(value));
  }

  static update(key: string, subKey: string, value: any = undefined): void {
    const payload = this.get(key) || {};
    _.set(payload, subKey, value);
    this.set(key, payload);
  }

  static get(key?: string, subKey?: any): any {
    // If no key provided, return all localStorage as an object
    if (!key) {
      const allData: { [key: string]: any } = {};
      for (let i = 0; i < localStorage.length; i++) {
        const storageKey = localStorage.key(i);
        if (storageKey) {
          allData[storageKey] = json(localStorage.getItem(storageKey));
        }
      }
      return allData;
    }
    
    const payload = json(localStorage.getItem(key));
    return !subKey ? payload : _.get(payload, subKey);
  }

  static del(key: string, subKey?: string): void {
    if (!subKey) return localStorage.removeItem(key);
    
    const payload = this.get(key) || {};
    _.unset(payload, subKey);
    this.set(key, payload);
  }

  static reset(): void {
    localStorage.clear();
  }

  static push(key: string, value: any): boolean {
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

  static count(key: string, subKey?: any): number {
    let data = this.get(key, subKey);
    const length = data?.length;
    data = undefined;
    return length ? length : 0;
  }

  static countWhere<T>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): number {
    const allRecords = this.get(key, subKey);

    if (!allRecords) return 0;
    if (typeof filter === 'function') {
      return filter(allRecords).length;
    }
    return _.filter(allRecords, filter).length;
  }

  static getWhere<T>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): T[] {
    const allRecords = this.get(key, subKey);
    return typeof filter === 'function'
      ? filter(allRecords)
      : _.filter(allRecords, filter);
  }

  static delWhere<T>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): boolean {
    const allRecords = this.get(key, subKey);

    if (!allRecords) return false;

    const filteredRecords =
      typeof filter === 'function'
        ? filter(allRecords)
        : _.filter(allRecords, filter);

    _.pullAll(allRecords, filteredRecords);

    if (subKey) {
      this.update(key, subKey, allRecords);
    } else {
      this.set(key, allRecords);
    }
    return true;
  }

  // Instance methods that delegate to static methods for consistent API
  set(key: string, value: any): void {
    return AppStorage.set(key, value);
  }

  get(key?: string, subKey?: string): any {
    return AppStorage.get(key, subKey);
  }

  update(key: string, subKey: string, value: any): void {
    return AppStorage.update(key, subKey, value);
  }

  del(key: string, subKey?: string): void {
    return AppStorage.del(key, subKey);
  }

  reset(): void {
    return AppStorage.reset();
  }

  count(key: string, subKey?: any): number {
    return AppStorage.count(key, subKey);
  }

  push(key: string, value: any): boolean {
    return AppStorage.push(key, value);
  }

  getWhere<T>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): T[] {
    return AppStorage.getWhere<T>(key, filter, subKey);
  }

  countWhere<T>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): number {
    return AppStorage.countWhere<T>(key, filter, subKey);
  }

  delWhere<T>(
    key: string,
    filter: TDataFilterInvokable<T> | TDataFilterMap,
    subKey?: string
  ): boolean {
    return AppStorage.delWhere<T>(key, filter, subKey);
  }
}

export default AppStorage;
export type { IAppStorage, TDataFilterMap };
