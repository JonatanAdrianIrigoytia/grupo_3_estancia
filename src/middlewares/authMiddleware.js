function authMiddleware(req, res, next) {
	console.log("Auth Middleware", req.session.loggedUser);
	if (!req.session.loggedUser) {
		return res.redirect("/users/login");
	} else if (
		req.params.id &&
		req.session.loggedUser.id != req.params.id &&
		req.session.loggedUser.role.name != "admin"
	) {
		return res.redirect("/users/login");
	}
	next();
}
module.exports = authMiddleware;
