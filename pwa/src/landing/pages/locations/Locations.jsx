import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import LocationMap from "./components/LocationMap";
import LocationCard from "./components/LocationCard";
import Header from "../gastronomy/components/Header";
import Filters from "../gastronomy/components/Filters";
import { useLanguageStore } from "../../stores/languageStore";
import { MAP_CONFIG, API_BASE_URL, LOCATION_TYPES } from "../../utils/constants";
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
              "https://images.unsplash.com/photo-1579667341973-fc947278057c?w=800",
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
        setLocations(mockData);
        return;
      }

      const data = await response.json();
      setLocations(data || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
      //En caso de error, utilizamos datos de prueba
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

    if (!isMobile) {
      const element = document.getElementById(`location-${location.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  const handleCardClick = (location) => {
    setSelectedLocationId(location.id);

    if (!isMobile) {
      const element = document.getElementById(`location-${location.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }

    if (window.map) {
      const locationLatLng = L.latLng(location.latitude, location.longitude);
      const isLocationVisible = window.map.getBounds().contains(locationLatLng);
      const currentDistance = window.map.getCenter().distanceTo(locationLatLng);

      if (!isLocationVisible) {
        window.map.flyTo(
          [location.latitude, location.longitude],
          MAP_CONFIG.ZOOM,
          {
            duration: 1.5,
            easeLinearity: 0.25,
          }
        );

        setTimeout(() => {
          window.map.panBy([0, -75], {
            animate: true,
            duration: 0.3,
          });
        }, 1600);
      } else {
        window.map.panTo([location.latitude, location.longitude], {
          animate: true,
          duration: 0.5,
        });

        setTimeout(() => {
          window.map.panBy([0, -75], {
            animate: true,
            duration: 0.3,
          });
        }, 600);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header Section */}
      <Header
        icon={MapPin}
        title={t.locationsPage.mapTitle}
        subtitle={t.locationsPage.mapDescription}
        gradientFrom="from-amber-600"
        gradientTo="to-orange-600"
      />

      {/* Filters Section */}
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder={t.locationsPage.searchLocations}
        selectedFilter={selectedType}
        setSelectedFilter={setSelectedType}
        filters={Object.values(LOCATION_TYPES)}
        filterLabels={{
          [LOCATION_TYPES.RESTAURANT]: t.locationsPage.restaurants,
          [LOCATION_TYPES.LANDMARK]: t.locationsPage.landmarks,
          [LOCATION_TYPES.MARKET]: t.locationsPage.markets,
          [LOCATION_TYPES.WORKSHOP]: t.locationsPage.workshops,
          [LOCATION_TYPES.EVENT]: t.locationsPage.events,
        }}
        allLabel={t.locationsPage.showAll}
        primaryColor="amber"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="bg-white rounded-xl shadow-lg p-4" style={{ height: '75vh' }}>
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
                    {t.locationsPage.noResults}
                  </h3>
                  <p className="text-gray-600">
                    {t.locationsPage.tryOtherTerms}
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
