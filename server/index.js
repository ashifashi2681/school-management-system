const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const isAdminExist = require("./config/adminInit");
const apiRoutes = require("./routes/index");

const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const { protect } = require("./middlewares/authMiddleware");

// function to check admin existence
isAdminExist();

// middleware
app.use(
	cors({
		origin: "http://localhost:5173",
		method: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

// routes middleware
app.use("/", apiRoutes);

// route to verify token
app.get("/verify", protect, (req, res) => {
	res.status(200).json({
		message: "Token is verified",
	});
});

// connect db
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`server listening on ${PORT}`);
});
