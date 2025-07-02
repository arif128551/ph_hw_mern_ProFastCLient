import React, { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
	const { user } = useAuth();

	useEffect(() => {
		const interceptor = axiosSecure.interceptors.request.use(
			async (config) => {
				if (user) {
					const token = await user.getIdToken();
					if (token) {
						config.headers.Authorization = `Bearer ${token}`;
					}
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		return () => {
			axiosSecure.interceptors.request.eject(interceptor);
		};
	}, [user]);

	return axiosSecure;
};

export default useAxiosSecure;
