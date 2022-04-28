const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/", productController.list);
router.get("/detail/:id", productController.detail);
router.get("/cart", productController.cart);
router.get("/create", productController.create);
router.post("/create", productController.save);
router.get("/edit/:id", productController.edit);
router.post("/edit", productController.save);

module.exports = router;
