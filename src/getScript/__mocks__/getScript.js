const getScript = () => {
	return new Promise(resolve => {
		const filePath = 'scripts/frozen.txt';
		resolve(filePath);
	});
};

module.exports = getScript;
