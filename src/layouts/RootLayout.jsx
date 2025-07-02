import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../pages/shared/NavBar/Navbar";
import Footer from "../pages/shared/Footer/Footer";
import useAuth from "../hooks/useAuth";
import PageLoader from "../components/PageLoader";

const RootLayout = () => {
	const { loading } = useAuth();
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";
	if (loading || isLoading) {
		return <PageLoader />;
	}
	return (
		<div className="bg-ceaeced pt-8 pb-12 px-4 min-h-screen">
			<Navbar></Navbar>
			<Outlet></Outlet>
			<Footer></Footer>
		</div>
	);
};

export default RootLayout;
