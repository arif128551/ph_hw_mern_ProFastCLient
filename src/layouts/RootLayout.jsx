import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/NavBar/Navbar";

const RootLayout = () => {
	return (
		<div className="bg-ceaeced pt-8 pb-12 px-4">
			<Navbar></Navbar>
			<Outlet></Outlet>
		</div>
	);
};

export default RootLayout;
