const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const path = require("path");
// ************ Multer Configuration ************

const storage = multer.diskStorage({
	// La idea de la logica extra en el metodo destination es que si el producto que se esta creando es una habitacion
	// La imagen se guarde en /images/rooms pero si es una actividad se guarde en /images/activities
	// En caso de que esto no funcione la solucion seria luego de que se guarde la imagen moverla a la carpeta que corresponda
	destination: (req, file, cb) => {
		let dest = "../../public/images/products/";
		dest += req.body.category == "room" ? "rooms" : "activities";
		// if (req.body.category == "room") dest += "rooms";
		// else if (req.body.category == "activity") dest += "activities";
		console.log(dest);
		cb(null, path.resolve(__dirname, dest));
	},
	filename: (req, file, cb) => {
		let filename = getFileName(req.body, file);
		cb(null, filename);
	},
});

const uploads = multer({ storage });

function getFileName(body, file) {
	return (
		"img-" +
		body.name.toLowerCase().replace(/\s/g, "-") +
		"_" +
		Date.now() +
		path.extname(file.originalname)
	);
}

router.get("/", productController.list);
router.get("/rooms", productController.listRooms);
router.get("/activities", productController.listActivities);
router.get("/detail/:id", productController.detail);
router.get("/cart", productController.cart);
router.post("/cart", productController.buy);
router.get("/create", productController.create);
router.post("/", uploads.single("image"), productController.save);
router.get("/edit/:id", productController.edit);
router.put("/edit", uploads.single("image"), productController.save);
router.delete("/:id", productController.delete);

module.exports = router;
