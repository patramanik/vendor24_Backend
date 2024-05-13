const express = require('express');
const router = express.Router();
const {categoryController} = require("../controller");
const {addCategoryValidator,idvalidator} = require("../validators/category");
const validators = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

router.post('/',isAuth,isAdmin,addCategoryValidator,validators,categoryController.addCategory)

router.put('/:id',isAuth,isAdmin,idvalidator,validators,categoryController.updateCategory);

router.delete('/:id',isAuth,isAdmin,idvalidator,validators,categoryController.deleteCategory);

router.get('/',isAuth,validators,categoryController.getCategories);

router.get('/:id',isAuth,idvalidator,validators,categoryController.getCategotiById);

module.exports = router;