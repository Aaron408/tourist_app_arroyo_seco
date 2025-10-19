import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const mockRestaurants = [
  {
    id: 1,
    name: 'Comedor Doña María',
    description: 'Cocina tradicional queretana con más de 30 años de tradición familiar',
    specialty: 'Mole queretano, gorditas de frijol',
    address: 'Calle Principal #123, Arroyo Seco, Qro.',
    phone: '+52 (442) 123-4567',
    hours: 'Lun-Dom 8:00 AM - 6:00 PM',
    priceRange: '$ - $$',
    rating: 4.8,
    coordinates: { lat: 21.0190, lng: -99.2532 },
  },
  {
    id: 2,
    name: 'La Cocina de la Abuela',
    description: 'Auténticos sabores caseros preparados con ingredientes locales',
    specialty: 'Nopalitos en escabeche, atole de pinole',
    address: 'Plaza Central s/n, Arroyo Seco, Qro.',
    phone: '+52 (442) 234-5678',
    hours: 'Mar-Dom 9:00 AM - 8:00 PM',
    priceRange: '$',
    rating: 4.6,
    coordinates: { lat: 21.0195, lng: -99.2528 },
  },
  {
    id: 3,
    name: 'El Rincón del Sabor',
    description: 'Restaurante familiar especializado en técnicas culinarias ancestrales',
    specialty: 'Barbacoa de hoyo, quelites guisados',
    address: 'Av. Benito Juárez #45, Arroyo Seco, Qro.',
    phone: '+52 (442) 345-6789',
    hours: 'Vie-Dom 10:00 AM - 9:00 PM',
    priceRange: '$$ - $$$',
    rating: 4.9,
    coordinates: { lat: 21.0188, lng: -99.2535 },
  },
  {
    id: 4,
    name: 'Tradiciones de Querétaro',
    description: 'Mesa contemporánea con base en recetas tradicionales de la región',
    specialty: 'Menú degustación, bebidas tradicionales',
    address: 'Carretera a Tolimán Km 2.5, Arroyo Seco, Qro.',
    phone: '+52 (442) 456-7890',
    hours: 'Jue-Sab 6:00 PM - 11:00 PM',
    priceRange: '$$$',
    rating: 4.7,
    coordinates: { lat: 21.0182, lng: -99.2540 },
  },
];

export default function RestaurantsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleMap = (coordinates: { lat: number; lng: number }) => {
    const url = `https://maps.google.com/?q=${coordinates.lat},${coordinates.lng}`;
    Linking.openURL(url);
  };

  const ModernRestaurantCard = ({ restaurant }: { restaurant: typeof mockRestaurants[0] }) => (
    <View 
      style={[styles.modernRestaurantCard, { backgroundColor: colors.surface, ...Shadows.md }]}
    >
      <View style={styles.modernCardContent}>
        <View style={styles.modernRestaurantHeader}>
          <View style={styles.modernTitleSection}>
            <ThemedText style={[styles.modernRestaurantName, { color: colors.onSurface }]}>
              🏪 {restaurant.name}
            </ThemedText>
            <View style={[styles.modernRatingBadge, { backgroundColor: colors.tertiaryContainer }]}>
              <ThemedText style={[styles.modernRatingText, { color: colors.onTertiaryContainer }]}>
                ⭐ {restaurant.rating}
              </ThemedText>
            </View>
          </View>
          
          <ThemedText style={[styles.modernRestaurantDescription, { color: colors.onSurfaceVariant }]}>
            {restaurant.description}
          </ThemedText>
        </View>
        
        <View style={styles.modernSpecialtySection}>
          <ThemedText style={[styles.modernSpecialtyLabel, { color: colors.secondary }]}>
            🍽️ Especialidad:
          </ThemedText>
          <ThemedText style={[styles.modernSpecialtyText, { color: colors.onSurfaceVariant }]}>
            {restaurant.specialty}
          </ThemedText>
        </View>
        
        <View style={styles.modernInfoSection}>
          <View style={styles.modernInfoItem}>
            <ThemedText style={[styles.modernInfoLabel, { color: colors.secondary }]}>
              📍 Dirección:
            </ThemedText>
            <ThemedText style={[styles.modernInfoText, { color: colors.onSurfaceVariant }]}>
              {restaurant.address}
            </ThemedText>
          </View>
          
          <View style={styles.modernInfoItem}>
            <ThemedText style={[styles.modernInfoLabel, { color: colors.secondary }]}>
              🕒 Horario:
            </ThemedText>
            <ThemedText style={[styles.modernInfoText, { color: colors.onSurfaceVariant }]}>
              {restaurant.hours}
            </ThemedText>
          </View>
          
          <View style={styles.modernInfoItem}>
            <ThemedText style={[styles.modernInfoLabel, { color: colors.secondary }]}>
              💰 Precio:
            </ThemedText>
            <ThemedText style={[styles.modernInfoText, { color: colors.onSurfaceVariant }]}>
              {restaurant.priceRange}
            </ThemedText>
          </View>
        </View>
        
        <View style={styles.modernActionSection}>
          <TouchableOpacity
            style={[styles.modernActionButton, { backgroundColor: colors.primaryContainer }]}
            onPress={() => handleCall(restaurant.phone)}
            activeOpacity={0.8}
          >
            <ThemedText style={[styles.modernActionButtonText, { color: colors.onPrimaryContainer }]}>
              📞 Llamar
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.modernActionButton, { backgroundColor: colors.secondaryContainer }]}
            onPress={() => handleMap(restaurant.coordinates)}
            activeOpacity={0.8}
          >
            <ThemedText style={[styles.modernActionButtonText, { color: colors.onSecondaryContainer }]}>
              🗺️ Ver Mapa
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const ViewToggle = () => (
    <ThemedView style={styles.viewToggleContainer}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          {
            backgroundColor: viewMode === 'list' ? colors.primary : colors.gray100,
            borderColor: colors.gray200,
          }
        ]}
        onPress={() => setViewMode('list')}
        activeOpacity={0.7}
      >
        <ThemedText
          style={[
            styles.toggleText,
            {
              color: viewMode === 'list' ? colors.background : colors.gray600,
            }
          ]}
        >
          📋 Lista
        </ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.toggleButton,
          {
            backgroundColor: viewMode === 'map' ? colors.primary : colors.gray100,
            borderColor: colors.gray200,
          }
        ]}
        onPress={() => setViewMode('map')}
        activeOpacity={0.7}
      >
        <ThemedText
          style={[
            styles.toggleText,
            {
              color: viewMode === 'map' ? colors.background : colors.gray600,
            }
          ]}
        >
          🗺 Mapa
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedView style={[styles.header, { backgroundColor: colors.surface }]}>
        <ThemedText type="title" style={[styles.headerTitle, { color: colors.primary }]}>
          🍽 Ruta del Sabor
        </ThemedText>
        <ThemedText style={[styles.headerSubtitle, { color: colors.gray600 }]}>
          Restaurantes tradicionales de Arroyo Seco
        </ThemedText>
      </ThemedView>

      <ViewToggle />

      {viewMode === 'list' ? (
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {mockRestaurants.map((restaurant) => (
            <ModernRestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
          
          <ThemedView style={[styles.comingSoon, { backgroundColor: colors.gray100 }]}>
            <ThemedText style={[styles.comingSoonText, { color: colors.gray500 }]}>
              🏪 Más establecimientos tradicionales próximamente...
            </ThemedText>
          </ThemedView>
        </ScrollView>
      ) : (
        <ThemedView style={[styles.mapPlaceholder, { backgroundColor: colors.gray100 }]}>
          <ThemedText style={[styles.mapPlaceholderText, { color: colors.gray600 }]}>
            🗺 Vista de Mapa
          </ThemedText>
          <ThemedText style={[styles.mapPlaceholderSubtext, { color: colors.gray500 }]}>
            Integración con mapas en desarrollo...
          </ThemedText>
          <ThemedText style={[styles.mapNote, { color: colors.gray400 }]}>
            Por el momento, usa el botón "Ver Mapa" en cada restaurante
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + 40,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    ...Typography.headlineMedium,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.bodyLarge,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  toggleText: {
    ...Typography.labelMedium,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  
  // Modern Restaurant Card Styles
  modernRestaurantCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  modernCardContent: {
    padding: Spacing.lg,
  },
  modernRestaurantHeader: {
    marginBottom: Spacing.md,
  },
  modernTitleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  modernRestaurantName: {
    ...Typography.headlineSmall,
    fontWeight: '600',
    flex: 1,
    marginRight: Spacing.md,
  },
  modernRatingBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  modernRatingText: {
    ...Typography.labelSmall,
    fontWeight: '700',
  },
  modernRestaurantDescription: {
    ...Typography.bodyMedium,
    lineHeight: 22,
  },
  modernSpecialtySection: {
    marginBottom: Spacing.lg,
  },
  modernSpecialtyLabel: {
    ...Typography.labelMedium,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  modernSpecialtyText: {
    ...Typography.bodyMedium,
    lineHeight: 20,
  },
  modernInfoSection: {
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  modernInfoItem: {
    marginBottom: Spacing.sm,
  },
  modernInfoLabel: {
    ...Typography.labelMedium,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  modernInfoText: {
    ...Typography.bodyMedium,
    lineHeight: 20,
  },
  modernActionSection: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  modernActionButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
  },
  modernActionButtonText: {
    ...Typography.labelMedium,
    fontWeight: '600',
  },
  
  // Map and other components
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
  },
  mapPlaceholderText: {
    ...Typography.headlineMedium,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
  },
  mapPlaceholderSubtext: {
    ...Typography.bodyLarge,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  mapNote: {
    ...Typography.bodyMedium,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  comingSoon: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  comingSoonText: {
    ...Typography.bodyLarge,
    fontStyle: 'italic',
  },
});