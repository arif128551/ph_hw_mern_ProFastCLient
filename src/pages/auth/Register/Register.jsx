import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";
import useSocialLogin from "../../../hooks/useSocialLogin";

const Register = () => {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm();

	const { createUser, setUser, updateUser, setLoading } = useAuth();
	const [imagePreview, setImagePreview] = useState(null);
	const axiosInstance = useAxios();
	const socialLogin = useSocialLogin();

	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/";

	const onSubmit = async ({ displayName, photoUrl, email, password }) => {
		setLoading(true);
		const timestamp = new Date().toISOString();

		try {
			const { user } = await createUser(email, password);
			await updateUser({ displayName, photoURL: photoUrl });

			setUser({ ...user, displayName, photoURL: photoUrl });

			const userDoc = {
				displayName,
				email,
				photoUrl,
				role: "user",
				created_at: timestamp,
				last_login_at: timestamp,
			};

			try {
				await axiosInstance.post("/users", userDoc);
				toast.success("Registration successful!");
				navigate(from || "/", { replace: true });
			} catch (error) {
				if (error.response?.status === 409) {
					toast.error("User already exists. Please login instead.");
				} else {
					toast.error("Registration failed. Please try again.");
				}
			}

			toast.success("Registration successful!");
			navigate(from || "/", { replace: true });
		} catch (error) {
			console.error("Registration Error:", error);
			toast.error("Registration failed. Please check your info.");
		} finally {
			setLoading(false);
		}
	};

	const handleImageUpload = async (e) => {
		const imageFile = e.target.files[0];
		if (!imageFile) return;

		// show preview
		setImagePreview(URL.createObjectURL(imageFile));

		// upload to imgbb
		const formData = new FormData();
		formData.append("image", imageFile);

		try {
			const res = await axios.post(
				`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
				formData
			);

			if (res.data.success) {
				const imageUrl = res.data.data.url;
				setValue("photoUrl", imageUrl);
				console.log("Image uploaded:", imageUrl);
			}
		} catch (err) {
			console.error("Image upload failed", err);
		}
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
			<h2 className="text-4xl font-extrabold mb-1">Create an Account</h2>
			<p className="mb-5">Register with Profast</p>
			<form className="fieldset" onSubmit={handleSubmit(onSubmit, onError)}>
				<label className="label">Name</label>
				<input
					type="text"
					className="input mb-3 w-full"
					placeholder="Name"
					{...register("displayName", {
						required: "Name is required",
						pattern: {
							value: /^[A-Za-z\s]+$/,
							message: "Please enter a valid name",
						},
					})}
				/>
				{/* ✅ Image Preview */}
				{imagePreview && (
					<img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-full mx-auto" />
				)}

				{/* ✅ Image Upload Input */}
				<input
					type="file"
					accept="image/*"
					onChange={handleImageUpload}
					className="file-input file-input-bordered w-full"
				/>

				{/* ✅ Hidden Photo URL Input for Form Submission */}
				<input
					type="hidden"
					{...register("photoUrl", {
						required: "Photo URL is required",
					})}
				/>
				{errors.photoUrl && <p className="text-red-500">{errors.photoUrl.message}</p>}
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
				<button className="btn mt-2 bg-ccaeb66 text-black">Register</button>
			</form>
			<p className="mt-1 text-gray-400">
				Have an account? <Link to="/login">Login</Link>
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

export default Register;
