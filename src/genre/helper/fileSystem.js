const util = require('util');
const fs = require('fs');
const mkdirp = require('mkdirp');
const randomIntFromInterval = require('../../helper/randomIntFromInterval');
const handleError = require('../../helper/handleError');

const stat = util.promisify(fs.stat);
const unlink = util.promisify(fs.unlink);

const checkDirectory = (dest, genre) => {
	// Create directory if it doesn't exist
	return stat(`${dest}/${genre}/`)
		.then(() => {
			return true;
		})
		.catch(() => {
			return mkdirp(`${dest}/${genre}/`, err => {
				if (err) {
					return handleError(`Failed to make directory for ${genre}`);
				}
				return true;
			});
		});
};

const removeExtraScripts = (filePaths, total) => {
	const promise = new Promise((resolve, reject) => {
		const numToRemove = filePaths.length - total;

		for (let i = 0; i < numToRemove; i++) {
			const randScriptIndx = randomIntFromInterval(0, filePaths.length - 1);
			const filePath = filePaths[randScriptIndx];
			filePaths.splice(randScriptIndx, 1);
			unlink(filePath).catch(() => {
				reject(new Error(`Failed to remove script at ${filePath}`));
			});
		}
		resolve(filePaths);
	});
	return promise;
};

module.exports = { checkDirectory, removeExtraScripts };
