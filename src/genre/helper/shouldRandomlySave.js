const randomIntFromInterval = require('../../helper/randomIntFromInterval');

const shouldRandomlySave = () => {
	const totalRandomNumber = randomIntFromInterval(0, 1000);
	// Temporarily make it more likely to save for testing (50% chance instead of ~6%)
	return totalRandomNumber % 2 === 0;
};

module.exports = shouldRandomlySave;
