function guestMiddleware(req, res, next) {
	if (req.session.loggedUser) return res.redirect("/users/profile");
	return next();
}

module.exports = guestMiddleware;
