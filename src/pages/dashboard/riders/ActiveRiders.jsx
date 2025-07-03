import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PageLoader from "../../../components/PageLoader";
import toast from "react-hot-toast";

const ActiveRiders = () => {
	const axiosSecure = useAxiosSecure();
	const queryClient = useQueryClient();

	const {
		data: riders = [],
		isPending,
		error,
	} = useQuery({
		queryKey: ["activeRiders"],
		queryFn: async () => {
			const res = await axiosSecure.get("/riders?status=active");
			return res.data?.data || [];
		},
	});

	// Mutation to deactivate rider
	const deactivateMutation = useMutation({
		mutationFn: async (id) => {
			const res = await axiosSecure.patch(`/riders/${id}`, { status: "deactivated" });
			return res.data;
		},
		onSuccess: () => {
			toast.success("Rider deactivated successfully!");
			queryClient.invalidateQueries(["activeRiders"]);
		},
		onError: () => {
			toast.error("Failed to deactivate rider.");
		},
	});

	if (isPending) return <PageLoader />;
	if (error) return <p className="text-red-500">Error: {error.message}</p>;

	return (
		<div className="overflow-x-auto p-4">
			<h2 className="text-xl font-bold mb-4">Active Riders</h2>
			<div className="overflow-x-auto bg-white shadow rounded">
				<table className="table table-zebra w-full">
					<thead className="bg-gray-100">
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Region</th>
							<th>Joined At</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{riders.length === 0 ? (
							<tr>
								<td colSpan="7" className="text-center text-gray-500 py-4">
									No active riders found.
								</td>
							</tr>
						) : (
							riders.map((rider, index) => (
								<tr key={rider._id}>
									<td>{index + 1}</td>
									<td>{rider.name}</td>
									<td>{rider.email}</td>
									<td>{rider.contact || "N/A"}</td>
									<td>{rider.region || "N/A"}</td>
									<td>{new Date(rider.created_at).toLocaleString()}</td>
									<td>
										<button
											className="btn btn-xs btn-error text-white"
											onClick={() => deactivateMutation.mutate(rider._id)}
										>
											Deactivate
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

export default ActiveRiders;
