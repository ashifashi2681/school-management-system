import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationBox from "../ConfirmationBox";
import { updateFee } from "../../redux/features/feesSlice";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";

function FeesEdit({ setIsEditFormOpen, data, setRefresh }) {
	const { isLoading } = useSelector((state) => state.fees);
	const dispatch = useDispatch();
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [formData, setFormData] = useState({
		feeType: data.feeType,
		amount: data.amount,
		paymentDate: data.paymentDate,
		remarks: data.remarks,
		id: data._id,
	});

	const onConfirm = async () => {
		try {
			const res = await dispatch(updateFee(formData));
			if (res?.payload?.success) {
				toast.success(res?.payload?.message);
				setRefresh((prev) => !prev);
				setIsEditFormOpen(false);
			} else {
				toast.error(res?.payload?.message);
				setIsEditFormOpen(false);
			}
		} catch (error) {
			setIsEditFormOpen(false);
			toast.error(error?.response?.data?.message);
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
				<form onSubmit={(e) => e.preventDefault()}>
					<h4 className="text-fs-md text-slate-800 text-center font-[600] underline underline-offset-4 mb-5">
						Edit Fees Record
					</h4>
					<label htmlFor="" className="text-fs-sm font-[500] block">
						Fee Type
					</label>
					<select
						value={formData.feeType}
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
						value={formData.amount}
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
					<label className="text-fs-sm font-[500] block">
						Payment Date
					</label>
					<input
						value={
							formData.paymentDate
								? formData.paymentDate.slice(0, 10)
								: ""
						}
						onClick={(e) => e.target.showPicker()}
						onChange={(e) => {
							const dateValue = new Date(e.target.value);
							const formattedDate = dateValue
								.toISOString()
								.slice(0, 10);
							setFormData({
								...formData,
								paymentDate: formattedDate,
							});
						}}
						type="date"
						className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300 text-fs-sm"
					/>
					<label className="text-fs-sm font-[500]">Remarks</label>
					<input
						value={formData.remarks}
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
					<button
						className="bg-slate-700 hover:bg-slate-800 text-white mt-3 px-4 py-2 rounded-md"
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
							message={`Update Changes for Fees Record?`}
							onConfirm={onConfirm}
						/>
					)}
				</form>
			</div>
		</>
	);
}

export default FeesEdit;
