const axios = require("axios").default;

const longitude = "lon=10.45480342151002";
const latitude = "lat=59.27569773646279";
const altitude = "altitude=26";
var temp = document.getElementById("temperature");
var wind = document.getElementById("wind");

let dataResponse;
let currentTime;

function getToday() {
	let date = new Date();
	let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
	let month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(date);
	let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
	let time = date.getHours() + ":00"; //dont need minutes
	currentTime = year + "-" + month + "-" + day + "T" + time + ":00Z"; //00Z == Central Standard Time
	console.log(currentTime);
	getTimeIndex();
}

function getTimeIndex() {
	for (let i = 0; i < dataResponse.length; i++) {
		if (response.data.properties.timeseries[i] == currentTime) {
			console.log("nice");
		} else return;
	}
}

axios
	.get(
		`https://api.met.no/weatherapi/locationforecast/2.0/compact?${longitude}&${latitude}&${altitude}`
	)
	.then(function (response) {
		getToday();
		console.log(response);
		dataResponse = response.data.properties.timeseries;

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

		getToday();
	})
	.catch(function (error) {
		console.log(error);
	});

//TODO: Loop through response.data.properties.timerseries array and find matching timestamp. Line 19
//TODO: '2021-10-18T10:00:00Z'
//TODO: Format: Year, Month, Day, T+Time, ??+Z
