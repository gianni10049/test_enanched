const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");
const cookieParser = require("cookie-parser");
const citiesRouter = require("../routes/cities");

try {
    dotenv.config();
} catch (e) {
    console.log('missing env file', e);
}


const setupExpress = () => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, 'public')));

    app.enable('trust proxy');
    app.use(cors());

    app.use('/api/cities/v1', citiesRouter);

    return app;
};

module.exports = setupExpress;
