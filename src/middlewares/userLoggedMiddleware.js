function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	if (req.session.loggedUser) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.loggedUser;
	}
	next();
}

module.exports = userLoggedMiddleware;
