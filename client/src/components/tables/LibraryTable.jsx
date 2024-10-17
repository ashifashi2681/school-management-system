import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import LibraryEdit from "../edit/LibraryEdit";
import ConfirmationBox from "../ConfirmationBox";
import { deleteLibrary } from "../../redux/features/librarySlice";
import { toast } from "react-toastify";

function LibraryTable({ data, setRefresh }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.auth?.user?.user);
	const { isLoading, error } = useSelector((state) => state.library);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [recordData, setRecordData] = useState();
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);

	const handleDelete = (row) => {
		setRecordData(row);
		setIsConfirmOpen(true);
	};

	const onConfirm = async () => {
		try {
			const res = await dispatch(deleteLibrary(recordData._id));
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
						<th>Book Name</th>
						<th>Borrow Date</th>
						<th>Returned Date</th>
						<th>Status</th>
						{user?.role !== "staff" && (
							<th className="text-right">Actions</th>
						)}
					</tr>
				</thead>
				<tbody>
					{data?.map((row, i) => (
						<tr key={i} className="even:bg-gray-100 text-fs-sm">
							<td>{i + 1}</td>
							<td className="flex flex-col py-2">
								<span className="text-fs-sm font-[600]">
									{row?.studentId?.name}
								</span>
								<span className="text-fs-xs">{row.email}</span>
							</td>
							<td>{row?.bookName}</td>
							<td>{row?.borrowDate}</td>
							<td>{row?.returnDate}</td>
							<td>{row?.status}</td>
							{user?.role !== "staff" && (
								<td className="grid grid-flow-col justify-end items-center gap-2 py-2">
									<button
										className="flex items-center justify-center gap-2 border-2 border-slate-300 px-2 py-1 rounded-md hover:bg-gray-100 transition text-fs-sm"
										onClick={() => handleEdit(row)}>
										<span>
											<FaEdit />
										</span>
										Edit
									</button>
									{isEditFormOpen && (
										<LibraryEdit
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
											<FaTrash />
										</span>
									</button>
									{isConfirmOpen && (
										<ConfirmationBox
											message={"Delete Library Record?"}
											onConfirm={onConfirm}
											setIsConfirmOpen={setIsConfirmOpen}
										/>
									)}
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
			{isLoading && <p className="text-center text-fs-xs">Loading...</p>}
			{error && <p className="text-center text-fs-xs text-red-500">{error.message}</p>}
		</div>
	);
}

export default LibraryTable;
