const isValid = urls => {
	return !urls || urls.length === 0;
};

const handleURLs = html => {
	// Extract script URLs from the new HTML structure
	// Look for href="/Movie Scripts/[Script Name] Script.html" pattern
	const scriptPattern = /href="(\/Movie Scripts\/[^"]+Script\.html)"/gi;
	const matches = html.match(scriptPattern) || [];

	// Extract the actual URLs from the matches and convert to script URLs
	const urls = matches.map(match => {
		const urlMatch = match.match(/href="([^"]+)"/);
		if (urlMatch) {
			// Convert "/Movie Scripts/Die Hard Script.html" to "/scripts/Die-Hard.html"
			const movieScriptPath = urlMatch[1];
			const scriptName = movieScriptPath
				.replace('/Movie Scripts/', '')
				.replace(' Script.html', '')
				.replace(/\s+/g, '-')
				.replace(/[^a-zA-Z0-9-]/g, '');

			return `https://imsdb.com/scripts/${scriptName}.html`;
		}
		return null;
	}).filter(url => url !== null);

	if (isValid(urls)) return null;

	return urls;
};

module.exports = handleURLs;
