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

const addScriptsToDir = (urls, genre, total) => {
	const cleaned = removeInvalidURLs(urls);

	// Create directory if doesn't exist
	return checkDirectory(genre).then(() => {
		// Loop through script URLs
		cleaned.forEach(url => {
			let totalCounter = 0;

			// Randomly choosing if script shall be saved
			if (total !== 0) {
				if (totalCounter === total) return;
				const totalRandomNumber = randomNum();
				if (totalRandomNumber % 3 !== 0) return; // Don't save
			}
			getScript(url, genre, total);

			// Increment total counter
			if (total !== 0) ++totalCounter;
		});
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

const getScriptsByGenre = async (genre = 'Action', total = 10) => {
	if (isValidGenre(genre)) {
		try {
			const url = `http://www.imsdb.com/feeds/genre.php?genre=${genre}`;
			const rawURLs = await api(url);
			const urls = handleURLs(rawURLs);
			return addScriptsToDir(urls, genre, total);
		} catch (err) {
			return handleError(err);
		}
	}
	handleError('Invalid Genre');
};

module.exports = getScriptsByGenre;
