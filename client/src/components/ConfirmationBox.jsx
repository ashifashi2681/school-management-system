import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function ConfirmationBox({ setIsConfirmOpen, message, onConfirm }) {
	return (
		<div>
			<div className="fixed inset-0 bg-black opacity-10"></div>
			<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[80%] max-w-[500px] rounded">
				<div className="flex items-center justify-between p-3">
					<p className="text-fs-base font-[500]">Confirm</p>
					<span
						className="text-fs-md cursor-pointer"
						onClick={() => setIsConfirmOpen(false)}>
						<AiFillCloseCircle />
					</span>
				</div>
				<div className="border-t border-slate-300 py-6">
					<p className="text-fs-sm font-[500] text-center">
						{message}
					</p>
					<div className="flex items-center justify-center gap-5 mt-7 mb-4">
						<button
							className="text-fs-sm bg-[#36C180] hover:bg-[#36C180]/90 text-white px-10 py-3 rounded cursor-pointer"
							onClick={() => onConfirm()}>
							<span>
								<FaCheck />
							</span>
						</button>
						<button
							className="text-fs-sm  bg-[#E45253] hover:bg-[#E45253]/90 text-white px-10 py-3 rounded cursor-pointer"
							onClick={() => setIsConfirmOpen(false)}>
							<span>
								<FaXmark />
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConfirmationBox;
