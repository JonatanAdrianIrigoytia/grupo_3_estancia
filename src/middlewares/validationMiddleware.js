const { check } = require("express-validator");

const userValidations = [
	check("firstName")
		.notEmpty()
		.withMessage("Debe ingresar un nombre")
		.bail()
		.isLength({ min: 2 })
		.withMessage("El nombre debe tener al menos 2 caracteres"),
	check("lastName")
		.notEmpty()
		.withMessage("Debe ingresar un apellido")
		.bail()
		.isLength({ min: 2 })
		.withMessage("El apellido debe tener al menos 2 caracteres"),
	check("email")
		.notEmpty()
		.withMessage("Debe ingresar un email")
		.bail()
		.isEmail()
		.withMessage("Debe ingresar un formato de email valido"),
	check("password")
		.notEmpty()
		.withMessage("Debe ingresar una contraseña")
		.bail()
		.isLength({ min: 8 })
		.withMessage("La contraseña debe tener como mínimo 8 caracteres")
		.bail()
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&\.])[0-9a-zA-Z\d@$!%*#?&\.]{8,}$/,
			"i",
		)
		.withMessage(
			"La contraseña debe tener como mínimo una mayúscula, una minúscula, un número y un símbolo",
		),
	check("confirmPassword")
		.notEmpty()
		.withMessage("Debe confirmar su contraseña")
		.bail()
		.isLength({ min: 8 })
		.withMessage("La contraseña debe tener como mínimo 8 caracteres")
		.bail()
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&\.])[0-9a-zA-Z\d@$!%*#?&\.]{8,}$/,
			"i",
		)
		.withMessage(
			"La contraseña debe tener como mínimo una mayúscula, una minúscula, un número y un símbolo",
		)
		.custom((value, { req }) => {
			if (value != req.body.password) {
				throw new Error("Las contraseñas no coinciden");
			}
			return true;
		}),
	check("image").custom((_value, { req }) => {
		console.log(req.file);
		if (req.file) {
			if (
				req.file.mimetype !== "image/jpeg" &&
				req.file.mimetype !== "image/png" &&
				req.file.mimetype !== "image/jpeg" &&
				req.file.mimetype !== "image/gif"
			) {
				throw new Error(
					"El formato de la imagen es inválido, la imagen debe ser (JPG, JPEG, PNG, GIF)",
				);
			}
		}
		return true;
	}),
];
const productValidations = [
	check("name")
		.isLength({ min: 5 })
		.withMessage("El nombre debe tener al menos 5 caracteres"),
	check("description")
		.isLength({ min: 20 })
		.withMessage("La descripción debe tener al menos 20 caracteres"),
	check("image").custom((_value, { req }) => {
		if (req.file) {
			if (
				req.file.mimeType !== "image/jpeg" ||
				req.file.mimeType !== "image/png" ||
				req.file.mimeType !== "image/jpeg" ||
				req.file.mimeType !== "image/gif"
			) {
				throw new Error(
					"El formato de la imagen es inválido, la imagen debe ser (JPG, JPEG, PNG, GIF)",
				);
			}
		}
		return true;
	}),
];
module.exports = { userValidations, productValidations };
