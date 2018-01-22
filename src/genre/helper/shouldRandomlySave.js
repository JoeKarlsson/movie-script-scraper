const randomIntFromInterval = require('../../helper/randomIntFromInterval');

const shouldRandomlySave = () => {
	const totalRandomNumber = randomIntFromInterval(0, 1000);
	return totalRandomNumber % 17 === 0;
};

module.exports = shouldRandomlySave;
