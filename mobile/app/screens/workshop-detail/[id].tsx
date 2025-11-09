import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { workshopService, WorkshopDetail } from "@/services/workshopService";

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
  green500: "#10B981",
};

export default function WorkshopDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [workshop, setWorkshop] = useState<WorkshopDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<Video>(null);
  const [, setVideoStatus] = useState<AVPlaybackStatus | null>(null);

  useEffect(() => {
    if (id) {
      loadWorkshopDetail();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadWorkshopDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const workshopId = typeof id === "string" ? parseInt(id) : id;
      const data = await workshopService.getWorkshopById(workshopId as number);
      setWorkshop(data);
    } catch (err) {
      console.error("Error loading workshop:", err);
      setError("No se pudo cargar el taller");
      Alert.alert("Error", "No se pudo cargar la información del taller");
    } finally {
      setLoading(false);
    }
  };

  const capacityPercent = workshop
    ? Math.round((workshop.currentAttendees / workshop.maxCapacity) * 100)
    : 0;

  type WorkshopType = "in_person" | "online" | "hybrid";

  const getTypeLabel = () => {
    if (!workshop) return "";
    const labels: Record<WorkshopType, string> = {
      in_person: "Presencial",
      online: "En línea",
      hybrid: "Híbrido",
    };
    return labels[workshop.workshopType as WorkshopType];
  };

  const formatDate = () => {
    if (!workshop) return "";
    const startDate = new Date(workshop.startDate);
    return startDate.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient
          colors={[colors.amber600, colors.orange600, colors.orange700]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.white} />
            <Text style={styles.loadingText}>Cargando detalles...</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  if (error || !workshop) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient
          colors={[colors.amber600, colors.orange600, colors.orange700]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.loadingContainer}>
            <Ionicons name="alert-circle" size={64} color={colors.white} />
            <Text style={styles.loadingText}>
              {error || "No se encontró el taller"}
            </Text>
            <TouchableOpacity onPress={handleBack} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  const getImageUrl = () => {
    if (workshop.images && workshop.images.length > 0) {
      return workshop.images[0].url;
    }
    if (workshop.thumbnailUrl) {
      return workshop.thumbnailUrl;
    }
    return null;
  };

  const imageUrl = getImageUrl();

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

        {/* Header with Image */}
        <View style={styles.imageHeader}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.headerImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderIcon}>🍲</Text>
            </View>
          )}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={styles.imageGradient}
          />
          <View style={styles.typeBadgeContainer}>
            <BlurView intensity={80} tint="dark" style={styles.typeBadge}>
              <View style={styles.typeBadgeContent}>
                <Ionicons name="people" size={14} color={colors.amber500} />
                <Text style={styles.typeBadgeText}>{getTypeLabel()}</Text>
              </View>
            </BlurView>
          </View>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={handleBack}
          >
            <BlurView intensity={80} tint="dark" style={styles.backButtonBlur}>
              <Ionicons name="arrow-back" size={24} color={colors.white} />
            </BlurView>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Main Info Card */}
          <BlurView intensity={90} tint="dark" style={styles.mainCard}>
            <View style={styles.mainCardContent}>
              <Text style={styles.title}>{workshop.title}</Text>
              <Text style={styles.code}>Código: {workshop.code}</Text>
              <Text style={styles.shortDescription}>
                {workshop.shortDescription}
              </Text>
            </View>
          </BlurView>

          {/* Date & Location Card */}
          <BlurView intensity={80} tint="dark" style={styles.infoCard}>
            <View style={styles.infoCardContent}>
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="calendar" size={20} color={colors.amber500} />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Fecha y Hora</Text>
                  <Text style={styles.infoValue}>{formatDate()}</Text>
                </View>
              </View>

              {workshop.locationAddress && (
                <>
                  <View style={styles.infoDivider} />
                  <View style={styles.infoRow}>
                    <View style={styles.infoIconContainer}>
                      <Ionicons
                        name="location"
                        size={20}
                        color={colors.amber500}
                      />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoLabel}>Ubicación</Text>
                      <Text style={styles.infoValue}>
                        {workshop.locationAddress}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          </BlurView>

          {/* Capacity Card */}
          <BlurView intensity={80} tint="dark" style={styles.capacityCard}>
            <View style={styles.capacityCardContent}>
              <View style={styles.capacityHeader}>
                <Text style={styles.capacityTitle}>👥 Capacidad</Text>
                {workshop.isFull ? (
                  <View style={styles.fullBadge}>
                    <Text style={styles.fullBadgeText}>⚠️ Lleno</Text>
                  </View>
                ) : (
                  <View style={styles.availableBadge}>
                    <Text style={styles.availableBadgeText}>
                      ✓ {workshop.availableSpots} disponibles
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.capacityBarContainer}>
                <View style={styles.capacityBar}>
                  <LinearGradient
                    colors={
                      capacityPercent > 80
                        ? [colors.red400, colors.red500]
                        : [colors.green500, colors.amber500]
                    }
                    style={[
                      styles.capacityFill,
                      { width: `${capacityPercent}%` },
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
                <Text style={styles.capacityText}>
                  {workshop.currentAttendees} / {workshop.maxCapacity}{" "}
                  participantes
                </Text>
              </View>
            </View>
          </BlurView>

          {/* Description Section */}
          {workshop.description && (
            <BlurView intensity={80} tint="dark" style={styles.sectionCard}>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>📝 Descripción</Text>
                <Text style={styles.sectionText}>{workshop.description}</Text>
              </View>
            </BlurView>
          )}

          {/* Video Section */}
          {workshop.videos && workshop.videos.length > 0 && (
            <BlurView intensity={80} tint="dark" style={styles.sectionCard}>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>🎥 Videos</Text>
                {workshop.videos.map((video, index) => (
                  <View key={video.id} style={styles.videoContainer}>
                    {video.isAvailable ? (
                      <Video
                        ref={videoRef}
                        source={{ uri: video.url }}
                        style={styles.video}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        onPlaybackStatusUpdate={(status) => setVideoStatus(status)}
                      />
                    ) : (
                      <View style={styles.videoUnavailable}>
                        <Ionicons name="lock-closed" size={48} color={colors.gray400} />
                        <Text style={styles.videoUnavailableText}>
                          Video no disponible
                        </Text>
                        {video.availableFrom && (
                          <Text style={styles.videoAvailabilityText}>
                            Disponible desde: {new Date(video.availableFrom).toLocaleDateString('es-MX')}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </BlurView>
          )}

        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <BlurView intensity={90} tint="dark" style={styles.bottomButtonBlur}>
            <View style={styles.bottomButtonContent}>
              <TouchableOpacity
                style={[
                  styles.inscribeButton,
                  workshop.isFull && styles.inscribeButtonDisabled,
                ]}
                disabled={workshop.isFull}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={
                    workshop.isFull
                      ? [colors.gray600, colors.gray700]
                      : [colors.amber600, colors.orange600]
                  }
                  style={styles.inscribeGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.inscribeText}>
                    {workshop.isFull ? "Taller Lleno" : "✍️ Inscribirse Ahora"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
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
    width: 250,
    height: 250,
    bottom: 100,
    left: -75,
    opacity: 0.2,
  },
  imageHeader: {
    width: "100%",
    height: 280,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderIcon: {
    fontSize: 80,
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  typeBadgeContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  typeBadge: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  typeBadgeContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  typeBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 16,
  },
  backButtonBlur: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  scrollView: {
    flex: 1,
    marginBottom: 48,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  mainCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
  },
  mainCardContent: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.white,
    marginBottom: 8,
  },
  code: {
    fontSize: 13,
    color: colors.gray400,
    marginBottom: 12,
    fontWeight: "600",
  },
  shortDescription: {
    fontSize: 16,
    color: colors.gray300,
    lineHeight: 24,
  },
  infoCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
  },
  infoCardContent: {
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: colors.gray400,
    marginBottom: 4,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 15,
    color: colors.white,
    lineHeight: 22,
    fontWeight: "500",
  },
  infoDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 16,
  },
  capacityCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
  },
  capacityCardContent: {
    padding: 20,
  },
  capacityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  capacityTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  fullBadge: {
    backgroundColor: colors.red500,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  fullBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  availableBadge: {
    backgroundColor: colors.green500,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  availableBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  capacityBarContainer: {
    gap: 8,
  },
  capacityBar: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  capacityFill: {
    height: "100%",
    borderRadius: 4,
  },
  capacityText: {
    fontSize: 14,
    color: colors.gray300,
    fontWeight: "600",
  },
  sectionCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  sectionContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: colors.gray300,
    lineHeight: 24,
  },
  donationsCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  donationsContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  donationsIcon: {
    fontSize: 24,
  },
  donationsText: {
    flex: 1,
    fontSize: 14,
    color: colors.white,
    fontWeight: "600",
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomButtonBlur: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  bottomButtonContent: {
    padding: 24,
  },
  inscribeButton: {
    paddingBottom: 24,
  },
  inscribeButtonDisabled: {
    opacity: 0.6,
  },
  inscribeGradient: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  inscribeText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.white,
    letterSpacing: 0.5,
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
  retryButton: {
    marginTop: 20,
    backgroundColor: colors.amber500,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
  videoContainer: {
    marginTop: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  video: {
    width: "100%",
    height: 220,
  },
  videoUnavailable: {
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    gap: 8,
  },
  videoUnavailableText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginTop: 8,
  },
  videoAvailabilityText: {
    fontSize: 13,
    color: colors.gray400,
    marginTop: 4,
  },
});
