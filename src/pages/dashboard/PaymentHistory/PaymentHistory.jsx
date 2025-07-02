import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "../../../components/PageLoader";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();

	const {
		data: payments = [],
		isPending,
		error,
	} = useQuery({
		queryKey: ["paymentHistory", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const res = await axiosSecure.get(`/payments?email=${user.email}`);
			return res.data;
		},
	});

	if (isPending) return <PageLoader />;
	if (error) return <p className="text-red-500">Error: {error.message}</p>;

	return (
		<div className="overflow-x-auto p-4">
			<h2 className="text-xl font-bold mb-4">My Payment History</h2>
			<div className="overflow-x-auto bg-white shadow rounded">
				<table className="table table-zebra w-full">
					<thead className="bg-gray-100">
						<tr>
							<th>#</th>
							<th>Parcel ID</th>
							<th>Transaction ID</th>
							<th>Amount ($)</th>
							<th>Payment Method</th>
							<th>Paid At</th>
						</tr>
					</thead>
					<tbody>
						{payments.length === 0 ? (
							<tr>
								<td colSpan="6" className="text-center text-gray-500 py-4">
									No payment history found.
								</td>
							</tr>
						) : (
							payments.map((payment, index) => (
								<tr key={payment.transactionId}>
									<td>{index + 1}</td>
									<td>{payment.parcelId}</td>
									<td className="text-xs break-all">{payment.transactionId}</td>
									<td>{payment.amount}</td>
									<td>{payment.paymentMethod}</td>
									<td>{new Date(payment.paid_at).toLocaleString()}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentHistory;
