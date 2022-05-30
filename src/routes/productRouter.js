const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const multerMiddleware = require("../middlewares/multerMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
// ************ Multer Configuration ************

router.get("/", productController.list);
router.get("/rooms", productController.listRooms);
router.get("/activities", productController.listActivities);
router.get("/detail/:id", productController.detail);
router.get("/cart", productController.cart);
router.post("/cart", productController.buy);
router.get("/create", adminMiddleware, productController.create);
router.post(
	"/",
	multerMiddleware.products.single("image"),
	productController.save,
);
router.get("/edit/:id", adminMiddleware, productController.edit);
router.put(
	"/:id",
	multerMiddleware.products.single("image"),
	productController.save,
);
router.delete("/:id", adminMiddleware, productController.delete);

module.exports = router;
