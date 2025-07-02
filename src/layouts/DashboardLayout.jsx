import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Outlet, useNavigation } from "react-router";
import useAuth from "../hooks/useAuth";
import PageLoader from "../components/PageLoader";
import Logo from "../pages/shared/Logo/Logo";

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
						<h4>
							{user.displayName}
							{/* {user.email} */}
						</h4>
					</div>
				</div>

				<div className="mt-4 p-6">
					<Outlet></Outlet>
				</div>
			</div>

			<div className="drawer-side z-999">
				<label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

				<ul className="menu p-4 w-60 min-h-full bg-gray-800 text-white space-y-3 relative">
					<li className="absolute -right-3 z-9999 -top-2">
						<div className="lg:hidden flex justify-end mb-4">
							<label htmlFor="dashboard-drawer" className="cursor-pointer bg-ccaeb66/80 hover:bg-ccaeb66 border-0 p-4">
								<FaTimes className="text-xl text-black" />
							</label>
						</div>
					</li>
					<li className="mt-5 mb-5">
						<NavLink to="/" className="rounded text-xl flex gap-0 items-end">
							<Logo />
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard" className="hover:bg-gray-700 rounded">
							Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/pending-riders" className="hover:bg-gray-700 rounded">
							Pending Riders
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/active-riders" className="hover:bg-gray-700 rounded">
							Active Riders
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/my-parcel" className="hover:bg-gray-700 rounded">
							My Parcels
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/payment-history" className="hover:bg-gray-700 rounded">
							Payment History
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/track-parcel" className="hover:bg-gray-700 rounded">
							Track parcel
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/profile" className="hover:bg-gray-700 rounded">
							Profile
						</NavLink>
					</li>
					<li>
						<NavLink to="/" className="hover:bg-gray-700 rounded">
							Visit Site
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default DashboardLayout;
