const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware");

/*MULTER CONFIGURATION*/
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let dest = "../../public/images/products/";
		dest += req.body.category == "room" ? "rooms" : "activities";
		cb(null, path.join(__dirname, dest));
	},
	filename: (req, file, cb) => {
		let filename =
			"img-" +
			req.body.name.toLowerCase().replace(/\s/g, "-") +
			"_" +
			Date.now() +
			path.extname(file.originalname);
		cb(null, filename);
	},
});

const uploads = multer({ storage });

router.get("/", productController.list);
router.get("/rooms", productController.listRooms);
router.get("/activities", productController.listActivities);
router.get("/detail/:id", productController.detail);
router.get("/cart", productController.cart);
router.get("/search", productController.search);
router.post("/cart", productController.buy);
router.get("/create", adminMiddleware, productController.create);
router.post("/", uploads.single("image"), productController.save);
router.get("/edit/:id", adminMiddleware, productController.edit);
router.put("/:id", uploads.single("image"), productController.save);
router.delete("/:id", productController.delete);

module.exports = router;
