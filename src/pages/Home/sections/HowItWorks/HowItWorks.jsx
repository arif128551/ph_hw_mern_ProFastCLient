import React from "react";
import { Building, MapPin, Truck, Users } from "lucide-react";

const HowItWorks = () => {
	const services = [
		{
			icon: "truck",
			title: "Booking Pick & Drop",
			description: "From personal packages to business shipments — we deliver on time, every time.",
		},
		{
			icon: "mappin",
			title: "Same On Delivery",
			description: "From personal packages to business shipments — we deliver on time, every time.",
		},
		{
			icon: "building",
			title: "Delivery Hub",
			description: "From personal packages to business shipments — we deliver on time, every time.",
		},
		{
			icon: "users",
			title: "Booking SME & Corporate",
			description: "From personal packages to business shipments — we deliver on time, every time.",
		},
	];

	const getIcon = (iconName) => {
		switch (iconName) {
			case "truck":
				return <Truck className="w-8 h-8 text-blue-600" />;
			case "mappin":
				return <MapPin className="w-8 h-8 text-blue-600" />;
			case "building":
				return <Building className="w-8 h-8 text-blue-600" />;
			case "users":
				return <Users className="w-8 h-8 text-blue-600" />;
			default:
				return <Truck className="w-8 h-8 text-blue-600" />;
		}
	};

	return (
		<div className="pb-25 px-4">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-3xl font-bold text-gray-800 mb-8">How it Works</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{services.map((service, index) => (
						<div key={index} className="bg-white/70 rounded-xl p-6 transition-shadow duration-300">
							<div className="flex justify-center mb-4">{getIcon(service.icon)}</div>

							<h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">{service.title}</h3>

							<p className="text-gray-600 text-sm text-center leading-relaxed">{service.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HowItWorks;
