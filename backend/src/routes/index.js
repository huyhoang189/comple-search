const express = require("express");
const pagination = require("../middlewares/validation/pagination");
const departmentRouter = require("./department.router");
const malwareRouter = require("./malware.router");
const categoryRouter = require("./category.router");
const fmcRouter = require("./fmc.router");
const variantRouter = require("./variant.router");
const checkHealth = require("../middlewares/handler/checkHealth");

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check health for Server
 *     tags: [Default]
 *     responses:
 *       200:
 *         description:
 */

router.get("/", checkHealth);
router.use(pagination);
router.use("/departments", departmentRouter);
router.use("/malwares", malwareRouter);
router.use("/categories", categoryRouter);
router.use("/fmcs", fmcRouter);
router.use("/variants", variantRouter);
module.exports = router;
