const getBMI = (weight, height) => {
	const meters = height / 100;
	let BMI = (weight / (meters * meters)).toFixed(1);
	BMI = BMI.endsWith(".0") ? Math.round(BMI) : BMI;
	return BMI;
};

export {getBMI};
