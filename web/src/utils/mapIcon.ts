import Leaflet from "leaflet";

import mapMarkerImg from "../assets/map.svg";

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [50, 60],
  iconAnchor: [25, 30],
  popupAnchor: [170, 40],
});

export default mapIcon;
