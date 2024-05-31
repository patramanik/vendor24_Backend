const { Category, User } = require("../models");
const { uploadOnCloudinary } = require("../utils/cloudnary");

const addCategory = async (req, res, next) => {
  try {
    
    const { title, desc } = req.body;
    const { _id } = req.user;

    if (!title){
      res.code = 400;
      throw new Error(`Title is required`);
    }

    if (!req.file) {
      res.code = 404;
      throw new Error(`Image is required`);
    }

    // Check if the category already exists
    const isCategoryExist = await Category.findOne({ title });
    if (isCategoryExist) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: `Category already exists`,
      });
    }

    // Find the user
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "User not found",
      });
    }

    // Upload the image to Cloudinary
    const imageLocalPath = req.file?.path;
    const uploadResult = await uploadOnCloudinary(imageLocalPath);
    if (!uploadResult) {
      return res.status(500).json({
        code: 500,
        status: false,
        message: "Image upload failed",
      });
    }

    // Create a new category
    const newCategory = new Category({ title, desc, updatedBy: _id });
    newCategory.image = uploadResult.url;
    await newCategory.save();

    // Send success response
    return res.status(201).json({
      code: 201,
      status: true,
      message: "Category added successfully",
      data: newCategory,
    });
  } catch (err) {
    // Handle errors
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { title, desc } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      res.code = 404;
      throw new Error(`Category not found`);
    }

    const isCategoryExist = await Category.findOne({ title });
    if (
      isCategoryExist &&
      isCategoryExist === title &&
      String(isCategoryExist._id) !== String(category._id)
    ) {
      res.code = 400;
      throw new Error(`Category ${title} already exists`);
    }
    category.title = title ? title : category.title;
    category.desc = desc;
    category.updatedBy = _id;
    await category.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Category updated successfully",
      data: { category },
    });
  } catch (err) {
    next(err);
  }
};

const updateFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Category not found",
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

    category.image = uploadResult.url;
    await category.save();
    
    res.status(200).json({
      code: 200,
      status: true,
      message: "Image uploaded successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};


const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      res.code = 404;
      throw new Error(`Category not found`);
    }
    await Category.findByIdAndDelete(id);
    res.status(200).json({
      code: 200,
      status: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

const getCategotiById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      res.code = 404;
      throw new Error(`Category not found`);
    }
    res.status(200).json({
      code: 200,
      status: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

const getCategoriesByName = async (req, res, next) => {
  try {
    const { title } = req.params;
    const categories = await Category.find(title);
    if (!category) {
      res.code = 404;
      throw new Error(`Category not found`);
    }
    res.status(200).json({
      code: 200,
      status: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};


const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      code: 200,
      status: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategotiById,
  updateFile,
  getCategoriesByName,
};
