import React from "react";
import Logo from "../pages/shared/Logo/Logo";
import { Link, Outlet } from "react-router";
import authImg from "../assets/authImage.png";
const AuthLayout = () => {
	return (
		<div className="flex lg:h-screen flex-col lg:flex-row">
			<div className="lg:w-7/12 px-11 py-14 lg:h-full">
				<div className="mb-10 lg:mb-0">
					<Link to="/" className="flex gap-0 items-end">
						<Logo></Logo>
					</Link>
				</div>
				<div className="mx-auto flex items-center justify-center h-full">
					<Outlet></Outlet>
				</div>
			</div>
			<div className="hidden lg:w-5/12 h-full bg-[#FAFDF0] lg:flex items-center justify-center">
				<img src={authImg} alt="Authentication system Image" />
			</div>
		</div>
	);
};

export default AuthLayout;
