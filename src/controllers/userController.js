const { validationResult } = require("express-validator");
const User = require("../models/User");
const fs = require("fs");
const { timeConverter } = require("../helpers/timeConverter");
const userController = {
	renderLogin: (req, res) => {
		res.render("login");
	},
	register: (req, res) => {
		res.render("register");
	},
	//El login no va a hacer esto sino que deberia autenticar al usuario (SPRINT 5)
	login: async (req, res) => {
		//Aca hay que llamar al metodo login que va a estar en el modelo del usuario
		let { errors, loggedUser } = await User.login(req.body);
		if (errors) return res.render("login", { oldData: req.body, errors });
		delete loggedUser.password;
		req.session.loggedUser = loggedUser.dataValues;
		if (req.body.rememberme)
			res.cookie("userEmail", loggedUser.dataValues.email, {
				maxAge: timeConverter(1, "days"),
			});
		res.redirect("/");
	},
	forgotPassword: (req, res) => {
		res.send("Revise su correo electronico");
	},
	profile: async (req, res) => {
		if (req.params.id) {
			let user = await User.findById(req.params.id);
			if (user) return res.render("profile", { user: user.dataValues });
		} else if (!req.params.id && req.session.loggedUser)
			return res.render("profile", { user: req.session.loggedUser });
		res.redirect("/");
	},
	editProfile: async (req, res) => {
		let user = await User.findById(req.params.id);
		if (user) return res.render("editProfile", { user });
		res.redirect("/");
	},
	save: async (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			if (req.file) fs.unlinkSync(req.file.path);
			return res.render("register", {
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		}

		let errors, id;
		if (req.params.id) {
			({ errors, id } = await User.edit(
				req.params.id,
				req.body,
				req.file ? req.file.filename : undefined,
			));
		} else {
			({ errors, id } = await User.create(
				req.body,
				req.file ? req.file.filename : undefined,
			));
		}
		if (errors) {
			if (req.params.id) {
				return res.render("editProfile", {
					errors: errors,
					oldData: req.body,
				});
			}
			return res.render("register", {
				errors: errors,
				oldData: req.body,
			});
		}
		res.redirect(id ? `/users/profile/${id}` : "/");
	},

	delete: (req, res) => {
		User.delete(req.params.id).then(res.redirect("/"));
	},

	logout: (req, res) => {
		//borra todo lo que hay en sesion
		req.session.destroy();
		res.clearCookie("userEmail");
		return res.redirect("/");
	},
	checkEmail: async (req, res) => {
		console.log("Body", req.body);
		let emailExists = await User.checkEmail(req.body.email);
		res.json({ emailExists });
	},
};

module.exports = userController;
