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

			// define the createUser function that returns a boolean
			const createUser = async () => {
				try {
					const res = await axiosInstance.post("/users", userDoc);
					if (res.status === 200 && res.data?.exists) {
						// user already exists → fallback patch
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
						return false; // existing user
					}
					return true; // new user created (201)
				} catch (err) {
					console.error("User creation failed:", err);
					return false;
				}
			};

			// now safely await
			const isNewUser = await createUser();

			// success alert
			if (isNewUser) {
				toast.success("Account created successfully! You're now logged in.");
			} else {
				toast.success("Welcome back! You're now logged in.");
			}

			setUser(user);
			navigate(from, { replace: true });
		} catch (error) {
			toast.error("Google Login failed.");
		} finally {
			setLoading(false);
		}
	};

	return handleSocialLogin;
};

export default useSocialLogin;
