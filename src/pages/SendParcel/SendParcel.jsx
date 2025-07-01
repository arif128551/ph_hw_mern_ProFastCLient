import React from "react";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const generateTrackingID = () => {
	const date = new Date();
	const datePart = date.toISOString().split("T")[0].replace(/-/g, ""); // YYYYMMDD
	const rand = Math.random().toString(36).substring(2, 7).toUpperCase(); // 5-digit random string
	return `PCL-${datePart}-${rand}`; // Final: PCL-20250629-A1Z8K
};

const SendParcel = () => {
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
	const [parcelType, setParcelType] = useState("document");

	const senderRegion = watch("senderRegion");
	const receiverRegion = watch("receiverRegion");

	const getCitiesByRegion = (region) => {
		const hubs = regionData.filter((item) => item.region === region).map((item) => item.city);
		return Array.from(new Set(hubs)); // ডুপ্লিকেট city রিমুভ
	};

	const onSubmit = (data) => {
		const weight = parseFloat(data.parcelWeight) || 0;
		const sameRegion = data.senderRegion === data.receiverRegion;

		let base = 0;
		let extra = 0;
		let cost = 0;

		if (parcelType === "document") {
			base = sameRegion ? 60 : 80;
		} else if (parcelType === "non-document") {
			if (weight <= 3) {
				base = sameRegion ? 110 : 150;
			} else {
				base = weight * 40;
				extra = sameRegion ? 0 : 40;
			}
		}

		cost = base + extra;

		Swal.fire({
			title: "Delivery Cost Breakdown",
			html: `
				<div class="overflow-x-auto">
					<table class="table w-full">
						<thead>
							<tr>
								<th class="text-left">Info</th>
								<th class="text-left">Details</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Parcel Type</td>
								<td>${parcelType === "document" ? "Document" : "Non-Document"}</td>
							</tr>
							<tr>
								<td>Weight</td>
								<td>${parcelType === "document" ? "Any" : weight + " kg"}</td>
							</tr>
							<tr>
								<td>Base Cost</td>
								<td>৳${base}</td>
							</tr>
							<tr>
								<td>Extra Charge</td>
								<td>৳${extra}</td>
							</tr>
							<tr class="font-bold border-t">
								<td>Total</td>
								<td>৳${cost}</td>
							</tr>
						</tbody>
					</table>
				</div>
			`,

			icon: "info",
			showCancelButton: true,
			confirmButtonText: "Process to payment",
			cancelButtonText: "Continue Editing",
			confirmButtonColor: "#008000",
			customClass: {
				confirmButton: "swal-confirm-black",
			},
		}).then((result) => {
			if (result.isConfirmed) {
				handleConfirm(data, cost);
			}
		});
	};

	const handleConfirm = async (data, cost) => {
		const tracking_id = generateTrackingID();
		const parcelData = {
			...data,
			type: parcelType,
			deliveryCost: cost,
			created_by: user.email,
			delivery_status: "not_collected",
			payment_status: "unpaid",
			tracking_id,
			created_at: new Date().toISOString(),
		};

		try {
			const res = await axiosSecure.post("/parcel", parcelData);
			const data = res.data;
			if (data.insertedId) {
				reset();
				Swal.fire({
					icon: "success",
					title: "Redirecting...",
					text: "Proceeding to payment gateway!",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			Swal.fire("Error", "Server error. Please try again.", "error");
		}
	};

	const uniqueRegions = Array.from(new Set(regionData.map((item) => item.region)));

	return (
		<div className="max-w-8xl mx-auto p-10 lg:p-20 bg-white rounded-4xl my-8">
			<h2 className="text-3xl font-bold mb-6">Enter your parcel details</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div className="border-b border-gray-200 pb-7 mb-7 space-y-4">
					<h3 className="text-xl font-semibold">Parcel Info</h3>

					<div className="flex flex-col sm:flex-row gap-4">
						<div>
							<input
								type="radio"
								id="document"
								value="document"
								{...register("type", { required: true })}
								checked={parcelType === "document"}
								onChange={() => setParcelType("document")}
								className="radio checked:bg-green-500"
							/>
							<label htmlFor="document" className="label cursor-pointer ml-2">
								Document
							</label>
						</div>
						<div>
							<input
								type="radio"
								id="non-document"
								value="non-document"
								{...register("type", { required: true })}
								checked={parcelType === "non-document"}
								onChange={() => setParcelType("non-document")}
								className="radio checked:bg-green-500"
							/>
							<label htmlFor="non-document" className="label cursor-pointer ml-2">
								Non-Document
							</label>
						</div>
					</div>
					{errors.type && <p className="text-red-500">Parcel type is required</p>}

					<div>
						<label htmlFor="title" className="label">
							Parcel Title
						</label>
						<input
							id="title"
							type="text"
							placeholder="Parcel Title"
							{...register("title", { required: "Parcel title is required" })}
							className="input input-bordered w-full"
						/>
						{errors.title && <p className="text-red-500">{errors.title.message}</p>}
					</div>

					{parcelType === "non-document" && (
						<div>
							<label htmlFor="parcelWeight" className="label">
								Parcel Weight (KG)
							</label>
							<input
								id="parcelWeight"
								type="number"
								step="0.01"
								placeholder="Parcel Weight (KG)"
								{...register("parcelWeight", {
									min: { value: 0.1, message: "Weight must be greater than 0" },
								})}
								className="input input-bordered w-full"
							/>
							{errors.parcelWeight && <p className="text-red-500">{errors.parcelWeight.message}</p>}
						</div>
					)}
				</div>

				<div className="flex flex-col xl:flex-row gap-12 justify-between flex-wrap">
					<div className="flex-1 space-y-5">
						<h3 className="text-xl font-semibold">Sender Details</h3>

						<div className="flex  flex-col sm:flex-row gap-7">
							<div className="flex-1">
								<label className="label">Sender Name</label>
								<input type="text" placeholder="Sender Name" className="input input-bordered w-full" />
							</div>

							<div className="flex-1">
								<label className="label">Sender Contact</label>
								<input
									type="tel"
									placeholder="Sender Contact"
									{...register("senderContact", {
										required: "Sender contact is required",
										// pattern: {
										// 	value: /^01[0-9]{9}$/,
										// 	message: "Enter a valid Bangladeshi number",
										// },
									})}
									className="input input-bordered w-full"
								/>
								{errors.senderContact && <p className="text-red-500">{errors.senderContact.message}</p>}
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-7">
							<div className="flex-1">
								<label className="label">Sender Region</label>
								<select
									{...register("senderRegion", { required: "Sender region is required" })}
									className="select select-bordered w-full"
								>
									<option value="">Select Region</option>
									{uniqueRegions.map((region) => (
										<option key={region} value={region}>
											{region}
										</option>
									))}
								</select>
								{errors.senderRegion && <p className="text-red-500">{errors.senderRegion.message}</p>}
							</div>

							<div className="flex-1">
								<label className="label">Sender Service Center</label>
								<select
									{...register("senderHub", { required: "Sender service center is required" })}
									className="select select-bordered w-full"
								>
									<option value="">Select Service Center</option>
									{getCitiesByRegion(senderRegion).map((city) => (
										<option key={city} value={city}>
											{city}
										</option>
									))}
								</select>
								{errors.senderHub && <p className="text-red-500">{errors.senderHub.message}</p>}
							</div>
						</div>

						<div>
							<label className="label">Sender Address</label>
							<input
								type="text"
								placeholder="Sender Address"
								{...register("senderAddress", { required: "Sender address is required" })}
								className="input input-bordered w-full"
							/>
							{errors.senderAddress && <p className="text-red-500">{errors.senderAddress.message}</p>}
						</div>

						<div>
							<label className="label">Pickup Instruction</label>
							<textarea
								{...register("pickupInstruction", { required: "Pickup instruction is required" })}
								className="textarea textarea-bordered w-full"
								placeholder="Pickup Instruction"
							></textarea>
							{errors.pickupInstruction && <p className="text-red-500">{errors.pickupInstruction.message}</p>}
						</div>
					</div>

					<div className="flex-1 space-y-5">
						<h3 className="text-xl font-semibold">Receiver Details</h3>

						<div className="flex flex-col sm:flex-row gap-7">
							<div className="flex-1">
								<label className="label">Receiver Name</label>
								<input
									type="text"
									placeholder="Receiver Name"
									{...register("receiverName", { required: "Receiver name is required" })}
									className="input input-bordered w-full"
								/>
								{errors.receiverName && <p className="text-red-500">{errors.receiverName.message}</p>}
							</div>

							<div className="flex-1">
								<label className="label">Receiver Contact</label>
								<input
									type="tel"
									placeholder="Receiver Contact"
									{...register("receiverContact", {
										required: "Receiver contact is required",
										// pattern: {
										// 	value: /^01[0-9]{9}$/,
										// 	message: "Enter a valid Bangladeshi number",
										// },
									})}
									className="input input-bordered w-full"
								/>
								{errors.receiverContact && <p className="text-red-500">{errors.receiverContact.message}</p>}
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-7">
							<div className="flex-1">
								<label className="label">Receiver Region</label>
								<select
									{...register("receiverRegion", { required: "Receiver region is required" })}
									className="select select-bordered w-full"
								>
									<option value="">Select Region</option>
									{uniqueRegions.map((region) => (
										<option key={region} value={region}>
											{region}
										</option>
									))}
								</select>
								{errors.receiverRegion && <p className="text-red-500">{errors.receiverRegion.message}</p>}
							</div>

							<div className="flex-1">
								<label className="label">Receiver Service Center</label>
								<select
									{...register("receiverHub", { required: "Receiver service center is required" })}
									className="select select-bordered w-full"
								>
									<option value="">Select Service Center</option>
									{getCitiesByRegion(receiverRegion).map((city) => (
										<option key={city} value={city}>
											{city}
										</option>
									))}
								</select>
								{errors.receiverHub && <p className="text-red-500">{errors.receiverHub.message}</p>}
							</div>
						</div>

						<div>
							<label className="label">Receiver Address</label>
							<input
								type="text"
								placeholder="Receiver Address"
								{...register("receiverAddress", { required: "Receiver address is required" })}
								className="input input-bordered w-full"
							/>
							{errors.receiverAddress && <p className="text-red-500">{errors.receiverAddress.message}</p>}
						</div>

						<div>
							<label className="label">Delivery Instruction</label>
							<textarea
								{...register("deliveryInstruction", { required: "Delivery instruction is required" })}
								className="textarea textarea-bordered w-full"
								placeholder="Delivery Instruction"
							></textarea>
							{errors.deliveryInstruction && <p className="text-red-500">{errors.deliveryInstruction.message}</p>}
						</div>
					</div>
				</div>

				<div>
					<p className="pb-5">* PickUp Time 4pm-7pm Approx.</p>
					<button
						type="submit"
						className="bg-ccaeb66 text-c0b0b0b px-10 rounded-md py-3 cursor-pointer hover:bg-lime-300"
					>
						Proceed to Confirm Booking
					</button>
				</div>
			</form>
		</div>
	);
};

export default SendParcel;
