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
