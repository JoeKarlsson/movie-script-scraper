const _ = require('lodash');
const string = require('string');
const api = require('./api');
const getScript = require('./getScript');
const checkDirectory = require('./checkDirectory');
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

// const randomlyRetreiveScript = async (url, genre, total) => {
// 	let totalCounter = 0;
//
// 	// Randomly choosing if script shall be saved
// 	if (total !== 0) {
// 		if (totalCounter === total) return;
// 		const totalRandomNumber = randomNum();
// 		if (totalRandomNumber % 3 !== 0) return; // Don't save
// 	}
//
// 	const filePath = await getScript(url, genre, total);
// 	console.log('filePath', filePath);
//
// 	// Increment total counter
// 	if (total !== 0) ++totalCounter;
//
// 	return filePath;
// };

const addScriptsToDir = async (urls, genre, total, dest) => {
	let totalCounter = 0;

	const cleaned = removeInvalidURLs(urls);
	await checkDirectory(dest, genre);

	// Loop through script URLs
	const promiseArr = await cleaned.map(async url => {
		// Randomly choosing if script shall be saved
		if (total !== 0) {
			if (totalCounter === total) return;
			const totalRandomNumber = randomNum();
			if (totalRandomNumber % 3 !== 0) return; // Don't save
		}

		// Increment total counter
		if (total !== 0) {
			++totalCounter;
		}

		const filePath = await getScript(url, dest, genre);

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
