const jwt = require("jsonwebtoken");
const User = require("../models/User");

// protect route by token middleware
const protect = async (req, res, next) => {
	try {
		// get token from req.cookie
		const token = req.cookies.jwt;
		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "Please login Continue." });
		}

		// verify and decode token
		const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (!decode) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid token" });
		}

		// get user from token
		const user = await User.findOne({ _id: decode.user_id }).select(
			"-password"
		);
		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: "User not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({ success: false, message: error.message });
	}
};

// get verify token

// protect routes by role middleware
const authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthorized access" });
		}
		next();
	};
};

module.exports = { protect, authorize };
