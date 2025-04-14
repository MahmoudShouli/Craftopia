import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { PopupOverlay, MapWrapper, CloseButton } from '../styles/MapPopup.styled'

const MapPopup = ({ onClose, onSelectCoordinates, onSelectCity }) => {
  const [position, setPosition] = useState([32.2227, 35.2621]); // default to Nablus

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        reverseGeocode(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  const reverseGeocode = async (lat, lon) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await res.json();
  
    const address = data?.address;
    const city = address?.city || address?.town || address?.village || "";
    const street = address?.road || address?.pedestrian || address?.footway || "";
    
    // Combine for full readable location (e.g., "Main St, Nablus")
    const fullLocation = `${city} , ${street}`;
  
    onSelectCoordinates(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
    onSelectCity(fullLocation);  // sends to SignupPage input
    onClose();
  };

  return (
    <PopupOverlay>
      <CloseButton onClick={onClose}>Close</CloseButton>
      <MapWrapper>
        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler />
          <Marker position={position} icon={L.icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] })} />
        </MapContainer>
      </MapWrapper>
    </PopupOverlay>
  );
};

export default MapPopup;
