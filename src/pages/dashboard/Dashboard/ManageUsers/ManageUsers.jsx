import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
	const axiosSecure = useAxiosSecure();
	const [searchText, setSearchText] = useState("");
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Debounced search effect
	useEffect(() => {
		if (!searchText.trim()) {
			setUsers([]);
			return;
		}

		const delay = setTimeout(async () => {
			try {
				setIsLoading(true);
				const res = await axiosSecure.get(`/users/search?query=${searchText}`);
				setUsers(res.data);
			} catch (error) {
				console.error("Search failed:", error);
			} finally {
				setIsLoading(false);
			}
		}, 500); // 500ms debounce

		return () => clearTimeout(delay);
	}, [searchText, axiosSecure]);

	// Mutation to update role
	const { mutate: updateRole } = useMutation({
		mutationFn: async ({ id, role }) => {
			const res = await axiosSecure.patch(`/users/${id}/role`, { role });
			return res.data;
		},
		onSuccess: (data) => {
			toast.success(data.message);
		},
		onError: (error) => {
			console.error(error);
			toast.error("Failed to update user role.");
		},
	});

	const handleRoleChange = (user, role) => {
		Swal.fire({
			title: "Are you sure?",
			text: `Change role of ${user.displayName} to ${role}?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#16a34a",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, change",
		}).then((result) => {
			if (result.isConfirmed) {
				updateRole({ id: user._id, role });
			}
		});
	};

	return (
		<div className="p-5">
			<h2 className="text-2xl font-bold mb-4">Manage Users</h2>

			{/* Auto Search Input */}
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search by name or email..."
					className="input input-bordered w-full max-w-md"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</div>

			{/* User Table */}
			<div className="overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Current Role</th>
							<th>Change Role</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							<tr>
								<td colSpan="5" className="text-center py-5">
									Loading...
								</td>
							</tr>
						) : users.length === 0 ? (
							<tr>
								<td colSpan="5" className="text-center py-5 text-gray-500">
									No users found.
								</td>
							</tr>
						) : (
							users.map((user, index) => (
								<tr key={user._id}>
									<td>{index + 1}</td>
									<td>{user.displayName}</td>
									<td>{user.email}</td>
									<td>
										<span className="badge badge-outline">{user.role}</span>
									</td>
									<td>
										<select
											defaultValue={user.role}
											onChange={(e) => handleRoleChange(user, e.target.value)}
											className="select select-bordered select-sm"
										>
											<option value="user">User</option>
											<option value="admin">Admin</option>
											<option value="editor">Editor</option>
											<option value="rider">Rider</option>
										</select>
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

export default ManageUsers;
