const express = require('express');
const router = express.Router();
const {authController}= require('../controller');

//router
router.post('/signin',authController.signup);

module.exports =router;