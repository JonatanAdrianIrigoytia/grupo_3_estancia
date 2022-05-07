const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");

// ************ Multer Configuration ************

const storage = multer.diskStorage({
	// La idea de la logica extra en el metodo destination es que si el producto que se esta creando es una habitacion
	// La imagen se guarde en /images/rooms pero si es una actividad se guarde en /images/activities
	// En caso de que esto no funcione la solucion seria luego de que se guarde la imagen moverla a la carpeta que corresponda
	destination: (req, file, cb) => {
		let dest = "../../public/images/";
		if (req.body.category == "room") dest = "../../public/images/rooms";
		else if (req.body.category == "activity")
			dest = "../../public/images/activities";
		cb(null, path.resolve(__dirname, dest));
	},
	filename: (req, file, cb) => {
		let filename = getFileName(req.body);
		cb(null, filename);
	},
});

const uploads = multer({ storage });

function getFileName(body) {
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
router.get("/create", productController.create);
router.post("/create", uploads.single("product-image"), productController.save);
router.get("/edit/:id", productController.edit);
router.put("/edit", uploads.single("product-image"), productController.save);

module.exports = router;
