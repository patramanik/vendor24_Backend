const { check, param } = require("express-validator");
const { default: mongoose } = require("mongoose");

const addPersonalDetailsValidator = [
  check("phone").not().isEmpty().withMessage("Phone is required"),
  check("age").not().isEmpty().withMessage("age is required"),
  check("gender").not().isEmpty().withMessage("Gender is required"),
  check("address").not().isEmpty().withMessage("Address is required"),
  check("city").not().isEmpty().withMessage("City is required"),
  check("pincode").not().isEmpty().withMessage("Pincode is required"),
  check("district").not().isEmpty().withMessage("district is required"),
  check("state").not().isEmpty().withMessage("State is required"),
  check("country").not().isEmpty().withMessage("Country is required"),
];

const idvalidator = [
  param("id").custom(async (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid User ID");
    }
  }),
];

module.exports = {
  addPersonalDetailsValidator,
  idvalidator,
};
