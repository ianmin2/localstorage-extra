type TDataFilterInvokable<T> = (dataArray: T[]) => T[];
type TDataFilterMap = {
    [x: string]: any;
};
interface IAppStorage {
    set(key: string, value: any): void;
    get(key: string, subKey?: string): any;
    update(key: string, subKey: string, value: any): void;
    del(key: string, subKey?: string): void;
    reset(): void;
    count(key: string, subKey?: any): number;
    push(key: string, value: any): boolean;
    getWhere<T>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): T[];
    countWhere<T>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): number;
    delWhere<T>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): boolean;
}
declare class AppStorage implements IAppStorage {
    static set(key: string, value?: any): void;
    static update(key: string, subKey: string, value?: any): void;
    static get(key: string, subKey?: any): any;
    static del(key: string, subKey?: string): void;
    static reset(): void;
    static push(key: string, value: any): boolean;
    static count(key: string, subKey?: any): number;
    static countWhere<T>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): number;
    static getWhere<T>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): T[];
    static delWhere<T>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): boolean;
    set(key: string, value: any): void;
    get(key: string, subKey?: string | undefined): any;
    update(key: string, subKey: string, value: any): void;
    del(key: string, subKey?: string | undefined): void;
    reset(): void;
    count(key: string, subKey?: any): number;
    push(key: string, value: any): boolean;
    getWhere<T>(key: string, filter: TDataFilterMap | TDataFilterInvokable<T>, subKey?: string | undefined): T[];
    countWhere<T>(key: string, filter: TDataFilterMap | TDataFilterInvokable<T>, subKey?: string | undefined): number;
    delWhere<T>(key: string, filter: TDataFilterInvokable<T> | TDataFilterMap, subKey?: string): boolean;
}
export default AppStorage;
export type { IAppStorage, TDataFilterMap };
