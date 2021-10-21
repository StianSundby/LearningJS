// const axios = require("axios").default;
var temp = document.getElementById("temperature");
var wind = document.getElementById("wind");

let responseTimeseries = [];
let currentTime; //generated in getToday()

getWeatherData();
function getWeatherData() {
	const longitude = "lon=10.45480342151002";
	const latitude = "lat=59.27569773646279";
	const altitude = "altitude=26";
	axios
		.get(
			`https://api.met.no/weatherapi/locationforecast/2.0/compact?${longitude}&${latitude}&${altitude}`
		)
		.then(function (response) {
			getToday();
			// console.log(response);
			responseTimeseries = response.data.properties.timeseries;

			wind.innerHTML =
				"Current temperature: " +
				response.data.properties.timeseries[0].data.instant.details
					.air_temperature +
				" " +
				response.data.properties.meta.units.air_temperature;

			temp.innerHTML =
				"Wind: " +
				response.data.properties.timeseries[0].data.instant.details.wind_speed +
				response.data.properties.meta.units.wind_speed +
				" " +
				response.data.properties.timeseries[0].data.instant.details
					.wind_from_direction +
				response.data.properties.meta.units.wind_from_direction;
		})
		.catch(function (error) {
			console.log(error);
		});
}

function getToday() {
	let date = new Date();
	let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
	let month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(date);
	let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
	let time = date.getUTCHours() + ":00"; //dont need minutes

	currentTime = year + "-" + month + "-" + day + "T" + time + ":00Z"; //00Z == UTC, so 2 hours behind Norway
	console.log("Current time sucessfully generated: " + currentTime);
	getTimeIndex();
}

function getTimeIndex() {
	flag = 0;
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == currentTime) {
			console.log("Data entry mathching Current Time found");
			break;
		} else {
			flag = 1;
		}
	}
	if (flag === 1) {
		console.log("No data entry matching Current Time was found");
	}
}
