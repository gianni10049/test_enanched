const setupExpress = require("../config/express");
const {normalizePort} = require("../libs/utils");

let express = setupExpress();
const port = normalizePort(process.env.PORT || '3000');


express.listen(port);