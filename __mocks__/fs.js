const fs = jest.genMockFromModule('fs');

const __writeFile = path => {
	return path;
};

fs.writeFile = __writeFile;

module.exports = fs;
