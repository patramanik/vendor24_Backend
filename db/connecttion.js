const mongoose = require("mongoose");
const {connectionURL} = require("../config/kyes");

const connectMongodb=async()=> {
  try {
    await mongoose.connect(connectionURL);
    console.log("Connected to mongoDB");
  }catch(err) {
    console.log(err);
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports ={
    connectMongodb,
}