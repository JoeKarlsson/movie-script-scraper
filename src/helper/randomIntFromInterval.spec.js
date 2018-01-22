const randomIntFromInterval = require('./randomIntFromInterval');

describe('randomIntFromInterval', () => {
	it('should be a function', () => {
		expect(typeof randomIntFromInterval).toBe('function');
	});

	it('should produce a random number between 0, 1000', () => {
		const result = randomIntFromInterval(0, 1000);

		expect(typeof result).toBe('number');
		expect(result > 0).toBe(true);
		expect(result < 1000).toBe(true);
	});
});
