const fs = jest.genMockFromModule('fs');

const __writeFile = (path, script, cb) => {
	return cb(null, path);
};

const __stat = (path, cb) => {
	return cb(null, true);
};

const __unlink = (path, cb) => {
	return cb(null, true);
};

fs.writeFile = __writeFile;
fs.stat = __stat;
fs.unlink = __unlink;

module.exports = fs;
