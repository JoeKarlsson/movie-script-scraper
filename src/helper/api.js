require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const handleError = require('./handleError');

const api = url => {
	return fetch(url)
		.then(response => {
			console.log(response);
			return response.text();
		})
		.catch(err => {
			return handleError(err);
		});
};

module.exports = api;
