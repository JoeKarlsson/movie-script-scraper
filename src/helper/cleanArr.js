/**
 * Array Cleaner Utility
 * 
 * This module provides a utility function to clean arrays by removing falsy values.
 * It's used to remove null, undefined, empty strings, and other falsy values from arrays.
 */

/**
 * Removes all falsy values from an array
 * 
 * @function cleanArr
 * @param {Array} arr - The array to clean
 * @returns {Array} A new array with all falsy values removed
 * 
 * Falsy values removed:
 * - false
 * - 0
 * - -0
 * - 0n
 * - ""
 * - null
 * - undefined
 * - NaN
 * 
 * @example
 * const dirtyArray = [1, null, 'hello', undefined, 0, '', false, 42];
 * const cleanArray = cleanArr(dirtyArray);
 * console.log(cleanArray); // [1, 'hello', 42]
 */
const cleanArr = arr => {
	// Handle null, undefined, or non-array inputs
	if (!arr || !Array.isArray(arr)) {
		return [];
	}
	
	// Use Array.filter with Boolean constructor to remove all falsy values
	// Boolean constructor acts as a truthy filter function
	return arr.filter(Boolean);
};

module.exports = cleanArr;
