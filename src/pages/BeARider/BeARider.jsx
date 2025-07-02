import React from "react";
import agentPending from "../../assets/agent-pending.png";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
	const { user } = useAuth();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
	} = useForm();

	const regionData = useLoaderData();
	const axiosSecure = useAxiosSecure();

	const riderRegion = watch("region");

	const getCitiesByRegion = (region) => {
		const hubs = regionData.filter((item) => item.region === region).map((item) => item.city);
		return Array.from(new Set(hubs));
	};

	const onSubmit = async (data) => {
		const finalData = {
			...data,
			name: user.displayName,
			email: user.email,
			status: "pending",
			created_at: new Date().toISOString(),
		};

		try {
			const res = await axiosSecure.post("/riders", finalData);
			const data = res.data;
			if (data.insertedId) {
				reset();
				Swal.fire({
					icon: "success",
					title: "Application Submitted!",
					text: "Your rider account request is under review. Redirecting to payment...",
					showConfirmButton: false,
					timer: 2000,
				});
			}
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error.response?.data?.error ||
				error.message ||
				"Something went wrong. Please try again later.";

			Swal.fire("Submission Failed", message, "error");
		}
	};

	const uniqueRegions = Array.from(new Set(regionData.map((item) => item.region)));
	return (
		<div className="px-4 pt-8 pb-8 xl:pb-20">
			<div className="bg-white rounded-xl p-8 md:p-25 w-full max-w-8xl gap-10 mx-auto">
				{/* Left Side (Text + Form) */}
				<div className="flex-1 w-full">
					<h2 className="text-3xl lg:text-6xl font-bold text-gray-800 mb-2">Be a Rider</h2>
					<p className="text-sm text-c606060">
						Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to
						business shipments — we deliver on time, every time.
					</p>
					<hr className="my-10 border-black/10" />
				</div>
				<div className="flex flex-col md:flex-row items-end">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-1">
						<h3 className="text-lg font-semibold mb-4">Tell us about yourself</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* Name */}
							<div>
								<label className="label">Your Name</label>
								<input type="text" value={user?.displayName || ""} readOnly className="input input-bordered w-full" />
							</div>

							{/* Age */}
							<div>
								<label className="label">Your Age</label>
								<input
									type="number"
									placeholder="Your age"
									{...register("age", { required: "Age is required" })}
									className="input input-bordered w-full"
								/>
								{errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
							</div>

							{/* Email */}
							<div>
								<label className="label">Your Email</label>
								<input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full" />
							</div>

							{/* Region */}
							<div>
								<label className="label">Your Region</label>
								<select
									{...register("region", { required: "Region is required" })}
									className="select select-bordered w-full"
								>
									<option value="">Select your region</option>
									{uniqueRegions.map((region) => (
										<option key={region} value={region}>
											{region}
										</option>
									))}
								</select>
								{errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
							</div>

							{/* NID */}
							<div>
								<label className="label">NID No</label>
								<input
									type="text"
									placeholder="NID"
									{...register("nid", { required: "NID is required" })}
									className="input input-bordered w-full"
								/>
								{errors.nid && <p className="text-red-500 text-sm">{errors.nid.message}</p>}
							</div>

							{/* Contact */}
							<div>
								<label className="label">Contact</label>
								<input
									type="text"
									placeholder="Contact"
									{...register("contact", { required: "Contact is required" })}
									className="input input-bordered w-full"
								/>
								{errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
							</div>

							{/* Bike Brand */}
							<div>
								<label className="label">Bike Brand</label>
								<input
									type="text"
									placeholder="e.g., Honda, Yamaha"
									{...register("bikeBrand", { required: "Bike brand is required" })}
									className="input input-bordered w-full"
								/>
								{errors.bikeBrand && <p className="text-red-500 text-sm">{errors.bikeBrand.message}</p>}
							</div>

							{/* Bike Reg No */}
							<div>
								<label className="label">Bike Registration Number</label>
								<input
									type="text"
									placeholder="e.g., DHA-123456"
									{...register("bikeReg", { required: "Bike registration is required" })}
									className="input input-bordered w-full"
								/>
								{errors.bikeReg && <p className="text-red-500 text-sm">{errors.bikeReg.message}</p>}
							</div>

							{/* Warehouse */}
							<div className="md:col-span-2">
								<label className="label">Which warehouse you want to work?</label>
								<select
									{...register("warehouse", { required: "Warehouse is required" })}
									className="select select-bordered w-full"
								>
									<option value="">Select your warehouse</option>
									{getCitiesByRegion(riderRegion).map((city) => (
										<option key={city} value={city}>
											{city}
										</option>
									))}
								</select>

								{errors.warehouse && <p className="text-red-500 text-sm">{errors.warehouse.message}</p>}
							</div>
						</div>

						<button
							type="submit"
							className="xl:text-lg font-bold xl:px-8 xl:py-2 px-3 py-1 border border-ccaeb66 rounded-sm bg-ccaeb66 text-c1f1f1f w-full cursor-pointer"
						>
							Submit
						</button>
					</form>
					<div className="flex-1 flex justify-center">
						<div>
							<img src={agentPending} alt="Rider Illustration" />
						</div>
					</div>
				</div>

				{/* Right Side (Image) */}
			</div>
		</div>
	);
};

export default BeARider;
