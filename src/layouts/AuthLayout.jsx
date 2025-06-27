import React from "react";
import Logo from "../pages/shared/Logo/Logo";
import { Link, Outlet } from "react-router";
import authImg from "../assets/authImage.png";
const AuthLayout = () => {
	return (
		<div>
			<div>
				<div>
					<Link to="/">
						<Logo></Logo>
					</Link>
				</div>
				<div>
					<Outlet></Outlet>
				</div>
			</div>
			<div>
				<img src={authImg} alt="Authentication system Image" />
			</div>
		</div>
	);
};

export default AuthLayout;
