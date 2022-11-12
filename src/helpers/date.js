const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const formatDateMDY = date => {
	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const getDateDetails = time => {
	const month = time.getMonth() + 1;
	const day = time.getDate();
	const year = time.getFullYear();
	const hour = time.getHours();
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();
	return {year, month, day, hour, minutes, seconds};
};

export default {weekDays, months, formatDateMDY, getDateDetails};
