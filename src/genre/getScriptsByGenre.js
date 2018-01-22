const _ = require('lodash');
const string = require('string');
const { checkDirectory, removeExtraScripts } = require('./helper/fileSystem');
const handleURLs = require('./helper/handleURLs');
const api = require('../helper/api');
const getScript = require('../getScript/getScript');
const randomIntFromInterval = require('../helper/randomIntFromInterval');
const cleanArr = require('../helper/cleanArr');
const isValidGenre = require('../helper/isValidGenre');
const handleError = require('../helper/handleError');

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
		return data;
	});
};

const getScriptsByGenre = async options => {
	const { genre } = options;

	if (isValidGenre(genre)) {
		try {
			const url = `http://www.imsdb.com/feeds/genre.php?genre=${genre}`;
			const rawURLs = await api(url);
			const urls = handleURLs(rawURLs);
			const filePaths = await addScriptsToDir(urls, options);
			const cleanFilePaths = cleanArr(filePaths);
			const prunedFilePaths = await removeExtraScripts(
				cleanFilePaths,
				options.total
			);
			return prunedFilePaths;
		} catch (err) {
			return handleError(err);
		}
	}
	handleError('Invalid Genre');
};

module.exports = getScriptsByGenre;
