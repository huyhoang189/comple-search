const express = require("express");
const { asyncHandler } = require("../middlewares/handler/asyncHandler");
const CategoryController = require("../controllers/category.controller");

const router = express.Router();
const categoryController = new CategoryController();

router.get("/", asyncHandler(categoryController.getAll));

router.get("/:id", asyncHandler(categoryController.getById));

router.post("/", asyncHandler(categoryController.create));

router.put("/:id", asyncHandler(categoryController.update));

router.delete("/:id", asyncHandler(categoryController.delete));

module.exports = router;
