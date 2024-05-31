const { check, param } = require("express-validator");
const { default: mongoose } = require("mongoose");


const idvalidator = [
  param("id").custom(async (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category id");
    }
  }),
];

module.exports = {
  idvalidator,
};
