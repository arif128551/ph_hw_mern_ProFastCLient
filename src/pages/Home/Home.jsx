import React from "react";
import Banner from "./sections/Banner/Banner";
import HowItWorks from "./sections/HowItWorks/HowItWorks";
import OurServices from "./sections/OurServices/OurServices";
import TrustedBy from "./sections/TrustedBy/TrustedBy";
import DeliveryFeatures from "./sections/DeliveryFeatures/DeliveryFeatures";

const Home = () => {
	return (
		<>
			<Banner></Banner>
			<HowItWorks></HowItWorks>
			<OurServices></OurServices>
			<TrustedBy></TrustedBy>
			<DeliveryFeatures></DeliveryFeatures>
		</>
	);
};

export default Home;
