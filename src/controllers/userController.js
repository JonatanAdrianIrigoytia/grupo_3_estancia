const userController = {
	renderLogin: (req, res) => {
		res.render("login");
	},
	renderRegister: (req, res) => {
		res.render("register");
	},
	//El login no va a hacer esto sino que deberia autenticar al usuario pero aun no vimos como hacer esto
	login: (req, res) => {
		res.render("index");
	},
	//El login no va a hacer esto sino que deberia registrar al usuario en la base de datos
	register: (req, res) => {
		res.render("index");
	},
	forgotPassword: (req, res) => {
		res.send("Revise su correo electronico");
	},
};

module.exports = userController;
