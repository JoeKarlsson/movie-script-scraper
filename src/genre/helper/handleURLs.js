const isValid = urls => {
	return urls.length === 0;
};

const handleURLs = html => {
	// RegEx URLs
	const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi; // eslint-disable-line no-useless-escape
	const urls = html.match(pattern) || [];

	if (isValid(urls)) return null;

	return urls;
};

module.exports = handleURLs;
