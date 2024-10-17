const Student = require("../models/Student");

// create a new student
const createStudent = async (req, res) => {
	try {
		const { name, studentClass, age } = req.body;
		// validate form
		if (!name || !studentClass || !age) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

		const student = new Student({
			name,
			studentClass,
			age,
		});

		await student.save();
		res.status(200).json({
			success: true,
			message: "Student created",
			student,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// get all studets
const getStudents = async (req, res) => {
	try {
		const students = await Student.find();

		if (!students) {
			return res
				.status(400)
				.json({ success: false, message: "No students found" });
		}
		res.status(200).json({ success: true, students });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// get single student by id
const getStudent = async (req, res) => {
	try {
		const student = await Student.findById(req.params.id).populate(
			"feesHistory libraryHistory"
		);
		if (!student) {
			return res
				.status(400)
				.json({ success: false, message: "Student not found" });
		}
		res.status(200).json({ success: true, student });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// update single student by id
const updateStudent = async (req, res) => {
	try {
		const { name, studentClass, age } = req.body;

		const student = await Student.findByIdAndUpdate(
			req.params.id,
			{
				name,
				studentClass,
				age,
			},
			{
				new: true,
			}
		);

		if (!student) {
			return res
				.status(404)
				.json({ success: false, message: "Student not found" });
		}

		res.status(200).json({
			success: true,
			message: "Student details updated",
			student,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// delete single student by id
const deleteStudent = async (req, res) => {
	try {
		const student = await Student.findByIdAndDelete(req.params.id);
		if (!student) {
			return res
				.status(404)
				.json({ success: false, message: "Student not found" });
		}
		res.status(200).json({ success: true, message: "Student deleted" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
module.exports = {
	createStudent,
	updateStudent,
	deleteStudent,
	getStudents,
	getStudent,
};
