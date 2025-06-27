import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/auth/Register/Register";

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
]);
