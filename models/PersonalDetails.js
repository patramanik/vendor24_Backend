const mongoose = require("mongoose");

// Define the PersonalDetails schema
const personalDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
    },
    district:{
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Create the PersonalDetails model
const PersonalDetails = mongoose.model(
  "PersonalDetails",
  personalDetailsSchema
);

module.exports = PersonalDetails;
