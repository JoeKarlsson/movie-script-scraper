const writeToFile = () => {
	return new Promise(resolve => {
		const filePath = 'scripts/frozen.txt';
		resolve(filePath);
	});
};

module.exports = writeToFile;
