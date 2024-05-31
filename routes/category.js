const express = require("express");
const router = express.Router();
const { categoryController } = require("../controller");
const {idvalidator } = require("../validators/category");
const validators = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");
const upload = require("../middlewares/upload");
const isAdmin = require("../middlewares/isAdmin");
router.post(
  "/",
  isAuth,
  isAdmin,
  validators,
  upload.single("image"),
  categoryController.addCategory
);

router.put(
  "/:id",
  isAuth,
  isAdmin,
  idvalidator,
  validators,
  upload.single("image"),
  categoryController.updateCategory
);
router.put('/update-file/:id',isAuth,isAdmin,upload.single("image"),categoryController.updateFile);

router.delete(
  "/:id",
  isAuth,
  isAdmin,
  idvalidator,
  validators,
  categoryController.deleteCategory
);

router.get("/", isAuth, validators, categoryController.getCategories);

router.get(
  "/:id",
  isAuth,
  idvalidator,
  validators,
  categoryController.getCategotiById
);

router.get(
  "/:title",
  isAuth,
  idvalidator,
  validators,
  categoryController.getCategotiById
);

module.exports = router;
