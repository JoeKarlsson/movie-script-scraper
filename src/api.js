require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const handleError = require('./helper/handleError');

const getURLs = url => {
	return fetch(url)
		.then(response => {
			return response.text();
		})
		.catch(err => {
			return handleError(err);
		});
};

module.exports = getURLs;
