const bcrypt = require("bcryptjs");
const User = require("../models/User");

// at start of the app if there is no admin nor users, create admin account
const isAdminExist = async () => {
	try {
		const users = await User.find({});

		if (users.length === 0) {
			const hashedPassword = await bcrypt.hash(
				process.env.ADMIN_PASSWORD,
				10
			);

			const admin = new User({
				email: process.env.ADMIN_EMAIL,
				name: process.env.ADMIN_NAME,
				password: hashedPassword,
				role: "admin",
			});

			await admin.save();
			console.log("admin created");
		} else {
			// console.log("admin already exist");
		}
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = isAdminExist;
