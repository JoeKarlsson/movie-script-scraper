const util = require('util');
const fs = require('fs');
const mkdirp = require('mkdirp');
const handleError = require('./handleError');

const stat = util.promisify(fs.stat);

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

module.exports = checkDirectory;
