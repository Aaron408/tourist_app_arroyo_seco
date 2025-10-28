import React from "react";
import { Search } from "lucide-react";
import { LOCATION_TYPES } from "../../../utils/constants";

const SearchAndFilters = ({ 
  searchQuery, 
  onSearchChange, 
  selectedType, 
  onTypeChange,
  translations 
}) => {
  const filterButtons = [
    { type: null, emoji: "🗺️", label: translations.showAll },
    { type: LOCATION_TYPES.RESTAURANT, emoji: "🍴", label: translations.restaurants },
    { type: LOCATION_TYPES.LANDMARK, emoji: "🏛️", label: translations.landmarks },
    { type: LOCATION_TYPES.MARKET, emoji: "🛒", label: translations.markets },
    { type: LOCATION_TYPES.WORKSHOP, emoji: "👨‍🍳", label: translations.workshops },
    { type: LOCATION_TYPES.EVENT, emoji: "🎉", label: translations.events },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        <input
          type="text"
          placeholder={translations.searchLocations}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 focus:outline-none transition-all"
          aria-label={translations.searchLocations}
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {filterButtons.map((button) => (
          <button
            key={button.type || 'all'}
            onClick={() => onTypeChange(button.type)}
            className={`px-4 py-2.5 rounded-xl font-medium transition-all text-sm md:text-base ${
              selectedType === button.type
                ? "bg-amber-500 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-pressed={selectedType === button.type}
          >
            {button.emoji} {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilters;
