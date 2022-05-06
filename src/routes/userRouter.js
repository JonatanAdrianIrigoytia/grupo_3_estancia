const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const multer = require("multer");

// ************ Multer Configuration ************\
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
const uploads = multer({ storage });

router.get("/login", userController.renderLogin);
router.get("/register", userController.renderRegister);
router.post("/login", userController.login);
router.post("/register", uploads.single("user-image"), userController.register);

module.exports = router;
