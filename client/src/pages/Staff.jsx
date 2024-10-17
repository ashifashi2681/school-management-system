import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import SideBar from "../layout/sideBar";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUserPassword, getUser } from "../redux/features/authSlice";
import ConfirmationBox from "../components/ConfirmationBox";
import { toast } from "react-toastify";

function Staff() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const [user, setUser] = useState();
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [formData, setFormData] = useState({
		oldPassword: "",
		newPassword: "",
		id: id,
	});

	const fetchData = async () => {
		try {
			const res = await dispatch(getUser(id));
			setUser(res?.payload?.user);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleUpdate = () => {
		setIsConfirmOpen(true);
	};

	const onConfirm = async () => {
		try {
			const res = await dispatch(changeUserPassword(formData));
			if (res?.payload?.success) {
				toast.success(res?.payload?.message);
				setFormData({ oldPassword: "", newPassword: "", id: "" });
				setIsConfirmOpen(false);
			} else {
				toast.error(res?.payload?.message);
				setIsConfirmOpen(false);
			}
		} catch (error) {
			toast.error(error?.response?.data?.message);
			setIsConfirmOpen(false);
		}
	};

	return (
		<Layout>
			<SideBar>
				<div className="bg-white rounded-xl shadow-md px-3 py-5">
					<button
						className="flex items-center gap-2 px-2 py-1 rounded-md underline hover:bg-gray-200 transition text-fs-sm font-[500]"
						onClick={() => navigate(-1)}>
						<span className="text-fs-base">
							<FiArrowLeftCircle />
						</span>
						<span>Back</span>
					</button>
					<div className="mt-5">
						<div className="flex items-center gap-3">
							<h5 className="text-fs-base font-[600]">
								{user?.name}
							</h5>
							<span className="text-fs-sm font-[500]">
								({user?.role})
							</span>
						</div>
						<p className="text-fs-sm font-[500]">{user?.email}</p>
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-md px-3 py-5 h-fit col-span-2 mt-3">
					<h4 className="text-fs-base font-[600] underline mb-5">
						Update Password
					</h4>
					<form onSubmit={handleSubmit}>
						<label className="text-fs-sm font-[500]">
							Old Password
						</label>
						<input
							type="password"
							placeholder="Enter Old Password"
							value={formData.oldPassword}
							onChange={(e) =>
								setFormData({
									...formData,
									oldPassword: e.target.value,
								})
							}
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
						/>
						<label className="text-fs-sm font-[500]">
							New Password
						</label>
						<input
							type="password"
							placeholder="Enter New Password"
							value={formData.newPassword}
							onChange={(e) =>
								setFormData({
									...formData,
									newPassword: e.target.value,
								})
							}
							className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
						/>
						<button
							className="bg-slate-700 hover:bg-slate-800 text-white  p-2 rounded-md ml-auto"
							onClick={() => handleUpdate()}>
							Update Password
						</button>
						{isConfirmOpen && (
							<ConfirmationBox
								setIsConfirmOpen={setIsConfirmOpen}
								message={`Update Password?`}
								onConfirm={onConfirm}
							/>
						)}
					</form>
				</div>
			</SideBar>
		</Layout>
	);
}

export default Staff;
