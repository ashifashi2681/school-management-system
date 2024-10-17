import React from "react";
import DashBoard from "./pages/DashBoard";
import { Routes, Route } from "react-router-dom";
import AllStaff from "./pages/AllStaff";
import AllStudents from "./pages/AllStudents";
import FeesHistory from "./pages/FeesHistory";
import LibraryHistory from "./pages/LibraryHistory";
import Login from "./pages/Login";
import Student from "./pages/Student";
import ProtectedRoute from "./routes/ProtectedRoute";
import Staff from "./pages/Staff";

function App() {
	return (
		<div className="bg-slate-200 min-h-screen">
			<Routes>
				<Route
					element={
						<ProtectedRoute
							roles={["admin", "staff", "librarian"]}
						/>
					}>
					<Route path="/" element={<DashBoard />} />
					<Route
						path="/library-history"
						element={<LibraryHistory />}
					/>
					<Route path="/all-student" element={<AllStudents />} />
					<Route path="/all-student/:id" element={<Student />} />
				</Route>

				<Route element={<ProtectedRoute roles={["admin", "staff"]} />}>
					<Route path="/fees-history" element={<FeesHistory />} />
				</Route>
				<Route element={<ProtectedRoute roles={["admin"]} />}>
					<Route path="/all-staff" element={<AllStaff />} />
					<Route path="/all-staff/:id" element={<Staff />} />
				</Route>

				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
