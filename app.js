const express= require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config();
const {connectMongodb}= require("./db/connecttion");
const {errorHandler} = require("./middlewares")
const notFound = require("./controller/notfound");
const cors = require("cors");

//import routes
const {authRoute,categoryRoute,personalDetails,fileRoute}=require("./routes");



//init app
const app = express();


// connect database
connectMongodb();

//body parser middleware

app.use(express.json({limit:"500mb"}));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({limit:"500mb",extended:false}));
app.use(morgan("dev"));

//router section
app.use("/",homeRoute);
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/personal-details",personalDetails);
app.use("/api/v1/file",fileRoute);
//not found routes
app.use("*",notFound)

//error handling middleware
app.use(errorHandler);

module.exports =app;
