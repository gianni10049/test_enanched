let express = require('express');
const axios = require("axios");
let citiesRouter = express.Router();

citiesRouter.get('/most_searched', async function (req, res) {

    let app_id = process.env.OPEN_WEATHER_KEY;

    let cities_data = [];

    let cities = [
        {
            "id": 7034588,
            "name": "Karangsonojabon",
            "state": "",
            "country": "ID",
            "coord": {
                "lon": 111.9561,
                "lat": -8.1689
            }
        },
        {
            "id": 5702984,
            "name": "Crescent Valley",
            "state": "NV",
            "country": "US",
            "coord": {
                "lon": -116.576469,
                "lat": 40.416031
            }
        },
        {
            "id": 7034573,
            "name": "Jabon",
            "state": "",
            "country": "ID",
            "coord": {
                "lon": 111.965103,
                "lat": -8.1645
            }
        },
        {
            "id": 3530,
            "name": "Qabāghlū",
            "state": "",
            "country": "IR",
            "coord": {
                "lon": 46.168499,
                "lat": 36.173302
            }
        },
        {
            "id": 5174,
            "name": "‘Arīqah",
            "state": "",
            "country": "SY",
            "coord": {
                "lon": 36.48336,
                "lat": 32.889809
            }
        }
    ]

    for (let city of cities) {

        let coords = city.coord;

        let weather_url = `https://api.openweathermap.org/data/2.5/weather?lon=${coords.lon}&lat=${coords.lat}&appid=${app_id}`;
        let weather_response = await axios?.get(weather_url);

        let shops_url = `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=40.416031&longitude=-116.576469`;


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
