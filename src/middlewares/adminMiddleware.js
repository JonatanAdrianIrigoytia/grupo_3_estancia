function adminMiddleware(req, res, next) {
	if (req.session.loggedUser && req.session.loggedUser.category == "admin")
		return next();
	return res.redirect("/users/login");
}

module.exports = adminMiddleware;
