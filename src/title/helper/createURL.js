const createURL = title => {
	// Convert title to URL-friendly format with title case
	const urlTitle = title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-|-$/g, '') // Remove leading/trailing hyphens
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Title case each word
		.join('-');

	return `http://www.imsdb.com/scripts/${urlTitle}.html`;
};

module.exports = createURL;
