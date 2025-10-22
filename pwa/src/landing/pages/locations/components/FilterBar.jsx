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
  const { currentLanguage, t } = useLanguageStore();

  const filterOptions = [
    { type: null, label: t("showAll") || "Mostrar todo", icon: "🗺️" },
    {
      type: LOCATION_TYPES.RESTAURANT,
      label: t("restaurants") || "Restaurantes",
      icon: "🍴",
    },
    {
      type: LOCATION_TYPES.LANDMARK,
      label: t("landmarks") || "Lugares emblemáticos",
      icon: "🏛️",
    },
    {
      type: LOCATION_TYPES.MARKET,
      label: t("markets") || "Mercados",
      icon: "🛒",
    },
    {
      type: LOCATION_TYPES.WORKSHOP,
      label: t("workshops") || "Talleres",
      icon: "👨‍🍳",
    },
    { type: LOCATION_TYPES.EVENT, label: t("events") || "Eventos", icon: "🎉" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={t("searchLocations") || "Buscar ubicaciones..."}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {filterOptions.map((option) => (
          <button
            key={option.type || "all"}
            onClick={() => onTypeChange(option.type)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedType === option.type
                ? "bg-linear-to-r from-amber-500 to-orange-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="mr-2">{option.icon}</span>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
