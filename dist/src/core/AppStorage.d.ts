type TDataFilterInvokable<T> = (dataArray: T[]) => T[];
type TDataFilterMap = {
    [x: string]: any;
};
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
}
declare class AppStorage implements IAppStorage {
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
}
export default AppStorage;
export type { IAppStorage, TDataFilterMap };
