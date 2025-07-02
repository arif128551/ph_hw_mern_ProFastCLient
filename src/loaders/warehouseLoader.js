import axios from "axios";

const warehouseLoader = async () => {
	try {
		const res = await axios.get("/warehouses.json");
		return res.data;
	} catch (error) {
		throw new Response("Failed to load warehouse data", {
			status: error.response?.status || 500,
			statusText: error.message || "Unknown Error",
		});
	}
};

export default warehouseLoader;
