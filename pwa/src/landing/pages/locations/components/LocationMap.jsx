import React, { useEffect, useRef } from "react";
import { LOCATION_TYPES } from "../../../utils/constants";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with Webpack/Vite
// This is necessary because Leaflet's default marker icons reference images via relative paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Component to handle map center and zoom changes
const MapUpdater = ({ center, zoom, selectedLocation }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);
  
  useEffect(() => {
    if (selectedLocation) {
      map.setView([selectedLocation.latitude, selectedLocation.longitude], zoom + 1);
    }
  }, [map, selectedLocation, zoom]);
  
  return null;
};

const LocationMap = ({
  locations,
  center,
  zoom,
  onLocationClick,
  selectedLocationId,
}) => {
  const mapRef = useRef(null);

  // Get marker icon based on location type
  const getMarkerIcon = (type) => {
    const colors = {
      [LOCATION_TYPES.RESTAURANT]: "#fb923c", // orange-400
      [LOCATION_TYPES.EVENT]: "#a855f7", // purple-500
      [LOCATION_TYPES.LANDMARK]: "#3b82f6", // blue-500
      [LOCATION_TYPES.MARKET]: "#22c55e", // green-500
      [LOCATION_TYPES.WORKSHOP]: "#f59e0b", // amber-500
    };
    
    const color = colors[type] || "#6b7280"; // gray-500 default
    
    return L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
             </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  // Find selected location
  const selectedLocation = locations.find(loc => loc.id === selectedLocationId);

  return (
    <div className="relative w-full h-[60vh] bg-gray-100 rounded-lg overflow-hidden">
      {locations.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center text-gray-500 text-center p-4">
          <div>
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="font-medium">
              Selecciona filtros para ver ubicaciones
            </p>
          </div>
        </div>
      ) : (
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapUpdater 
            center={center} 
            zoom={zoom} 
            selectedLocation={selectedLocation} 
          />
          
          {locations.map(location => (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={getMarkerIcon(location.type)}
              eventHandlers={{
                click: () => onLocationClick(location)
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-lg">{location.name}</h3>
                  {location.type && (
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 mt-1">
                      {location.type}
                    </span>
                  )}
                  {location.description && (
                    <p className="mt-2 text-sm">{location.description}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default LocationMap;
