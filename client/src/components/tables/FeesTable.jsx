import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmationBox from "../ConfirmationBox";
import { useDispatch, useSelector } from "react-redux";
import { deleteFee } from "../../redux/features/feesSlice";
import { toast } from "react-toastify";
import FeesEdit from "../edit/FeesEdit";

function FeesTable({ data, setRefresh }) {
	const { isLoading, error } = useSelector((state) => state.fees);
	const dispatch = useDispatch();
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [recordData, setRecordData] = useState();
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const handleDelete = (row) => {
		setRecordData(row);
		setIsConfirmOpen(true);
	};

	const onConfirm = async () => {
		try {
			const res = await dispatch(deleteFee(recordData._id));
			if (res?.payload?.success) {
				toast(res?.payload?.message);
				setRefresh((prev) => !prev);
				setIsConfirmOpen(false);
			} else {
				toast(res?.payload?.message);
				setIsConfirmOpen(false);
			}
		} catch (error) {
			toast(error?.response?.data?.message);
			setIsConfirmOpen(false);
		}
	};

	const handleEdit = (row) => {
		setRecordData(row);
		setIsEditFormOpen(true);
	};
	return (
		<div className="overflow-x-auto mt-4">
			<table className="w-full min-w-[800px]">
				<thead>
					<tr className="text-left text-slate-700 text-fs-sm bg-gray-300">
						<th className="py-3">Sl.No</th>
						<th>Name</th>
						<th>Fees Type</th>
						<th>Amount</th>
						<th>Payment Date</th>
						<th>Remarks</th>
						<th className="text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((row, i) => (
						<tr key={i} className="even:bg-gray-100 text-fs-sm">
							<td>{i + 1}</td>
							<td>
								<span className="text-fs-sm font-[600]">
									{row?.studentId?.name}
								</span>
							</td>
							<td>{row?.feeType}</td>
							<td>{row?.amount}</td>
							<td>{row?.paymentDate}</td>
							<td>{row?.remarks}</td>
							<td className="grid grid-flow-col justify-end items-center gap-2 py-2">
								{" "}
								<button
									className="flex items-center justify-center gap-2 border-2 border-slate-300 px-2 py-1 rounded-md hover:bg-gray-100 transition text-fs-sm"
									onClick={() => handleEdit(row)}>
									<span>
										<FaEdit />
									</span>
									Edit
								</button>
								{isEditFormOpen && (
									<FeesEdit
										data={recordData}
										setIsEditFormOpen={setIsEditFormOpen}
										setRefresh={setRefresh}
									/>
								)}
								<button
									className="flex flex-col justify-center items-center gap-2 border-2 border-red-300 px-2 py-1 rounded-md hover:bg-red-100 transition"
									onClick={() => handleDelete(row)}>
									<span>
										<FaTrash />
									</span>
								</button>
								{isConfirmOpen && (
									<ConfirmationBox
										message={"Delete Fee Record?"}
										onConfirm={onConfirm}
										setIsConfirmOpen={setIsConfirmOpen}
									/>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{isLoading && <p className="text-center text-fs-xs">Loading...</p>}
			{error && (
				<p className="text-center text-fs-xs text-red-500">
					{error.message}
				</p>
			)}
		</div>
	);
}

export default FeesTable;
