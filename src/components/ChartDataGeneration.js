function randomInt(a, b) {
	return parseInt((Math.random() * (b - a) + a).toFixed(0));
}

export function generateChartData(length=100) {
	return Array(length)
		.fill(undefined)
		.map(() => { 
			const label = randomInt(1, 30).toString().padStart(2, '0') + '/' + randomInt(1, 12).toString().padStart(2, '0');
			const value = randomInt(0, 11);
			const extraValue = 0;

			return { 
				label: label, 
				value: value,
				extraValue: extraValue,
				satisfactionPercent: randomInt(0, 100)
		}});
}

export function generateManyChartData(length=100, chartsNumber=2) {
	return Array(chartsNumber)
		.fill(undefined)
		.map(() => generateChartData(length))
}

