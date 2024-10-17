import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import ConfirmationBox from "../ConfirmationBox";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../../redux/features/studentSlice";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";

function studentEdit({ user, setIsEditFormOpen, setRefresh }) {
	const { isLoading } = useSelector((state) => state.student);
	const dispatch = useDispatch();
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: user?.name,
		studentClass: user?.studentClass,
		age: user?.age,
		id: user?._id,
	});

	const onConfirm = async () => {
		try {
			const res = await dispatch(updateStudent(formData));
			if (res?.payload?.success) {
				toast(res?.payload?.message);
				setRefresh((prev) => !prev);
				setIsConfirmOpen(false);
				setIsEditFormOpen(false);
			} else {
				toast(res?.payload?.message);
				setIsConfirmOpen(false);
			}
		} catch (error) {
			toast(error?.response?.data?.message);
			setIsConfirmOpen(false);
		}
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
				<form onSubmit={(e) => e.preventDefault()}>
					<h4 className="text-fs-md text-slate-800 text-center font-[600] underline underline-offset-4 mb-5">
						Edit {user?.name}
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
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300 text-fs-sm"
						/>
						<label className="text-fs-sm font-[500]">Class</label>
						<input
							type="text"
							onChange={(e) =>
								setFormData({
									...formData,
									studentClass: e.target.value,
								})
							}
							value={formData.studentClass}
							placeholder=" Name"
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300 text-fs-sm"
						/>
						<label className="text-fs-sm font-[500]">Age</label>
						<input
							type="number"
							onChange={(e) =>
								setFormData({
									...formData,
									age: e.target.value,
								})
							}
							value={formData.age}
							placeholder=" Name"
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300 text-fs-sm"
						/>
					</div>
					<button
						className="bg-slate-700 hover:bg-slate-800 text-white mt-3 px-4 py-2 rounded-md flex items-center justify-center"
						onClick={() => setIsConfirmOpen(true)}>
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

export default studentEdit;
