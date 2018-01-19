require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

const getURLs = url => {
	return fetch(url)
		.then(response => {
			if (response.status >= 400) {
				throw new Error('Bad response from server');
			}
			return response.text();
		})
		.catch(err => {
			console.error(err);
			throw new Error(err, 'Bad response from server');
		});
};

module.exports = getURLs;
