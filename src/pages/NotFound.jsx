import React from "react";
import { Link, useRouteError } from "react-router";
const NotFound = () => {
	const error = useRouteError();
	return (
		<div className="py-24 text-center px-3">
			<h1 className="mb-8 text-7xl font-thin text-gray-900">{error?.status || 404}</h1>
			<p className="text-xl font-bold text-gray-900 md:text-2xl mb-8">
				{error?.error?.message || "Something Went Wrong!"}
			</p>
			<Link to="/">
				<button className="transition text-xl font-bold  px-8 py-3 text-white  rounded-full cursor-pointer bg-brand-blue hover:bg-blue-700">
					Go To Homepage
				</button>
			</Link>
		</div>
	);
};

export default NotFound;
