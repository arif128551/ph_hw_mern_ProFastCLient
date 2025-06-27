import casio from "../../../../assets/brands/casio.png";
import amazon from "../../../../assets/brands/amazon.png";
import moonstar from "../../../../assets/brands/moonstar.png";
import start from "../../../../assets/brands/start.png";
import startPeople from "../../../../assets/brands/start-people.png";
import randstad from "../../../../assets/brands/randstad.png";

const companyLogos = [
	{ name: "Casio", src: casio },
	{ name: "Amazon", src: amazon },
	{ name: "Moonstar", src: moonstar },
	{ name: "Star+", src: start },
	{ name: "StartPeople", src: startPeople },
	{ name: "Randstad", src: randstad },
];

const TrustedBy = () => {
	return (
		<section className="pb-25">
			<div className="max-w-7xl mx-auto px-4 text-center">
				<h3 className="text-[#023537] font-semibold text-lg mb-10">We've helped thousands of sales teams</h3>
				<div className="flex flex-wrap justify-between items-center gap-8">
					{companyLogos.map((logo, index) => (
						<img
							key={index}
							src={logo.src}
							alt={logo.name}
							className="h-6 object-contain grayscale hover:grayscale-0 transition duration-300"
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default TrustedBy;
