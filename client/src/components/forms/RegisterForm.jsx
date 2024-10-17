import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { register } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ImSpinner2 } from "react-icons/im";
function RegisterForm({ setShowForm }) {
	const { isLoading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "staff",
	});

	/* validate form */
	const formSchema = yup.object().shape({
		name: yup.string().required("Name is required"),
		email: yup
			.string()
			.email("Invalid email")
			.required("Email is required"),
		password: yup
			.string()
			.min("5", "Password must be at least 5 characters")
			.required("Password is required"),
	});

	const [errors, setErrors] = useState({});

	// submit form
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await formSchema.validate(formData, { abortEarly: false });
			const res = await dispatch(register(formData));
			if (res?.payload?.success) {
				toast(res?.payload?.message);
				setShowForm(false);
			} else {
				toast(res?.payload?.message);
			}
		} catch (error) {
			if (error?.inner) {
				const formError = error?.inner.reduce((acc, err) => {
					return { ...acc, [err.path]: err.message };
				}, {});
				setErrors(formError);
			} else {
				toast(error?.response?.data?.message);
			}
		}
	};
	return (
		<>
			<div className="bg-black opacity-20 fixed inset-0"></div>
			<div className="bg-white w-[80%] max-w-[600px] p-5 rounded-xl shadow absolute top-10 left-[50%] translate-x-[-50%]">
				<span
					className="absolute top-4 right-4 text-fs-md cursor-pointer"
					onClick={() => setShowForm(false)}>
					<AiFillCloseCircle />
				</span>
				<form onSubmit={handleSubmit}>
					<h4 className="text-fs-md text-slate-800 text-center font-[600] underline underline-offset-4 mb-5">
						Register New User
					</h4>
					<div>
						<label className="text-fs-sm font-[500]">Name</label>
						<input
							type="text"
							placeholder="Enter User Name"
							onChange={(e) =>
								setFormData({
									...formData,
									name: e.target.value,
								})
							}
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
						/>
						<p className="text-fs-xs font-semibold text-red-500 -mt-2">
							{errors.name}
						</p>
						<label className="text-fs-sm font-[500]">Email</label>
						<input
							type="email"
							placeholder="Enter User Email"
							onChange={(e) =>
								setFormData({
									...formData,
									email: e.target.value,
								})
							}
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
						/>
						<p className="text-fs-xs font-semibold text-red-500 -mt-2">
							{errors.email}
						</p>

						<label className="text-fs-sm font-[500]">
							Password
						</label>
						<input
							type="password"
							placeholder="Enter User Password"
							onChange={(e) =>
								setFormData({
									...formData,
									password: e.target.value,
								})
							}
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
						/>
						<p className="text-fs-xs font-semibold text-red-500 -mt-2">
							{errors.password}
						</p>
						<label
							htmlFor=""
							className="text-fs-sm font-[500] block">
							User Role
						</label>
						<select
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
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
						type="submit"
						className="bg-slate-700 hover:bg-slate-800 text-white w-full mt-3 p-2 rounded-md flex items-center justify-center">
						{isLoading ? (
							<span className="animate-spin text-fs-md">
								<ImSpinner2 />
							</span>
						) : (
							"Create New User"
						)}
					</button>
				</form>
			</div>
		</>
	);
}

export default RegisterForm;
