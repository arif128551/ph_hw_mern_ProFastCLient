import { FaBars, FaTimes } from "react-icons/fa";
import { Outlet, useNavigation } from "react-router";
import useAuth from "../hooks/useAuth";
import PageLoader from "../components/PageLoader";

const DashboardLayout = () => {
	const { loading, user } = useAuth();
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";
	if (loading || isLoading) {
		return <PageLoader />;
	}
	return (
		<div className="drawer lg:drawer-open">
			<input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

			<div className="drawer-content flex flex-col bg-gray-100 min-h-screen">
				<div className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between z-50">
					<div className="flex gap-1 items-center">
						<label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden text-xl">
							<FaBars />
						</label>
						<h2 className="text-xl font-semibold hidden sm:block">Dashboard</h2>
					</div>
					<div className="text-xl font-semibold">
						<h4>{user.displayName}</h4>
					</div>
				</div>

				<div className="mt-4 p-6">
					<Outlet></Outlet>
				</div>
			</div>

			<div className="drawer-side z-40">
				<label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

				<ul className="menu p-4 w-72 min-h-full bg-gray-800 text-white space-y-1">
					<div className="lg:hidden flex justify-end mb-4">
						<label htmlFor="dashboard-drawer" className="btn btn-sm btn-circle">
							<FaTimes />
						</label>
					</div>
					<li>
						<a className="hover:bg-gray-700 rounded">Dashboard</a>
					</li>
					<li>
						<a className="hover:bg-gray-700 rounded">Posts</a>
					</li>
					<li>
						<a className="hover:bg-gray-700 rounded">Media</a>
					</li>
					<li>
						<a className="hover:bg-gray-700 rounded">Pages</a>
					</li>
					<li>
						<a className="hover:bg-gray-700 rounded">Plugins</a>
					</li>
					<li>
						<a className="hover:bg-gray-700 rounded">Users</a>
					</li>
					<li>
						<a className="hover:bg-gray-700 rounded">Settings</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default DashboardLayout;
