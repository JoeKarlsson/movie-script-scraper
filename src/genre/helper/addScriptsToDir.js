const _ = require('lodash');
const { checkDirectory } = require('./fileSystem');
const getScript = require('../../getScript/getScript');
const cleanArr = require('../../helper/cleanArr');
const handleError = require('../../helper/handleError');

const removeInvalidURLs = urls => {
	return _.remove(urls, url => {
		// Remove URLs that don't contain .html (invalid) or are not script URLs
		return !url.includes('.html') || !url.includes('Script.html');
	});
};

/**
 * Process scripts in parallel with concurrency control
 * @param {Array} urls - Array of script URLs to process
 * @param {Object} options - Configuration options
 * @param {number} concurrency - Maximum number of concurrent downloads (default: 5)
 * @returns {Promise<Array>} Array of file paths
 */
const processScriptsInParallel = async (urls, options, concurrency = 5) => {
	const results = [];
	const queue = [...urls];
	let active = 0;
	let completed = 0;

	// Handle empty queue case
	if (queue.length === 0) {
		return cleanArr(results);
	}

	return new Promise((resolve) => {
		const processNext = async () => {
			// Check if we're done
			if (completed >= urls.length) {
				resolve(cleanArr(results));
				return;
			}

			// Don't start new downloads if we're at concurrency limit or no more URLs
			if (active >= concurrency || queue.length === 0) {
				return;
			}

			const url = queue.shift();
			active++;

			try {
				const filePath = await getScript(url, options);
				if (filePath) {
					results.push(filePath);
				}
			} catch (error) {
				console.warn(`Failed to download script from ${url}:`, error.message);
			} finally {
				active--;
				completed++;
				// Process next item in queue
				processNext();
			}
		};

		// Start initial batch of concurrent downloads
		for (let i = 0; i < Math.min(concurrency, queue.length); i++) {
			processNext();
		}
	});
};

const addScriptsToDir = async (urls, options) => {
	try {
		const { genre, dest, total } = options;

		const cleaned = removeInvalidURLs(urls);
		await checkDirectory(dest, genre);

		// Pre-select the exact number of scripts needed instead of random selection
		const selectedUrls = cleaned.slice(0, total);

		// Process scripts in parallel with concurrency control
		const filePaths = await processScriptsInParallel(selectedUrls, options, 5);

		return filePaths;
	} catch (e) {
		handleError(e);
	}
};

module.exports = addScriptsToDir;
