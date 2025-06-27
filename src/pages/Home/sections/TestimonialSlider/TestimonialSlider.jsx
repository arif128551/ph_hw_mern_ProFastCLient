import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Quote } from "lucide-react";

import customerTopImg from "../../../../assets/customer-top.png";

const TestimonialSlider = () => {
	const testimonials = [
		{
			id: 1,
			text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
			author: "Awlad Hossain",
			position: "Senior Product Designer",
			avatar: "AH",
		},
		{
			id: 2,
			text: "The service quality exceeded my expectations. Professional team, timely delivery, and excellent customer support made the entire experience seamless and satisfactory.",
			author: "Rasel Ahmed",
			position: "Business Manager",
			avatar: "RA",
		},
		{
			id: 3,
			text: "Outstanding delivery service with real-time tracking. The package arrived safely and on time. Highly recommended for reliable shipping solutions.",
			author: "Nasir Uddin",
			position: "Marketing Specialist",
			avatar: "NU",
		},
		{
			id: 4,
			text: "Exceptional customer service and fast delivery times. The team was professional and handled our corporate shipping needs with great efficiency.",
			author: "Mohammad Khan",
			position: "Operations Director",
			avatar: "MK",
		},
		{
			id: 5,
			text: "Reliable and cost-effective shipping solution. The tracking system is user-friendly and provides accurate updates throughout the delivery process.",
			author: "Sharmin Akter",
			position: "E-commerce Owner",
			avatar: "SA",
		},
	];

	const [currentSlide, setCurrentSlide] = React.useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

	// Auto play functionality
	React.useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % testimonials.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [isAutoPlaying, testimonials.length]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % testimonials.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	const goToSlide = (index) => {
		setCurrentSlide(index);
	};

	const getSlideClass = (index) => {
		if (index === currentSlide) return "active";
		if (index === (currentSlide - 1 + testimonials.length) % testimonials.length) return "prev";
		if (index === (currentSlide + 1) % testimonials.length) return "next";
		return "inactive";
	};

	return (
		<section className="bg-[#f1f4f6] pb-20 pt-25">
			<div className="container mx-auto px-4 text-center">
				<div className="pb-10">
					<img src={customerTopImg} alt="top illustration" className="mx-auto mb-6" />
					<h2 className="text-2xl md:text-3xl font-bold text-[#023537] mb-2">What our customers are sayings</h2>
					<p className="text-gray-600 max-w-xl mx-auto text-sm">
						Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce
						pain, and strengthen your body with ease!
					</p>
				</div>

				<div className="w-full bg-gradient-to-br flex items-center justify-center p-4">
					<div className="w-full max-w-6xl mx-auto">
						<div
							className="relative h-96 overflow-hidden"
							onMouseEnter={() => setIsAutoPlaying(false)}
							onMouseLeave={() => setIsAutoPlaying(true)}
						>
							{/* Slides Container */}
							<div className="flex items-center justify-center h-full relative">
								{testimonials.map((testimonial, index) => (
									<div
										key={testimonial.id}
										className={`absolute transition-all duration-500 ease-in-out ${
											getSlideClass(index) === "active"
												? "opacity-100 scale-100 z-20 translate-x-0"
												: getSlideClass(index) === "prev"
												? "opacity-60 scale-90 z-10 -translate-x-80"
												: getSlideClass(index) === "next"
												? "opacity-60 scale-90 z-10 translate-x-80"
												: "opacity-30 scale-75 z-0"
										}`}
									>
										<div className="bg-white rounded-2xl p-8 max-w-md w-80 mx-auto ">
											{/* Quote Icon */}
											<div className="text-4xl text-teal-300 text-center mb-6">"</div>

											{/* Testimonial Text */}
											<p className="text-gray-600 text-center leading-relaxed mb-6">{testimonial.text}</p>

											{/* Divider */}
											<div className="w-16 h-0.5 bg-gray-300 mx-auto mb-6"></div>

											{/* Author Info */}
											<div className="flex items-center justify-center gap-4">
												<div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
													{testimonial.avatar}
												</div>
												<div className="text-center">
													<h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
													<p className="text-sm text-gray-500">{testimonial.position}</p>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Navigation Buttons */}
							<button
								onClick={prevSlide}
								className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-30"
							>
								<svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
							</button>

							<button
								onClick={nextSlide}
								className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-30"
							>
								<svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</button>
						</div>

						{/* Pagination Dots */}
						<div className="flex justify-center mt-8 gap-2">
							{testimonials.map((_, index) => (
								<button
									key={index}
									onClick={() => goToSlide(index)}
									className={`w-3 h-3 rounded-full transition-all duration-300 ${
										index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
									}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TestimonialSlider;
