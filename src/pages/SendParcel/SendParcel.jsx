import React from "react";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";

const SendParcel = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [parcelType, setParcelType] = useState("document");

	const onSubmit = (data) => {
		let cost = parcelType === "document" ? 50 : 100;
		if (data.parcelWeight && parcelType === "non-document") {
			cost += parseFloat(data.parcelWeight) * 10;
		}

		// Show toast with Confirm button
		toast.custom((t) => (
			<div className="bg-white shadow-md border px-6 py-4 rounded-lg">
				<p className="font-bold text-lg">Estimated Delivery Cost: ৳{cost}</p>
				<div className="mt-4 flex justify-end gap-3">
					<button onClick={() => toast.dismiss(t.id)} className="btn btn-sm">
						Cancel
					</button>
					<button
						onClick={() => {
							toast.dismiss(t.id);
							handleConfirm(data, cost);
						}}
						className="btn btn-sm btn-success"
					>
						Confirm
					</button>
				</div>
			</div>
		));
	};

	const handleConfirm = async (data, cost) => {
		const parcelData = {
			...data,
			type: parcelType,
			deliveryCost: cost,
			creation_date: new Date().toISOString(),
		};

		try {
			console.log(parcelData);
		} catch (error) {
			toast.error("Server error. Please try again.");
		}
	};

	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
			<h2 className="text-3xl font-bold mb-6">Add Parcel</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				{/* Parcel Info */}
				<div className="border p-4 rounded-lg shadow-sm space-y-4">
					<h3 className="text-xl font-semibold">Parcel Info</h3>

					<div className="flex gap-4">
						<label className="label cursor-pointer">
							<input
								type="radio"
								value="document"
								{...register("type", { required: true })}
								checked={parcelType === "document"}
								onChange={() => setParcelType("document")}
								className="radio checked:bg-green-500"
							/>
							<span className="label-text ml-2">Document</span>
						</label>
						<label className="label cursor-pointer">
							<input
								type="radio"
								value="non-document"
								{...register("type", { required: true })}
								checked={parcelType === "non-document"}
								onChange={() => setParcelType("non-document")}
								className="radio checked:bg-green-500"
							/>
							<span className="label-text ml-2">Non-Document</span>
						</label>
					</div>
					{errors.type && <p className="text-red-500">Parcel type is required</p>}

					<input
						type="text"
						placeholder="Parcel Title"
						{...register("title", { required: "Parcel title is required" })}
						className="input input-bordered w-full"
					/>
					{errors.title && <p className="text-red-500">{errors.title.message}</p>}

					{parcelType === "non-document" && (
						<>
							<input
								type="number"
								step="0.01"
								placeholder="Parcel Weight (KG)"
								{...register("parcelWeight", {
									min: { value: 0.1, message: "Weight must be greater than 0" },
								})}
								className="input input-bordered w-full"
							/>
							{errors.parcelWeight && <p className="text-red-500">{errors.parcelWeight.message}</p>}
						</>
					)}
				</div>

				{/* Sender Info */}
				<div className="border p-4 rounded-lg shadow-sm space-y-4">
					<h3 className="text-xl font-semibold">Sender Info</h3>

					<input type="text" value="Md Arif Uddin" readOnly className="input input-bordered w-full" />

					<input
						type="tel"
						placeholder="Sender Contact"
						{...register("senderContact", {
							required: "Sender contact is required",
							pattern: {
								value: /^01[0-9]{9}$/,
								message: "Enter a valid Bangladeshi number",
							},
						})}
						className="input input-bordered w-full"
					/>
					{errors.senderContact && <p className="text-red-500">{errors.senderContact.message}</p>}

					<select
						{...register("senderRegion", { required: "Sender region is required" })}
						className="select select-bordered w-full"
					>
						<option value="">Select Region</option>
						<option value="Dhaka">Dhaka</option>
						<option value="Chattogram">Chattogram</option>
					</select>
					{errors.senderRegion && <p className="text-red-500">{errors.senderRegion.message}</p>}

					<select
						{...register("senderHub", { required: "Sender service center is required" })}
						className="select select-bordered w-full"
					>
						<option value="">Select Service Center</option>
						<option value="SC1">SC1</option>
						<option value="SC2">SC2</option>
					</select>
					{errors.senderHub && <p className="text-red-500">{errors.senderHub.message}</p>}

					<input
						type="text"
						placeholder="Sender Address"
						{...register("senderAddress", { required: "Sender address is required" })}
						className="input input-bordered w-full"
					/>
					{errors.senderAddress && <p className="text-red-500">{errors.senderAddress.message}</p>}

					<textarea
						{...register("pickupInstruction", { required: "Pickup instruction is required" })}
						className="textarea textarea-bordered w-full"
						placeholder="Pickup Instruction"
					></textarea>
					{errors.pickupInstruction && <p className="text-red-500">{errors.pickupInstruction.message}</p>}
				</div>

				{/* Receiver Info */}
				<div className="border p-4 rounded-lg shadow-sm space-y-4">
					<h3 className="text-xl font-semibold">Receiver Info</h3>

					<input
						type="text"
						placeholder="Receiver Name"
						{...register("receiverName", { required: "Receiver name is required" })}
						className="input input-bordered w-full"
					/>
					{errors.receiverName && <p className="text-red-500">{errors.receiverName.message}</p>}

					<input
						type="tel"
						placeholder="Receiver Contact"
						{...register("receiverContact", {
							required: "Receiver contact is required",
							pattern: {
								value: /^01[0-9]{9}$/,
								message: "Enter a valid Bangladeshi number",
							},
						})}
						className="input input-bordered w-full"
					/>
					{errors.receiverContact && <p className="text-red-500">{errors.receiverContact.message}</p>}

					<select
						{...register("receiverRegion", { required: "Receiver region is required" })}
						className="select select-bordered w-full"
					>
						<option value="">Select Region</option>
						<option value="Dhaka">Dhaka</option>
						<option value="Chattogram">Chattogram</option>
					</select>
					{errors.receiverRegion && <p className="text-red-500">{errors.receiverRegion.message}</p>}

					<select
						{...register("receiverHub", { required: "Receiver service center is required" })}
						className="select select-bordered w-full"
					>
						<option value="">Select Service Center</option>
						<option value="SC1">SC1</option>
						<option value="SC2">SC2</option>
					</select>
					{errors.receiverHub && <p className="text-red-500">{errors.receiverHub.message}</p>}

					<input
						type="text"
						placeholder="Receiver Address"
						{...register("receiverAddress", { required: "Receiver address is required" })}
						className="input input-bordered w-full"
					/>
					{errors.receiverAddress && <p className="text-red-500">{errors.receiverAddress.message}</p>}

					<textarea
						{...register("deliveryInstruction", { required: "Delivery instruction is required" })}
						className="textarea textarea-bordered w-full"
						placeholder="Delivery Instruction"
					></textarea>
					{errors.deliveryInstruction && <p className="text-red-500">{errors.deliveryInstruction.message}</p>}
				</div>

				<div>
					<button type="submit" className="btn btn-success w-full">
						Proceed to Confirm Booking
					</button>
				</div>
			</form>
		</div>
	);
};

export default SendParcel;
