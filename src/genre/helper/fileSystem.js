const util = require('util');
const fs = require('fs');
const { mkdirp } = require('mkdirp');
// const randomIntFromInterval = require('../../helper/randomIntFromInterval');
const handleError = require('../../helper/handleError');

const stat = util.promisify(fs.stat);
const unlink = util.promisify(fs.unlink);

const checkDirectory = async (dest, genre) => {
	// Create directory if it doesn't exist
	try {
		await stat(`${dest}/${genre}/`);
		return true;
	} catch (error) {
		try {
			await mkdirp(`${dest}/${genre}/`);
			return true;
		} catch (err) {
			handleError(`Failed to make directory for ${genre}`);
			return false;
		}
	}
};

/**
 * Removes extra scripts to match the requested total
 * Now optimized to work with pre-selected scripts
 * @param {Array} filePaths - Array of file paths
 * @param {number} total - Desired total number of scripts
 * @returns {Promise<Array>} Array of file paths trimmed to total
 */
const removeExtraScripts = async (filePaths, total) => {
	// Since we now pre-select scripts, we should rarely need to remove any
	// But keep this function for backward compatibility and edge cases
	if (filePaths.length <= total) {
		return filePaths;
	}

	// Remove excess scripts from the end (most recently added)
	const scriptsToRemove = filePaths.slice(total);
	const remainingScripts = filePaths.slice(0, total);

	// Remove excess files asynchronously
	const removePromises = scriptsToRemove.map(filePath =>
		unlink(filePath).catch(error =>
			console.warn(`Failed to remove excess script ${filePath}:`, error.message)));

	await Promise.all(removePromises);
	return remainingScripts;
};

module.exports = { checkDirectory, removeExtraScripts };
