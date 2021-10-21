// const axios = require("axios").default;
var temp = document.getElementById("temperature");
var wind = document.getElementById("wind");

let responseTimeseries = []; //fetched in getWeatherData()
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
			getToday(2);
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
//parameter by default should be 2 to get Norway Time.
function getToday(hourOffset) {
	let date = new Date();
	let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
	let month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(date);
	let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
	let hours = date.getUTCHours() + hourOffset; //UTC == 00Z format
	hours = ("0" + hours).slice(-2); //make sure its 2 digits
	let time = hours + ":00"; //dont need minutes

	currentTime = year + "-" + month + "-" + day + "T" + time + ":00Zd"; //00Z == UTC, so 2 hours behind Norway
}

function getTimeIndex() {
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == currentTime) {
			console.clear();
			console.log("Data entry mathching Current Time found!");
			return;
		}
	}
	console.log("No data entry matching Current Time was found");

	//-1 hour fallback
	console.log(" ");
	console.log("Will look for data entry matching Current Time minus one hour");
	getToday(1);
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == currentTime) {
			console.clear();
			console.log("Data entry mathching Current Time found!");
			return;
		}
	}
	console.log("No data entry matching Current Time minus one hour was found");

	//-2 hours fallback
	console.log(" ");
	console.log("Will look for data entry matching Current Time minus two hours");
	getToday(0);
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == currentTime) {
			console.clear();
			console.log("Data entry mathching Current Time found!");
			return;
		}
	}
	console.log("No data entry matching Current Time minus two hours was found");

	//+1 hour fallback
	console.log(" ");
	console.log("Will look for data entry matching Current Time plus one hour");
	getToday(3);
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == currentTime) {
			console.clear();
			console.log("Data entry mathching Current Time found!");
			return;
		}
	}
	console.log("No data entry matching Current Time plus one hour was found");

	//+2 hours fallback
	console.log(" ");
	console.log("Will look for data entry matching Current Time plus two hours");
	getToday(4);
	for (let i = 0; i < responseTimeseries.length; i++) {
		if (responseTimeseries[i].time == currentTime) {
			console.clear();
			console.log("Data entry mathching Current Time found!");
			return;
		}
	}

	console.log("No data entry matching Current Time plus two hours was found");
}
