require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const handleError = require('./helper/handleError');

const getURLs = url => {
	return fetch(url)
		.then(response => {
			if (response.status >= 400) {
				handleError('Bad response from server');
			}
			return response.text();
		})
		.catch(err => {
			return handleError(err);
		});
};

module.exports = getURLs;
