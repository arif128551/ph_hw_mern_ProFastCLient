import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
const Navbar = () => {
	const { user, signOutUser } = useAuth();

	const handleLogout = () => {
		signOutUser()
			.then(() => {
				toast.success("You’re now logged out. See you again soon!");
			})
			.catch((error) => {
				toast(error);
			});
	};

	const listItems = (
		<>
			<li>
				<NavLink to="/">Home</NavLink>
			</li>
			<li>
				<NavLink to="/services">Services</NavLink>
			</li>
			<li>
				<NavLink to="/coverage">Coverage</NavLink>
			</li>
			<li>
				<NavLink to="/send-parcel">Send Parcel</NavLink>
			</li>
			<li>
				<NavLink to="/about">About Us</NavLink>
			</li>
			<li>
				<NavLink to="/pricing">Pricing</NavLink>
			</li>
			<li>
				<NavLink to="/be-a-rider">Be a Rider</NavLink>
			</li>
			{user ? (
				<>
					<li className="sm:hidden">
						<button onClick={handleLogout}>Logout</button>
					</li>
				</>
			) : (
				<>
					<li className="sm:hidden">
						<NavLink to="/signin">Sign In</NavLink>
					</li>
				</>
			)}
		</>
	);

	return (
		<div className="navbar bg-base-100 max-w-8xl mx-auto px-8 py-6 rounded-2xl">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{" "}
						</svg>
					</div>
					<ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2">
						{listItems}
					</ul>
				</div>
				<Link className="text-xl flex gap-0 items-end">
					<Logo></Logo>
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 font-medium text-c606060">{listItems}</ul>
			</div>
			<div className="navbar-end hidden gap-4 sm:flex">
				{user ? (
					<>
						<Link className="xl:text-xl font-bold xl:px-8 xl:py-3 px-3 py-2 border border-ccaeb66 rounded-xl bg-ccaeb66 text-c1f1f1f">
							Be a rider
						</Link>
						<button
							onClick={handleLogout}
							className="xl:text-xl font-bold xl:px-8 xl:py-3 px-3 py-2 border border-ccaeb66 rounded-xl bg-ccaeb66 text-c1f1f1f cursor-pointer"
						>
							Logout
						</button>
					</>
				) : (
					<>
						<Link
							to="/login"
							className="xl:text-xl font-bold xl:px-8 xl:py-3 px-3 py-2 border border-c606060/50 text-c606060 rounded-xl cursor-pointer"
						>
							Sign In
						</Link>
						<Link className="xl:text-xl font-bold xl:px-8 xl:py-3 px-3 py-2 border border-ccaeb66 rounded-xl bg-ccaeb66 text-c1f1f1f">
							Be a rider
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
