import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
});

const FlyToLocation = ({ position, popupRef }) => {
	const map = useMap();

	useEffect(() => {
		if (
			position &&
			Array.isArray(position) &&
			position.length === 2 &&
			typeof position[0] === "number" &&
			typeof position[1] === "number"
		) {
			map.flyTo(position, 10, { duration: 1.5 });
			setTimeout(() => {
				if (popupRef.current && popupRef.current._latlng) {
					popupRef.current.openOn(map);
				}
			}, 1600);
		}
	}, [position, map, popupRef]);

	return null;
};

const BangladeshMap = ({ locations, searchText }) => {
	const popupRef = useRef(null);

	const matchedLocation = locations.find((loc) => {
		const search = searchText.toLowerCase();
		return (
			loc.district.toLowerCase().includes(search) ||
			loc.city.toLowerCase().includes(search) ||
			loc.region.toLowerCase().includes(search) ||
			loc.covered_area.some((area) => area.toLowerCase().includes(search))
		);
	});

	const matchedPosition =
		matchedLocation && typeof matchedLocation.latitude === "number" && typeof matchedLocation.longitude === "number"
			? [matchedLocation.latitude, matchedLocation.longitude]
			: null;
	return (
		<div className="w-full h-[500px] rounded-lg overflow-hidden">
			<MapContainer center={[23.7, 90.35]} zoom={6} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; OpenStreetMap contributors"
				/>

				{matchedPosition && <FlyToLocation position={matchedPosition} popupRef={popupRef} />}

				{locations.map((loc, idx) => {
					if (typeof loc.latitude !== "number" || typeof loc.longitude !== "number") {
						return null; // skip if invalid
					}

					const isMatched =
						matchedLocation && loc.district === matchedLocation.district && loc.city === matchedLocation.city;

					return (
						<Marker key={idx} position={[loc.latitude, loc.longitude]} icon={customIcon}>
							<Popup ref={isMatched ? popupRef : null}>
								<strong>{loc.district}</strong>
								<br />
								Region: {loc.region}
								<br />
								City: {loc.city}
								<br />
								Covered: {loc.covered_area.join(", ")}
								<br />
								<a href={loc.flowchart} target="_blank" className="text-blue-600 underline">
									Flowchart
								</a>
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
};

export default BangladeshMap;
