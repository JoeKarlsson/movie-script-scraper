const cheerio = require('cheerio');

const title = page => {
	let titleText = page('title').text();

	// Remove ' Script at IMSDb.' suffix
	if (titleText.endsWith(' Script at IMSDb.')) {
		titleText = titleText.slice(0, -' Script at IMSDb.'.length);
	}

	// If title is empty or just "HUNTER", try to get it from the URL or other sources
	if (!titleText || titleText.length < 3) {
		// Try to extract from the page content or use a fallback
		titleText = 'script';
	}

	// Convert to slug format
	let title = titleText
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

	const idx = title.indexOf('script-at-imsdb');
	if (idx > 0) {
		title = title.substring(0, idx - 1);
	}

	// Ensure we have a valid title
	if (!title || title.length < 2) {
		title = 'script';
	}

	return title;
};

const extractPageContents = (html, url) => {
	const $ = cheerio.load(html);

	// Look for script content in <pre> tags first (most scripts are in pre tags)
	let script = '';
	const preContent = $('pre').text();
	if (preContent && preContent.length > 100) {
		script = preContent;
		// Clean up HTML tags that might be in the pre content
		script = script.replace(/<[^>]*>/g, '');
	} else {
		// Fallback: Look for script content in <b> tags
		$('b').each((i, elem) => {
			const text = $(elem).text().trim();
			// Look for script content patterns
			if (text.match(/^(FADE IN|INT\.|EXT\.|\d+\s+INT\.|\d+\s+EXT\.|\d+\s+[A-Z])/)) {
				script += `${text}\n`;
			}
		});

		// If still no script found, try looking for other patterns
		if (script.length < 100) {
			// Look for script content in the main content area
			const mainContent = $('body').text();
			const scriptMatch = mainContent.match(/(FADE IN[\s\S]*?)(?:<|$)/i);
			if (scriptMatch) {
				[, script] = scriptMatch;
			}
		}
	}

	// Clean up the script content
	script = script.replace('Search IMSDb', '');
	script = script.replace(/^\s+|\s+$/g, ''); // Trim whitespace

	// Clean up extra whitespace and formatting
	script = script
		.replace(/\r\n/g, '\n') // Normalize line endings
		.replace(/\n\s*\n\s*\n/g, '\n\n') // Replace multiple blank lines with double newlines
		.replace(/[ \t]+$/gm, '') // Remove trailing spaces from each line
		.replace(/^[ \t]+/gm, '') // Remove leading spaces from each line
		.replace(/\n{3,}/g, '\n\n') // Replace 3+ consecutive newlines with double newlines
		.trim();

	// Try to get title from URL if page title is not good
	let cleanTitle = title($);
	if (cleanTitle === 'script' && url) {
		// Extract title from URL like /scripts/Predator.html
		const urlMatch = url.match(/\/scripts\/([^/]+)\.html$/);
		if (urlMatch) {
			cleanTitle = urlMatch[1].toLowerCase().replace(/-/g, '-');
		}
	}

	// Convert title to proper case for display
	const displayTitle = cleanTitle
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	// Add script name as first line
	const finalScript = `${displayTitle}\n\n${script}`;

	return {
		script: finalScript,
		title: cleanTitle,
	};
};

module.exports = extractPageContents;
