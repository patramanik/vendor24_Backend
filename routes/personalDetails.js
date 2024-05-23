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

router.put(
  "/:id",
  isAuth,
  idvalidator,
  validators,
  personalDetailsController.updatePersonalDetails
);

router.delete("/:id", isAuth, idvalidator, personalDetailsController.deletePersonalDetails);

router.get("/:id", isAuth, idvalidator, personalDetailsController.getPersonalDetails);

module.exports = router;
