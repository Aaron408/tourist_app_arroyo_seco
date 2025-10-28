import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import LocationMap from "./components/LocationMap";
import LocationCard from "./components/LocationCard";
import LocationModal from "./components/LocationModal";
import SearchAndFilters from "./components/SearchAndFilters";
import { useLanguageStore } from "../../stores/languageStore";
import {
  MAP_CONFIG,
  API_BASE_URL,
  LOCATION_TYPES,
} from "../../utils/constants";
import L from "leaflet";

const Locations = () => {
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mockData = [
    {
      id: "1",
      name: "Presidencia Municipal de Arroyo Seco",
      description:
        "Edificio principal del gobierno local de Arroyo Seco donde se ofrecen servicios municipales y atención ciudadana.",
      type: "landmark",
      address: "Plaza Principal s/n, Centro, Arroyo Seco, Qro.",
      latitude: 21.5470145,
      longitude: -99.6907782,
      phone: "487-874-2120",
      image_url:
        "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npo5NEODoS7bHXl11cWx99tfE36Rw052-ZEYNaQIVaEhR3bjwBm-C-tK1HEmpPNljzZ48Tm_5v7wH_OIkkVORa5O527TuVJqgKDuN1z9k-2OWlCJESxVMSZ8d_3bfIh9G8zGHuYgA=w243-h406-n-k-no-nu",
      rating: 4.3,
      is_featured: true,
    },
    {
      id: "2",
      name: "Misión de Concá",
      description:
        "Joya arquitectónica del siglo XVIII y Patrimonio Mundial de la UNESCO. Forma parte de las Misiones Franciscanas de la Sierra Gorda.",
      type: "landmark",
      address: "Concá, Arroyo Seco, Qro.",
      latitude: 21.4366247,
      longitude: -99.6444866,
      image_url:
        "https://www.eluniversalqueretaro.mx/resizer/v2/625C7HHEWVHWBKJB3D4ULD7VQQ.jpg?auth=1ef782935d49b341ac17b376997d0f9938a3d5f12ba8f949ce8448b42ff85c07",
      rating: 4.9,
      is_featured: true,
    },
    {
      id: "3",
      name: "Mercado Municipal de Arroyo Seco",
      description:
        "Mercado tradicional con productos locales, artesanías y comida típica de la región.",
      type: "market",
      address: "Calle Juárez, Centro, Arroyo Seco, Qro.",
      latitude: 21.5469807,
      longitude: -99.6907222,
      phone: "487-874-1234",
      image_url:
        "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800",
      rating: 4.5,
      is_featured: false,
    },
    {
      id: "4",
      name: "Restaurante Las Truchas El Arroyo",
      description:
        "Restaurante junto al río especializado en truchas frescas y platillos tradicionales de la región serrana.",
      type: "restaurant",
      address:
        "Carretera Jalpan - Río Verde km 50, Purísima de Arista, Arroyo Seco, Qro.",
      latitude: 21.4870118,
      longitude: -99.6556459,
      phone: "487-874-2215",
      image_url:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      rating: 4.7,
      is_featured: true,
    },
    {
      id: "5",
      name: "Cascada de Ayutla",
      description:
        "Hermosa cascada en medio de la vegetación de la Sierra Gorda, ideal para visitar y refrescarse en temporada de lluvias.",
      type: "landmark",
      address: "Ayutla, Arroyo Seco, Qro.",
      latitude: 21.5824624,
      longitude: -99.7264178,
      image_url:
        "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=800",
      rating: 4.8,
      is_featured: true,
    },
    {
      id: "6",
      name: "Panadería Tradicional La Serrana",
      description:
        "Panadería artesanal que ofrece el tradicional pan de pulque, gorditas de horno y otros productos típicos de la región.",
      type: "market",
      address: "Calle Hidalgo #45, Centro, Arroyo Seco, Qro.",
      latitude: 21.5471505,
      longitude: -99.6904932,
      phone: "487-874-1122",
      image_url:
        "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800",
      rating: 4.6,
      is_featured: false,
    },
    {
      id: "7",
      name: "Mirador Sótano del Barro",
      description:
        "Impresionante mirador natural desde donde se aprecia una de las simas más profundas del mundo, con 455 metros de profundidad.",
      type: "landmark",
      address: "Carretera a Ayutla, Arroyo Seco, Qro.",
      latitude: 21.5518688,
      longitude: -99.6778795,
      image_url:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      rating: 4.9,
      is_featured: true,
    },
    {
      id: "8",
      name: "Taller de Artesanía Xioi",
      description:
        "Taller donde artesanos locales enseñan técnicas tradicionales para elaborar artesanías con materiales de la región.",
      type: "workshop",
      address: "Calle Benito Juárez #23, Centro, Arroyo Seco, Qro.",
      latitude: 21.5468764,
      longitude: -99.6905246,
      phone: "487-874-3388",
      image_url:
        "https://images.unsplash.com/photo-1604782206219-3b9d245b7b95?w=800",
      rating: 4.7,
      is_featured: true,
    },
  ];

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/locations`);

      if (!response.ok) {
        console.log("Using mock data for locations");
        setLocations(mockData);
        return;
      }

      const data = await response.json();
      setLocations(data || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
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
    setSelectedLocation(location);

    // Animar el mapa hacia la ubicación
    if (window.map) {
      const locationLatLng = L.latLng(location.latitude, location.longitude);
      const isLocationVisible = window.map.getBounds().contains(locationLatLng);

      if (!isLocationVisible) {
        window.map.flyTo(
          [location.latitude, location.longitude],
          15,
          {
            duration: 1.5,
            easeLinearity: 0.25,
          }
        );
        // Abrir modal después de la animación
        setTimeout(() => {
          setIsModalOpen(true);
        }, 1600);
      } else {
        window.map.flyTo(
          [location.latitude, location.longitude],
          15,
          {
            duration: 1,
            easeLinearity: 0.25,
          }
        );
        // Abrir modal después de la animación
        setTimeout(() => {
          setIsModalOpen(true);
        }, 1100);
      }
    } else {
      // Si no hay mapa disponible, abrir modal inmediatamente
      setIsModalOpen(true);
    }
  };

  const handleCardClick = (location) => {
    setSelectedLocationId(location.id);
    setSelectedLocation(location);

    // Scroll to top to show map
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Wait for scroll to complete, then animate map and open modal
    setTimeout(() => {
      if (window.map) {
        const locationLatLng = L.latLng(location.latitude, location.longitude);
        const isLocationVisible = window.map.getBounds().contains(locationLatLng);

        if (!isLocationVisible) {
          window.map.flyTo(
            [location.latitude, location.longitude],
            15, // Zoom más cercano para mejor vista
            {
              duration: 1.5,
              easeLinearity: 0.25,
            }
          );
          // Abrir modal después de la animación
          setTimeout(() => {
            setIsModalOpen(true);
          }, 1600);
        } else {
          window.map.flyTo(
            [location.latitude, location.longitude],
            15,
            {
              duration: 1,
              easeLinearity: 0.25,
            }
          );
          // Abrir modal después de la animación
          setTimeout(() => {
            setIsModalOpen(true);
          }, 1100);
        }
      }
    }, 500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Interactive Map Header */}
      <div className="relative h-screen w-full">
        {/* Map Background */}
        <div className="absolute inset-0 w-full h-full">
          {!loading && (
            <LocationMap
              locations={filteredLocations}
              center={MAP_CONFIG.CENTER}
              zoom={MAP_CONFIG.ZOOM}
              onLocationClick={handleLocationClick}
              selectedLocationId={selectedLocationId}
            />
          )}
          {loading && (
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600"></div>
            </div>
          )}
        </div>

        {/* Overlay Gradient for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent pointer-events-none"></div>

        {/* Search & Filter Overlay */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header Content */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full">
              {/* Title Section */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/95 backdrop-blur-md p-4 rounded-full shadow-2xl">
                    <MapPin className="w-12 h-12 text-amber-600" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-500 mb-4 drop-shadow-2xl">
                  {t.locationsPage.mapTitle}
                </h1>
                <p className="text-lg md:text-xl text-white/95 drop-shadow-lg max-w-2xl mx-auto">
                  {t.locationsPage.mapDescription}
                </p>
              </div>

              {/* Search and Filters Card */}
              <SearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                translations={t.locationsPage}
              />

            </div>
          </div>
        </div>
      </div>

      {/* Location Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t.locationsPage.exploreLocations || "Explora las Ubicaciones"}
          </h2>
          <p className="text-gray-600">
            {t.locationsPage.clickToViewDetails || "Haz clic en una tarjeta para ver su ubicación en el mapa"}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : filteredLocations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t.locationsPage.noResults}
            </h3>
            <p className="text-gray-600">{t.locationsPage.tryOtherTerms}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((location) => (
              <div key={location.id} id={`location-${location.id}`}>
                <LocationCard
                  {...location}
                  onClick={() => handleCardClick(location)}
                  isSelected={selectedLocationId === location.id}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Location Details Modal */}
      <LocationModal
        isOpen={isModalOpen}
        location={selectedLocation}
        onClose={closeModal}
      />
      </div>
    </>
  );
};

export default Locations;
