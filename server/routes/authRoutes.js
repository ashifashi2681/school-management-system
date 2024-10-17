const express = require("express");
const {
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
} = require("../controllers/authController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

// auth routes
router.post("/login", login);
router.post("/register", protect, authorize("admin"), register);
router.put("/", protect, authorize("admin"), updateAdmin); // update admin's data
router.put("/password", protect, authorize("admin"), changeAdminPassword); // update admin's password
router.put("/:id", protect, authorize("admin"), updateUser); // update user's data
router.put("/password/:id", protect, authorize("admin"), changeUserPassword); // update user's password
router.delete("/:id", protect, authorize("admin"), deleteUser); // delete user
router.get("/", protect, authorize("admin"), getUsers); // get all user
router.get("/:id", protect, authorize("admin"), getUser); // get single user
router.post("/logout", logout)

module.exports = router;
