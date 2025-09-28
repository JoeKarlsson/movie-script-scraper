const writeToFile = jest.fn((path, script) => {
	return Promise.resolve(path);
});

module.exports = writeToFile;
