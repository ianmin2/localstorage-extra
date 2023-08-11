"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = exports.json = exports.str = void 0;
/**
 * Conditionally transforms input into a string format.
 *
 * @param {any} input - The input to be transformed.
 * @returns {string} The transformed string or the original input if stringification fails.
 */
const str = (input) => {
    try {
        return typeof input === 'string' ? input : JSON.stringify(input);
    }
    catch (error) {
        return String(input);
    }
};
exports.str = str;
/**
 * Conditionally transforms input into JSON format.
 *
 * @param {any} input - The input to be transformed.
 * @returns {any} The transformed input or the original input if parsing fails.
 */
const json = (input) => {
    try {
        return typeof input === 'string' ? JSON.parse(input) : input;
    }
    catch (error) {
        return input;
    }
};
exports.json = json;
/**
 * Creates a deep clone of an object.
 *
 * @param {any} obj - The object to be cloned.
 * @returns {any} The cloned object.
 */
const clone = (obj) => {
    try {
        return JSON.parse(JSON.stringify(obj));
    }
    catch (error) {
        throw new Error('Clone failed: ' + error.message);
    }
};
exports.clone = clone;
