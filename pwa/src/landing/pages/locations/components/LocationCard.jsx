import React from "react";
import { MapPin, Phone, Star } from "lucide-react";
import { useLanguageStore } from "../../../stores/languageStore";
import { LOCATION_TYPES } from "../../../utils/constants";

const getTypeColor = (type) => {
  const colors = {
    [LOCATION_TYPES.RESTAURANT]: "bg-orange-100 text-orange-700 border-orange-200",
    [LOCATION_TYPES.EVENT]: "bg-purple-100 text-purple-700 border-purple-200",
    [LOCATION_TYPES.LANDMARK]: "bg-blue-100 text-blue-700 border-blue-200",
    [LOCATION_TYPES.MARKET]: "bg-green-100 text-green-700 border-green-200",
    [LOCATION_TYPES.WORKSHOP]: "bg-amber-100 text-amber-700 border-amber-200",
  };

  return colors[type] || "bg-gray-100 text-gray-700 border-gray-200";
};

const LocationCard = ({
  name,
  description,
  type,
  address,
  phone,
  image_url,
  rating,
  onClick,
  isSelected,
  compact = false
}) => {
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();

  // Función para obtener la etiqueta del tipo usando el store
  const getTypeLabel = (type) => {
    const typeLabels = {
      [LOCATION_TYPES.RESTAURANT]: t.locationsPage.restaurants,
      [LOCATION_TYPES.EVENT]: t.locationsPage.events,
      [LOCATION_TYPES.LANDMARK]: t.locationsPage.landmarks,
      [LOCATION_TYPES.MARKET]: t.locationsPage.markets,
      [LOCATION_TYPES.WORKSHOP]: t.locationsPage.workshops,
    };

    const label = typeLabels[type] || type;
    // Convertir a singular eliminando la última 's' si existe
    return label.endsWith('s') ? label.slice(0, -1) : label;
  };

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden h-full flex ${
          isSelected ? "ring-2 ring-amber-500" : ""
        }`}
      >
        <div className="flex h-full w-full">
          <div className="relative w-1/3 overflow-hidden shrink-0">
            <img
              src={
                image_url ||
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
              }
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=No+disponible";
              }}
            />
            {rating && (
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-xs shadow-md">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-gray-900 ml-1">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <div className="w-2/3 p-4 flex flex-col">
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-bold text-gray-900 line-clamp-1 flex-1 mr-2">{name}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border shrink-0 ${getTypeColor(
                    type
                  )}`}
                >
                  {getTypeLabel(type)}
                </span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">{description}</p>
              
              {address && (
                <div className="flex items-start text-xs text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1 mt-0.5 shrink-0 text-amber-600" />
                  <span className="line-clamp-1">{address}</span>
                </div>
              )}
            </div>
            
            <div className="mt-auto">
              <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg">
                {t.locationsPage.viewDetails}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden transform hover:-translate-y-1 h-full flex flex-col ${
        isSelected ? "ring-4 ring-amber-500 shadow-amber-200" : ""
      }`}
    >
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <img
          src={
            image_url ||
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
          }
          alt={name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x200?text=Imagen+no+disponible";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
        
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm bg-white/95 ${getTypeColor(
              type
            )}`}
          >
            {getTypeLabel(type)}
          </span>
        </div>
        {rating && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-gray-900">
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        <div className="space-y-2 mb-4">
          {address && (
            <div className="flex items-start text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-amber-600" />
              <span className="line-clamp-2">{address}</span>
            </div>
          )}

          {phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2 shrink-0 text-amber-600" />
              <span>{phone}</span>
            </div>
          )}
        </div>

        {/* Spacer que empuja el botón hacia abajo */}
        <div className="flex-grow"></div>

        <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          {t.locationsPage.viewDetails}
        </button>
      </div>
    </div>
  );
};

export default LocationCard;
