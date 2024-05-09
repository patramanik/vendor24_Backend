const { check } = require("express-validator");

const singupValidator = [
  check("name").not().isEmpty().withMessage("name is required"),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long")
    .notEmpty()
    .withMessage("password is required"),
];

const signinValidator = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .notEmpty()
    .withMessage("Password is not empty"),
];

const emailValidator = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .notEmpty()
    .withMessage("Email is required"),
];

module.exports = {
  singupValidator,
  signinValidator,
  emailValidator,
};
