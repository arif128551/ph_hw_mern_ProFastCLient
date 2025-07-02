import React from "react";
import PageLoader from "../../../components/PageLoader";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { Link } from "react-router";
const MyParcel = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { isPending, isError, data, error, refetch } = useQuery({
		queryKey: ["my-parcel", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const res = await axiosSecure.get(`/parcels?email=${user.email}`);
			return res.data;
		},
	});

	if (isPending) return <PageLoader />;
	if (isError) return <span>Error: {error.message}</span>;

	console.log(data);

	const handleView = (parcel) => {
		console.log("View Parcel:", parcel);
		// You can route to a detailed view page
	};

	const handleEdit = (parcel) => {
		console.log("Edit Parcel:", parcel);
		// You can navigate to edit form
	};

	const handleDelete = async (id) => {
		try {
			const result = await Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonColor: "#3085d6",
				confirmButtonText: "Yes, delete it!",
			});

			if (result.isConfirmed) {
				const res = await axiosSecure.delete(`/parcel/${id}`);

				if (res.data.deletedCount > 0) {
					await Swal.fire({
						icon: "success",
						title: "Your parcel has been deleted.",
						showConfirmButton: false,
						timer: 1500,
					});
					refetch();
				}
			}
		} catch (error) {
			console.error(error);
			await Swal.fire({
				icon: "error",
				title: "Something went wrong.",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold mb-4">My Parcels</h2>

			<div className="overflow-x-auto bg-white shadow rounded">
				<table className="table table-zebra w-full">
					<thead className="bg-gray-200 text-gray-700">
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>Type</th>
							<th>Amount</th>
							<th>Delivery Status</th>
							<th>Payment Status</th>
							<th>Tracking ID</th>
							<th>Created At</th>
							<th className="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.length === 0 ? (
							<tr>
								<td colSpan="9" className="text-center text-gray-500 py-4">
									No parcel found.
								</td>
							</tr>
						) : (
							data.map((parcel, index) => (
								<tr key={parcel._id}>
									<td>{index + 1}</td>
									<td>{parcel.title}</td>
									<td>{parcel.type || <span className="text-gray-400 italic">N/A</span>}</td>
									<td>{parcel.deliveryCost}</td>
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
										{parcel.payment_status !== "paid" && (
											<Link
												to={`/dashboard/payment/${parcel._id}`}
												className="text-blue-600 hover:text-blue-800"
												title="View"
											>
												Pay
											</Link>
										)}
										<button
											onClick={() => handleView(parcel)}
											className="text-blue-600 hover:text-blue-800"
											title="View"
										>
											<FaEye />
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
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyParcel;
