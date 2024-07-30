"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useCountries } from "../lib/getCountries";
import { icon } from "leaflet";

interface Props {
  location: string;
}

const ICON = icon({
  iconUrl:
    "https://images.vexels.com/media/users/3/131261/isolated/preview/b2e48580147ca0ed3f970f30bf8bb009-karten-standortmarkierung.png",
  iconSize: [50, 50],
});

function Map(props: Props) {
  const { location } = props;

  const { getCountriesByName } = useCountries();

  const latLang = getCountriesByName(location)?.latlng;

  return (
    <MapContainer
      className="h-[50vh] rounded-lg relative z-0"
      center={latLang ?? [52.505, -0.09]}
      zoom={5}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latLang ?? [52.505, -0.09]} icon={ICON} />
    </MapContainer>
  );
}

export default Map;
