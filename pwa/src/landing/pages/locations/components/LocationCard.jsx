import React from "react";
import { MapPin, Phone, Star } from "lucide-react";
import { useLanguageStore } from "../../../stores/languageStore";
import { LOCATION_TYPES } from "../../../utils/constants";

const getTypeColor = (type) => {
  const colors = {
    [LOCATION_TYPES.RESTAURANT]: "bg-orange-100 text-orange-700",
    [LOCATION_TYPES.EVENT]: "bg-purple-100 text-purple-700",
    [LOCATION_TYPES.LANDMARK]: "bg-blue-100 text-blue-700",
    [LOCATION_TYPES.MARKET]: "bg-green-100 text-green-700",
    [LOCATION_TYPES.WORKSHOP]: "bg-amber-100 text-amber-700",
  };

  return colors[type] || "bg-gray-100 text-gray-700";
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
        className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden h-full ${
          isSelected ? "ring-2 ring-amber-500" : ""
        }`}
      >
        <div className="flex h-full">
          <div className="relative w-1/3 overflow-hidden">
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
              <div className="absolute bottom-1 left-1 bg-white/80 px-1.5 py-0.5 rounded-full flex items-center text-xs">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-gray-900 ml-0.5">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          <div className="w-2/3 p-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base font-bold text-gray-900 line-clamp-1">{name}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                    type
                  )}`}
                >
                  {getTypeLabel(type)}
                </span>
              </div>
              <p className="text-gray-600 text-xs line-clamp-2 mb-1">{description}</p>
            </div>
            
            <div>
              {address && (
                <div className="flex items-start text-xs text-gray-600 mb-1">
                  <MapPin className="w-3 h-3 mr-1 mt-0.5 shrink-0 text-amber-600" />
                  <span className="line-clamp-1">{address}</span>
                </div>
              )}
              
              <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-1 rounded text-xs font-medium hover:from-amber-600 hover:to-orange-700 transition-all">
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
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden ${
        isSelected ? "ring-4 ring-amber-500" : ""
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            image_url ||
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
          }
          alt={name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x200?text=Imagen+no+disponible";
          }}
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
              type
            )}`}
          >
            {getTypeLabel(type)}
          </span>
        </div>
        {rating && (
          <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-semibold text-gray-900">
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="space-y-2">
          {address && (
            <div className="flex items-start text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-amber-600" />
              <span className="line-clamp-1">{address}</span>
            </div>
          )}

          {phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2 shrink-0 text-amber-600" />
              <span>{phone}</span>
            </div>
          )}
        </div>

        <button className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-2 rounded-lg font-medium hover:from-amber-600 hover:to-orange-700 transition-all">
          {t.locationsPage.viewDetails}
        </button>
      </div>
    </div>
  );
};

export default LocationCard;
