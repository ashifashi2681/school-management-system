import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance.js";

function ProtectedRoute({ roles }) {
	const user = JSON.parse(localStorage.getItem("user"));

	// check token is verified, else clear the userdata from local storage
	useEffect(() => {
		const verifyToken = async () => {
			try {
				await axiosInstance.get("verify");
			} catch (error) {
				if (
					error?.response?.status === 401 ||
					error?.response?.status === 403
				) {
					<Navigate to="/login" />;
					localStorage.removeItem("user");
				}
			}
		};

		verifyToken();
	}, []);



	return roles.includes(user?.user.role) ? (
		<Outlet />
	) : user ? (
		<Navigate to="/" />
	) : (
		<Navigate to="/login" />
	);
}

export default ProtectedRoute;
