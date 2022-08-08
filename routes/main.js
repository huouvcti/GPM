"use strict";

const express = require("express");
const router = express.Router();


const mainCtrl = require("../controller/mainCtrl");


router.get("/", mainCtrl.main);


module.exports = router;