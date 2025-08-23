/**
 * Conditionally transforms input into a string format.
 *
 * @param {any} input - The input to be transformed.
 * @returns {string} The transformed string or the original input if stringification fails.
 */
export declare const str: (input: any) => string;
/**
 * Conditionally transforms input into JSON format.
 *
 * @param {any} input - The input to be transformed.
 * @returns {any} The transformed input or the original input if parsing fails.
 */
export declare const json: (input: any) => any;
/**
 * Creates a deep clone of an object.
 *
 * @param {any} obj - The object to be cloned.
 * @returns {any} The cloned object.
 */
export declare const clone: (obj: any) => any;
/**
 * Validates that a key is a non-empty string.
 *
 * @param {any} key - The key to validate
 * @param {string} methodName - The method name for error context
 * @throws {Error} If key is invalid
 */
export declare const validateKey: (key: any, methodName: string) => void;
/**
 * Validates that a subkey is a valid string.
 *
 * @param {any} subKey - The subkey to validate
 * @param {string} methodName - The method name for error context
 * @throws {Error} If subkey is invalid
 */
export declare const validateSubKey: (subKey: any, methodName: string) => void;
/**
 * Sets a nested property in an object using dot notation.
 * Native replacement for lodash _.set()
 *
 * @param {any} obj - The object to modify
 * @param {string} path - The property path (e.g., 'user.name' or 'items[0].title')
 * @param {any} value - The value to set
 */
export declare const setNested: (obj: any, path: string, value: any) => void;
/**
 * Gets a nested property from an object using dot notation.
 * Native replacement for lodash _.get()
 *
 * @param {any} obj - The object to query
 * @param {string} path - The property path
 * @returns {any} The value at path or undefined
 */
export declare const getNested: (obj: any, path: string) => any;
/**
 * Removes a nested property from an object using dot notation.
 * Native replacement for lodash _.unset()
 *
 * @param {any} obj - The object to modify
 * @param {string} path - The property path to remove
 * @returns {boolean} True if the property was removed
 */
export declare const unsetNested: (obj: any, path: string) => boolean;
/**
 * Removes all specified values from an array.
 * Native replacement for lodash _.pullAll()
 *
 * @param {any[]} array - The array to modify
 * @param {any[]} values - The values to remove
 */
export declare const pullAll: (array: any[], values: any[]) => void;
