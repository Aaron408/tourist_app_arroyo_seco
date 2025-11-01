import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLanguage } from '@/contexts/languageProvider';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import workshopService, { WorkshopDetail } from '@/services/workshopService';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

const { width } = Dimensions.get('window');

export default function WorkshopDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const [workshop, setWorkshop] = useState<WorkshopDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus | null>(null);
  
  const videoRef = useRef<Video>(null);

  const workshopId = parseInt(params.id as string);

  useEffect(() => {
    loadWorkshopDetails();
  }, [workshopId]);

  // Cleanup video when component unmounts or video is hidden
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.unloadAsync();
      }
    };
  }, []);

  const loadWorkshopDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await workshopService.getWorkshopById(workshopId);
      setWorkshop(data);
    } catch (err) {
      console.error('Error loading workshop:', err);
      setError('No se pudo cargar el taller. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPlayPause = async () => {
    if (!videoRef.current) return;

    if (videoStatus?.isLoaded && videoStatus.isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  };

  const handleVideoToggle = async () => {
    if (showVideo && videoRef.current) {
      await videoRef.current.pauseAsync();
    }
    setShowVideo(!showVideo);
  };

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Cargando...',
            headerBackTitle: 'Talleres',
          }}
        />
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
          <View
            style={[
              styles.centerContainer,
              { paddingTop: insets.top + Spacing.lg },
            ]}
          >
            <ActivityIndicator size="large" color={colors.primary} />
            <ThemedText
              style={[
                styles.loadingText,
                { color: colors.onSurfaceVariant, marginTop: Spacing.lg },
              ]}
            >
              Cargando detalles...
            </ThemedText>
          </View>
        </ThemedView>
      </>
    );
  }

  if (error || !workshop) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Error',
            headerBackTitle: 'Talleres',
          }}
        />
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
          <View
            style={[
              styles.centerContainer,
              { paddingTop: insets.top + Spacing.lg },
            ]}
          >
            <ThemedText style={[styles.errorIcon, { fontSize: 48 }]}>⚠️</ThemedText>
            <ThemedText
              style={[
                styles.errorTitle,
                { color: colors.onSurface, marginTop: Spacing.lg },
              ]}
            >
              Error al cargar el taller
            </ThemedText>
            <ThemedText
              style={[
                styles.errorText,
                { color: colors.onSurfaceVariant, marginTop: Spacing.md },
              ]}
            >
              {error}
            </ThemedText>
            <TouchableOpacity
              style={[styles.retryButton, { backgroundColor: colors.primary }]}
              onPress={loadWorkshopDetails}
              activeOpacity={0.8}
            >
              <ThemedText style={[styles.retryButtonText, { color: colors.onPrimary }]}>
                🔄 Intentar de nuevo
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </>
    );
  }

  const typeLabel = workshopService.getWorkshopTypeLabel(workshop.workshopType);
  const typeColor = workshopService.getWorkshopTypeColor(workshop.workshopType);
  const dateRange = workshopService.formatDateRange(workshop.startDate, workshop.endDate);
  const hasVideo = workshopService.hasAvailableVideo(workshop);
  const videoUrl = hasVideo ? workshopService.getAvailableVideoUrl(workshop) : null;
  const capacityPercent = Math.round((workshop.currentAttendees / workshop.maxCapacity) * 100);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Talleres',
        }}
      />
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: insets.bottom + Spacing.lg,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Image */}
          <View style={styles.imageContainer}>
            {workshop.images && workshop.images.length > 0 ? (
              <Image
                source={{ uri: workshop.images[0].url }}
                style={styles.headerImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.imagePlaceholder, { backgroundColor: colors.surfaceVariant }]}>
                <ThemedText style={styles.placeholderIcon}>🎓</ThemedText>
              </View>
            )}
            {/* Type Badge on Image */}
            <View
              style={[
                styles.typeBadgeOverlay,
                { backgroundColor: typeColor + 'E6' },
              ]}
            >
              <ThemedText style={styles.typeLabelOverlay}>{typeLabel}</ThemedText>
            </View>
          </View>

          {/* Content */}
          <View
            style={[
              styles.content,
              { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg },
            ]}
          >
            {/* Title */}
            <ThemedText style={[styles.title, { color: colors.onSurface }]}>
              {workshop.title}
            </ThemedText>

            {/* Code */}
            <ThemedText
              style={[
                styles.code,
                { color: colors.onSurfaceVariant, marginTop: Spacing.sm },
              ]}
            >
              Código: {workshop.code}
            </ThemedText>

            {/* Short Description */}
            <ThemedText
              style={[
                styles.shortDescription,
                {
                  color: colors.onSurfaceVariant,
                  marginTop: Spacing.md,
                },
              ]}
            >
              {workshop.shortDescription}
            </ThemedText>

            {/* Date and Time Section */}
            <View
              style={[
                styles.infoSection,
                {
                  backgroundColor: colors.surfaceVariant,
                  marginTop: Spacing.lg,
                },
              ]}
            >
              <ThemedText style={[styles.infoTitle, { color: colors.onSurfaceVariant }]}>
                📅 Fecha y Hora
              </ThemedText>
              <ThemedText style={[styles.infoValue, { color: colors.onSurface }]}>
                {dateRange}
              </ThemedText>
            </View>

            {/* Location Info (if in-person or hybrid) */}
            {(workshop.workshopType === 'in_person' || workshop.workshopType === 'hybrid') &&
              workshop.locationAddress && (
                <View
                  style={[
                    styles.infoSection,
                    {
                      backgroundColor: colors.surfaceVariant,
                      marginTop: Spacing.md,
                    },
                  ]}
                >
                  <ThemedText style={[styles.infoTitle, { color: colors.onSurfaceVariant }]}>
                    📍 Ubicación
                  </ThemedText>
                  <ThemedText style={[styles.infoValue, { color: colors.onSurface }]}>
                    {workshop.locationAddress}
                  </ThemedText>
                </View>
              )}

            {/* Online Meeting Info (if online or hybrid) */}
            {(workshop.workshopType === 'online' || workshop.workshopType === 'hybrid') &&
              workshop.onlineMeetingUrl && (
                <View
                  style={[
                    styles.infoSection,
                    {
                      backgroundColor: colors.surfaceVariant,
                      marginTop: Spacing.md,
                    },
                  ]}
                >
                  <ThemedText style={[styles.infoTitle, { color: colors.onSurfaceVariant }]}>
                    💻 Plataforma: {workshop.onlineMeetingPlatform || 'En línea'}
                  </ThemedText>
                  <TouchableOpacity
                    style={[
                      styles.urlButton,
                      { backgroundColor: colors.primary, marginTop: Spacing.sm },
                    ]}
                    activeOpacity={0.8}
                  >
                    <ThemedText style={[styles.urlButtonText, { color: colors.onPrimary }]}>
                      🔗 Acceder a la reunión
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              )}

            {/* Capacity Section */}
            <View
              style={[
                styles.capacitySection,
                {
                  backgroundColor: colors.primaryContainer,
                  marginTop: Spacing.lg,
                },
              ]}
            >
              <View style={styles.capacityHeader}>
                <ThemedText style={[styles.capacityTitle, { color: colors.onPrimaryContainer }]}>
                  👥 Capacidad
                </ThemedText>
                {workshop.isFull ? (
                  <View style={[styles.fullBadge, { backgroundColor: '#FF6B6B' }]}>
                    <ThemedText style={styles.fullBadgeText}>⚠️ Lleno</ThemedText>
                  </View>
                ) : (
                  <View style={[styles.availableBadge, { backgroundColor: '#4ECDC4' }]}>
                    <ThemedText style={styles.availableBadgeText}>
                      {workshop.availableSpots} {workshop.availableSpots === 1 ? 'lugar' : 'lugares'} disponible
                      {workshop.availableSpots !== 1 ? 's' : ''}
                    </ThemedText>
                  </View>
                )}
              </View>
              <View
                style={[
                  styles.capacityBar,
                  { backgroundColor: colors.primaryContainer, marginTop: Spacing.md },
                ]}
              >
                <View
                  style={[
                    styles.capacityFill,
                    {
                      width: `${capacityPercent}%`,
                      backgroundColor: capacityPercent > 80 ? '#FF6B6B' : '#4ECDC4',
                    },
                  ]}
                />
              </View>
              <ThemedText
                style={[
                  styles.capacityInfo,
                  { color: colors.onPrimaryContainer, marginTop: Spacing.sm },
                ]}
              >
                {workshop.currentAttendees} de {workshop.maxCapacity} participantes
              </ThemedText>
            </View>

            {/* Video Section */}
            {hasVideo && videoUrl && (
              <View
                style={[
                  styles.videoSection,
                  {
                    backgroundColor: colors.surface,
                    marginTop: Spacing.lg,
                    ...Shadows.md,
                  },
                ]}
              >
                <View style={styles.videoHeader}>
                  <ThemedText style={[styles.videoTitle, { color: colors.onSurface }]}>
                    🎥 Video del Taller
                  </ThemedText>
                  <TouchableOpacity
                    style={[
                      styles.videoToggleButton,
                      {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    onPress={handleVideoToggle}
                    activeOpacity={0.8}
                  >
                    <ThemedText style={[styles.videoToggleText, { color: colors.onPrimary }]}>
                      {showVideo ? '⏸️ Ocultar' : '▶️ Ver'}
                    </ThemedText>
                  </TouchableOpacity>
                </View>

                {showVideo && (
                  <View style={styles.videoPlayerContainer}>
                    <Video
                      ref={videoRef}
                      source={{ uri: videoUrl }}
                      style={styles.videoPlayer}
                      useNativeControls
                      resizeMode={ResizeMode.CONTAIN}
                      isLooping={false}
                      onPlaybackStatusUpdate={(status) => setVideoStatus(status)}
                      onError={(error) => {
                        console.error('Video error:', error);
                      }}
                    />
                    {videoStatus?.isLoaded && (
                      <View style={styles.videoControls}>
                        <TouchableOpacity
                          style={[styles.playPauseButton, { backgroundColor: colors.primary }]}
                          onPress={handleVideoPlayPause}
                          activeOpacity={0.8}
                        >
                          <ThemedText style={[styles.playPauseText, { color: colors.onPrimary }]}>
                            {videoStatus.isPlaying ? '⏸️ Pausar' : '▶️ Reproducir'}
                          </ThemedText>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}

            {/* Full Description */}
            {workshop.description && (
              <View style={[styles.descriptionSection, { marginTop: Spacing.lg }]}>
                <ThemedText style={[styles.sectionTitle, { color: colors.onSurface }]}>
                  📝 Descripción Completa
                </ThemedText>
                <ThemedText
                  style={[
                    styles.descriptionText,
                    {
                      color: colors.onSurfaceVariant,
                      marginTop: Spacing.md,
                    },
                  ]}
                >
                  {workshop.description}
                </ThemedText>
              </View>
            )}

            {/* Requirements */}
            {workshop.requirements && (
              <View style={[styles.descriptionSection, { marginTop: Spacing.lg }]}>
                <ThemedText style={[styles.sectionTitle, { color: colors.onSurface }]}>
                  ✅ Requisitos
                </ThemedText>
                <ThemedText
                  style={[
                    styles.descriptionText,
                    {
                      color: colors.onSurfaceVariant,
                      marginTop: Spacing.md,
                    },
                  ]}
                >
                  {workshop.requirements}
                </ThemedText>
              </View>
            )}

            {/* Objectives */}
            {workshop.objectives && (
              <View style={[styles.descriptionSection, { marginTop: Spacing.lg }]}>
                <ThemedText style={[styles.sectionTitle, { color: colors.onSurface }]}>
                  🎯 Objetivos
                </ThemedText>
                <ThemedText
                  style={[
                    styles.descriptionText,
                    {
                      color: colors.onSurfaceVariant,
                      marginTop: Spacing.md,
                    },
                  ]}
                >
                  {workshop.objectives}
                </ThemedText>
              </View>
            )}

            {/* Donations Info */}
            {workshop.allowsDonations && (
              <View
                style={[
                  styles.donationsSection,
                  {
                    backgroundColor: colors.secondaryContainer,
                    marginTop: Spacing.lg,
                  },
                ]}
              >
                <ThemedText style={[styles.donationsText, { color: colors.onSecondaryContainer }]}>
                  💝 Este taller acepta donaciones voluntarias
                </ThemedText>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Inscribe Button */}
        <View
          style={[
            styles.buttonContainer,
            {
              paddingBottom: insets.bottom + Spacing.lg,
              paddingHorizontal: Spacing.lg,
              backgroundColor: colors.background,
              borderTopColor: colors.outline,
              ...Shadows.lg,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.inscribeButton,
              {
                backgroundColor: workshop.isFull ? colors.outlineVariant : colors.primary,
                opacity: workshop.isFull ? 0.6 : 1,
              },
            ]}
            onPress={() => {
              // TODO: Add inscription functionality
              alert('Inscripción ' + workshop.title);
            }}
            disabled={workshop.isFull}
            activeOpacity={0.8}
          >
            <ThemedText style={[styles.inscribeButtonText, { color: colors.onPrimary }]}>
              {workshop.isFull ? 'Taller Lleno' : '✍️ Inscribirse'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 280,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 64,
  },
  typeBadgeOverlay: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  typeLabelOverlay: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  code: {
    fontSize: 12,
    fontWeight: '500',
  },
  shortDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  urlButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  urlButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  capacitySection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  capacityTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  fullBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  fullBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  availableBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  availableBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  capacityBar: {
    width: '100%',
    height: 8,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
  },
  capacityInfo: {
    fontSize: 12,
    fontWeight: '500',
  },
  videoSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  videoToggleButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  videoToggleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  videoPlayerContainer: {
    marginTop: Spacing.md,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  videoPlayer: {
    width: '100%',
    height: 220,
    backgroundColor: '#000',
  },
  videoControls: {
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  playPauseButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  playPauseText: {
    fontSize: 13,
    fontWeight: '600',
  },
  descriptionSection: {
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 20,
  },
  donationsSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  donationsText: {
    fontSize: 13,
    fontWeight: '500',
  },
  buttonContainer: {
    borderTopWidth: 1,
  },
  inscribeButton: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inscribeButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorIcon: {
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});