const express= require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const {connectMongodb}= require("./db/connecttion");

//import routes
const {authRoute}=require("./routes");



//init app
const app = express();

// connect database
connectMongodb();

//body parser middleware
app.use(express.json({limit:"500mb"}));
app.use(bodyParser.urlencoded({limit:"500mb",extended:false}));

//router section
app.use("/api/v1/auth",authRoute);


module.exports =app;
