const express = require("express");
const { protect, authorize } = require("../middlewares/authMiddleware");
const {
	createLibrary,
	updateLibrary,
	deleteLibrary,
	getLibraries,
	getLibrary,
} = require("../controllers/libraryController");

const router = express.Router();

router.post("/:id", protect, authorize("admin", "librarian"), createLibrary); // create library for single student
router.put("/:id", protect, authorize("admin", "librarian"), updateLibrary); // update Library
router.delete("/:id", protect, authorize("admin", "librarian"), deleteLibrary); // delete Library
router.get("/", protect, getLibraries); // get all fees libraries
router.get("/:id", protect, getLibrary); // get single fee library

module.exports = router;
