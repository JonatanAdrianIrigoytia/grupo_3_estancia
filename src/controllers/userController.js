const { validationResult } = require("express-validator");
const User = require("../models/User");

const userController = {
	renderLogin: (req, res) => {
		res.render("login");
	},
	register: (req, res) => {
		res.render("register");
	},
	//El login no va a hacer esto sino que deberia autenticar al usuario (SPRINT 5)
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
		let id = undefined;
		if (req.params.id)
			id = User.edit(
				req.params.id,
				req.body,
				req.file ? req.file.filename : undefined,
			);
		else id = User.create(req.body, req.file ? req.file.filename : undefined);
		res.redirect(id ? `/profile/${id}` : "/");
	},

	delete: (req, res) => {
		User.delete(req.params.id);
		res.redirect("/");
	},
};

module.exports = userController;
