const filePaths = [
	'scripts/hellboy.txt',
	'scripts/frozen.txt',
	'scripts/x-men.txt',
	'scripts/american-sniper.txt',
];

const checkDirectory = () => {
	return new Promise(resolve => {
		resolve(filePaths);
	});
};

const removeExtraScripts = () => {
	return new Promise(resolve => {
		resolve(filePaths);
	});
};

module.exports = {
	checkDirectory,
	removeExtraScripts,
};
