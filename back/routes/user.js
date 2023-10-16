const path = require('path');
const express = require('express');
const router = express.Router();

userController = require("../controller/user");
router.get('/user',userController.getUser);
router.post('/follow/:id',userController.postFollow);
router.post('/unfollow/:id',userController.postUnfollow);

module.exports = router;