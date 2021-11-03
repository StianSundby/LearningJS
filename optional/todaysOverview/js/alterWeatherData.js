let celsiusButton = document.getElementById("celsiusButton");
let fahrenheitButton = document.getElementById("fahrenheitButton");
var todaysTempUnit = "C"; //stores temperature unit for conversion. Celsius by default

function convertTodaysTemp(buttonName) {
	if (buttonName == "C" && todaysTempUnit == "F") {
		todaysTempUnit = "C";
		convertToCelsius(todaysTemp);
		todaysTempDiv.innerHTML = todaysTemp;
		celsiusButton.classList.add("activeButton");
		fahrenheitButton.classList.remove("activeButton");
	} else if (buttonName == "F" && todaysTempUnit == "C") {
		todaysTempUnit = "F";
		convertToFahrenheit(todaysTemp);
		todaysTempDiv.innerHTML = todaysTemp;
		celsiusButton.classList.remove("activeButton");
		fahrenheitButton.classList.add("activeButton");
	}
}

function convertToFahrenheit(celsius) {
	todaysTemp = (celsius * 9) / 5 + 32;
	todaysTemp = Math.trunc(todaysTemp);
	return todaysTemp;
}

function convertToCelsius(fahrenheit) {
	todaysTemp = ((fahrenheit - 32) * 5) / 9;
	todaysTemp = Math.trunc(todaysTemp);
	return todaysTemp;
}
