import React, { useState } from "react";
import SideBar from "../layout/sideBar";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationBox from "../components/ConfirmationBox";
import { changeAdminPassword, updateAdmin } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";

function DashBoard() {
	const { user, isLoading } = useSelector((state) => state?.auth);
	const dispatch = useDispatch();
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [confirmAction, setConfirmAction] = useState("");
	const [formData, setFormData] = useState({
		oldPassword: "",
		newPassword: "",
	});
	const [userData, setUserData] = useState({
		name: user?.user?.name,
		email: user?.user?.email,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleUpdate = () => {
		setConfirmAction("updatePassword");
		setIsConfirmOpen(true);
	};

	const onConfirm = async () => {
		try {
			const res = await dispatch(changeAdminPassword(formData));
			if (res?.payload?.success) {
				toast.success(res?.payload?.message);
				setFormData({ oldPassword: "", newPassword: "" });
				setIsConfirmOpen(false);
			} else {
				toast.error(res?.payload?.message);
				setIsConfirmOpen(false);
			}
		} catch (error) {
			toast.error(error?.response?.data?.message);
			setIsConfirmOpen(false);
		}
	};

	const handleUpdateAdmin = () => {
		setConfirmAction("updateAdmin");
		setIsConfirmOpen(true);
	};

	const onConfirmAdmin = async () => {
		try {
			const res = await dispatch(updateAdmin(userData));
			if (res?.payload?.success) {
				toast.success(res?.payload?.message);
				setIsConfirmOpen(false);
			} else {
				toast.error(res?.payload?.message);
				setIsConfirmOpen(false);
			}
		} catch (error) {
			toast.error(error?.response?.data?.message);
			setIsConfirmOpen(false);
		}
	};

	return (
		<Layout>
			<SideBar>
				<div className="bg-white rounded-xl shadow-md px-3 py-5">
					<div className="mt-5">
						<div className="flex items-center gap-3">
							<h5 className="text-fs-base font-[600]">
								{user?.user?.name}
							</h5>
							<span className="text-fs-sm font-[500]">
								({user?.user?.role})
							</span>
						</div>
						<p className="text-fs-sm font-[500]">
							{user?.user?.email}
						</p>
					</div>
				</div>

				{user?.user?.role === "admin" && (
					<>
						<div className="bg-white rounded-xl shadow-md px-3 py-5 h-fit col-span-2 mt-3">
							<h4 className="text-fs-base font-[600] underline mb-5">
								Update Details
							</h4>
							<form onSubmit={handleSubmit}>
								<label className="text-fs-sm font-[500]">
									Name
								</label>
								<input
									type="text"
									placeholder="Enter Name"
									value={userData?.name}
									onChange={(e) =>
										setUserData({
											...userData,
											name: e.target.value,
										})
									}
									className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
								/>
								<label className="text-fs-sm font-[500]">
									email
								</label>
								<input
									type="text"
									placeholder="Enter New Password"
									value={userData?.email}
									onChange={(e) =>
										setUserData({
											...userData,
											email: e.target.value,
										})
									}
									className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
								/>
								<button
									className="bg-slate-700 hover:bg-slate-800 text-white  p-2 rounded-md flex justify-center"
									onClick={() => handleUpdateAdmin()}>
									{isLoading ? (
										<span className="animate-spin text-fs-md">
											<ImSpinner2 />
										</span>
									) : (
										"Update"
									)}
								</button>
							</form>
						</div>

						<div className="bg-white rounded-xl shadow-md px-3 py-5 h-fit col-span-2 mt-3">
							<h4 className="text-fs-base font-[600] underline mb-5">
								Update Password
							</h4>
							<form onSubmit={handleSubmit}>
								<label className="text-fs-sm font-[500]">
									Old Password
								</label>
								<input
									type="password"
									placeholder="Enter Old Password"
									value={formData.oldPassword}
									onChange={(e) =>
										setFormData({
											...formData,
											oldPassword: e.target.value,
										})
									}
									className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
								/>
								<label className="text-fs-sm font-[500]">
									New Password
								</label>
								<input
									type="password"
									placeholder="Enter New Password"
									value={formData.newPassword}
									onChange={(e) =>
										setFormData({
											...formData,
											newPassword: e.target.value,
										})
									}
									className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
								/>
								<button
									className="bg-slate-700 hover:bg-slate-800 text-white  p-2 rounded-md flex justify-center"
									onClick={() => handleUpdate()}>
									{isLoading ? (
										<span className="animate-spin text-fs-md">
											<ImSpinner2 />
										</span>
									) : (
										"Update Password"
									)}
								</button>
							</form>
						</div>
					</>
				)}

				{isConfirmOpen && (
					<ConfirmationBox
						setIsConfirmOpen={setIsConfirmOpen}
						message={
							confirmAction === "updateAdmin"
								? `Update Admin Details?`
								: `Update Password?`
						}
						onConfirm={
							confirmAction === "updateAdmin"
								? onConfirmAdmin
								: onConfirm
						}
					/>
				)}
			</SideBar>
		</Layout>
	);
}

export default DashBoard;
