import _ from 'lodash';
import { json, str } from './helpers/parser';

type TDataFilterInvokable<T> = (dataArray: T[]) => T[];
type TDataFilterMap = { [x: string]: any };

interface IAppStorage {
  set(key: string, value: any): void;
  get(key: string, subKey?: string): any;
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
    localStorage.setItem(key, str(value));
  }

  static update(key: string, subKey: string, value: any = undefined): void {
    const payload = this.get(key) || {};
    _.set(payload, subKey, value);
    this.set(key, payload);
  }

  static get(key: string, subKey?: any): any {
    const payload = json(localStorage.getItem(key));
    return !subKey ? payload : _.get(payload, subKey);
  }

  static del(key: string, subKey?: string): void {
    if (!subKey) return localStorage.removeItem(key);
    return this.update(key, subKey);
  }

  static reset(): void {
    localStorage.clear();
  }

  static push(key: string, value: any): boolean {
    if (!value) return false;
    const storageValue = this.get(key);
    if (!Array.isArray(storageValue)) return false;
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

  set(key: string, value: any): void {
    return AppStorage.set(key, value);
  }

  get(key: string, subKey?: string | undefined) {
    return AppStorage.get(key, subKey);
  }

  update(key: string, subKey: string, value: any): void {
    return AppStorage.update(key, subKey, value);
  }

  del(key: string, subKey?: string | undefined): void {
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
    filter: TDataFilterMap | TDataFilterInvokable<T>,
    subKey?: string | undefined
  ): T[] {
    return AppStorage.getWhere<T>(key, filter, subKey);
  }

  countWhere<T>(
    key: string,
    filter: TDataFilterMap | TDataFilterInvokable<T>,
    subKey?: string | undefined
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
