function guestMiddleware(req, res, next) {
	if (req.session.loggedUser) return res.redirect("/user/profile");
	next();
}

module.exports = guestMiddleware;
