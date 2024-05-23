const { PersonalDetails, User } = require("../models");

const addPersonalDetails = async (req, res, next) => {
  try {
    const {
      phone,
      age,
      gender,
      address,
      city,
      pincode,
      district,
      state,
      country,
    } = req.body;
    const { _id } = req.user;
    const isPersonalDetailsExist = await PersonalDetails.findOne({ phone });
    if (isPersonalDetailsExist) {
      res.code = 400;
      throw new Error(`PersonalDetails is already present`);
    }

    const user = await User.findById(_id);
    if (!user) {
      res.status(400).json({
        code: 400,
        status: false,
        message: "User not found",
      });
      return;
    }

    const newPersonalDetails = new PersonalDetails({
      userId: _id,
      phone,
      age,
      gender,
      address,
      city,
      pincode,
      district,
      state,
      country,
    });
    await newPersonalDetails.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: "Category added successfully",
      data: { newPersonalDetails: newPersonalDetails },
    });
  } catch (err) {
    next(err);
  }
};

const getPersonalDetails = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      res.status(400).json({
        code: 400,
        status: false,
        message: "User not found",
      });
      return;
    }
    const personalDetails = await PersonalDetails.find({ userId: _id });
    res.status(200).json({
      code: 200,
      status: true,
      message: "PersonalDetails fetched successfully",
      data: personalDetails,
    });
  } catch (err) {
    next(err);
  }
};


const updatePersonalDetails = async (req, res, next) => {
  try {
    const { _id } = req.user; // User ID from the authenticated user
    const {
      phone,
      age,
      gender,
      address,
      city,
      pincode,
      district,
      state,
      country,
    } = req.body;

    // Find user by _id
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "User not found",
      });
    }

    // Find personal details by userId
    const personalDetails = await PersonalDetails.findOne({ userId: _id });
    if (!personalDetails) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Details not found",
      });
    }

    // Check if phone number already exists and belongs to a different record
    if (phone) {
      const isPersonalDetailsExist = await PersonalDetails.findOne({ phone });
      if (isPersonalDetailsExist && String(isPersonalDetailsExist._id) !== String(personalDetails._id)) {
        return res.status(400).json({
          code: 400,
          status: false,
          message: "Personal details with this phone number already exist",
        });
      }
    }

    
  personalDetails.phone = phone? phone : personalDetails.phone;
  personalDetails.age = age? age : personalDetails.age;
  personalDetails.gender = gender? gender : personalDetails.gender;
  personalDetails.address = address? address : personalDetails.address;
  personalDetails.city = city? city : personalDetails.city;
  personalDetails.pincode = pincode? pincode : personalDetails.pincode;
  personalDetails.district = district? district : personalDetails.district;
  personalDetails.state = state? state : personalDetails.state;
  personalDetails.country = country? country : personalDetails.country;
    
    personalDetails.updatedAt = new Date(); // Update the updatedAt timestamp

    await personalDetails.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Personal details updated successfully",
      data: personalDetails,
    });
  } catch (err) {
    next(err);
  }
};



const deletePersonalDetails = async (req, res, next) => {
  try {
  const { id } = req.params;
  const { _id } = req.user;
  const personalDetails = await PersonalDetails.findById(id);
  if (!personalDetails) {
    res.code = 404;
    throw new Error(`Details not found`);
  }
  if (String(personalDetails.userId)!== String(_id)) {
    res.code = 401;
    throw new Error(`Unauthorized`);
  }

  await personalDetails.remove();
  res.status(200).json({
    code: 200,
    status: true,
    message: "PersonalDetails deleted successfully",
  });
  } catch (err) {
    next(err);
  }

};

module.exports = {
  addPersonalDetails,
  getPersonalDetails,
  updatePersonalDetails,
  deletePersonalDetails,
};
