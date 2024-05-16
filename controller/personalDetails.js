const {PersonalDetails,User} = require('../models');

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
            country
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
            country
          });
          await newPersonalDetails.save();
    
        res.status(201).json({
          code: 201,
          status: true,
          message: "Category added successfully",
          data: {newPersonalDetails: newPersonalDetails}
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

module.exports ={
    addPersonalDetails,
}