import React from "react";
import { PuffLoader } from "react-spinners";

const PageLoader = () => {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<PuffLoader size={60} color="#caeb66" />
		</div>
	);
};

export default PageLoader;
