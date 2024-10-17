const bcrypt = require("bcryptjs");
const User = require("../models/User");
const genTokenSetCookies = require("../utils/genTokenSetCookies");

// login
const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		// validate form
		if (!email || !password) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

		// check user exist in the database
		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		// verify password
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res
				.status(400)
				.json({ success: false, message: "Incorrect password" });
		}

		// generate token and set cookies
		if (user && isPasswordCorrect) {
			genTokenSetCookies(user._id, res);

			res.status(200).json({
				success: true,
				message: "Login successful",
				user: {
					_id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			});
		}
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// register user by admin access
const register = async (req, res) => {
	try {
		const { email, name, password, role } = req.body;

		// validate form
		if (!email || !name || !password || !role) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

		// check user exist in the database
		const user = await User.findOne({ email });
		if (user) {
			return res
				.status(400)
				.json({ success: false, message: "User already exist" });
		}

		// hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// create user
		const newUser = new User({
			email,
			name,
			password: hashedPassword,
			role,
		});
		if (newUser) {
			await newUser.save();
			res.status(200).json({ success: true, message: "User created" });
		} else {
			res.status(400).json({
				success: false,
				message: "User not created",
			});
		}
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// update admin's data
const updateAdmin = async (req, res) => {
	try {
		const { name, email } = req.body;

		// get user from req.user
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{
				name,
				email,
			},
			{
				new: true,
			}
		).select("-password");

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "Admin not found" });
		}

		res.status(200).json({ success: true, message: "Admin updated", user });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// change admin's password
const changeAdminPassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;
		if (!oldPassword || !newPassword) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

		// get user from req.user
		const user = await User.findById(req.user._id);
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		const isPasswordCorrect = await bcrypt.compare(
			oldPassword,
			user.password
		);
		if (!isPasswordCorrect) {
			return res
				.status(400)
				.json({ success: false, message: "Incorrect old password" });
		}

		// hash password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// update password
		const updatedUser = await User.findByIdAndUpdate(
			req.user._id,
			{
				password: hashedPassword,
			},
			{
				new: true,
			}
		);
		if (!updatedUser) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, message: "Password updated" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// update single user's data
const updateUser = async (req, res) => {
	try {
		const id = req.params.id;
		const { email, name, role } = req.body;

		// get user and update
		const user = await User.findByIdAndUpdate(
			id,
			{
				email,
				name,
				role,
			},
			{
				new: true,
			}
		).select("-password");

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, message: "User updated", user });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// update single user's password
const changeUserPassword = async (req, res) => {
	try {
		const id = req.params.id;
		const { oldPassword, newPassword } = req.body;
		if (!oldPassword || !newPassword) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

		// get user and update
		const user = await User.findById(id);
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		const isPasswordCorrect = await bcrypt.compare(
			oldPassword,
			user.password
		);
		if (!isPasswordCorrect) {
			return res
				.status(400)
				.json({ success: false, message: "Incorrect old password" });
		}

		// hash password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// update password
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				password: hashedPassword,
			},
			{
				new: true,
			}
		);
		if (!updatedUser) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, message: "Password updated" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// delete single user
const deleteUser = async (req, res) => {
	try {
		const id = req.params.id;
		const deletedUser = await User.findByIdAndDelete(id);
		if (!deletedUser) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, message: "User deleted" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// get all user
const getUsers = async (req, res) => {
	try {
		const users = await User.find({ _id: { $ne: req.user._id } }).select(
			"-password"
		);
		if (!users) {
			return res
				.status(404)
				.json({ success: false, message: "No users found" });
		}
		res.status(200).json({ success: true, users });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// get single user
const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select("-password");
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}
		res.status(200).json({ success: true, user });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// logout user
const logout = async (req, res) => {
	try {
		res.clearCookie("jwt");
		res.status(200).json({
			success: true,
			message: "user logged out successfully",
		});
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	login,
	register,
	updateAdmin,
	changeAdminPassword,
	updateUser,
	changeUserPassword,
	deleteUser,
	getUsers,
	getUser,
	logout,
};
