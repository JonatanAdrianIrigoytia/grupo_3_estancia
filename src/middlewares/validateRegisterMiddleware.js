const path = require("path");
const { body } = require("express-validator");

module.exports = [
	body("first_name").notEmpty().withMessage("tienes que escribir un nombre"),
	body("last_name").notEmpty().withMessage("tienes que escribir un apellido"),
	body("email")
		.notEmpty()
		.withMessage("tienes que escribir un email")
		.bail()
		.isEmail()
		.withMessage("debes escribir un formato de email valido"),
	body("password").notEmpty().withMessage("tienes que escribir una contraseña"),
	body("image").custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = [".jpg", ".png"];
		if (!file) {
			throw new Error("tienes que subir una imagen");
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(
					`los formatos permitidos son ${acceptedExtensions.join(", ")}`,
				);
			}
		}
		return true;
	}),
];
