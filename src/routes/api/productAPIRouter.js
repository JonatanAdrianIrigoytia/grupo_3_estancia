const express = require("express");
const productController = require("../../controllers/api/productAPIController");
const router = express.Router();

router.get("/last", productController.last);
router.get("/:page?", productController.list);
router.get("/detail/:id", productController.detail);
module.exports = router;
