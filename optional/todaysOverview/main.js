const axios = require("axios");

const longitude = "lon=10.45480342151002";
const latitude = "lat=59.27569773646279";
const altitude = "altitude=26";
let temp = document.getElementById("temperature");
let wind = document.getElementById("wind");

axios
	.get(
		`https://api.met.no/weatherapi/locationforecast/2.0/compact?${longitude}&${latitude}&${altitude}`
	)
	.then(function (response) {
		console.log(response);
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
	})
	.then(function () {
		console.log("It worked");
	});

//TODO: Loop through response.data.properties.timerseries array and find matching timestamp. Line 19
//TODO: '2021-10-18T10:00:00Z'
//TODO: Format: Year, Month, Day, T+Time, ??+Z
