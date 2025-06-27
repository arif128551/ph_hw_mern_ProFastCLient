import parcelIllustration from "../../../../assets/location-merchant.png";

const PriorityBanner = () => {
	return (
		<section className="pb-25 mx-4">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-[#023537] rounded-4xl p-20">
				<div className="flex-1 text-white">
					<h2 className="text-2xl md:text-3xl font-bold mb-4">
						Merchant and Customer Satisfaction <br />
						is Our First Priority
					</h2>
					<p className="text-sm md:text-base mb-6 text-white/80">
						We offer the lowest delivery charge with the highest value along with 100% safety of your product. Profast
						courier delivers your parcels in every corner of Bangladesh right on time.
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<button className="bg-[#d8f55a] text-[#023537] font-semibold px-6 py-2 rounded-full hover:bg-[#cce650] transition">
							Become a Merchant
						</button>
						<button className="border border-[#d8f55a] text-[#d8f55a] font-semibold px-6 py-2 rounded-full hover:bg-[#d8f55a] hover:text-[#023537] transition">
							Earn with Profast Courier
						</button>
					</div>
				</div>

				<div className="flex-1">
					<img src={parcelIllustration} alt="parcel illustration" className="max-w-full h-auto" />
				</div>
			</div>
		</section>
	);
};

export default PriorityBanner;
