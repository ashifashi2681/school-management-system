import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createLibrary } from "../../redux/features/librarySlice";
import * as yup from "yup";
import { ImSpinner2 } from "react-icons/im";

function LibraryForm({ setShowLibraryForm, id }) {
	const { isLoading } = useSelector((state) => state.library);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		studentId: id,
		bookName: "",
		borrowDate: "",
	});

	/* validate form */
	const formSchema = yup.object().shape({
		bookName: yup.string().required("Book Name is required"),
		borrowDate: yup.string().required("Borrow Date is required"),
	});
	const [errors, setErrors] = useState({});


// submit form
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await formSchema.validate(formData, { abortEarly: false });
			const res = await dispatch(createLibrary(formData));
			if (res?.payload?.success) {
				toast(res?.payload?.message);
				setShowLibraryForm(false);
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
					onClick={() => setShowLibraryForm(false)}>
					<AiFillCloseCircle />
				</span>

				<form onSubmit={handleSubmit}>
					<h4 className="text-fs-md text-slate-800 text-center font-[600] underline underline-offset-4 mb-5">
						Add Library
					</h4>
					<div>
						<label htmlFor="" className="text-fs-sm font-[500]">
							Book Name
						</label>
						<input
							type="text"
							onChange={(e) =>
								setFormData({
									...formData,
									bookName: e.target.value,
								})
							}
							placeholder="Enter Book Name"
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
						/>
						<p className="text-fs-xs font-semibold text-red-500 -mt-2">
							{errors.bookName}
						</p>

						<label className="text-fs-sm font-[500] block">
							Borrow Date
						</label>
						<input
							type="date"
							onClick={(e) => e.target.showPicker()}
							onChange={(e) =>
								setFormData({
									...formData,
									borrowDate: e.target.value,
								})
							}
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
						/>
						<p className="text-fs-xs font-semibold text-red-500 -mt-2">
							{errors.borrowDate}
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
							"Add New Library"
						)}
					</button>
				</form>
			</div>
		</>
	);
}

export default LibraryForm;
