import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PageLoader from "../../../components/PageLoader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const PendingRiders = () => {
	const axiosSecure = useAxiosSecure();
	const queryClient = useQueryClient();
	const [selectedRider, setSelectedRider] = useState(null);

	// Fetch pending riders
	const {
		data: riders = [],
		isPending,
		error,
	} = useQuery({
		queryKey: ["pendingRiders"],
		queryFn: async () => {
			const res = await axiosSecure.get("/riders?status=pending");
			return res.data?.data || [];
		},
	});

	// Accept rider
	const acceptMutation = useMutation({
		mutationFn: async ({ id, email }) => {
			const res = await axiosSecure.patch(`/riders/${id}`, {
				status: "active",
				email, // this is required in backend
			});
			return res.data;
		},
		onSuccess: (data) => {
			toast.success("Rider accepted successfully!");
			queryClient.invalidateQueries(["pendingRiders"]);
			setSelectedRider(null);
		},
		onError: (error) => {
			console.error(error);
			toast.error("Failed to accept rider.");
		},
	});

	// Reject rider
	const cancelMutation = useMutation({
		mutationFn: async (id) => {
			const res = await axiosSecure.patch(`/riders/${id}`, { status: "rejected" });
			return res.data;
		},
		onSuccess: (data) => {
			toast.success("Rider rejected successfully!");
			queryClient.invalidateQueries(["pendingRiders"]);
			setSelectedRider(null);
		},
		onError: (error) => {
			console.error(error);
			toast.error("Failed to reject rider.");
		},
	});

	if (isPending) return <PageLoader />;
	if (error) return <p className="text-red-500">Error: {error.message}</p>;

	return (
		<div className="overflow-x-auto p-4">
			<h2 className="text-xl font-bold mb-4">Pending Riders</h2>
			<div className="overflow-x-auto bg-white shadow rounded">
				<table className="table table-zebra w-full">
					<thead className="bg-gray-100">
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Joined At</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{riders.length === 0 ? (
							<tr>
								<td colSpan="6" className="text-center text-gray-500 py-4">
									No pending riders found.
								</td>
							</tr>
						) : (
							riders.map((rider, index) => (
								<tr key={rider._id}>
									<td>{index + 1}</td>
									<td>{rider.name}</td>
									<td>{rider.email}</td>
									<td>{rider.contact || "N/A"}</td>
									<td>{new Date(rider.created_at).toLocaleString()}</td>
									<td className="space-x-2">
										{/* View Button */}
										<button onClick={() => setSelectedRider(rider)} className="btn btn-sm btn-info text-white">
											View
										</button>

										{/* Accept Button with Swal Confirm */}
										<button
											onClick={() => {
												Swal.fire({
													title: "Are you sure?",
													text: `Activate rider ${rider.name}?`,
													icon: "warning",
													showCancelButton: true,
													confirmButtonColor: "#10b981",
													cancelButtonColor: "#d33",
													confirmButtonText: "Yes, activate",
												}).then((result) => {
													if (result.isConfirmed) {
														acceptMutation.mutate({ id: rider._id, email: rider.email });
													}
												});
											}}
											className="btn btn-sm btn-success"
										>
											Activate
										</button>

										{/* Cancel Button with Swal Confirm */}
										<button
											onClick={() => {
												Swal.fire({
													title: "Are you sure?",
													text: `Cancel rider ${rider.name}?`,
													icon: "warning",
													showCancelButton: true,
													confirmButtonColor: "#ef4444",
													cancelButtonColor: "#3085d6",
													confirmButtonText: "Yes, cancel",
												}).then((result) => {
													if (result.isConfirmed) {
														cancelMutation.mutate(rider._id);
													}
												});
											}}
											className="btn btn-sm btn-error"
										>
											Cancel
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Rider Details Modal */}
			{selectedRider && (
				<div className="modal modal-open">
					<div className="modal-box max-w-2xl">
						<button
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							onClick={() => setSelectedRider(null)}
						>
							✕
						</button>
						<h3 className="text-lg font-bold mb-4">Rider Details</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
							<p>
								<strong>Name:</strong> {selectedRider.name}
							</p>
							<p>
								<strong>Email:</strong> {selectedRider.email}
							</p>
							<p>
								<strong>Phone:</strong> {selectedRider.contact || selectedRider.phone || "N/A"}
							</p>
							<p>
								<strong>Age:</strong> {selectedRider.age || "N/A"}
							</p>
							<p>
								<strong>NID:</strong> {selectedRider.nid || "N/A"}
							</p>
							<p>
								<strong>Region:</strong> {selectedRider.region || "N/A"}
							</p>
							<p>
								<strong>Warehouse:</strong> {selectedRider.warehouse || "N/A"}
							</p>
							<p>
								<strong>Bike Brand:</strong> {selectedRider.bikeBrand || "N/A"}
							</p>
							<p>
								<strong>Bike Reg:</strong> {selectedRider.bikeReg || "N/A"}
							</p>
							<p>
								<strong>Status:</strong> {selectedRider.status}
							</p>
							<p>
								<strong>Joined At:</strong> {new Date(selectedRider.created_at).toLocaleString()}
							</p>
						</div>

						{/* <div className="modal-action mt-6">
							<button className="btn btn-success btn-sm" onClick={() => acceptMutation.mutate(selectedRider._id)}>
								Accept
							</button>
							<button className="btn btn-error btn-sm" onClick={() => cancelMutation.mutate(selectedRider._id)}>
								Reject
							</button>
						</div> */}
					</div>
				</div>
			)}
		</div>
	);
};

export default PendingRiders;
