import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigation } from "react-router";
import useAuth from "../hooks/useAuth";
import PageLoader from "../components/PageLoader";

const DashboardLayout = () => {
	const { loading } = useAuth();
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";
	if (loading || isLoading) {
		return <PageLoader />;
	}
	return (
		<div className="drawer lg:drawer-open">
			<input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

			<div className="drawer-content flex flex-col bg-gray-100 min-h-screen">
				<div className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between fixed top-0 z-50">
					<label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden text-xl">
						<FaBars />
					</label>
					<h2 className="text-xl font-semibold ml-auto">Dashboard</h2>
				</div>

				<div className="mt-16 p-6 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
						<div className="bg-white rounded-lg shadow p-4">📋 Site Health Status</div>
						<div className="bg-white rounded-lg shadow p-4">📊 At a Glance</div>
						<div className="bg-white rounded-lg shadow p-4">📈 Activity</div>
					</div>
					<div className="bg-white rounded-lg shadow p-4">📝 Yoast SEO Overview</div>
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
