import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams } from "react-router";

const CheckoutForm = () => {
	const { parcelId } = useParams();
	const stripe = useStripe();
	const elements = useElements();
	const [cardError, setCardError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		const card = elements.getElement(CardElement);
		if (!card) return;

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			console.log("[error]", error);
			setCardError(error.message); // ✅ Show error to user
		} else {
			console.log("[PaymentMethod]", paymentMethod);
			setCardError(""); // ✅ Clear previous error
		}
	};

	console.log(parcelId);
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

			{/* ✅ Show error message */}
			{cardError && <p className="text-red-500 text-sm font-medium">{cardError}</p>}

			<button
				type="submit"
				disabled={!stripe}
				className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Pay
			</button>
		</form>
	);
};

export default CheckoutForm;
