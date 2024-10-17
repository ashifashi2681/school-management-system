import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createStudent } from "../../redux/features/studentSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ImSpinner2 } from "react-icons/im";
function StudentForm({ setShowForm }) {
	const { isLoading } = useSelector((state) => state.student);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: "",
		studentClass: "",
		age: "",
	});

	/* validate form */
	const formSchema = yup.object().shape({
		name: yup.string().required("Name is required"),
		studentClass: yup.string().required("Class is required"),
		age: yup.string().required("Age is required"),
	});
	const [errors, setErrors] = useState({});

	// submit form
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await formSchema.validate(formData, { abortEarly: false });
			const res = await dispatch(createStudent(formData));
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
						Create New Student
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
							placeholder="Enter Student Name"
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
						/>
						<p className="text-fs-xs font-semibold text-red-500 -mt-2">
							{errors.name}
						</p>

						<label className="text-fs-sm font-[500]">Class</label>
						<input
							type="text"
							onChange={(e) =>
								setFormData({
									...formData,
									studentClass: e.target.value,
								})
							}
							placeholder="Enter Student Class"
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
						/>
						<p className="text-fs-xs font-semibold text-red-500 -mt-2">
							{errors.studentClass}
						</p>
						<label className="text-fs-sm font-[500]">Age</label>
						<input
							type="number"
							onChange={(e) =>
								setFormData({
									...formData,
									age: e.target.value,
								})
							}
							placeholder="Enter Student Age"
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
						/>
						<p className="text-fs-xs font-semibold text-red-500 -mt-2">
							{errors.age}
						</p>
					</div>

					<button
						type="submit"
						className="bg-slate-700 hover:bg-slate-800 text-white w-full mt-3 p-2 rounded-md flex items-center justify-center">
						{isLoading ? (
							<span className="animate-spin text-fs-md">
								<ImSpinner2 />
							</span>
						) : (
							"Create New Student"
						)}
					</button>
				</form>
			</div>
		</>
	);
}

export default StudentForm;
