const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const isServiceProvider = require("../middlewares/isServiceProvider");
const validators = require("../validators/validate");
const upload = require("../middlewares/upload");
const {serviceController} = require("../controller")

router.post("/",isAuth,isServiceProvider,validators,upload.single("image"),serviceController.addService);

router.get("/",isAuth,serviceController.getAllServices);

router.get("/:id",isAuth,validators,serviceController.getServiceById);

router.put("/:id",isAuth,validators,validators.updateServiceValidator,serviceController.updateService);

router.delete("/:id",isAuth,validators,serviceController.deleteService);

module.exports = router;