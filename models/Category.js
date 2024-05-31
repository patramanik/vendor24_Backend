const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true, 
    trim: true
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  updatedBy:{type:mongoose.Types.ObjectId, ref:"user", required: true},
},{timestamps: true});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
