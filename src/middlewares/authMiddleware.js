function authMiddleware(req, res, next) {
	if (!req.session.loggedUser) {
		return res.redirect("/users/login");
	} else if (
		req.params.id &&
		req.session.loggedUser.id != req.params.id &&
		req.session.loggedUser.category != "admin"
	) {
		return res.redirect("/users/login");
	}
	next();
}
module.exports = authMiddleware;
