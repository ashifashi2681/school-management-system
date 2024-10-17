const express = require("express");
const { protect, authorize } = require("../middlewares/authMiddleware");
const {
	createStudent,
	updateStudent,
	deleteStudent,
	getStudents,
	getStudent,
} = require("../controllers/studentController");

const router = express.Router();
router.post("/", protect, authorize("admin", "staff"), createStudent); // create student
router.get("/", protect, getStudents); // get all students
router.get("/:id", protect, getStudent); // get single student
router.put("/:id", protect, authorize("admin", "staff"), updateStudent); // update single student
router.delete("/:id", protect, authorize("admin", "staff"), deleteStudent); // delete single student

module.exports = router;
