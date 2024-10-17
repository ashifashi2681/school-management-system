import React, { useEffect, useState } from "react";
import SideBar from "../layout/sideBar";
import LibraryTable from "../components/tables/LibraryTable";
import Layout from "../layout/Layout";
import { useDispatch } from "react-redux";
import { getLibraries } from "../redux/features/librarySlice";
import { toast } from "react-toastify";

function LibraryHistory() {
	const dispatch = useDispatch();
	const [data, setData] = useState();
	const [Refresh, setRefresh] = useState(false);


	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await dispatch(getLibraries());
				setData(res?.payload?.libraries);
			} catch (error) {
				toast(error?.response?.data?.message);
			}
		};
		fetchData();
	}, [Refresh]);


	return (
		<Layout>
			<SideBar>
				<div className="bg-white rounded-xl shadow-md px-3 py-5">
					<div>
						<h4 className="text-fs-base font-[600] text-slate-700">
							Library Records
						</h4>
						<span className="text-fs-xs font-[500] text-slate-500">
							Total {data?.length} Records Found.
						</span>
					</div>
					<div>
						<LibraryTable data={data} setRefresh={setRefresh} />
					</div>
				</div>
			</SideBar>
		</Layout>
	);
}

export default LibraryHistory;
