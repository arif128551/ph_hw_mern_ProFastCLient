import trackingImg from "../../../../assets/live-tracking.png";
import safeImg from "../../../../assets/safe-delivery.png";
import supportImg from "../../../../assets/safe-delivery.png";

const features = [
	{
		title: "Live Parcel Tracking",
		description:
			"Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
		image: trackingImg,
	},
	{
		title: "100% Safe Delivery",
		description:
			"We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
		image: safeImg,
	},
	{
		title: "24/7 Call Center Support",
		description:
			"Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
		image: supportImg,
	},
];

const DeliveryFeatures = () => {
	return (
		<section className="px-4 mb-20">
			<div className="max-w-7xl mx-auto space-y-6 py-20 border-y border-dashed border-[#03464D]">
				{features.map((feature, index) => (
					<div key={index} className="bg-white rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
						<div className="">
							<img src={feature.image} alt={feature.title} className="w-36 md:w-44 object-contain" />
						</div>
						<hr className="border-r border-dashed border-[#03464D] h-[150px] hidden md:block" />
						<div className="text-center md:text-left">
							<h3 className="text-lg font-semibold text-[#023537] mb-2">{feature.title}</h3>
							<p className="text-sm text-gray-700">{feature.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default DeliveryFeatures;
