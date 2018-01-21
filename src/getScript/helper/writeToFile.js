const fs = require('fs');
const util = require('util');
const handleError = require('../../helper/handleError');

const writeFile = util.promisify(fs.writeFile);

const writeToFile = (path, script) => {
	return writeFile(path, script)
		.then(() => {
			return path;
		})
		.catch(err => {
			return handleError(err);
		});
};

module.exports = writeToFile;
