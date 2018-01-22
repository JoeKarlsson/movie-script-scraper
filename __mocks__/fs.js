const fs = jest.genMockFromModule('fs');

const __writeFile = (path, script, cb) => {
	return cb(null, path);
};

fs.writeFile = __writeFile;

module.exports = fs;
