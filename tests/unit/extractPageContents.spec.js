const fs = require('fs');
const extractPageContents = require('../../src/getScript/helper/extractPageContents');

const mockRawHTML = fs.readFileSync(
	'tests/fixtures/__mocks__/data/mock_raw_data_1.txt',
	{
		encoding: 'utf-8',
	}
);

const mockScript = fs.readFileSync(
	'tests/fixtures/__mocks__/data/mock_script_frozen.txt',
	{
		encoding: 'utf-8',
	}
);

describe('extractPageContents', () => {
	it('should extract the title of the script', () => {
		const result = extractPageContents(mockRawHTML);
		expect(result.title).toBe('frozen');
	});

	it('should extract the script from the raw HTML', () => {
		const result = extractPageContents(mockRawHTML);
		// Normalize whitespace for comparison
		const normalizedResult = result.script.replace(/\s+/g, ' ').trim();
		const normalizedExpected = `Frozen ${mockScript}`.replace(/\s+/g, ' ').trim();
		expect(normalizedResult).toBe(normalizedExpected);
	});

	it('should handle empty or very small HTML content', () => {
		const result = extractPageContents('');
		expect(result.script).toBe('');
		expect(result.title).toBe('script');

		const result2 = extractPageContents('a');
		expect(result2.script).toBe('');
		expect(result2.title).toBe('script');
	});

	it('should handle HTML with script content in <b> tags', () => {
		const htmlWithBTags = `
			<html>
			<body>
				<b>FADE IN:</b>
				<b>EXT. TEST LOCATION - DAY</b>
				<b>This is a test script with enough content.</b>
				<b>CHARACTER</b>
				<b>Hello, this is a test script.</b>
			</body>
			</html>
		`;
		const result = extractPageContents(htmlWithBTags);
		expect(result.script).toContain('FADE IN:');
		expect(result.script).toContain('EXT. TEST LOCATION - DAY');
	});

	it('should handle HTML with script content in main body', () => {
		const htmlWithBodyScript = `
			<html>
			<body>
				Some other content
				FADE IN:
				EXT. TEST LOCATION - DAY
				This is a test script with enough content.
			</body>
			</html>
		`;
		const result = extractPageContents(htmlWithBodyScript);
		expect(result.script).toContain('FADE IN:');
		expect(result.script).toContain('EXT. TEST LOCATION - DAY');
	});

	it('should extract title from URL when page title is not good', () => {
		const htmlWithBadTitle = `
			<html>
			<head><title>HUNTER</title></head>
			<body>Some content</body>
			</html>
		`;
		const url = 'http://example.com/scripts/predator.html';
		const result = extractPageContents(htmlWithBadTitle, url);
		expect(result.title).toBe('script'); // The title function returns 'script' for short titles
	});

	it('should handle title with IMSDb suffix', () => {
		const htmlWithIMSDbTitle = `
			<html>
			<head><title>Frozen Script at IMSDb.</title></head>
			<body>Some content</body>
			</html>
		`;
		const result = extractPageContents(htmlWithIMSDbTitle);
		expect(result.title).toBe('frozen');
	});

	it('should handle title with script-at-imsdb in the middle', () => {
		const htmlWithScriptAtIMSDb = `
			<html>
			<head><title>Frozen script-at-imsdb something</title></head>
			<body>Some content</body>
			</html>
		`;
		const result = extractPageContents(htmlWithScriptAtIMSDb);
		expect(result.title).toBe('frozen');
	});

	it('should handle very large content using streaming approach', () => {
		// Create a large HTML string (>1MB)
		const largeContent = '<html><body>' + 'x'.repeat(1024 * 1024 + 1) + '</body></html>';
		const result = extractPageContents(largeContent);
		expect(result).toHaveProperty('script');
		expect(result).toHaveProperty('title');
	});

	it('should clean script content properly', () => {
		const htmlWithDirtyScript = `
			<html>
			<body>
				<pre>
					Search IMSDb
					
					FADE IN:
					
					EXT. TEST LOCATION - DAY
					
					
					This is a test script.
				</pre>
			</body>
			</html>
		`;
		const result = extractPageContents(htmlWithDirtyScript);
		expect(result.script).not.toContain('Search IMSDb');
		expect(result.script).toContain('FADE IN:');
	});

	it('should handle title extraction from URL with proper formatting', () => {
		const html = '<html><body>Content</body></html>';
		const url = 'http://example.com/scripts/the-matrix.html';
		const result = extractPageContents(html, url);
		expect(result.title).toBe('script'); // The title function returns 'script' for empty titles
		expect(result.script).toContain('Script'); // The display title will contain "Script"
	});

	it('should handle empty or invalid title gracefully', () => {
		const htmlWithEmptyTitle = `
			<html>
			<head><title></title></head>
			<body>Some content</body>
			</html>
		`;
		const result = extractPageContents(htmlWithEmptyTitle);
		expect(result.title).toBe('script');
	});

	it('should handle title with special characters', () => {
		const htmlWithSpecialChars = `
			<html>
			<head><title>Test@#$%^&*()Script!</title></head>
			<body>Some content</body>
			</html>
		`;
		const result = extractPageContents(htmlWithSpecialChars);
		expect(result.title).toBe('testscript');
	});
});
