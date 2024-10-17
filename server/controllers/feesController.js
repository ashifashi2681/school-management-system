const Fees = require("../models/Fees");
const Student = require("../models/Student");

// create a new fees record for single student
const createFees = async (req, res) => {
	try {
		const studentId = req.params.id;
		const { feeType, amount, paymentDate, remarks } = req.body;
		// validate form
		if (!studentId || !feeType || !amount || !paymentDate || !remarks) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

		const fees = new Fees({
			studentId,
			feeType,
			amount,
			paymentDate,
			remarks,
		});
		if (!fees) {
			return res
				.status(400)
				.json({ success: false, message: "Fees not created" });
		}

		// push fees to student
		const student = await Student.findByIdAndUpdate(
			studentId,
			{
				$push: {
					feesHistory: fees._id,
				},
			},
			{
				new: true,
			}
		);
		if (!student) {
			return res
				.status(400)
				.json({ success: false, message: "Student not found" });
		}

		// save fees
		await fees.save();
		res.status(200).json({
			success: true,
			message: "Fees created",
			fees,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// update fees record
const updateFees = async (req, res) => {
	try {
		const feesId = req.params.id;
		const { feeType, amount, paymentDate, remarks } = req.body;

		const fees = await Fees.findByIdAndUpdate(
			feesId,
			{
				feeType,
				amount,
				paymentDate,
				remarks,
			},
			{
				new: true,
			}
		);
		if (!fees) {
			return res
				.status(400)
				.json({ success: false, message: "Fees not found" });
		}
		res.status(200).json({
			success: true,
			message: "Fees updated",
			fees,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// delete fees record
const deleteFees = async (req, res) => {
	try {
		const feesId = req.params.id;
		const fees = await Fees.findByIdAndDelete(feesId);
		if (!fees) {
			return res
				.status(400)
				.json({ success: false, message: "Fees not found" });
		}
		res.status(200).json({
			success: true,
			message: "Fees deleted",
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// get all fees records
const getFees = async (req, res) => {
	try {
		const fees = await Fees.find().populate("studentId");
		if (!fees) {
			return res
				.status(400)
				.json({ success: false, message: "Fees not found" });
		}
		res.status(200).json({
			success: true,
			fees,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// get single fee record
const getFee = async (req, res) => {
	try {
		const fee = await Fees.findById(req.params.id);
		if (!fee) {
			return res
				.status(400)
				.json({ success: false, message: "Fee not found" });
		}
		res.status(200).json({
			success: true,
			fee,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

module.exports = {
	createFees,
	updateFees,
	deleteFees,
	getFees,
	getFee,
};
