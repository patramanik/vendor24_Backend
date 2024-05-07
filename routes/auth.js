const express = require('express');
const router = express.Router();
const {authController}= require('../controller');
const {singupValidator,signinValidator} = require("../validators/auth");
const validate = require('../validators/validate')

//router
router.post('/signup',singupValidator,validate,authController.signup);

router.post('/signin',signinValidator,validate,authController.signin);

module.exports = router;