import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data, isLoading } = useQuery({
		queryKey: ["user-role", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const res = await axiosSecure.get(`/users/${user.email}/role`);
			return res.data.role;
		},
	});

	return { role: data, isLoading };
};

export default useUserRole;
