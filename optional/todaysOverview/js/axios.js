const axios = require("axios");

let longitude = "lon=10.45480342151002"; //param is lon
let latitude = "lat=59.27569773646279"; //param is lat
let altitude = "26"; //param is altitude, has to be an integer

function getData(){
    axios.get(
        "https://api.met.no/weatherapi/locationforecast/2.0/compact", {
            params: {
                lon = longitude,
                lat = latitude,
                altitude = altitude
            }
        }
    )
    .then(function (response) {
        console.log(response);
    })
}


