const _ = require('lodash');
const string = require('string');
const shouldRandomlySave = require('./shouldRandomlySave');
const { checkDirectory } = require('../helper/fileSystem');
const getScript = require('../../getScript/getScript');
const cleanArr = require('../../helper/cleanArr');

const removeInvalidURLs = urls => {
	return _.remove(urls, url => {
		return string(url).contains('.html');
	});
};

const addScriptsToDir = async (urls, options) => {
	const { genre, dest } = options;
	const total = options.total * 3;
	let totalCounter = 0;

	const cleaned = removeInvalidURLs(urls);
	await checkDirectory(dest, genre);
	// Loop through script URLs
	const promiseArr = await cleaned.map(async url => {
		if (totalCounter === total) return;

		if (shouldRandomlySave()) {
			++totalCounter;
			console.log(url, 'url');
			const filePath = await getScript(url, options);
			console.log(filePath, 'filePath');

			return filePath;
		}
	});

	return Promise.all(promiseArr).then(data => {
		console.log(data);
		return cleanArr(data);
	});
};

module.exports = addScriptsToDir;
