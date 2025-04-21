import React, { useState, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import {
  PopupOverlay,
  MapPopupContent,
  MapWrapper,
  CloseButton,
  DistanceControl,
  DistanceLabel,
  DistanceInput,
  ApplyButton,
  AvatarImage,
  AvatarMarkerWrapper,
  RedPointer
} from './MapPopup.styled';

const MapPopup = ({ onClose, onSelectCoordinates, onSelectCity, crafters = [], center, onSetDistance, isSearch }) => {
  const [position, setPosition] = useState(center || [32.2227, 35.2621]);
  const distanceRef = useRef();

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
    const fullLocation = `${city} , ${street}`;

    onSelectCoordinates?.(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
    onSelectCity?.(fullLocation);
  };

  return (
    <PopupOverlay>
      <CloseButton onClick={onClose}>Close</CloseButton>

      <MapPopupContent>
      {isSearch && 
        (<DistanceControl>
          <DistanceLabel htmlFor="maxDistance">Max Distance (KM):</DistanceLabel>
          <DistanceInput
            id="maxDistance"
            type="number"
            min="1"
            max="50000"
            step="1"
            defaultValue={5}
            ref={distanceRef}
          />

          <ApplyButton
            onClick={() => {
              const currentValue = distanceRef.current.value;
              onSetDistance(currentValue);
            }}
          >
            Search
          </ApplyButton>
        </DistanceControl> 
      )}

        

        <MapWrapper>
          <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />

            <Marker
              position={position}
              icon={L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [0, -20]
              })}
            >
              <Popup>You are here!</Popup>
            </Marker>

            {/* Crafter markers with red pointers */}
            {crafters.map((user, idx) => {
              const [lng, lat] = user.location?.coordinates || [];
              if (!lat || !lng) return null;

              const markerHtml = ReactDOMServer.renderToString(
                <AvatarMarkerWrapper>
                  <AvatarImage src={user.avatarUrl || "https://cdn-icons-png.flaticon.com/512/847/847969.png"} />
                  <RedPointer />
                </AvatarMarkerWrapper>
              );

              const customIcon = L.divIcon({
                html: markerHtml,
                className: '',
                iconSize: [50, 65],
                iconAnchor: [25, 65],
                popupAnchor: [0, -40]
              });

              return (
                <Marker key={idx} position={[lat, lng]} icon={customIcon}>
                  <Popup>
                    <strong>{user.name}</strong><br />
                    {user.craft}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </MapWrapper>
      </MapPopupContent>
    </PopupOverlay>
  );
};

export default MapPopup;
