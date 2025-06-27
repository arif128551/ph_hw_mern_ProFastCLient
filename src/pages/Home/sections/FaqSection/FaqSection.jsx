import React from "react";

const FaqSection = () => {
	return (
		<section className="bg-[#f1f4f6] pb-25 px-4">
			<div className="max-w-7xl mx-auto text-center px-25">
				<h2 className="text-2xl md:text-3xl font-bold text-[#023537] mb-3">Frequently Asked Question (FAQ)</h2>
				<p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm">
					Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce
					pain, and strengthen your body with ease!
				</p>

				<div className="text-left space-y-4">
					<div className="collapse collapse-arrow border border-[#92e3a9] bg-[#e6f8ec] open">
						<input type="radio" name="faq" defaultChecked />
						<div className="collapse-title font-medium text-[#023537]">How does this posture corrector work?</div>
						<div className="collapse-content text-sm text-gray-700">
							<p>
								A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine,
								encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A
								posture corrector works by providing support and gentle alignment to your shoulders.
							</p>
						</div>
					</div>

					<div className="collapse collapse-arrow bg-white">
						<input type="radio" name="faq" />
						<div className="collapse-title font-medium">Is it suitable for all ages and body types?</div>
						<div className="collapse-content text-sm text-gray-700">
							<p>Yes, it is designed for universal comfort and support for all age groups and body types.</p>
						</div>
					</div>

					<div className="collapse collapse-arrow bg-white">
						<input type="radio" name="faq" />
						<div className="collapse-title font-medium">
							Does it really help with back pain and posture improvement?
						</div>
						<div className="collapse-content text-sm text-gray-700">
							<p>Many users have reported reduced pain and better posture with consistent use.</p>
						</div>
					</div>

					<div className="collapse collapse-arrow bg-white">
						<input type="radio" name="faq" />
						<div className="collapse-title font-medium">Does it have smart features like vibration alerts?</div>
						<div className="collapse-content text-sm text-gray-700">
							<p>Some models include smart alerts, please refer to product details.</p>
						</div>
					</div>

					<div className="collapse collapse-arrow bg-white">
						<input type="radio" name="faq" />
						<div className="collapse-title font-medium">How will I be notified when the product is back in stock?</div>
						<div className="collapse-content text-sm text-gray-700">
							<p>You can sign up for email or SMS notifications on our website.</p>
						</div>
					</div>
				</div>

				<div className="mt-10">
					<button className="btn bg-[#d8f55a] text-[#023537] hover:bg-[#c9e653] font-semibold px-6">
						See More FAQ’s
						<span className="ml-2 text-lg">↗</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default FaqSection;
