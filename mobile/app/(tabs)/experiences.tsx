import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import workshopService, { Workshop as WorkshopType } from "@/services/workshopService";
import * as Calendar from 'expo-calendar';

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
  red500: "#EF4444",
  red400: "#F87171",
};

type TabType = "workshops" | "events";

const mockEvents = [
  {
    id: 1,
    name: "Festival Gastronómico",
    description:
      "Celebración de la gastronomía tradicional con demostraciones en vivo",
    date: "2025-12-15",
    location: "Plaza Principal",
    icon: "🎉",
    category: "Festival",
  },
  {
    id: 2,
    name: "Ruta del Sabor",
    description: "Recorrido guiado por los restaurantes tradicionales",
    date: "2025-11-20",
    location: "Centro Histórico",
    icon: "🚶",
    category: "Tour",
  },
  {
    id: 3,
    name: "Feria de Ingredientes Locales",
    description: "Exhibición y venta de productos regionales",
    date: "2025-11-25",
    location: "Mercado Municipal",
    icon: "🌽",
    category: "Feria",
  },
];

export default function ExperiencesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("workshops");
  const [loading, setLoading] = useState(true);
  const [workshops, setWorkshops] = useState<WorkshopType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWorkshops();
  }, []);

  const loadWorkshops = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await workshopService.getAllWorkshops();
      setWorkshops(data);
    } catch (err) {
      console.error('Error loading workshops:', err);
      setError('No se pudieron cargar los talleres');
    } finally {
      setLoading(false);
    }
  };

  const handleWorkshopPress = (workshopId: number) => {
    router.push({
      pathname: '/screens/workshop-detail/[id]',
      params: { id: workshopId.toString() },
    });
  };

  const handleAddToCalendar = async (event: typeof mockEvents[0]) => {
    try {
      // Solicitar permisos para acceder al calendario
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permiso requerido',
          'Necesitamos acceso a tu calendario para agregar el evento.'
        );
        return;
      }

      // Obtener los calendarios disponibles
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      
      // Buscar el calendario predeterminado o el primero disponible
      const defaultCalendar = calendars.find(cal => cal.isPrimary) || calendars[0];
      
      if (!defaultCalendar) {
        Alert.alert('Error', 'No se encontró un calendario disponible');
        return;
      }

      // Crear fecha de inicio (asumimos 9:00 AM)
      const startDate = new Date(event.date);
      startDate.setHours(9, 0, 0, 0);
      
      // Crear fecha de fin (2 horas después)
      const endDate = new Date(startDate);
      endDate.setHours(11, 0, 0, 0);

      // Crear el evento en el calendario
      const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
        title: event.name,
        startDate: startDate,
        endDate: endDate,
        notes: event.description,
        location: `${event.location}, Xiao Gourmet`,
        timeZone: 'America/Mexico_City',
      });

      if (eventId) {
        Alert.alert(
          '✅ Evento agregado',
          'El evento se ha agregado a tu calendario correctamente'
        );
      }
    } catch (error) {
      console.error('Error al agregar evento al calendario:', error);
      Alert.alert(
        'Error',
        'No se pudo agregar el evento al calendario'
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      in_person: "🏫",
      online: "💻",
      hybrid: "🔄",
    };
    return icons[type] || "🎓";
  };

  const TabButton = ({
    tab,
    label,
    icon,
  }: {
    tab: TabType;
    label: string;
    icon: string;
  }) => {
    const isActive = activeTab === tab;
    return (
      <TouchableOpacity
        style={[styles.tabButton, isActive && styles.tabButtonActive]}
        onPress={() => setActiveTab(tab)}
        activeOpacity={0.8}
      >
        <Text style={styles.tabIcon}>{icon}</Text>
        <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const WorkshopCard = ({ workshop }: { workshop: WorkshopType }) => {
    const typeLabel = workshopService.getWorkshopTypeLabel(workshop.workshopType);
    const formattedDate = formatDate(workshop.startDate);
    const icon = getTypeIcon(workshop.workshopType);
    const pressStartPos = useRef({ x: 0, y: 0 });
    const [isPressing, setIsPressing] = useState(false);

    const handlePressIn = (event: any) => {
      pressStartPos.current = {
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      };
      setIsPressing(true);
    };

    const handlePress = (event: any) => {
      const moveX = Math.abs(event.nativeEvent.pageX - pressStartPos.current.x);
      const moveY = Math.abs(event.nativeEvent.pageY - pressStartPos.current.y);
      
      // Solo navegar si el movimiento fue menor a 10 píxeles (es un click real, no scroll)
      if (moveX < 10 && moveY < 10) {
        handleWorkshopPress(workshop.id);
      }
      setIsPressing(false);
    };

    const handlePressOut = () => {
      setIsPressing(false);
    };

    return (
      <Pressable 
        onPressIn={handlePressIn}
        onPress={handlePress}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          { opacity: pressed || isPressing ? 0.9 : 1 }
        ]}
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
                  <Text style={styles.cardIcon}>{icon}</Text>
                </LinearGradient>
              </View>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>{typeLabel}</Text>
              </View>
            </View>

            <Text style={styles.cardTitle}>{workshop.title}</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              {workshop.shortDescription}
            </Text>

            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Ionicons name="code-working" size={16} color={colors.gray400} />
                <Text style={styles.infoText}>Código: {workshop.code}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="calendar" size={16} color={colors.gray400} />
                <Text style={styles.infoText}>{formattedDate}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="people" size={16} color={colors.gray400} />
                <Text style={styles.infoText}>
                  {workshop.availableSpots} lugares disponibles
                </Text>
              </View>
              {workshop.isFull && (
                <View style={styles.infoItem}>
                  <Ionicons name="alert-circle" size={16} color={colors.red400} />
                  <Text style={[styles.infoText, { color: colors.red400 }]}>
                    Lleno
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Cupos</Text>
                <Text style={styles.priceValue}>
                  {workshop.currentAttendees}/{workshop.maxCapacity}
                </Text>
              </View>
              <View style={styles.actionButton}>
                <LinearGradient
                  colors={[colors.amber600, colors.orange600]}
                  style={styles.actionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.actionText}>Ver más</Text>
                  <Ionicons name="arrow-forward" size={16} color={colors.white} />
                </LinearGradient>
              </View>
            </View>
          </View>
        </BlurView>
      </Pressable>
    );
  };

  const EventCard = ({ event }: { event: (typeof mockEvents)[0] }) => {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <TouchableOpacity activeOpacity={0.9}>
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
                  <Text style={styles.cardIcon}>{event.icon}</Text>
                </LinearGradient>
              </View>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{event.category}</Text>
              </View>
            </View>

            <Text style={styles.cardTitle}>{event.name}</Text>
            <Text style={styles.cardDescription}>{event.description}</Text>

            <View style={styles.eventMeta}>
              <View style={styles.eventMetaItem}>
                <Ionicons name="calendar" size={16} color={colors.gray400} />
                <Text style={styles.eventMetaText}>{formattedDate}</Text>
              </View>
              <View style={styles.eventMetaItem}>
                <Ionicons name="location" size={16} color={colors.gray400} />
                <Text style={styles.eventMetaText}>{event.location}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.eventButton} 
              activeOpacity={0.9}
              onPress={() => handleAddToCalendar(event)}
            >
              <LinearGradient
                colors={[colors.amber600, colors.orange600]}
                style={styles.eventButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="calendar" size={18} color={colors.white} />
                <Text style={styles.eventButtonText}>
                  Agregar al calendario
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  };

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
        <View
          style={[
            styles.circle,
            styles.circle1,
            { backgroundColor: colors.amber500 },
          ]}
        />
        <View
          style={[
            styles.circle,
            styles.circle2,
            { backgroundColor: colors.orange500 },
          ]}
        />
        <View
          style={[
            styles.circle,
            styles.circle3,
            { backgroundColor: colors.amber600 },
          ]}
        />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>✨ Experiencias</Text>
          <Text style={styles.headerSubtitle}>
            Talleres y eventos culturales de Xiao Gourmet
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <BlurView intensity={80} tint="dark" style={styles.tabsBlur}>
            <View style={styles.tabsContent}>
              <TabButton tab="workshops" label="Talleres" icon="🎓" />
              <TabButton tab="events" label="Eventos" icon="🎉" />
            </View>
          </BlurView>
        </View>

        {/* Content */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.white} />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {activeTab === "workshops" && (
              <View style={styles.grid}>
                <Text style={styles.sectionTitle}>Talleres Disponibles</Text>
                {error ? (
                  <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={48} color={colors.white} />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={loadWorkshops} style={styles.retryButton}>
                      <Text style={styles.retryButtonText}>Reintentar</Text>
                    </TouchableOpacity>
                  </View>
                ) : workshops.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>🎓</Text>
                    <Text style={styles.emptyText}>
                      No hay talleres disponibles en este momento
                    </Text>
                  </View>
                ) : (
                  workshops.map((workshop) => (
                    <WorkshopCard key={workshop.id} workshop={workshop} />
                  ))
                )}
              </View>
            )}

            {activeTab === "events" && (
              <View style={styles.grid}>
                <Text style={styles.sectionTitle}>Próximos Eventos</Text>
                {mockEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </View>
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
    width: 350,
    height: 350,
    top: -100,
    right: -100,
    opacity: 0.2,
  },
  circle2: {
    width: 250,
    height: 250,
    bottom: -50,
    left: -50,
    opacity: 0.2,
  },
  circle3: {
    width: 180,
    height: 180,
    top: "40%",
    right: -75,
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
    color: colors.gray400,
    fontWeight: "600",
  },
  tabsContainer: {
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  tabsBlur: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tabsContent: {
    flexDirection: "row",
    padding: 4,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: colors.amber500,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.gray300,
  },
  tabLabelActive: {
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  grid: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 8,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardIconContainer: {},
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
  levelBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  categoryBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.amber500,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.white,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: colors.gray300,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoGrid: {
    gap: 10,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray300,
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  priceContainer: {
    alignItems: "flex-start",
  },
  priceLabel: {
    fontSize: 11,
    color: colors.gray400,
    marginBottom: 2,
    fontWeight: "600",
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.amber500,
  },
  actionButton: {
    flex: 1,
    maxWidth: 140,
  },
  actionGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
  },
  eventMeta: {
    gap: 10,
    marginBottom: 20,
  },
  eventMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  eventMetaText: {
    fontSize: 14,
    color: colors.gray300,
    fontWeight: "500",
  },
  eventButton: {
    marginTop: 4,
  },
  eventButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  eventButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
    fontWeight: "600",
  },
  retryButton: {
    backgroundColor: colors.amber500,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  retryButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray300,
    textAlign: "center",
    fontWeight: "600",
  },
});
