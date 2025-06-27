import { Truck, Globe, Boxes, DollarSign, Briefcase, RotateCcw } from "lucide-react";

const iconMap = {
	truck: Truck,
	globe: Globe,
	boxes: Boxes,
	dollar: DollarSign,
	briefcase: Briefcase,
	rotate: RotateCcw,
};

const services = [
	{
		title: "Express & Standard Delivery",
		icon: "truck",
		description:
			"We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
	},
	{
		title: "Nationwide Delivery",
		icon: "globe",
		description:
			"We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
	},
	{
		title: "Fulfillment Solution",
		icon: "boxes",
		description:
			"We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
	},
	{
		title: "Cash on Home Delivery",
		icon: "dollar",
		description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
	},
	{
		title: "Corporate Service / Contract In Logistics",
		icon: "briefcase",
		description: "Customized corporate services which includes warehouse and inventory management support.",
	},
	{
		title: "Parcel Return",
		icon: "rotate",
		description:
			"Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
	},
];

const OurServices = () => {
	return (
		<section className="px-4 pb-25">
			<div className="container mx-auto bg-[#023537] rounded-4xl py-25">
				<div className="max-w-7xl mx-auto px-4 text-center">
					<h2 className="text-white text-3xl font-semibold mb-2">Our Services</h2>
					<p className="text-white/80 max-w-2xl mx-auto mb-10 text-sm md:text-base">
						Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to
						business shipments — we deliver on time, every time.
					</p>

					<div className="grid gap-6 md:grid-cols-3">
						{services.map((service, index) => {
							const IconComponent = iconMap[service.icon];
							return (
								<div
									key={index}
									className={`rounded-xl p-8 text-left transition-all duration-300 bg-white text-[#023537] hover:bg-[#d8f55a] hover:text-[#023537]`}
								>
									<div className="mb-4 flex items-center justify-center">
										<div className="bg-[#EEEDFC] w-20 h-20 flex items-center justify-center rounded-full">
											<IconComponent className="text-[#fa6e46] w-10 h-10" />
										</div>
									</div>
									<h3 className="text-2xl font-semibold mb-2 text-center">{service.title}</h3>
									<p className="text-center">{service.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurServices;
