const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		studentClass: { type: String, required: true },
		age: { type: Number, required: true },
		feesHistory: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Fees",
			},
		],
		libraryHistory: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Library",
			},
		],
	},
	{ timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
