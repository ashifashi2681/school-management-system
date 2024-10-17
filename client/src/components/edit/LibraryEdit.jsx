import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationBox from "../ConfirmationBox";
import { updateLibrary } from "../../redux/features/librarySlice";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";

function LibraryEdit({ setIsEditFormOpen, data, setRefresh }) {
	const { isLoading } = useSelector((state) => state.library);
	const dispatch = useDispatch();
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const [formData, setFormData] = useState({
		bookName: data.bookName,
		borrowDate: data.borrowDate,
        returnDate: data.returnDate,
        status: data.status,
		id: data._id,
	});


    const onConfirm = async () => {
		try {
			const res = await dispatch(updateLibrary(formData));
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
						Edit Library Record
					</h4>
					<label htmlFor="" className="text-fs-sm font-[500]">
						Book Name
					</label>
					<input
						type="text"
						value={formData.bookName}
						onChange={(e) =>
							setFormData({
								...formData,
								bookName: e.target.value,
							})
						}
						placeholder="Enter Book Name"
						className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
					/>

					<label className="text-fs-sm font-[500] block">
						Borrow Date
					</label>
					<input
						value={
							formData.borrowDate
								? formData.borrowDate.slice(0, 10)
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
								borrowDate: formattedDate,
							});
						}}
						type="date"
						className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300 text-fs-sm"
					/>

					<label className="text-fs-sm font-[500] block">
						Return Date
					</label>
					<input
						value={
							formData.returnDate
								? formData.returnDate.slice(0, 10)
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
								returnDate: formattedDate,
							});
						}}
						type="date"
						className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300 text-fs-sm"
					/>
					<label htmlFor="" className="text-fs-sm font-[500] block">
						Status
					</label>
					<select
						value={formData.status}
						onChange={(e) =>
							setFormData({
								...formData,
								status: e.target.value,
							})
						}
						className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300 text-fs-sm">
						<option value="Returned">Returned</option>
						<option value="Borrowed">Borrowed</option>
					</select>
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
							message={`Update Changes for Library Record?`}
							onConfirm={onConfirm}
						/>
					)}
				</form>
			</div>
		</>
	);
}

export default LibraryEdit;
