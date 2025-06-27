import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Parallax, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slide1Img from "../../../../assets/banner/banner1.png";
import slide2Img from "../../../../assets/banner/banner2.png";
import slide3Img from "../../../../assets/banner/banner3.png";
const Banner = () => {
	return (
		<div className="container mx-auto px-4 py-15">
			<Swiper
				style={{
					"--swiper-navigation-color": "#fff",
					"--swiper-pagination-color": "#fff",
				}}
				speed={600}
				parallax={true}
				loop={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				modules={[Autoplay, Parallax, Pagination]}
				className="mySwiper rounded-4xl"
			>
				<SwiperSlide>
					<div
						className="h-[677px] text bg-cover"
						data-swiper-parallax="-100"
						style={{
							backgroundImage: `url(${slide1Img})`,
						}}
					>
						{/* <h3>We Make Sure Your Parcel Arrives On Time – No Fuss.</h3> */}
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div
						className="h-[677px] text bg-cover"
						data-swiper-parallax="-100"
						style={{
							backgroundImage: `url(${slide2Img})`,
						}}
					>
						{/* <h3>Fastest Delivery & Easy Pickup</h3> */}
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div
						className="h-[677px] text bg-cover"
						data-swiper-parallax="-100"
						style={{
							backgroundImage: `url(${slide3Img})`,
						}}
					>
						{/* <h3>Delivery in 30 Minutes at your doorstep</h3> */}
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Banner;
