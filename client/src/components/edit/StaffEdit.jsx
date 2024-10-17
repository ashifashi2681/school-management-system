import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import ConfirmationBox from "../ConfirmationBox";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/features/authSlice";
import { ImSpinner2 } from "react-icons/im";

function StaffEdit({ user, setIsEditFormOpen, setRefresh }) {
	const { isLoading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
		role: user.role,
		id: user._id,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const onConfirm = async () => {
		try {
			const res = await dispatch(updateUser(formData));
			if (res?.payload?.success) {
				toast(res?.payload?.message);
				setRefresh((prev) => !prev);
				setIsEditFormOpen(false);
			} else {
				toast(res?.payload?.message);
				setIsEditFormOpen(false);
			}
		} catch (error) {
			toast(error?.response?.data?.message);
			setIsEditFormOpen(false);
		}
	};

	const handleUpdate = () => {
		setIsConfirmOpen(true);
	};
	return (
		<>
			<div className="bg-black opacity-20 fixed inset-0"></div>
			<div className="bg-white w-[80%] max-w-[600px] p-5 rounded-xl shadow absolute top-10 left-[50%] translate-x-[-50%]">
				<span
					className="absolute top-4 right-4 text-fs-md cursor-pointer"
					onClick={() => setIsEditFormOpen(false)}>
					<AiFillCloseCircle />
				</span>
				<form onSubmit={handleSubmit}>
					<h4 className="text-fs-md text-slate-800 text-center font-[600] underline underline-offset-4 mb-5">
						Edit {user.name}
					</h4>
					<div>
						<label className="text-fs-sm font-[500]">Name</label>
						<input
							type="text"
							onChange={(e) =>
								setFormData({
									...formData,
									name: e.target.value,
								})
							}
							value={formData.name}
							placeholder=" Name"
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
						/>

						<label className="text-fs-sm font-[500]">Email</label>
						<input
							type="email"
							onChange={(e) =>
								setFormData({
									...formData,
									email: e.target.value,
								})
							}
							value={formData.email}
							placeholder="Email"
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
						/>
						<label
							htmlFor=""
							className="text-fs-sm font-[500] block">
							User Role
						</label>
						<select
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
							value={formData.role}
							onChange={(e) =>
								setFormData({
									...formData,
									role: e.target.value,
								})
							}>
							<option value="staff">Staff</option>
							<option value="librarian">Librarian</option>
							<option value="admin">Admin</option>
						</select>
					</div>
					<button
						className="bg-slate-700 hover:bg-slate-800 text-white mt-3 px-4 py-2 rounded-md flex items-center justify-center"
						onClick={() => handleUpdate()}>
						{isLoading ? (
							<span className="animate-spin text-fs-md">
								<ImSpinner2 />
							</span>
						) : (
							"Update"
						)}
					</button>

					{isConfirmOpen && (
						<ConfirmationBox
							setIsConfirmOpen={setIsConfirmOpen}
							message={`Update Changes for ${user.name}?`}
							onConfirm={onConfirm}
						/>
					)}
				</form>
			</div>
		</>
	);
}

export default StaffEdit;
