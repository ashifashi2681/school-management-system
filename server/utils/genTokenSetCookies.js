const jwt = require("jsonwebtoken");

const genTokenSetCookies = (user_id, res) => {
	const token = jwt.sign({ user_id }, process.env.JWT_SECRET_KEY, {
		expiresIn: "1d",
	});
	res.cookie("jwt", token, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		maxAge: 24 * 60 * 60 * 1000,
	});
};

module.exports = genTokenSetCookies;
