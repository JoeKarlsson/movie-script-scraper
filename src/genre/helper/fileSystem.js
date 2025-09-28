const util = require('util');
const fs = require('fs');
const { mkdirp } = require('mkdirp');
const randomIntFromInterval = require('../../helper/randomIntFromInterval');
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
