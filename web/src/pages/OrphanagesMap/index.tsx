import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "./style.css";

import mapMaker from "../../assets/map.svg";
import mapIcon from "../../utils/mapIcon";
import api from "../../services/api";

interface IOrphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const [orphanageList, setOrphanageList] = useState<IOrphanage[]>([]);

  // Loads orphanage list
  useEffect(() => {
    api.get("orphanages").then((resp) => {
      setOrphanageList(resp.data);
      console.log(resp.data)
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMaker} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando pela sua visita {":)"}</p>
        </header>
        <footer>
          <strong>Cabedelo</strong>
          <span>Paraíba</span>
        </footer>
      </aside>

      <Map
        center={[-7.135559, -34.875659]}
        zoom={16}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanageList.map((orphanage) => (
          <Marker
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
            key={orphanage.id}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#ffffff" />
      </Link>
    </div>
  );
}
