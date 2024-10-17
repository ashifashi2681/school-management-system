import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationBox from "../ConfirmationBox";
import StudentEdit from "../edit/studentEdit";
import { deleteStudent } from "../../redux/features/studentSlice";
import { toast } from "react-toastify";

function StudentTable({ data, setRefresh }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.auth?.user?.user);
	const { isLoading, error } = useSelector((state) => state.student);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [userData, setUserData] = useState();

	const message = "Are you sure you want to delete";

	const handleDelete = (row) => {
		setUserData(row);
		setIsConfirmOpen(true);
	};

	const onConfirm = async () => {
		try {
			const res = await dispatch(deleteStudent(userData._id));
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
		setUserData(row);
		setIsEditFormOpen(true);
	};

	return (
		<div className="overflow-x-auto mt-4">
			<table className=" w-full min-w-[800px]">
				<thead>
					<tr className="text-left text-slate-700 text-fs-sm bg-gray-300">
						<th className="py-3">Sl.No</th>
						<th>Name</th>
						<th>Class</th>
						{user?.role !== "librarian" && (
							<th className="text-right">Actions</th>
						)}
					</tr>
				</thead>
				<tbody>
					{data?.map((row, i) => (
						<tr key={i} className="even:bg-gray-100">
							<td>{i + 1}</td>
							<td
								className="flex flex-col py-2 cursor-pointer"
								onClick={() =>
									navigate(`/all-student/${row._id}`)
								}>
								<span className="text-fs-sm font-[600]">
									{row?.name}
								</span>
								<span className="text-fs-xs">
									Age: {row?.age}
								</span>
							</td>
							<td>{row?.studentClass}</td>
							{user?.role !== "librarian" && (
								<td className="grid grid-flow-col justify-end items-center gap-2">
									{" "}
									{/* Adjust gap between buttons */}
									<button
										className="flex items-center justify-center gap-2 border-2 border-slate-300 px-2 py-1 rounded-md hover:bg-gray-100 transition text-fs-sm"
										onClick={() => handleEdit(row)}>
										<span>
											<FaEdit />
										</span>
										<span>Edit</span>
									</button>
									{isEditFormOpen && (
										<StudentEdit
											user={userData}
											setIsEditFormOpen={
												setIsEditFormOpen
											}
											setRefresh={setRefresh}
										/>
									)}
									<button
										className=" border-2 border-red-300 px-2 py-1 rounded-md hover:bg-red-100 transition"
										onClick={() => handleDelete(row)}>
										<span>
											<FaTrash />
										</span>
									</button>
									{isConfirmOpen && (
										<ConfirmationBox
											setIsConfirmOpen={setIsConfirmOpen}
											onConfirm={onConfirm}
											message={`${message} ${userData.name} ?`}
										/>
									)}
								</td>
							)}
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

export default StudentTable;
