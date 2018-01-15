const _ = require('lodash');
const string = require('string');
const request = require('request');
const saveScript = require('./saveScript');
const checkDirectory = require('./checkDirectory');

const addScriptsToDir = (urls, genre, total) => {
	// Remove invalid script URLs
	const cleaned = _.remove(urls, url => {
		return string(url).contains('.html');
	});

	// Create directory if doesn't exist
	checkDirectory(genre, () => {
		// Loop through script URLs
		cleaned.forEach(url => {
			console.log(url);
			// Call for every script URL
			saveScript(url, genre, total);
		});
	});
};

const getURLs = (genre, total) => {
	// Get list of script URLs
	const url = `http://www.imsdb.com/feeds/genre.php?genre=${genre}`;

	request(url, { rejectUnauthorized: false }, (error, response, html) => {
		if (error || response.statusCode !== 200) {
			console.log(error);
			return;
		}

		// RegEx URLs
		const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi; // eslint-disable-line no-useless-escape
		const urls = html.match(pattern) || [];

		// Validate
		if (urls.length === 0) {
			return null;
		}
		addScriptsToDir(urls, genre, total);
	});
};

module.exports = getURLs;
