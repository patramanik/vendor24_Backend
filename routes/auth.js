const express = require("express");
const router = express.Router();
const { authController } = require("../controller");
const {
  singupValidator,
  signinValidator,
  emailValidator,
  verifyUserValidator,
  recoverPasswordValidator,
  changePasswordValidator,
  updateProfileValidator,
} = require("../validators/auth");
const validate = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");

//router
router.post("/signup", validate, authController.signup);

router.post("/signin", signinValidator, validate, authController.signin);

router.post(
  "/send-verification-email",
  emailValidator,
  validate,
  authController.verifiCode
);

router.post(
  "/verify-user",
  verifyUserValidator,
  validate,
  authController.verifyUser
);

router.post(
  "/forgot-password-code",
  emailValidator,
  validate,
  authController.forgotPasswordCode
);

router.post(
  "/recover-password",
  recoverPasswordValidator,
  validate,
  authController.recoverPassword
);

router.put(
  "/change-password",
  changePasswordValidator,
  isAuth,
  authController.changePassword
);

router.put(
  "/update-profile",
  updateProfileValidator,
  isAuth,
  authController.updateProfile
);

// export routes
module.exports = router;
