import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PageLoader from "../../../components/PageLoader";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
	const { parcelId } = useParams();
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const stripe = useStripe();
	const elements = useElements();
	const [cardError, setCardError] = useState("");
	const navigate = useNavigate();
	const {
		isPending,
		error,
		data: parcelInfo = {},
	} = useQuery({
		queryKey: ["parcelInfo", parcelId],
		queryFn: async () => {
			const res = await axiosSecure(`/parcel/${parcelId}`);
			return res.data;
		},
	});

	if (isPending) return <PageLoader />;
	if (error) return toast.error("An error has occurred: " + error.message);

	const amount = parcelInfo?.deliveryCost || 0;
	const amountInCents = parseFloat(amount) * 100;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) return;

		const card = elements.getElement(CardElement);
		if (!card) return;

		// Step 1: Create Payment Method
		const { error: methodError } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (methodError) {
			setCardError(methodError.message);
			return;
		}

		setCardError("");

		// Step 2: Create Payment Intent
		const res = await axiosSecure.post("/create-payment-intent", {
			amountInCents,
			parcelId,
		});

		const clientSecret = res.data.clientSecret;

		// Step 3: Confirm Payment
		const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card,
				billing_details: {
					name: user.displayName,
					email: user.email,
				},
			},
		});

		if (confirmError) {
			console.log("[Stripe Confirm Error]", confirmError);
			setCardError(confirmError.message);
			return;
		}

		console.log("[PaymentIntent]", paymentIntent);

		// Step 4: Save payment data to backend
		const paymentInfo = {
			parcelId,
			email: user?.email,
			amount,
			paymentMethod: paymentIntent.payment_method_types?.[0] || "card",
			transactionId: paymentIntent.id,
		};

		try {
			const paymentRes = await axiosSecure.post("/payments", paymentInfo);
			if (paymentRes.data.insertedId) {
				Swal.fire({
					icon: "success",
					title: "Payment Successful",
					html: `<p>Your transaction was completed successfully.</p>
         <p><strong>Transaction ID:</strong> ${paymentIntent.id}</p>`,
					timer: 4000, // ৪ সেকেন্ড পর অটো ক্লোজ হবে
					timerProgressBar: true,
					showConfirmButton: false,
					didClose: () => {
						navigate("/dashboard/my-parcel");
					},
				});
			}
		} catch (error) {
			console.error("Payment info save failed:", error);
			toast.error("Payment done but failed to record history.");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl space-y-4">
			<div className="p-3 border rounded-md focus-within:ring focus-within:ring-primary">
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#1f2937",
								fontFamily: "ui-sans-serif, system-ui, sans-serif",
								"::placeholder": {
									color: "#9ca3af",
								},
							},
							invalid: {
								color: "#ef4444",
							},
						},
					}}
				/>
			</div>

			{cardError && <p className="text-red-500 text-sm font-medium">{cardError}</p>}

			<button
				type="submit"
				disabled={!stripe}
				className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Pay ${amount}
			</button>
		</form>
	);
};

export default CheckoutForm;
