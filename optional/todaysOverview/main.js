const axios = require("axios");

const longitude = "lon=10.45480342151002";
const latitude = "lat=59.27569773646279";
const altitude = "altitude=26";

axios
	.get(
		`https://api.met.no/weatherapi/locationforecast/2.0/compact?${longitude}&${latitude}&${altitude}`
	)
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	})
	.then(function () {
		console.log("It worked!");
	});
