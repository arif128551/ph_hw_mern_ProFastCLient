import React, { useEffect, useState } from "react";

import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { auth } from "../../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const signInUserWithEmailPass = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const updateUser = (updateUserData) => {
		return updateProfile(auth.currentUser, updateUserData);
	};

	const signOutUser = () => {
		setLoading(true);
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			try {
				if (currentUser) {
					await auth.currentUser?.reload();
					await auth.currentUser?.getIdToken(true);
					setUser(auth.currentUser);
				} else {
					setUser(null);
				}
			} catch (err) {
				toast.error("Auth error:", err);
				setUser(null);
			} finally {
				setLoading(false);
			}
		});
		return () => unsubscribe();
	}, []);

	const userInfo = {
		user,
		setUser,
		createUser,
		signInUserWithEmailPass,
		signOutUser,
		updateUser,
		googleSignIn,
		loading,
		setLoading,
	};
	return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
