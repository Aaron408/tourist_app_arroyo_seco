import React from "react";
import { X, Phone, Star, Navigation } from "lucide-react";
import { LOCATION_TYPES } from "../../../utils/constants";

// Estilos para animaciones del modal
const modalStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes modalSlideUp {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes modalContentFade {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LocationModal = ({ isOpen, location, onClose }) => {
  if (!isOpen || !location) return null;

  return (
    <>
      <style>{modalStyles}</style>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-out"
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-500 ease-out flex flex-col md:flex-row"
          style={{
            animation: 'modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Side - Image */}
          <div 
            className="relative w-full md:w-2/5 h-64 md:h-auto flex-shrink-0 overflow-hidden"
            style={{
              animation: 'modalContentFade 0.6s ease-out 0.2s both'
            }}
          >
            <img
              src={location.image_url || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"}
              alt={location.name}
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x400?text=Imagen+no+disponible";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Rating Badge */}
            {location.rating && (
              <div 
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-2 shadow-lg"
                style={{
                  animation: 'modalContentFade 0.4s ease-out 0.4s both'
                }}
              >
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="font-bold text-gray-900">{location.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header with Close Button */}
            <div 
              className="flex items-start justify-between p-6 md:p-8 border-b border-gray-200"
              style={{
                animation: 'modalContentFade 0.5s ease-out 0.3s both'
              }}
            >
              <div className="flex-1 pr-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {location.name}
                </h2>
                {/* Type Badge */}
                <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                  {location.type === LOCATION_TYPES.RESTAURANT && "🍴 Restaurante"}
                  {location.type === LOCATION_TYPES.LANDMARK && "🏛️ Lugar Emblemático"}
                  {location.type === LOCATION_TYPES.MARKET && "🛒 Mercado"}
                  {location.type === LOCATION_TYPES.WORKSHOP && "👨‍🍳 Taller"}
                  {location.type === LOCATION_TYPES.EVENT && "🎉 Evento"}
                </span>
              </div>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full hover:scale-110 transition-all duration-200 shadow-md shrink-0 cursor-pointer"
                style={{
                  animation: 'modalContentFade 0.4s ease-out 0.5s both'
                }}
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div 
              className="flex-1 overflow-y-auto p-6 md:p-8"
              style={{
                animation: 'modalContentFade 0.5s ease-out 0.4s both'
              }}
            >
              {/* Description */}
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                {location.description}
              </p>

              {/* Contact Information */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                {location.address && (
                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Dirección</p>
                      <p className="text-gray-600">{location.address}</p>
                    </div>
                  </div>
                )}

                {location.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Teléfono</p>
                      <a 
                        href={`tel:${location.phone}`} 
                        className="text-amber-600 hover:text-amber-700 font-medium"
                      >
                        {location.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div 
              className="p-6 md:p-8 border-t border-gray-200 bg-gray-50"
              style={{
                animation: 'modalContentFade 0.5s ease-out 0.5s both'
              }}
            >
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`, 
                      '_blank'
                    );
                  }}
                  className="flex-1 bg-amber-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-amber-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Navigation className="w-5 h-5" />
                  Cómo llegar
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationModal;
