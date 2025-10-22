import React, { useState, useEffect } from "react";
import LocationMap from "./components/LocationMap";
import LocationCard from "./components/LocationCard";
import FilterBar from "./components/FilterBar";
import { useLanguageStore } from "../../stores/languageStore";
import { MAP_CONFIG, API_BASE_URL } from "../../utils/constants";

const Locations = () => {
  const { t } = useLanguageStore();
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching locations...");
    fetchLocations();
  }, []);

  useEffect(() => {
    console.log(
      "Filtering locations...",
      locations.length,
      "locations available"
    );
    filterLocations();
  }, [locations, searchQuery, selectedType]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      // Usando fetch en lugar de supabase
      const response = await fetch(`${API_BASE_URL}/api/locations`);

      // En caso de que la API no esté disponible, usamos datos de prueba
      if (!response.ok) {
        console.log("Using mock data for locations");
        // Datos de ejemplo para pruebas
        const mockData = [
          {
            id: "1",
            name: "Restaurante El Sabor de la Sierra",
            description:
              "Restaurante tradicional con platillos típicos de la región de Arroyo Seco.",
            type: "restaurant",
            address: "Calle Principal #123, Centro, Arroyo Seco",
            latitude: 21.1342,
            longitude: -99.6825,
            phone: "442-123-4567",
            image_url:
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
            rating: 4.8,
            is_featured: true,
          },
          {
            id: "2",
            name: "Mirador La Peña",
            description:
              "Impresionante mirador con vistas panorámicas a la Sierra Gorda y el pueblo.",
            type: "landmark",
            address: "Cerro La Peña, 2km al norte de Arroyo Seco",
            latitude: 21.1412,
            longitude: -99.6756,
            image_url:
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
            rating: 4.9,
            is_featured: true,
          },
          {
            id: "3",
            name: "Mercado Municipal",
            description:
              "Mercado tradicional con productos locales, artesanías y comida típica.",
            type: "market",
            address: "Av. Constitución #45, Centro, Arroyo Seco",
            latitude: 21.1335,
            longitude: -99.683,
            phone: "442-987-6543",
            image_url:
              "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800",
            rating: 4.5,
            is_featured: false,
          },
          {
            id: "4",
            name: "Taller de Cocina Tradicional",
            description:
              "Aprende las técnicas de la gastronomía tradicional de la Sierra Gorda.",
            type: "workshop",
            address: "Calle Hidalgo #78, Centro, Arroyo Seco",
            latitude: 21.1356,
            longitude: -99.684,
            phone: "442-555-1234",
            image_url:
              "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=800",
            rating: 4.7,
            is_featured: true,
          },
          {
            id: "5",
            name: "Festival Gastronómico Anual",
            description:
              "El evento gastronómico más importante del año, con muestras de platillos locales.",
            type: "event",
            address: "Plaza Principal, Centro, Arroyo Seco",
            latitude: 21.1339,
            longitude: -99.6821,
            image_url:
              "https://images.unsplash.com/photo-1555244162-803834f25e6d?w=800",
            rating: 4.9,
            is_featured: true,
          },
        ];
        setLocations(mockData);
        return;
      }

      const data = await response.json();
      setLocations(data || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
      // En caso de error, utilizamos datos de prueba
      const mockData = [
        {
          id: "1",
          name: "Restaurante El Sabor de la Sierra",
          description:
            "Restaurante tradicional con platillos típicos de la región de Arroyo Seco.",
          type: "restaurant",
          address: "Calle Principal #123, Centro, Arroyo Seco",
          latitude: 21.1342,
          longitude: -99.6825,
          phone: "442-123-4567",
          image_url:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
          rating: 4.8,
          is_featured: true,
        },
        {
          id: "2",
          name: "Mirador La Peña",
          description:
            "Impresionante mirador con vistas panorámicas a la Sierra Gorda y el pueblo.",
          type: "landmark",
          address: "Cerro La Peña, 2km al norte de Arroyo Seco",
          latitude: 21.1412,
          longitude: -99.6756,
          image_url:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
          rating: 4.9,
          is_featured: true,
        },
        {
          id: "3",
          name: "Mercado Municipal",
          description:
            "Mercado tradicional con productos locales, artesanías y comida típica.",
          type: "market",
          address: "Av. Constitución #45, Centro, Arroyo Seco",
          latitude: 21.1335,
          longitude: -99.683,
          phone: "442-987-6543",
          image_url:
            "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800",
          rating: 4.5,
          is_featured: false,
        },
      ];
      setLocations(mockData);
    } finally {
      setLoading(false);
    }
  };

  const filterLocations = () => {
    if (!locations || locations.length === 0) {
      setFilteredLocations([]);
      return;
    }

    let filtered = [...locations];

    if (selectedType) {
      filtered = filtered.filter((loc) => loc.type === selectedType);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (loc) =>
          loc.name.toLowerCase().includes(query) ||
          (loc.description
            ? loc.description.toLowerCase().includes(query)
            : false) ||
          (loc.address ? loc.address.toLowerCase().includes(query) : false)
      );
    }

    console.log("Filtered locations:", filtered.length);
    setFilteredLocations(filtered);
  };

  const handleLocationClick = (location) => {
    setSelectedLocationId(location.id);
    const element = document.getElementById(`location-${location.id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const handleCardClick = (location) => {
    setSelectedLocationId(location.id);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-white">
      <div className="bg-linear-to-r from-amber-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">
            {t("mapTitle") || "Mapa Interactivo de Arroyo Seco"}
          </h1>
          <p className="text-xl text-amber-50">
            {t("mapDescription") ||
              "Explora restaurantes, lugares emblemáticos y eventos en nuestro pueblo"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-xl shadow-lg p-4">
                <LocationMap
                  locations={filteredLocations}
                  center={MAP_CONFIG.CENTER}
                  zoom={MAP_CONFIG.ZOOM}
                  onLocationClick={handleLocationClick}
                  selectedLocationId={selectedLocationId}
                />
              </div>
            </div>

            <div className="space-y-6">
              {filteredLocations.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t("noResults") || "No se encontraron resultados"}
                  </h3>
                  <p className="text-gray-600">
                    Intenta con otros términos de búsqueda o filtros
                  </p>
                </div>
              ) : (
                filteredLocations.map((location) => (
                  <div key={location.id} id={`location-${location.id}`}>
                    <LocationCard
                      {...location}
                      onClick={() => handleCardClick(location)}
                      isSelected={selectedLocationId === location.id}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Locations;
