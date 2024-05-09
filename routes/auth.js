const express = require('express');
const router = express.Router();
const {authController}= require('../controller');
const {singupValidator,signinValidator,emailValidator} = require("../validators/auth");
const validate = require('../validators/validate')

//router
router.post('/signup',singupValidator,validate,authController.signup);

router.post('/signin',signinValidator,validate,authController.signin);

router.post('/send-varification-email',emailValidator,validate,authController.varifiCode);

module.exports = router;