import React from "react";
import { Link } from "react-router";

const Login = () => {
	return (
		<div className="w-[384px]">
			<h2 className="text-5xl font-extrabold mb-1">Welcome Back</h2>
			<p className="mb-5">Login with Profast</p>
			<form className="fieldset">
				<label className="label">Email</label>
				<input type="email" className="input mb-3 w-full" placeholder="Email" />
				<label className="label">Password</label>
				<input type="password" className="input w-full" placeholder="Password" />
				<div>
					<a className="link link-hover">Forgot password?</a>
				</div>
				<button className="btn mt-2 bg-ccaeb66 text-black">Login</button>
			</form>
			<p className="mt-1 text-gray-400">
				Don’t have any account? <Link>Register</Link>
			</p>
		</div>
	);
};

export default Login;
