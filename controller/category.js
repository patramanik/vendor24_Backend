const { Category, User } = require("../models");

const addCategory = async (req, res, next) => {
  try {
    const { title, desc } = req.body;
    const { _id } = req.user;
    const isCategoryExist = await Category.findOne({ title });
    if (isCategoryExist) {
      res.code = 400;
      throw new Error(`Category already exists`);
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

    const newCategory = new Category({ title, desc, updatedBy: _id });
    await newCategory.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: "Category added successfully",
      // data: newCategory,
    });
  } catch (err) {
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

const getCategotiById = async (req, res,next) => {
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
};
