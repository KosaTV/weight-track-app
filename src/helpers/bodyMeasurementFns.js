const getBMI = (weight, height) => {
	const meters = height / 100;
	let BMI = weight / (meters * meters);
	BMI = (BMI + "").endsWith(".0") ? Math.round(BMI) : BMI;
	return BMI;
};

export {getBMI};
