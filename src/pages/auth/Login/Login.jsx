import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useSocialLogin from "../../../hooks/useSocialLogin";
import useAxios from "../../../hooks/useAxios";

const Login = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const { signInUserWithEmailPass, setLoading } = useAuth();
	const socialLogin = useSocialLogin();
	const axiosInstance = useAxios();

	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/";

	const onSubmit = (data) => {
		const { email, password } = data;
		setLoading(true);

		signInUserWithEmailPass(email, password)
			.then(async (result) => {
				const user = result.user;
				const lastLoginTime = new Date(user.metadata?.lastSignInTime || Date.now()).toISOString();

				// Update last login time in DB
				try {
					const token = await user.getIdToken(true);
					await axiosInstance.patch(
						`/users/${user.email}`,
						{
							last_login_at: lastLoginTime,
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
				} catch (err) {
					console.error("DB update failed:", err.message);
					toast.error("Login successful, but failed to update login time.");
				}

				toast.success("Welcome back! You have successfully logged in.");
				navigate(from, { replace: true });
			})
			.catch((error) => {
				if (error.code === "auth/wrong-password") {
					toast.error("Wrong password. Please try again.");
				} else {
					toast.error("Invalid email or password. Please try again.");
				}
			})
			.finally(() => setLoading(false));
	};

	const onError = (errors) => {
		Object.values(errors).forEach((error) => {
			toast.error(error.message);
		});
	};

	const handleGoogleBtnLogin = () => {
		socialLogin();
	};
	return (
		<div className="w-[384px]">
			<h2 className="text-5xl font-extrabold mb-1">Welcome Back</h2>
			<p className="mb-5">Login with Profast</p>
			<form className="fieldset" onSubmit={handleSubmit(onSubmit, onError)}>
				<label className="label">Email</label>
				<input
					type="email"
					className="input mb-3 w-full"
					placeholder="Email"
					{...register("email", {
						required: "Email Address is required",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Please enter a valid email address",
						},
					})}
				/>
				<label className="label">Password</label>
				<input
					type="password"
					className="input w-full"
					placeholder="Password"
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 6,
							message: "Password must be at least 6 characters",
						},
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
							message: "Password must contain at least one letter and one number",
						},
					})}
				/>
				<div>
					<a className="link link-hover">Forgot password?</a>
				</div>
				<button className="btn mt-2 bg-ccaeb66 text-black">Login</button>
			</form>
			<p className="mt-1 text-gray-400">
				Don’t have any account? <Link to="/register">Register</Link>
			</p>
			<div className="flex items-center gap-4 my-6">
				<hr className="flex-grow border-t border-gray-300" />
				<span className="text-gray-500 text-sm font-medium">Or</span>
				<hr className="flex-grow border-t border-gray-300" />
			</div>
			<button onClick={handleGoogleBtnLogin} className="btn bg-white text-black border-[#e5e5e5] w-full">
				<svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<g>
						<path d="m0 0H512V512H0" fill="#fff"></path>
						<path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
						<path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
						<path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
						<path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
					</g>
				</svg>
				Login with Google
			</button>
		</div>
	);
};

export default Login;
