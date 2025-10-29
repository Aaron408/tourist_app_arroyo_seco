import React, { useState, useEffect, useRef } from "react";
import { LOCATION_TYPES } from "../../../utils/constants";
import {
  MapPin,
  Layers,
  Utensils,
  Landmark,
  Store,
  Calendar,
  Hammer,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MAP_PROVIDERS = {
  osm: {
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  osmHOT: {
    name: "OSM Humanitarian",
    url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">HOT</a>',
    maxZoom: 19,
  },
  cartoDBVoyager: {
    name: "CartoDB Voyager",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
  },
  esriWorldStreet: {
    name: "Esri World Street",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
    maxZoom: 19,
  },
  stadia: {
    name: "Stadia Maps",
    url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 20,
  },
};

const MapUpdater = ({ center, zoom, selectedLocation, setIsTransitioning }) => {
  const map = useMap();

  useEffect(() => {
    window.map = map;

    return () => {
      window.map = null;
    };
  }, [map]);

  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);

  useEffect(() => {
    if (selectedLocation) {
      setIsTransitioning(true);

      const offset = [0, -75];

      const locationLatLng = L.latLng(
        selectedLocation.latitude,
        selectedLocation.longitude
      );
      const isLocationVisible = map.getBounds().contains(locationLatLng);
      const currentDistance = map.getCenter().distanceTo(locationLatLng);

      if (!isLocationVisible) {
        map.flyTo(
          [selectedLocation.latitude, selectedLocation.longitude],
          zoom,
          {
            duration: 1.5,
            easeLinearity: 0.25,
          }
        );

        setTimeout(() => {
          map.panBy(offset, {
            animate: true,
            duration: 0.3,
          });
          setTimeout(() => setIsTransitioning(false), 300);
        }, 1600);
      } else {
        map.panTo([selectedLocation.latitude, selectedLocation.longitude], {
          animate: true,
          duration: 0.5,
        });

        setTimeout(() => {
          map.panBy(offset, {
            animate: true,
            duration: 0.3,
          });
          setTimeout(() => setIsTransitioning(false), 300);
        }, 600);
      }
    }
  }, [map, selectedLocation, zoom, setIsTransitioning]);

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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getMarkerIcon = (type, isSelected = false) => {
    const iconConfig = {
      [LOCATION_TYPES.RESTAURANT]: {
        color: "#fb923c",
        selectedColor: "#ea580c",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z"></path></svg>`,
        label: "Restaurante",
      },
      [LOCATION_TYPES.EVENT]: {
        color: "#a855f7",
        selectedColor: "#9333ea",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>`,
        label: "Evento",
      },
      [LOCATION_TYPES.LANDMARK]: {
        color: "#3b82f6",
        selectedColor: "#2563eb",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark"><line x1="3" x2="21" y1="22" y2="22"></line><line x1="6" x2="6" y1="18" y2="22"></line><line x1="18" x2="18" y1="18" y2="22"></line><path d="M6 18h12"></path><path d="M12 2v6"></path><path d="m8.5 8 3.5-6 3.5 6"></path><path d="M3 14h18v4H3z"></path></svg>`,
        label: "Lugar emblemático",
      },
      [LOCATION_TYPES.MARKET]: {
        color: "#22c55e",
        selectedColor: "#16a34a",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"></path></svg>`,
        label: "Mercado",
      },
      [LOCATION_TYPES.WORKSHOP]: {
        color: "#f59e0b",
        selectedColor: "#d97706",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hammer"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path><path d="M17.64 15 22 10.64"></path><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"></path></svg>`,
        label: "Taller",
      },
    };

    const config = iconConfig[type] || {
      color: "#6b7280",
      selectedColor: "#4b5563",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
      label: "Ubicación",
    };

    const tooltip = config.label;

    const color = isSelected ? config.selectedColor : config.color;
    const size = isSelected ? 46 : 36;
    const iconSize = isSelected ? 20 : 16;
    const strokeWidth = isSelected ? 2.5 : 2;
    const zIndex = isSelected ? 1000 : "auto";

    return L.divIcon({
      className: `custom-map-marker ${isSelected ? "selected-marker" : ""}`,
      html: `
        <div class="marker-container ${
          isSelected ? "marker-selected" : ""
        }" title="${tooltip}" style="z-index: ${zIndex}">
          <div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; justify-content: center; align-items: center; color: white; box-shadow: 0 ${
        isSelected ? "4px 8px" : "2px 5px"
      } rgba(0,0,0,${isSelected ? "0.5" : "0.4"}); position: relative; ${
        isSelected ? "border: 2px solid white;" : ""
      }">
            <div style="transform: rotate(45deg);">
              <svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="lucide">
                ${
                  config.icon
                    .split('class="lucide lucide-')[1]
                    .split("</svg>")[0]
                }
              </svg>
            </div>
          </div>
          <div style="background-color: rgba(0,0,0,${
            isSelected ? "0.3" : "0.2"
          }); width: ${isSelected ? 12 : 10}px; height: ${
        isSelected ? 12 : 10
      }px; border-radius: 50%; position: relative; top: ${
        isSelected ? -6 : -5
      }px; left: ${isSelected ? size / 3 : 13}px; z-index: -1;"></div>
          ${
            isSelected
              ? '<div style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%); background-color: rgba(255, 255, 255, 0.9); padding: 3px 8px; border-radius: 12px; font-size: 10px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">' +
                tooltip +
                "</div>"
              : ""
          }
        </div>
      `,
      iconSize: [size, size + 6],
      iconAnchor: [size / 2, size + 6],
      popupAnchor: [0, -size],
    });
  };

  const selectedLocation = locations.find(
    (loc) => loc.id === selectedLocationId
  );

  const [activeMapProvider, setActiveMapProvider] = useState(() => {
    const saved = localStorage.getItem("preferredMapProvider");
    return saved && MAP_PROVIDERS[saved] ? saved : "cartoDBVoyager";
  });

  useEffect(() => {
    localStorage.setItem("preferredMapProvider", activeMapProvider);
  }, [activeMapProvider]);

  const renderMobileLayerControl = () => {
    return (
      <div className="absolute bottom-4 right-4 z-1000 md:hidden">
        <div className="bg-white rounded-full shadow-lg p-2">
          <button
            onClick={() => {
              const selectLayer = prompt(
                "Selecciona un estilo de mapa:\n1. OpenStreetMap\n2. OSM Humanitarian\n3. CartoDB Voyager\n4. Esri World Street\n5. Stadia Maps",
                "3"
              );

              const options = {
                1: "osm",
                2: "osmHOT",
                3: "cartoDBVoyager",
                4: "esriWorldStreet",
                5: "stadia",
              };

              if (selectLayer && options[selectLayer]) {
                setActiveMapProvider(options[selectLayer]);
              }
            }}
            className="flex items-center justify-center w-10 h-10"
            title="Cambiar estilo de mapa"
          >
            <Layers size={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
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
        <>
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
            zoomControl={false}
          >
            {/* Control de capas solo visible en pantallas medianas y grandes */}
            <LayersControl position="topright" className="hidden md:block">
              {Object.entries(MAP_PROVIDERS).map(([key, provider]) => (
                <LayersControl.BaseLayer
                  key={key}
                  name={provider.name}
                  checked={activeMapProvider === key}
                >
                  <TileLayer
                    attribution={provider.attribution}
                    url={provider.url}
                    maxZoom={provider.maxZoom}
                    eventHandlers={{
                      add: () => setActiveMapProvider(key),
                    }}
                  />
                </LayersControl.BaseLayer>
              ))}
            </LayersControl>

            {/* Para dispositivos móviles, usamos un botón personalizado */}
            {renderMobileLayerControl()}

            {/* Capa activa seleccionada */}
            <TileLayer
              attribution={MAP_PROVIDERS[activeMapProvider].attribution}
              url={MAP_PROVIDERS[activeMapProvider].url}
              maxZoom={MAP_PROVIDERS[activeMapProvider].maxZoom}
            />

            <ZoomControl position="bottomleft" />

            <MapUpdater
              center={center}
              zoom={zoom}
              selectedLocation={selectedLocation}
              setIsTransitioning={setIsTransitioning}
            />

            {locations.map((location) => (
              <Marker
                key={location.id}
                position={[location.latitude, location.longitude]}
                icon={getMarkerIcon(
                  location.type,
                  location.id === selectedLocationId
                )}
                zIndexOffset={location.id === selectedLocationId ? 1000 : 0}
                eventHandlers={{
                  click: () => onLocationClick(location),
                }}
              >
              </Marker>
            ))}
          </MapContainer>

          {/* Indicador visual durante la transición */}
          {isTransitioning && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000">
              <div className="bg-white bg-opacity-80 rounded-full p-3 shadow-lg">
                <div className="animate-spin h-6 w-6 border-2 border-amber-600 border-t-transparent rounded-full"></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocationMap;
