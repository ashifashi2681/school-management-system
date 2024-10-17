import React, { useEffect, useState } from "react";
import SideBar from "../layout/sideBar";
import { IoMdPersonAdd } from "react-icons/io";
import StudentTable from "../components/tables/StudentTable";
import Layout from "../layout/Layout";
import StudentForm from "../components/forms/StudentForm";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../redux/features/studentSlice";
import { toast } from "react-toastify";

function AllStudents() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.auth?.user?.user);
	const [data, setData] = useState();
	const [showForm, setShowForm] = useState(false);
	const [refresh, setRefresh] = useState(false)
	const fetchData = async () => {
		try {
			const res = await dispatch(getStudents());
			setData(res?.payload?.students);
		} catch (error) {
			toast(error?.response?.data?.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, [showForm, refresh]);

	return (
		<Layout>
			<SideBar>
				<div className="bg-white rounded-xl shadow-md px-3 py-5">
					<div className="flex items-start justify-between">
						<div>
							<h4 className="text-fs-base font-[600] text-slate-700">
								All Students List
							</h4>
							<span className="text-fs-xs font-[500] text-slate-500">
								Total {data?.length} Students here.
							</span>
						</div>

						{user?.role !== "librarian" && (
							<button
								className="flex items-center gap-2 border border-slate-400 px-3 py-1 cursor-pointer rounded-md hover:bg-slate-400 hover:text-white transition text-fs-sm font-[500]"
								onClick={() => setShowForm(!showForm)}>
								New
								<span>
									<IoMdPersonAdd />
								</span>
							</button>
						)}

						{showForm && <StudentForm setShowForm={setShowForm} />}
					</div>
					<div>
						<StudentTable data={data} setRefresh={setRefresh} />
					</div>
				</div>
			</SideBar>
		</Layout>
	);
}

export default AllStudents;
