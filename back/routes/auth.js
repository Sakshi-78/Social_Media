const path = require('path');
const express = require('express');
const router = express.Router();
const User = require("../models/user");
const authController = require("../controller/auth");

router.post("/authenticate",authController.postAuth);

module.exports = router;