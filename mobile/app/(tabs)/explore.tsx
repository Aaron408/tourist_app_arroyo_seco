import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

const { width, height } = Dimensions.get("window");

const colors = {
  gray900: "#111827",
  gray800: "#1F2937",
  gray700: "#374151",
  gray600: "#4B5563",
  gray500: "#6B7280",
  gray400: "#9CA3AF",
  gray300: "#D1D5DB",
  gray100: "#F3F4F6",
  white: "#FFFFFF",
  amber50: "#FFFBEB",
  amber500: "#F59E0B",
  amber600: "#D97706",
  amber700: "#B45309",
  orange500: "#F97316",
  orange600: "#EA580C",
  orange700: "#C2410C",
};

type FilterType = "all" | "restaurants" | "locations";
type ViewType = "map" | "list";

const mockRestaurants = [
  {
    id: 1,
    type: "restaurant" as const,
    name: "Comedor Doña María",
    description: "Cocina tradicional queretana",
    specialty: "Mole queretano, gorditas",
    address: "Calle Principal #123",
    phone: "+52 (442) 123-4567",
    rating: 4.8,
    priceRange: "$ - $$",
    icon: "🏪",
    coordinates: { latitude: 21.019, longitude: -99.2532 },
  },
  {
    id: 2,
    type: "restaurant" as const,
    name: "La Cocina de la Abuela",
    description: "Sabores caseros",
    specialty: "Nopalitos, atole",
    address: "Plaza Central s/n",
    phone: "+52 (442) 234-5678",
    rating: 4.6,
    priceRange: "$",
    icon: "🍲",
    coordinates: { latitude: 21.0195, longitude: -99.2528 },
  },
];

const mockLocations = [
  {
    id: 3,
    type: "location" as const,
    name: "Plaza Principal",
    description: "Centro histórico",
    category: "Plaza",
    icon: "🏛️",
    coordinates: { latitude: 21.019, longitude: -99.2532 },
    highlights: ["Arquitectura", "Mercado"],
  },
  {
    id: 4,
    type: "location" as const,
    name: "Mirador Sierra Gorda",
    description: "Vista panorámica",
    category: "Natural",
    icon: "⛰️",
    coordinates: { latitude: 21.0205, longitude: -99.2545 },
    highlights: ["Fotografía", "Senderismo"],
  },
];

const allPlaces = [...mockRestaurants, ...mockLocations];

export default function ExploreScreen() {
  const params = useLocalSearchParams<{ initialView?: string }>();
  const [viewType, setViewType] = useState<ViewType>("map");
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Set initial view from navigation params
  useEffect(() => {
    if (params.initialView && (params.initialView === "map" || params.initialView === "list")) {
      setViewType(params.initialView as ViewType);
    }
  }, [params.initialView]);

  const filteredPlaces = allPlaces.filter((place) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "restaurants" && place.type === "restaurant") ||
      (filter === "locations" && place.type === "location");

    const matchesSearch =
      searchQuery === "" ||
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleMap = (coordinates: { latitude: number; longitude: number }) => {
    const url = `https://maps.google.com/?q=${coordinates.latitude},${coordinates.longitude}`;
    Linking.openURL(url);
  };

  const FilterButton = ({ type, label, icon }: { type: FilterType; label: string; icon: string }) => {
    const isActive = filter === type;
    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          isActive && styles.filterButtonActive,
        ]}
        onPress={() => setFilter(type)}
        activeOpacity={0.8}
      >
        <Text style={styles.filterIcon}>{icon}</Text>
        <Text style={[styles.filterLabel, isActive && styles.filterLabelActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const RestaurantCard = ({ restaurant }: { restaurant: typeof mockRestaurants[0] }) => (
    <BlurView intensity={80} tint="dark" style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.cardIconContainer}>
            <LinearGradient
              colors={[colors.amber500, colors.orange600]}
              style={styles.cardIconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.cardIcon}>{restaurant.icon}</Text>
            </LinearGradient>
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.cardTitle}>{restaurant.name}</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color={colors.amber500} />
                <Text style={styles.ratingText}>{restaurant.rating}</Text>
              </View>
            </View>
            <Text style={styles.cardDescription}>{restaurant.description}</Text>
          </View>
        </View>
        
        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="restaurant" size={16} color={colors.gray400} />
            <Text style={styles.detailText}>{restaurant.specialty}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location" size={16} color={colors.gray400} />
            <Text style={styles.detailText}>{restaurant.address}</Text>
          </View>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleCall(restaurant.phone)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.amber500, colors.orange600]}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="call" size={18} color={colors.white} />
              <Text style={styles.actionText}>Llamar</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleMap(restaurant.coordinates)}
            activeOpacity={0.8}
          >
            <View style={styles.actionSecondary}>
              <Ionicons name="map" size={18} color={colors.amber500} />
              <Text style={styles.actionTextSecondary}>Mapa</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );

  const LocationCard = ({ location }: { location: typeof mockLocations[0] }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => handleMap(location.coordinates)}
    >
      <BlurView intensity={80} tint="dark" style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconContainer}>
              <LinearGradient
                colors={[colors.amber500, colors.orange600]}
                style={styles.cardIconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.cardIcon}>{location.icon}</Text>
              </LinearGradient>
            </View>
            <View style={styles.cardInfo}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>{location.name}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{location.category}</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>{location.description}</Text>
            </View>
          </View>
          
          <View style={styles.highlightsContainer}>
            {location.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightChip}>
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>

          <View style={styles.viewLocationRow}>
            <Ionicons name="map-outline" size={18} color={colors.amber500} />
            <Text style={styles.viewLocationText}>Toca para ver en el mapa</Text>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient
        colors={[colors.amber600, colors.orange600, colors.orange700]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Animated circles */}
        <View style={[styles.circle, styles.circle1, { backgroundColor: colors.amber500 }]} />
        <View style={[styles.circle, styles.circle2, { backgroundColor: colors.orange500 }]} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🗺️ Explorar</Text>
          <Text style={styles.headerSubtitle}>
            Descubre Arroyo Seco
          </Text>
        </View>

        {/* Search Bar */}
        <BlurView intensity={80} tint="dark" style={styles.searchContainer}>
          <View style={styles.searchContent}>
            <Ionicons name="search" size={20} color={colors.gray400} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar lugares..."
              placeholderTextColor={colors.gray400}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color={colors.gray400} />
              </TouchableOpacity>
            )}
          </View>
        </BlurView>

        {/* View Toggle */}
        <View style={styles.toggleContainer}>
          <BlurView intensity={80} tint="dark" style={styles.toggleBlur}>
            <View style={styles.toggleContent}>
              <TouchableOpacity
                style={[styles.toggleButton, viewType === "map" && styles.toggleButtonActive]}
                onPress={() => setViewType("map")}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="map"
                  size={20}
                  color={viewType === "map" ? colors.white : colors.gray400}
                />
                <Text
                  style={[
                    styles.toggleText,
                    viewType === "map" && styles.toggleTextActive,
                  ]}
                >
                  Mapa
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, viewType === "list" && styles.toggleButtonActive]}
                onPress={() => setViewType("list")}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="list"
                  size={20}
                  color={viewType === "list" ? colors.white : colors.gray400}
                />
                <Text
                  style={[
                    styles.toggleText,
                    viewType === "list" && styles.toggleTextActive,
                  ]}
                >
                  Lista
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          <FilterButton type="all" label="Todos" icon="🌟" />
          <FilterButton type="restaurants" label="Restaurantes" icon="🍽️" />
          <FilterButton type="locations" label="Lugares" icon="📍" />
        </ScrollView>

        {/* Content */}
        {viewType === "map" ? (
          <View style={styles.mapContainer}>
          </View>
        ) : (
          <ScrollView
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          >
            <Text style={styles.resultsText}>
              {filteredPlaces.length} {filteredPlaces.length === 1 ? "resultado" : "resultados"}
            </Text>
            {filteredPlaces.map((place) =>
              place.type === "restaurant" ? (
                <RestaurantCard key={place.id} restaurant={place as typeof mockRestaurants[0]} />
              ) : (
                <LocationCard key={place.id} location={place as typeof mockLocations[0]} />
              )
            )}
          </ScrollView>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  circle: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.15,
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
    opacity: 0.2,
  },
  circle2: {
    width: 200,
    height: 200,
    bottom: 100,
    left: -50,
    opacity: 0.2,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.gray300,
    fontWeight: "600",
  },
  searchContainer: {
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
  },
  searchContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.white,
  },
  toggleContainer: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  toggleBlur: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  toggleContent: {
    flexDirection: "row",
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  toggleButtonActive: {
    backgroundColor: colors.amber500,
  },
  toggleText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.gray400,
  },
  toggleTextActive: {
    color: colors.white,
  },
  filtersScroll: {
    maxHeight: 52,
  },
  filtersContent: {
    paddingHorizontal: 24,
    gap: 8,
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    gap: 6,
    height: 36,
  },
  filterButtonActive: {
    backgroundColor: "rgba(245, 158, 11, 0.3)",
    borderColor: colors.amber500,
  },
  filterIcon: {
    fontSize: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray300,
  },
  filterLabelActive: {
    color: colors.white,
  },
  mapContainer: {
    flex: 1,
    margin: 24,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.amber500,
    shadowColor: colors.amber500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  markerIcon: {
    fontSize: 22,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 24,
    paddingBottom: 100,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  cardIconContainer: {
    marginRight: 16,
  },
  cardIconGradient: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  cardIcon: {
    fontSize: 28,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
    flex: 1,
    marginRight: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.gray300,
    lineHeight: 20,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.amber500,
  },
  categoryBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.amber500,
  },
  cardDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.gray300,
    flex: 1,
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  actionGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.white,
  },
  actionSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
    gap: 8,
  },
  actionTextSecondary: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.amber500,
  },
  highlightsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  highlightChip: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  highlightText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.gray300,
  },
  viewLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  viewLocationText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.amber500,
  },
});