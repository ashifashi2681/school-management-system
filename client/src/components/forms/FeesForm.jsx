import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createFee } from "../../redux/features/feesSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ImSpinner2 } from "react-icons/im";

function FeesForm({ setShowFeeForm, id }) {
	const { isLoading } = useSelector((state) => state.fees);

	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		studentId: id,
		feeType: "Tuition",
		amount: "",
		paymentDate: "",
		remarks: "",
	});

	/* validate form */
	const formSchema = yup.object().shape({
		amount: yup.string().required("Amount is required"),
		paymentDate: yup.string().required("Payment Date is required"),
		remarks: yup.string().required("Remarks is required"),
	});
	const [error, setError] = useState({});

	// submit form
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await formSchema.validate(formData, { abortEarly: false });
			const res = await dispatch(createFee(formData));
			if (res?.payload?.success) {
				toast(res?.payload?.message);
				setShowFeeForm(false);
			} else {
				toast(res?.payload?.message);
			}
		} catch (error) {
			if (error?.inner) {
				const formError = error?.inner.reduce((acc, err) => {
					return { ...acc, [err.path]: err.message };
				}, {});
				setError(formError);
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
					onClick={() => setShowFeeForm(false)}>
					<AiFillCloseCircle />
				</span>

				<form onSubmit={handleSubmit}>
					<h4 className="text-fs-md text-slate-800 text-center font-[600] underline underline-offset-4 mb-5">
						Create Fee
					</h4>
					<div>
						<label
							htmlFor=""
							className="text-fs-sm font-[500] block">
							Fee Type
						</label>
						<select
							onChange={(e) =>
								setFormData({
									...formData,
									feeType: e.target.value,
								})
							}
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300 text-fs-sm">
							<option value="Tuition">Tuition</option>
							<option value="Library">Library</option>
							<option value="Other">Other</option>
						</select>

						<label className="text-fs-sm font-[500]">Amount</label>
						<input
							onChange={(e) =>
								setFormData({
									...formData,
									amount: e.target.value,
								})
							}
							type="number"
							placeholder="Enter Amount"
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300 text-fs-sm"
						/>
						<p className="text-fs-xs font-semibold text-red-500 -mt-2">
							{error.amount}
						</p>
						<label className="text-fs-sm font-[500] block">
							Payment Date
						</label>
						<input
							onClick={(e) => e.target.showPicker()}
							onChange={(e) =>
								setFormData({
									...formData,
									paymentDate: e.target.value,
								})
							}
							type="date"
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300 text-fs-sm"
						/>
						<p className="text-fs-xs font-semibold text-red-500 -mt-2">
							{error.paymentDate}
						</p>

						<label className="text-fs-sm font-[500]">Remarks</label>
						<input
							onChange={(e) =>
								setFormData({
									...formData,
									remarks: e.target.value,
								})
							}
							type="text"
							placeholder="Enter Remarks"
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300 text-fs-sm"
						/>
						<p className="text-fs-xs font-semibold text-red-500 -mt-2">
							{error.remarks}
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
							"Create New Fee"
						)}
					</button>
				</form>
			</div>
		</>
	);
}

export default FeesForm;
