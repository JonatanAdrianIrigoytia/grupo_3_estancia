const { validationResult } = require("express-validator");
const User = require("../models/User");

const userController = {
	renderLogin: (req, res) => {
		res.render("login");
	},
	register: (req, res) => {
		res.render("register");
	},
	//El login no va a hacer esto sino que deberia autenticar al usuario pero aun no vimos como hacer esto
	login: (req, res) => {
		res.render("index");
	},
	forgotPassword: (req, res) => {
		res.send("Revise su correo electronico");
	},
	profile: (req, res) => {
		let user = User.findById(req.params.id);
		res.render("profile", { user });
	},
	save: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render("register", {
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		}

		if (req.params.id)
			User.edit(
				req.params.id,
				req.body,
				req.file ? req.file.filename : undefined,
			);
		else User.create(req.body, req.file ? req.file.filename : undefined);
		res.redirect("/");
	},
};

module.exports = userController;
