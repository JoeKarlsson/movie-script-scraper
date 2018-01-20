const util = require('util');
const fs = require('fs');

const stat = util.promisify(fs.stat);
const mkdirp = require('mkdirp');

const checkDirectory = genre => {
	// Create directory if it doesn't exist
	return stat(`scripts/${genre}/`)
		.then(() => {
			return true;
		})
		.catch(() => {
			mkdirp(`scripts/${genre}/`, err => {
				if (err) return console.log(`Failed to make directory for ${genre}`);
				return true;
			});
		});
};

module.exports = checkDirectory;
