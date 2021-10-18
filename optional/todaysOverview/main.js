const axios = require("axios");

const longitude = "lon=10.45480342151002";
const latitude = "lat=59.27569773646279";
const altitude = "altitude=26";

axios
	.get(
		`https://api.met.no/weatherapi/locationforecast/2.0/compact?${longitude}&${latitude}&${altitude}`
	)
	.then(function (response) {
		//Units
		console.log(response.data.properties.meta.units.air_temperature);
		console.log(response.data.properties.meta.units.precipitation_amount);
		console.log(response.data.properties.meta.units.wind_from_direction);
		console.log(response.data.properties.meta.units.wind_speed);

		//Values
		console.log(response.data.properties.timeseries[0]); //Array has a length of 85
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
