const express = require("express");
const { asyncHandler } = require("../middlewares/handler/asyncHandler");
const VariantController = require("../controllers/variant.controller");

const router = express.Router();
const variantController = new VariantController();

router.get("/", asyncHandler(variantController.getAll));

router.get(
  "/getByVariantId",
  asyncHandler(variantController.getAllByMalwareId)
);

router.get("/:id", asyncHandler(variantController.getById));

router.post("/", asyncHandler(variantController.create));

router.put("/:id", asyncHandler(variantController.update));

router.delete("/:id", asyncHandler(variantController.delete));

module.exports = router;
