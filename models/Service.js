const mongoose = require("mongoose");

// Define the schema for the Service model
const serviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    // You can add more fields as needed
  },
  { timestamps: true }
);

// Create the Service model using the schema
const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
