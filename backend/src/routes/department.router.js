const express = require("express");
const { asyncHandler } = require("../middlewares/handler/asyncHandler");
const DepartmentController = require("../controllers/department.controller");

const router = express.Router();
const departmentController = new DepartmentController();

router.get("/", asyncHandler(departmentController.getAll));

router.get("/getAllRaw", asyncHandler(departmentController.getAllRaw));

router.get("/:id", asyncHandler(departmentController.getById));

router.post("/", asyncHandler(departmentController.create));

router.put("/:id", asyncHandler(departmentController.update));

router.delete("/:id", asyncHandler(departmentController.delete));

module.exports = router;
