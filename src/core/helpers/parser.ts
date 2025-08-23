/**
 * Conditionally transforms input into a string format.
 *
 * @param {any} input - The input to be transformed.
 * @returns {string} The transformed string or the original input if stringification fails.
 */
export const str = (input: any): string => {
  try {
    return typeof input === 'string' ? input : JSON.stringify(input);
  } catch (error) {
    return String(input);
  }
};

/**
 * Conditionally transforms input into JSON format.
 *
 * @param {any} input - The input to be transformed.
 * @returns {any} The transformed input or the original input if parsing fails.
 */
export const json = (input: any): any => {
  try {
    return typeof input === 'string' ? JSON.parse(input) : input;
  } catch (error) {
    return input;
  }
};

/**
 * Creates a deep clone of an object.
 *
 * @param {any} obj - The object to be cloned.
 * @returns {any} The cloned object.
 */
export const clone = (obj: any): any => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error: any) {
    throw new Error('Clone failed: ' + error.message);
  }
};

/**
 * Validates that a key is a non-empty string.
 * 
 * @param {any} key - The key to validate
 * @param {string} methodName - The method name for error context
 * @throws {Error} If key is invalid
 */
export const validateKey = (key: any, methodName: string): void => {
  if (key === null || key === undefined) {
    throw new Error(`${methodName}: Key cannot be null or undefined`);
  }
  if (typeof key !== 'string') {
    throw new Error(`${methodName}: Key must be a string, received ${typeof key}`);
  }
  if (key.trim() === '') {
    throw new Error(`${methodName}: Key cannot be an empty string`);
  }
};

/**
 * Validates that a subkey is a valid string.
 * 
 * @param {any} subKey - The subkey to validate
 * @param {string} methodName - The method name for error context
 * @throws {Error} If subkey is invalid
 */
export const validateSubKey = (subKey: any, methodName: string): void => {
  if (subKey !== undefined && subKey !== null && typeof subKey !== 'string') {
    throw new Error(`${methodName}: SubKey must be a string, received ${typeof subKey}`);
  }
  if (typeof subKey === 'string' && subKey.trim() === '') {
    throw new Error(`${methodName}: SubKey cannot be an empty string`);
  }
};

/**
 * Sets a nested property in an object using dot notation.
 * Native replacement for lodash _.set()
 * 
 * @param {any} obj - The object to modify
 * @param {string} path - The property path (e.g., 'user.name' or 'items[0].title')
 * @param {any} value - The value to set
 */
export const setNested = (obj: any, path: string, value: any): void => {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
};

/**
 * Gets a nested property from an object using dot notation.
 * Native replacement for lodash _.get()
 * 
 * @param {any} obj - The object to query
 * @param {string} path - The property path
 * @returns {any} The value at path or undefined
 */
export const getNested = (obj: any, path: string): any => {
  if (!obj || !path) return undefined;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[key];
  }
  
  return current;
};

/**
 * Removes a nested property from an object using dot notation.
 * Native replacement for lodash _.unset()
 * 
 * @param {any} obj - The object to modify
 * @param {string} path - The property path to remove
 * @returns {boolean} True if the property was removed
 */
export const unsetNested = (obj: any, path: string): boolean => {
  if (!obj || !path) return false;
  
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined || current[key] === null) {
      return false;
    }
    current = current[key];
  }
  
  const lastKey = keys[keys.length - 1];
  if (lastKey in current) {
    delete current[lastKey];
    return true;
  }
  
  return false;
};

/**
 * Removes all specified values from an array.
 * Native replacement for lodash _.pullAll()
 * 
 * @param {any[]} array - The array to modify
 * @param {any[]} values - The values to remove
 */
export const pullAll = (array: any[], values: any[]): void => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (values.includes(array[i])) {
      array.splice(i, 1);
    }
  }
};
