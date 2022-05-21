const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const multerMiddleware = require("../middlewares/multerMiddleware");
// ************ Multer Configuration ************

router.get("/", productController.list);
router.get("/rooms", productController.listRooms);
router.get("/activities", productController.listActivities);
router.get("/detail/:id", productController.detail);
router.get("/cart", productController.cart);
router.post("/cart", productController.buy);
router.get("/create", productController.create);
router.post(
	"/",
	multerMiddleware.products.single("image"),
	productController.save,
);
router.get("/edit/:id", productController.edit);
router.put(
	"/:id",
	multerMiddleware.products.single("image"),
	productController.save,
);
router.delete("/:id", productController.delete);

module.exports = router;
