const express = require("express");
const { protect, authorize } = require("../middlewares/authMiddleware");
const { createFees, updateFees, deleteFees, getFees, getFee } = require("../controllers/feesController");

const router = express.Router();

router.post("/:id", protect, authorize("admin", "staff"), createFees); // create fees for single student
router.put("/:id", protect, authorize("admin", "staff"), updateFees); // update fees
router.delete("/:id", protect, authorize("admin", "staff"), deleteFees); // delete fees
router.get("/", protect, authorize("admin", "staff"), getFees); // get all fees records
router.get("/:id", protect, authorize("admin", "staff"), getFee) // get single fee record

module.exports = router;
