import { useState } from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
	const locations = useLoaderData();
	const [searchText, setSearchText] = useState("");

	return (
		<div className="px-4 py-10 md:px-8 md:py-16">
			<div className="max-w-8xl mx-auto bg-white rounded-4xl p-6 md:p-10">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">We are available in 64 districts</h2>

				<div className="mb-6 flex flex-col sm:flex-row gap-3 items-center">
					<input
						type="text"
						placeholder="Search here"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-lime-500"
					/>

					<button
						type="button"
						className="bg-lime-500 cursor-default text-white rounded-full px-6 py-2 font-medium opacity-80"
					>
						Search
					</button>
				</div>

				<h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">We deliver almost all over Bangladesh</h3>

				<BangladeshMap locations={locations} searchText={searchText} />
			</div>
		</div>
	);
};

export default Coverage;
