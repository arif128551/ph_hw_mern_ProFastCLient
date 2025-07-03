import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import PageLoader from "../components/PageLoader";

const AdminRoute = ({ children }) => {
	const { role, isLoading } = useUserRole();

	if (isLoading) return <PageLoader />;

	if (role !== "admin") {
		return <Navigate to="/unauthorized" />;
	}

	return children;
};

export default AdminRoute;
