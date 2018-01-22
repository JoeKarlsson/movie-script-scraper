const getScript = () => {
	return new Promise(resolve => {
		const filePath = 'scripts/hellboy.txt';
		resolve(filePath);
	});
};

module.exports = getScript;
