function adminMiddleware(req, res, next) {
	if (req.session.loggedUser && req.session.loggedUser.category == "admin")
		next();
	return res.redirect("/users/login");
}

module.exports = adminMiddleware;
