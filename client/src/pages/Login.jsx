import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";
import * as yup from "yup";

function Login() {
	const { isLoading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	// validate form
	const formSchema = yup.object().shape({
		email: yup
			.string()
			.required("Email is required")
			.email("Invalid email"),
		password: yup
			.string()
			.min("5", "Password must be at least 5 characters")
			.required("Password is required"),
	});
	const [erros, setErros] = useState({});

	// submit form
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await formSchema.validate(formData, { abortEarly: false });
			const res = await dispatch(login(formData));
			if (res?.payload?.success) {
				toast(res?.payload?.message);
				navigate("/");
			} else {
				toast(res?.payload?.message);
			}
		} catch (validationError) {
			if (validationError.inner) {
				const formError = validationError.inner.reduce((acc, err) => {
					return { ...acc, [err.path]: err.message };
				}, {});
				setErros(formError);
			} else {
				toast(validationError?.response?.data?.message);
			}
		}
	};
	return (
		<div className="bg-white w-[80%] max-w-[600px] p-5 rounded-xl shadow absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
			<form onSubmit={handleSubmit}>
				<h4 className="text-fs-md text-slate-800 text-center font-[600] underline underline-offset-4 mb-5">
					Login
				</h4>
				<div>
					<label htmlFor="email" className="text-fs-sm font-[500]">
						Email
					</label>
					<input
						type="email"
						id="email"
						placeholder="Enter User Email"
						onChange={(e) =>
							setFormData({
								...formData,
								email: e.target.value,
							})
						}
						className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
					/>
					<p className="text-fs-xs font-semibold text-red-500 -mt-2">
						{erros.email}
					</p>

					<label htmlFor="password" className="text-fs-sm font-[500]">
						Password
					</label>
					<input
						type="password"
						id="password"
						placeholder="Enter User Password"
						onChange={(e) =>
							setFormData({
								...formData,
								password: e.target.value,
							})
						}
						className="w-full p-2 mb-3 rounded-md outline-none border-2 border-slate-300"
					/>
					<p className="text-fs-xs font-semibold text-red-500 -mt-2">
						{erros.password}
					</p>
				</div>

				<button
					className="bg-slate-700 hover:bg-slate-800 text-white w-full mt-3 p-2 rounded-md flex items-center justify-center"
					type="submit">
					{isLoading ? (
						<span className="animate-spin text-fs-md">
							<ImSpinner2 />
						</span>
					) : (
						"Login"
					)}
				</button>
			</form>
		</div>
	);
}

export default Login;
