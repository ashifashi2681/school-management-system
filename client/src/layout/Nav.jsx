import React from "react";
import { IoLogOutSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

function Nav() {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			const res = await dispatch(logout());
			if (res?.payload?.success) {
				toast.success(res?.payload?.message);
				navigate("/login");
			}
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	return (
		<div className="w-full bg-white py-6 shadow-md sticky top-0">
			<div className="w-[95%] max-w-[1400px] mx-auto">
				<div className="flex items-center justify-between">
					<p className="text-fs-sm font-[500]">
						{user?.user?.name} ({user?.user?.role})
					</p>
					<p
						className="flex items-center gap-3 cursor-pointer text-fs-sm font-[500]"
						onClick={handleLogout}>
						<span className="text-fs-base">
							<IoLogOutSharp />
						</span>
						Logout
					</p>
				</div>
			</div>
		</div>
	);
}

export default Nav;
