const express = require("express");
const authRoute = require("./authRoutes");
const studentRoute = require("./studentRoutes");
const feesRoute = require("./feesRoutes")
const libraryRoute = require("./libraryRoutes")
const router = express.Router();

// all routes
router.use("/auth", authRoute);
router.use("/student", studentRoute);
router.use("/fees", feesRoute)
router.use("/library", libraryRoute)

module.exports = router;
