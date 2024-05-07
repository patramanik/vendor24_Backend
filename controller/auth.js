const { User } = require("../models"); // Assuming User model is imported correctly
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");

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

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist, return error
    if (!user) {
     res.code=401;
      throw new Error(`Invalid username`);
    }

    // Check if password is correct
    const isPasswordCorrect = await comparePassword(password,user.password);
    
    // If password is incorrect, return error
    if (!isPasswordCorrect) {
      res.code=401;
      throw new Error(`Invalid password`);
       
    }

    // If everything is fine, user logged in successfully
    res.status(200).json({
      code: 200,
      status: true,
      message: "User signin in successfully",
    });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

module.exports = {
  signup,
  signin,
};
