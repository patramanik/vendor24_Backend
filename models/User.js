const mongoose = require("mongoose");

//create user Schema

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: Number,
      default: 4,
      //role: 1->Super Admin, 2->admin, 3->vendor, 4->user, 
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User=mongoose.model('user',userSchema);
module.exports=User;