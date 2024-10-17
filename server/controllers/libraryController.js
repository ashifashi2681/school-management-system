const Library = require("../models/Library");
const Student = require("../models/Student");

// create a new library record for single student
const createLibrary = async (req, res) => {
	try {
		const studentId = req.params.id;
		const { bookName, borrowDate } = req.body;
		// validate form
		if (!studentId || !bookName || !borrowDate) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const library = new Library({
			studentId,
			bookName,
			borrowDate,
		});

		if (!library) {
			return res
				.status(400)
				.json({ success: false, message: "Library not created" });
		}

		// push library to student
		const student = await Student.findByIdAndUpdate(
			studentId,
			{
				$push: {
					libraryHistory: library._id,
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

		await library.save();
		res.status(200).json({
			success: true,
			message: "Library created",
			library,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// update library record
const updateLibrary = async (req, res) => {
	try {
		const libraryId = req.params.id;
		const { bookName, borrowDate, returnDate, status } = req.body;
	
		const library = await Library.findByIdAndUpdate(
			libraryId,
			{
				bookName,
				borrowDate,
				returnDate,
                status,
			},
			{
				new: true,
			}
		);
		if (!library) {
			return res
				.status(400)
				.json({ success: false, message: "Library not found" });
		}
		res.status(200).json({
			success: true,
			message: "Library updated",
			library,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// delete library record
const deleteLibrary = async (req, res) => {
    try {
        const libraryId = req.params.id;
        const library = await Library.findByIdAndDelete(libraryId);
        if (!library) {
            return res
                .status(400)
                .json({ success: false, message: "Library not found" });
        }
        res.status(200).json({
            success: true,
            message: "Library deleted",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get all libraries
const getLibraries = async (req, res) => {
    try {
        const libraries = await Library.find().populate("studentId");
        if (!libraries) {
            return res
                .status(400)
                .json({ success: false, message: "No libraries found" });
        }
        res.status(200).json({ success: true, libraries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get single library
const getLibrary = async (req, res) => {
    try {
        const library = await Library.findById(req.params.id);
        if (!library) {
            return res
                .status(400)
                .json({ success: false, message: "Library not found" });
        }
        res.status(200).json({ success: true, library });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
	createLibrary,
    updateLibrary,
    deleteLibrary,
    getLibraries,
    getLibrary
};
