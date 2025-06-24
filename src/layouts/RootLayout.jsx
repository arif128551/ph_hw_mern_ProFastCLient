import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/NavBar/Navbar";
import Footer from "../pages/shared/Footer/Footer";

const RootLayout = () => {
	return (
		<div className="bg-ceaeced pt-8 pb-12 px-4">
			<Navbar></Navbar>
			<Outlet></Outlet>
			<Footer></Footer>
		</div>
	);
};

export default RootLayout;
