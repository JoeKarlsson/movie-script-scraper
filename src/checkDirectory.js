const util = require('util');
const fs = require('fs');

const stat = util.promisify(fs.stat);
const mkdirp = require('mkdirp');

const checkDirectory = (genre, callback) => {
	// Create directory if it doesn't exist
	stat(`scripts/${genre}/`)
		.then(() => {
			// Execute callback
			callback();
		})
		.catch(() => {
			mkdirp(`scripts/${genre}/`, err => {
				if (err) return console.log(`Failed to make directory for ${genre}`);
				// Execute callback
				callback();
			});
		});
};

module.exports = checkDirectory;
