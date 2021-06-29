var express = require("express");
var router = express.Router();

var cancionesRouter = require("./canciones/index");


router.use("/canciones", cancionesRouter);

module.exports = router;