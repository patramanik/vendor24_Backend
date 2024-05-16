const express = require("express");
const router = express.Router();
const { personalDetailsController } = require("../controller");
const isAuth = require("../middlewares/isAuth");
const {
  addPersonalDetailsValidator,
  idvalidator,
} = require("../validators/personalDetails");
const validators = require("../validators/validate");

router.post(
  "/",
  isAuth,
  addPersonalDetailsValidator,
  validators,
  personalDetailsController.addPersonalDetails
);

module.exports = router;
