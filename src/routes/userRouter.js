const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const { userValidations } = require("../middlewares/validationMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
// ************ Multer Configuration ************
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) =>
		cb(null, path.resolve(__dirname, "../../public/images/users")),
	filename: (req, file, cb) => {
		let filename =
			"img-" +
			req.body.firstName.toLowerCase().replace(/\s/g, "-") +
			req.body.lastName.toLowerCase().replace(/\s/g, "-") +
			"_" +
			Date.now() +
			path.extname(file.originalname);
		cb(null, filename);
	},
});
const userUploads = multer({ storage });
router.get("/login", guestMiddleware, userController.renderLogin);
router.get("/register", guestMiddleware, userController.register);
router.get("/forgot-password", guestMiddleware, userController.forgotPassword);
router.get("/profile", authMiddleware, userController.profile);
router.get("/profile/:id", authMiddleware, userController.profile);
router.get("/edit/:id", userController.editProfile);
router.post("/login", userController.login);
router.post(
	"/register",
	userUploads.single("image"),
	userValidations,
	userController.save,
);
router.delete("/:id", adminMiddleware, userController.delete);
router.put(
	"/:id",
	authMiddleware,
	userUploads.single("image"),
	userValidations,
	userController.save,
);
//logout
router.get("/logout", userController.logout);

router.post("/check-email", userController.checkEmail);

module.exports = router;
