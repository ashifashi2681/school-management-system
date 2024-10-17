import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import ConfirmationBox from "../ConfirmationBox";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import StaffEdit from "../edit/StaffEdit";
import { useNavigate } from "react-router-dom";

function UserTable({ data, setRefresh }) {
	const { isLoading, error } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [user, setUser] = useState();

	const message = "Are you sure you want to delete";
	const handleDelete = (row) => {
		setUser(row);
		setIsConfirmOpen(true);
	};
	const onConfirm = async () => {
		try {
			const res = await dispatch(deleteUser(user._id));
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
		setUser(row);
		setIsEditFormOpen(true);
	}

	return (
		<div className="overflow-x-auto mt-4">
			<table className=" w-full min-w-[800px]">
				<thead>
					<tr className="text-left text-slate-700 text-fs-sm bg-gray-300">
						<th className="py-3">Sl.No</th>
						<th>Name</th>
						<th>Role</th>
						<th className="text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((row, i) => (
						<tr key={i} className="even:bg-gray-100">
							<td>{i + 1}</td>
							<td
								className="flex flex-col py-2"
								onClick={() =>
									navigate(`/all-staff/${row._id}`)
								}>
								<span className="text-fs-sm font-[600]">
									{row.name}
								</span>
								<span className="text-fs-xs">{row.email}</span>
							</td>
							<td className="text-fs-xs font-[500]">
								<span
									className={`px-2 py-1 rounded ${
										row.role === "admin"
											? "bg-cyan-200"
											: row.role === "librarian"
											? "bg-amber-200"
											: "bg-red-200"
									}`}>
									{row.role}
								</span>
							</td>
							<td className="grid grid-flow-col justify-end items-center gap-2">
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
									<StaffEdit
										user={user}
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
										setIsConfirmOpen={setIsConfirmOpen}
										message={`${message} ${user.name} ?`}
										onConfirm={onConfirm}
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

export default UserTable;
