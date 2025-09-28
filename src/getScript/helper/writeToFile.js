const fs = require('fs');
const path = require('path');
const util = require('util');
const handleError = require('../../helper/handleError');

const writeFileAsync = util.promisify(fs.writeFile);
const access = util.promisify(fs.access);
const mkdir = util.promisify(fs.mkdir);

/**
 * Ensures directory exists, creating it if necessary
 * @param {string} dirPath - Directory path to ensure exists
 * @returns {Promise<void>}
 */
const ensureDirectoryExists = async (dirPath) => {
	try {
		await access(dirPath, fs.constants.F_OK);
	} catch (error) {
		// Directory doesn't exist, create it
		await mkdir(dirPath, { recursive: true });
	}
};

/**
 * Writes script content to file with optimized error handling
 * @param {string} filePath - Path where to write the file
 * @param {string} script - Script content to write
 * @param {string} title - Script title for error context
 * @returns {Promise<string>} The file path if successful
 */
const writeToFile = async (filePath, script, title = 'script') => {
	try {
		// Ensure directory exists
		const dirPath = path.dirname(filePath);
		await ensureDirectoryExists(dirPath);

		// Write file with proper encoding
		await writeFileAsync(filePath, script, 'utf8');

		console.log(`✓ Downloaded: ${title}`);
		return filePath;
	} catch (err) {
		console.error(`✗ Failed to write ${title} to ${filePath}:`, err.message);
		return handleError(err);
	}
};

module.exports = writeToFile;
