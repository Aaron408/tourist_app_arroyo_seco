import React from "react";
import { Search } from "lucide-react";
import { useLanguageStore } from "../../../stores/languageStore";
import { LOCATION_TYPES } from "../../../utils/constants";

const FilterBar = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
}) => {
  const { t } = useLanguageStore();

  const filterOptions = [
    { type: null, label: t("locations.showAll"), icon: "🗺️" },
    {
      type: LOCATION_TYPES.RESTAURANT,
      label: t("locations.restaurants"),
      icon: "🍴",
    },
    {
      type: LOCATION_TYPES.LANDMARK,
      label: t("locations.landmarks"),
      icon: "🏛️",
    },
    {
      type: LOCATION_TYPES.MARKET,
      label: t("locations.markets"),
      icon: "🛒",
    },
    {
      type: LOCATION_TYPES.WORKSHOP,
      label: t("locations.workshops"),
      icon: "👨‍🍳",
    },
    { 
      type: LOCATION_TYPES.EVENT, 
      label: t("events.workshops"), // O podrías agregar "locations.events" en las traducciones
      icon: "🎉" 
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Barra de búsqueda */}
        <div className="relative md:w-96 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-200 w-5 h-5" />
            <input
              type="text"
              placeholder={t("locations.searchLocations")}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/20 border border-amber-300/30 text-white rounded-lg focus:bg-white/25 focus:outline-none focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/20 transition-all placeholder-white/80"
              aria-label={t("locations.searchLocations")}
            />
          </div>
        </div>
        
        {/* Separador visual solo en desktop */}
        <div className="hidden md:block h-8 w-px bg-white/20 mx-2"></div>
        
        {/* Botones de filtro */}
        <div className="w-full md:flex-1">
          <div className="flex items-center justify-between md:justify-end">
            <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar w-full md:w-auto">
              {filterOptions.map((option) => (
                <button
                  key={option.type || "all"}
                  onClick={() => onTypeChange(option.type)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm shrink-0 ${
                    selectedType === option.type
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-white/15 text-white hover:bg-white/25"
                  }`}
                  aria-pressed={selectedType === option.type}
                >
                  <span className="mr-1.5" aria-hidden="true">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;