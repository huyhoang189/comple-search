const express = require("express");
const { asyncHandler } = require("../middlewares/handler/asyncHandler");
const CategoryController = require("../controllers/fmc.controller");

const router = express.Router();
const fmcController = new CategoryController();

router.get("/", asyncHandler(fmcController.getAll));

router.get("/:id", asyncHandler(fmcController.getById));

router.post("/", asyncHandler(fmcController.create));

router.put("/:id", asyncHandler(fmcController.update));

router.delete("/:id", asyncHandler(fmcController.delete));

module.exports = router;
