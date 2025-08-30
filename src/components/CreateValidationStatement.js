const _31_month_indexes = [1, 3, 5, 7, 8, 10, 12];

const isDayValid = (day, month, year) => {
	if (month == 2) {
		if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 && day > 29)
		  return false;

		if (day > 28)
		  return false;
	}

	if (month in _31_month_indexes && day > 31) 
	  return false;

	if (!month in _31_month_indexes && day > 30)
	  return false;

	return true;
};

export const createStatement = (day, month, year, hour, minute, second) => {
	if (day.length !== 2)
    return 'Please enter a day!';

	if (parseInt(day) === 0 || parseInt(day) > 31)
		return 'Please enter a valid day!';

	if (month.length !== 2)
		return 'Please enter a month!';

	if (parseInt(month) === 0 || parseInt(month) > 12)
		return 'Please enter a valid month!';

	if (!isDayValid(parseInt(day), parseInt(month), parseInt(year)))
		return 'Please anter a valid day';

	if (year.length !== 4)
		return 'Please enter a year!';

	if (parseInt(year) === 0)
		return 'Please enter a valid year!';

	if (hour.length !== 2)
		return 'Please enter an hour!';

	if (parseInt(hour) > 23)
		return 'Please enter a valid hour!';

	if (minute.length !== 2)
		return 'Please enter a minute!';

	if (parseInt(minute) > 59)
		return 'Please enter a valid minute!';

  if (second.length !== 2)
		return 'Please enter a second!';

	if (parseInt(second) > 59)
		return 'Please enter a valid second!';
}