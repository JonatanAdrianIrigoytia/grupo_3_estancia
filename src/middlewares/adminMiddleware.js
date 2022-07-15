function adminMiddleware(req, res, next) {
	if (req.session.loggedUser && req.session.loggedUser.role.name == "admin")
		return next();
	return res.redirect("/users/login");
}

module.exports = adminMiddleware;
