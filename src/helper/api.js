require('isomorphic-fetch');
const handleError = require('./handleError');

const api = url => {
	return fetch(url)
		.then(response => {
			return response.text();
		})
		.catch(err => {
			return handleError(err);
		});
};

module.exports = api;
