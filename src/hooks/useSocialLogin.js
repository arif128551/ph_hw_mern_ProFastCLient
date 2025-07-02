import { useNavigate, useLocation } from "react-router";
import useAuth from "./useAuth";
import toast from "react-hot-toast";
import useAxios from "./useAxios";

const useSocialLogin = () => {
	const { googleSignIn, setUser, setLoading } = useAuth();
	const axiosInstance = useAxios();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const handleSocialLogin = async () => {
		setLoading(true);
		try {
			const result = await googleSignIn();
			const user = result.user;

			const { displayName, email, photoURL } = user;
			const { creationTime, lastSignInTime } = user.metadata;

			const userDoc = {
				displayName,
				email,
				photoUrl: photoURL,
				role: "user",
				created_at: creationTime ? new Date(creationTime).toISOString() : new Date().toISOString(),
				last_login_at: lastSignInTime ? new Date(lastSignInTime).toISOString() : new Date().toISOString(),
			};

			let isNewUser = true;

			const createUser = async () => {
				try {
					await axiosInstance.post("/users", userDoc);
					isNewUser = true;
				} catch (err) {
					if (err.response?.status === 200) {
						// Silent handle - no console.error
						isNewUser = false;
						try {
							const token = await user.getIdToken(true);
							await axiosInstance.patch(
								`/users/${email}`,
								{ last_login_at: new Date().toISOString() },
								{
									headers: {
										Authorization: `Bearer ${token}`,
									},
								}
							);
						} catch (updateError) {
							console.error("Fallback patch failed", updateError);
						}
					} else {
						console.error("User creation failed", err);
					}
				}
			};

			await createUser();

			// Show toast based on status
			if (isNewUser) {
				toast.success("Account created successfully! You're now logged in.");
			} else {
				toast.success("Welcome back! You're now logged in.");
			}

			setUser(user);
			navigate(from, { replace: true });
		} catch (error) {
			// console.error("Social Login Error:", error);
			toast.error("Google Login failed.");
		} finally {
			setLoading(false);
		}
	};

	return handleSocialLogin;
};

export default useSocialLogin;
