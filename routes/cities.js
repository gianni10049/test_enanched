let express = require('express');
const axios = require("axios");
let citiesRouter = express.Router();

citiesRouter.get('/most_searched', async function (req, res) {

    let app_id = process.env.OPEN_WEATHER_KEY;

    let cities_data = [];

    let cities = [
        {
            "id": 4165565,
            "name": "Naples",
            "state": "FL",
            "country": "US",
            "coord": {
                "lon": -81.794807,
                "lat": 26.14204
            }
        },
        {
            "id": 6535772,
            "name": "Pregnana Milanese",
            "state": "",
            "country": "IT",
            "coord": {
                "lon": 9.00704,
                "lat": 45.515968
            }
        },
        {
            "id": 6535773,
            "name": "Bracca",
            "state": "",
            "country": "IT",
            "coord": {
                "lon": 9.70875,
                "lat": 45.823582
            }
        },
        {
            "id": 6535775,
            "name": "Brembate di Sopra",
            "state": "",
            "country": "IT",
            "coord": {
                "lon": 9.57945,
                "lat": 45.716679
            }
        },
        {
            "id": 6535777,
            "name": "Torre Pallavicina",
            "state": "",
            "country": "IT",
            "coord": {
                "lon": 9.87706,
                "lat": 45.446381
            }
        },
    ]

    for (let city of cities) {

        let coords = city.coord;

        let weather_url = `https://api.openweathermap.org/data/2.5/weather?lon=${coords.lon}&lat=${coords.lat}&appid=${app_id}`;
        let weather_response = await axios?.get(weather_url);

        let shops_url = `https://api.yelp.com/v3/businesses/search?latitude=${coords.lat}&longitude=${coords.lon}`;

            let shops_response = await axios.get(shops_url, {
                headers: {
                    Authorization: 'Bearer ' + process.env.YELP_KEY,
                    contentType: 'application/json',
                    "Accept-Encoding": "identity",
                }
            });

        let city_data = {
            city_data: city,
            weather: weather_response.data?.weather,
            shops: shops_response.data?.businesses,
        }

        cities_data.push(city_data);
    }

    res.json(cities_data);
});

module.exports = citiesRouter;
