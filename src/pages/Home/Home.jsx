import React from "react";
import Banner from "./sections/Banner/Banner";
import HowItWorks from "./sections/HowItWorks/HowItWorks";
import OurServices from "./sections/OurServices/OurServices";
import TrustedBy from "./sections/TrustedBy/TrustedBy";
import DeliveryFeatures from "./sections/DeliveryFeatures/DeliveryFeatures";
import PriorityBanner from "./sections/PriorityBanner/PriorityBanner";
import TestimonialSlider from "./sections/TestimonialSlider/TestimonialSlider";
import FaqSection from "./sections/FaqSection/FaqSection";

const Home = () => {
	return (
		<>
			<Banner></Banner>
			<HowItWorks></HowItWorks>
			<OurServices></OurServices>
			<TrustedBy></TrustedBy>
			<DeliveryFeatures></DeliveryFeatures>
			<PriorityBanner></PriorityBanner>
			<TestimonialSlider></TestimonialSlider>
			<FaqSection></FaqSection>
		</>
	);
};

export default Home;
