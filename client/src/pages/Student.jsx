import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import SideBar from "../layout/sideBar";
import { FiArrowLeftCircle } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import FeesForm from "../components/forms/FeesForm";
import LibraryForm from "../components/forms/LibraryForm";
import { useDispatch, useSelector } from "react-redux";
import { getStudent } from "../redux/features/studentSlice";
import { toast } from "react-toastify";
import StudentFeeTable from "../components/tables/StudentFeeTable";
import StudentLibraryTable from "../components/tables/StudentLibraryTable";


function Student() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state?.auth?.user?.user);
	const { id } = useParams();
	const [showFeeForm, setShowFeeForm] = useState(false);
	const [showLibraryForm, setShowLibraryForm] = useState(false);
	const [data, setData] = useState();
	const [refresh, setRefresh] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await dispatch(getStudent(id));
				setData(res?.payload?.student);
			} catch (error) {
				toast(error?.response?.data?.message);
			}
		};

		fetchData();
	}, [showFeeForm,showLibraryForm, refresh]);

	return (
		<Layout>
			<SideBar>
				<div className="bg-white rounded-xl shadow-md px-3 py-5">
					<div className="flex justify-between items-center">
						<button
							className="flex items-center gap-2 px-2 py-1 rounded-md underline hover:bg-gray-200 transition text-fs-sm font-[500]"
							onClick={() => navigate(-1)}>
							<span className="text-fs-base">
								<FiArrowLeftCircle />
							</span>
							<span>Back</span>
						</button>
						<div className="flex gap-3 items-center">
							{user.role !== "librarian" && (
								<button
									className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-500 text-white hover:bg-gray-600 transition text-fs-sm font-[500]"
									onClick={() => setShowFeeForm(true)}>
									<span>
										<AiFillPlusCircle />
									</span>
									<span>Fee</span>
								</button>
							)}

							{showFeeForm && (
								<FeesForm
									setShowFeeForm={setShowFeeForm}
									id={id}
								/>
							)}
							{user.role !== "staff" && (
								<button
									className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-500 text-white hover:bg-gray-600 transition text-fs-sm font-[500]"
									onClick={() => setShowLibraryForm(true)}>
									<span>
										<AiFillPlusCircle />
									</span>
									<span>Library</span>
								</button>
							)}

							{showLibraryForm && (
								<LibraryForm
									setShowLibraryForm={setShowLibraryForm}
									id={id}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-7 mt-3 gap-3">
					<div className="bg-white rounded-xl shadow-md px-3 py-5 h-fit col-span-2 xl:col-span-7">
						<h5 className="text-fs-base font-[600]">
							{data?.name}
						</h5>
						<p className="text-fs-sm font-[500]">
							Age: {data?.age}
						</p>
						<p className="text-fs-sm font-[500]">
							Class: {data?.studentClass}
						</p>
					</div>
					<div className="col-span-5 xl:col-span-7">
						{user.role !== "librarian" && (
							<StudentFeeTable
								data={data}
								setRefresh={setRefresh}
							/>
						)}

						<StudentLibraryTable
							data={data}
							setRefresh={setRefresh}
						/>
					</div>
				</div>
			</SideBar>
		</Layout>
	);
}

export default Student;
