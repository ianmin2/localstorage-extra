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
