const extractPageContents = jest.fn((html) => {
    // Return mock data based on the test expectations
    return {
        script: 'FADE IN:\nEXT. TEST LOCATION - DAY\nThis is a test movie script with enough content to be valid.',
        title: 'frozen'
    };
});

module.exports = extractPageContents;
