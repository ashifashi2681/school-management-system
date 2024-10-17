import React, { useState } from "react";
import ConfirmationBox from "../ConfirmationBox";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteFee } from "../../redux/features/feesSlice";
import FeesEdit from "../edit/FeesEdit";

function StudentFeeTable({ data, setRefresh }) {
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
		<div className="bg-white rounded-xl shadow-md px-3 py-5 mb-3">
			<p className="text-fs-base font-[600]">Fees Records</p>
			<span className="text-fs-xs">
				{data?.feesHistory?.length} Records are Found
			</span>

			<div className="overflow-x-auto">
				<table className="w-full xl:min-w-[800px]">
					<thead>
						<tr className="text-left text-slate-700 text-fs-sm bg-gray-300">
							<th>Sl.No</th>
							<th>Fees Type</th>
							<th>Amount</th>
							<th>Payment Date</th>
							<th>Remarks</th>
							<th className="text-right py-2">Action</th>
						</tr>
					</thead>
					<tbody>
						{data?.feesHistory?.map((row, i) => (
							<tr key={i} className="even:bg-gray-100 text-fs-sm">
								<td>{i + 1}</td>
								<td>{row.feeType}</td>
								<td>{row.amount}</td>
								<td>{row.paymentDate}</td>
								<td>{row.remarks}</td>
								<td className="grid grid-flow-col justify-end items-center gap-2 py-2">
									{" "}
									<button
										className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-500 text-white hover:bg-gray-600 transition text-fs-xs font-[500]"
										onClick={() => handleEdit(row)}>
										<span>
											<AiFillEdit />
										</span>
										<span>Edit</span>
									</button>
									{isEditFormOpen && (
										<FeesEdit
											data={recordData}
											setIsEditFormOpen={
												setIsEditFormOpen
											}
											setRefresh={setRefresh}
										/>
									)}
									<button
										className="flex flex-col justify-center items-center gap-2 border-2 border-red-300 px-2 py-1 rounded-md hover:bg-red-100 transition"
										onClick={() => handleDelete(row)}>
										<span>
											<AiFillDelete />
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
			</div>
		</div>
	);
}

export default StudentFeeTable;
