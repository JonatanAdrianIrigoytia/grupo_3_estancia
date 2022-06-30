const User = require("../models/User");
async function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	let userFromCookie = undefined;
	if (req.cookies.userEmail) {
		let emailInCookie = req.cookies.userEmail;
		userFromCookie = await User.findByField("email", emailInCookie);
	}
	if (userFromCookie) {
		delete userFromCookie.password;
		req.session.loggedUser = userFromCookie.dataValues;
	}
	if (req.session.loggedUser) {
		res.locals.isLogged = true;
		res.locals.loggedUser = req.session.loggedUser;
	}

	next();
}

module.exports = userLoggedMiddleware;
