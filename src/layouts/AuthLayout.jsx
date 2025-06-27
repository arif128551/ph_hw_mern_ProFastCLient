import React from "react";
import Logo from "../pages/shared/Logo/Logo";
import { Link, Outlet } from "react-router";
import authImg from "../assets/authImage.png";
const AuthLayout = () => {
	return (
		<div className="flex h-screen">
			<div className="w-3/5 px-11 py-14 h-full">
				<div>
					<Link to="/" className="flex gap-0 items-end">
						<Logo></Logo>
					</Link>
				</div>
				<div className="mx-auto flex items-center justify-center h-full">
					<Outlet></Outlet>
				</div>
			</div>
			<div className="w-2/5 h-full bg-[#FAFDF0] flex items-center justify-center">
				<img src={authImg} alt="Authentication system Image" />
			</div>
		</div>
	);
};

export default AuthLayout;
