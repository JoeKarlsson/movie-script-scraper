const _ = require('lodash');
const string = require('string');
const api = require('./helper/api');
const getScript = require('./getScript');
const checkDirectory = require('./helper/checkDirectory');
const isValidGenre = require('./helper/isValidGenre');
const handleError = require('./helper/handleError');

const randomNum = () => {
	return Math.floor(Math.random() * 100 + 1);
};

const removeInvalidURLs = urls => {
	return _.remove(urls, url => {
		return string(url).contains('.html');
	});
};

const shouldRandomlySave = () => {
	const totalRandomNumber = randomNum();
	return totalRandomNumber % 3 !== 0;
};

const addScriptsToDir = async (urls, genre, total, dest) => {
	let totalCounter = 0;

	const cleaned = removeInvalidURLs(urls);
	await checkDirectory(dest, genre);

	// Loop through script URLs
	const promiseArr = await cleaned.map(async url => {
		if (totalCounter === total) return;

		// Randomly choosing if script shall be saved
		if (total !== 0) {
			if (shouldRandomlySave()) return; // Don't save
			++totalCounter;
		}

		const options = {
			url,
			dest,
			genre,
		};

		const filePath = await getScript(options);
		return filePath;
	});

	return Promise.all(promiseArr).then(data => {
		return data;
	});
};

const handleURLs = html => {
	// RegEx URLs
	const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi; // eslint-disable-line no-useless-escape
	const urls = html.match(pattern) || [];

	// Validate
	if (urls.length === 0) {
		return null;
	}

	return urls;
};

const getScriptsByGenre = async (genre, total, dest) => {
	if (isValidGenre(genre)) {
		try {
			const url = `http://www.imsdb.com/feeds/genre.php?genre=${genre}`;
			const rawURLs = await api(url);
			const urls = handleURLs(rawURLs);
			const filePaths = await addScriptsToDir(urls, genre, total, dest);
			return filePaths;
		} catch (err) {
			return handleError(err);
		}
	}
	handleError('Invalid Genre');
};

module.exports = getScriptsByGenre;
