const { User } = require("../models");
const { uploadOnCloudinary } = require("../utils/cloudnary");


const uploadFile = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select("-password -varificationCode -forgotPasswordCode");

    if (!user) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Image file is required",
      });
    }

    const imageLocalPath = req.file?.path;
    const uploadResult = await uploadOnCloudinary(imageLocalPath);

    if (!uploadResult) {
      return res.status(500).json({
        code: 500,
        status: false,
        message: "Image upload failed",
      });
    }

    user.image = uploadResult.url;
    await user.save();
    
    res.status(200).json({
      code: 200,
      status: true,
      message: "Image uploaded successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile};
