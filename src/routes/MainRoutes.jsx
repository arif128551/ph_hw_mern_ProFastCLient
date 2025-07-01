import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Coverage from "../pages/coverage/Coverage";
import axios from "axios";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcel from "../pages/dashboard/MyParcel/MyParcel";
import Dashboard from "../pages/dashboard/Dashboard/Dashboard";
import Payment from "../pages/dashboard/Payment/Payment";
import PaymentHistory from "../pages/dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/dashboard/TrackParcel/TrackParcel";
import UpdateProfile from "../pages/dashboard/UpdateProfile/UpdateProfile";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: RootLayout,
		errorElement: <NotFound></NotFound>,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: "/coverage",
				Component: Coverage,
				loader: () => axios.get("/warehouses.json").then((res) => res.data),
			},
			{
				path: "/send-parcel",
				element: (
					<PrivateRoute>
						<SendParcel></SendParcel>
					</PrivateRoute>
				),
				loader: () => axios.get("/warehouses.json").then((res) => res.data),
			},
		],
	},
	{
		path: "/",
		Component: AuthLayout,
		errorElement: <NotFound></NotFound>,
		children: [
			{
				path: "/login",
				Component: Login,
			},
			{
				path: "/register",
				Component: Register,
			},
		],
	},
	{
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<DashboardLayout></DashboardLayout>
			</PrivateRoute>
		),
		errorElement: <NotFound></NotFound>,
		children: [
			{
				path: "",
				Component: Dashboard,
			},
			{
				path: "my-parcel",
				Component: MyParcel,
			},
			{
				path: "payment/:parcelId",
				Component: Payment,
			},
			{
				path: "payment-history",
				Component: PaymentHistory,
			},
			{
				path: "track-parcel",
				Component: TrackParcel,
			},
			{
				path: "profile",
				Component: UpdateProfile,
			},
		],
	},
]);
