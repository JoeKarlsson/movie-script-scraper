const fs = require('fs');
const util = require('util');
const handleError = require('.//handleError');

const writeFile = util.promisify(fs.writeFile);

const writeToFile = (path, script, title) => {
	return writeFile(path, script)
		.then(() => {
			console.log(`Saved ${title}`);
			return path;
		})
		.catch(err => {
			return handleError(err);
		});
};

module.exports = writeToFile;
