const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema(
	{
		studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
		feeType: {
			type: String,
			enum: ["Tuition", "Library", "Other"],
			required: true,
		},
		amount: { type: Number, required: true },
		paymentDate: { type: Date, required: true },
		remarks: { type: String, required: true },
	},
	{ timestamps: true }
);

const Fees = mongoose.model("Fees", feesSchema);
module.exports = Fees;
