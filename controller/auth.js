const { User } = require("../models"); // Assuming User model is imported correctly
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail");

// the below code is used to signup the user:
const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const isEmailExist = await User.findOne({ email: email });

    if (isEmailExist) {
      res.code = 400;
      throw new Error(`User ${name} already exists`);
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({
      code: 201,
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

// the below code is used to signin the user:
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist, return error
    if (!user) {
      res.code = 401;
      throw new Error(`Invalid username`);
    }

    // Check if password is correct
    const isPasswordCorrect = await comparePassword(password, user.password);

    // If password is incorrect, return error
    if (!isPasswordCorrect) {
      res.code = 401;
      throw new Error(`Invalid password`);
    }

    // Generate token
    const token = generateToken(user);

    // If everything is fine, user logged in successfully
    res.status(200).json({
      code: 200,
      status: true,
      message: "User signin in successfully",
      data: { token },
    });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

// the below code is used to send Email varification code to the user:
const verifiCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      res.code = 401;
      throw new Error(`Invalid username`);
    }

    if (user.isVerified) {
      res.code = 400;
      throw new Error(`User already verified`);
    }

    const code = generateCode(6);
    user.varificationCode = code;
    await user.save();

    //send email

    await sendEmail({
      emailTo: user.email,
      subject: "Email Varification Code",
      code,
      content: "verify your account",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "User verification code sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

// the below code is used to verify User:
const verifyUser = async(req, res, next) => {
  try{
    const { email, code } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      res.code = 404;
      throw new Error(`Invalid username`);
    }

    if (user.varificationCode !== code) {
      res.code = 400;
      throw new Error(`Invalid confirmation code`);
    }

    user.isVarified = true;
    user.varificationCode = null;
    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "User verified successfully",
    });

  }catch(err){
    next(err);
  }
};


const forgotPasswordCode = async(req, res, next) => {
  try{
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      res.code = 404;
      throw new Error(`Invalid username`);
    }

    const code = generateCode(6);
    user.forgotPasswordCode = code;
    await user.save();

    //send email
    await sendEmail({
      emailTo: user.email,
      subject: "Forgot Password Code",
      code,
      content: "verify your account",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "User forgot password code sent successfully",
    });

  }catch(err){
    next(err);
  }
};

const recoverPassword = async(req, res, next) => {
  try{
    const { email, code, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      res.code = 404;
      throw new Error(`Invalid username`);
    }

    if (user.forgotPasswordCode!== code) {
      res.code = 400;
      throw new Error(`Invalid confirmation code`);
    }

    const hashedPassword = await hashPassword(password);
    user.password =  hashedPassword;
    user.forgotPasswordCode = null;
    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "User password recovered successfully",
    });

  }catch(err){
    next(err);
  }
};

const changePassword = async(req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const {_id} = req.user;
    const user = await User.findById(_id);
    if (!user) {
      res.code = 404;
      throw new Error(`Invalid username`);
    }
    const match = await comparePassword(oldPassword,user.password);
    if(!match){
      res.code = 400;
      throw new Error(`Old password does not match`);
    }
    if(oldPassword === newPassword){
      res.code = 400;
      throw new Error(`New password cannot be same as old password`);
    }
    const hashedPassword = await hashPassword(newPassword);
    user.password =  hashedPassword;  
    await user.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "User password changed successfully",
    });
  }catch(err){
    next(err);
  }
};

// the below code is used to export the module
module.exports = {
  signup,
  signin,
  verifiCode,
  verifyUser,
  forgotPasswordCode,
  recoverPassword,
  changePassword,
};
