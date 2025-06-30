import React from "react";
import PageLoader from "../../../components/PageLoader";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
const MyParcel = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["my-parcel", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const res = await axiosSecure.get(`/parcels?email=${user.email}`);
			return res.data;
		},
	});

	if (isPending) return <PageLoader />;
	if (isError) return <span>Error: {error.message}</span>;

	const handleView = (parcel) => {
		console.log("View Parcel:", parcel);
		// You can route to a detailed view page
	};

	const handleEdit = (parcel) => {
		console.log("Edit Parcel:", parcel);
		// You can navigate to edit form
	};

	const handleDelete = (id) => {
		console.log("Delete Parcel ID:", id);
		// You can call axiosSecure.delete(`/parcels/${id}`) here
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4">My Parcels</h2>

			<div className="overflow-x-auto bg-white shadow rounded">
				<table className="table table-zebra w-full">
					<thead className="bg-gray-100 text-gray-700">
						<tr>
							<th>Title</th>
							<th>Type</th>
							<th>Delivery Status</th>
							<th>Payment Status</th>
							<th>Tracking ID</th>
							<th>Created At</th>
							<th className="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.map((parcel) => (
							<tr key={parcel._id}>
								<td>{parcel.title}</td>
								<td>{parcel.type || <span className="text-gray-400 italic">N/A</span>}</td>
								<td>
									<span
										className={`badge ${parcel.delivery_status === "collected" ? "badge-success" : "badge-warning"}`}
									>
										{parcel.delivery_status}
									</span>
								</td>
								<td>
									<span className={`badge ${parcel.payment_status === "paid" ? "badge-success" : "badge-error"}`}>
										{parcel.payment_status}
									</span>
								</td>
								<td className="font-mono">{parcel.tracking_id}</td>
								<td>{format(new Date(parcel.created_at), "PPpp")}</td>
								<td className="flex items-center justify-center gap-3 text-lg">
									<button onClick={() => handleView(parcel)} className="text-blue-600 hover:text-blue-800" title="View">
										<FaEye />
									</button>
									<button
										onClick={() => handleEdit(parcel)}
										className="text-green-600 hover:text-green-800"
										title="Edit"
									>
										<FaEdit />
									</button>
									<button
										onClick={() => handleDelete(parcel._id)}
										className="text-red-600 hover:text-red-800"
										title="Delete"
									>
										<FaTrash />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyParcel;
