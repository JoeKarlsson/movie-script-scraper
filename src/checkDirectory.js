const util = require('util');
const fs = require('fs');
const mkdirp = require('mkdirp');
const handleError = require('./helper/handleError');

const stat = util.promisify(fs.stat);

const checkDirectory = genre => {
	// Create directory if it doesn't exist
	return stat(`scripts/${genre}/`)
		.then(() => {
			return true;
		})
		.catch(() => {
			return mkdirp(`scripts/${genre}/`, err => {
				if (err) {
					return handleError(`Failed to make directory for ${genre}`);
				}
				return true;
			});
		});
};

module.exports = checkDirectory;
