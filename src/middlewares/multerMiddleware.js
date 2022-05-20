const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) =>
		cb(null, path.resolve(__dirname, "../../public/images/users")),
	filename: (req, file, cb) => {
		let filename =
			"img-" +
			req.body.name.toLowerCase().replace(/\s/g, "-") +
			req.body.lastName.toLowerCase().replace(/\s/g, "-") +
			"_" +
			Date.now() +
			path.extname(file.originalname);
		cb(null, filename);
	},
});
const userUploads = multer({ storage });

const storageProducts = multer.diskStorage({
	// La idea de la logica extra en el metodo destination es que si el producto que se esta creando es una habitacion
	// La imagen se guarde en /images/rooms pero si es una actividad se guarde en /images/activities
	destination: (req, file, cb) => {
		let dest = "../../public/images/products/";
		dest += req.body.category == "room" ? "rooms" : "activities";
		console.log(dest);
		cb(null, path.resolve(__dirname, dest));
	},
	filename: (req, file, cb) => {
		let filename = getFileName(req.body, file);
		cb(null, filename);
	},
});

function getFileName(body, file) {
	return (
		"img-" +
		body.name.toLowerCase().replace(/\s/g, "-") +
		"_" +
		Date.now() +
		path.extname(file.originalname)
	);
}

const productUploads = multer({ storageProducts });

module.exports = { user: userUploads, products: productUploads };
