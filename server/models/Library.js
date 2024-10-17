const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
	{
		studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
		bookName: { type: String, required: true },
		borrowDate: { type: Date, required: true },
		returnDate: { type: Date },
		status: {
			type: String,
			enum: ["Borrowed", "Returned"],
			default: "Borrowed",
			required: true,
		},
	},
	{ timestamps: true }
);

const Library = mongoose.model("Library", librarySchema);
module.exports = Library;
