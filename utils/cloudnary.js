// import { v2 as cloudinary } from "cloudinary";
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const {
  cloudinaryCloudName,
  cloudinaryApiKey,
  cloudinaryApiSecret,
} = require("../config/kyes");

// Configuration
cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

const uploadOnCloudinary = async (localFilepath) => {
    try {
        if (!localFilepath) return null;
        const uploadResult = await cloudinary.uploader.upload(localFilepath,{
            resource_type: "auto"
        });
        fs.unlinkSync(localFilepath);
        return uploadResult;
    }catch (err) {
        fs.unlinkSync(localFilepath);
        return null;
    }
};



module.exports = {uploadOnCloudinary};

