const _ = require('lodash');
const string = require('string');
const { checkDirectory } = require('../helper/fileSystem');
const getScript = require('../../getScript/getScript');
const cleanArr = require('../../helper/cleanArr');
const randomIntFromInterval = require('../../helper/randomIntFromInterval');

const removeInvalidURLs = urls => {
	return _.remove(urls, url => {
		return string(url).contains('.html');
	});
};

const shouldRandomlySave = () => {
	const totalRandomNumber = randomIntFromInterval(0, 1000);
	return totalRandomNumber % 17 === 0;
};

const addScriptsToDir = async (urls, options) => {
	const { genre, dest } = options;
	const total = options.total * 3;
	let totalCounter = 0;

	const cleaned = removeInvalidURLs(urls);
	await checkDirectory(dest, genre);
	console.log(cleaned);
	// Loop through script URLs
	const promiseArr = await cleaned.map(async url => {
		if (totalCounter === total) return;

		if (shouldRandomlySave()) {
			++totalCounter;

			const filePath = await getScript(url, options);

			return filePath;
		}
	});

	return Promise.all(promiseArr).then(data => {
		console.log(data);
		return cleanArr(data);
	});
};

module.exports = addScriptsToDir;
