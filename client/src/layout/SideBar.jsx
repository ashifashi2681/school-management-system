import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function SideBar({ children }) {
	const user = useSelector((state) => state?.auth?.user?.user);
	

	return (
		<div className="w-[95%] max-w-[1400px] mx-auto grid grid-cols-12 gap-5">
			<div className="col-span-2 xl:col-span-3 mt-5 ">
				<ul className="bg-white px-3 py-5 rounded-xl shadow-md flex flex-col gap-1">
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? "block" : "")}>
						{({ isActive }) => (
							<li
								className={
									`whitespace-nowrap px-3 py-2 cursor-pointer text-fs-sm rounded-md uppercase transition w-full ` +
									(isActive
										? "bg-gray-400 text-white font-[500]"
										: "text-slate-500 hover:bg-gray-400 hover:text-white hover:font-[500]")
								}>
								Dashboard
							</li>
						)}
					</NavLink>

					{user?.role === "admin" && (
						<NavLink
							to="/all-staff"
							className={({ isActive }) =>
								isActive ? "block" : ""
							}>
							{({ isActive }) => (
								<li
									className={
										`whitespace-nowrap px-3 py-2 cursor-pointer text-fs-sm rounded-md uppercase transition w-full ` +
										(isActive
											? "bg-gray-400 text-white font-[500]"
											: "text-slate-500 hover:bg-gray-400 hover:text-white hover:font-[500]")
									}>
									All Staff
								</li>
							)}
						</NavLink>
					)}

					<NavLink
						to="/all-student"
						className={({ isActive }) => (isActive ? "block" : "")}>
						{({ isActive }) => (
							<li
								className={
									`whitespace-nowrap px-3 py-2 cursor-pointer text-fs-sm rounded-md uppercase transition w-full ` +
									(isActive
										? "bg-gray-400 text-white font-[500]"
										: "text-slate-500 hover:bg-gray-400 hover:text-white hover:font-[500]")
								}>
								All Students
							</li>
						)}
					</NavLink>
					{["admin", "staff"].includes(user?.role) && (
						<NavLink
							to="/fees-history"
							className={({ isActive }) =>
								isActive ? "block" : ""
							}>
							{({ isActive }) => (
								<li
									className={
										`whitespace-nowrap px-3 py-2 cursor-pointer text-fs-sm rounded-md uppercase transition w-full ` +
										(isActive
											? "bg-gray-400 text-white font-[500]"
											: "text-slate-500 hover:bg-gray-400 hover:text-white hover:font-[500]")
									}>
									Fees History
								</li>
							)}
						</NavLink>
					)}

					<NavLink
						to="/library-history"
						className={({ isActive }) => (isActive ? "block" : "")}>
						{({ isActive }) => (
							<li
								className={
									`whitespace-nowrap px-3 py-2 cursor-pointer text-fs-sm rounded-md uppercase transition w-full ` +
									(isActive
										? "bg-gray-400 text-white font-[500]"
										: "text-slate-500 hover:bg-gray-400 hover:text-white hover:font-[500]")
								}>
								Library History
							</li>
						)}
					</NavLink>
				</ul>
			</div>
			<div className="col-span-10 xl:col-span-9 mt-5">{children}</div>
		</div>
	);
}

export default SideBar;
