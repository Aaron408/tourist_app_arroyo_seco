import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Workshop } from '@/services/workshopService';
import { workshopService } from '@/services/workshopService';

interface WorkshopCardProps {
  workshop: Workshop;
  onPress: () => void;
}

export const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, onPress }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const typeLabel = workshopService.getWorkshopTypeLabel(workshop.workshopType);
  const typeColor = workshopService.getWorkshopTypeColor(workshop.workshopType);
  const capacityPercent = Math.round((workshop.currentAttendees / workshop.maxCapacity) * 100);
  const isOnline = workshop.workshopType === 'online';
  const isHybrid = workshop.workshopType === 'hybrid';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <ThemedView style={[styles.card, { backgroundColor: colors.surface, ...Shadows.md }]}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          {workshop.thumbnailUrl ? (
            <Image
              source={{ uri: workshop.thumbnailUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.imagePlaceholder, { backgroundColor: colors.surfaceVariant }]}>
              <ThemedText style={[styles.placeholderIcon, { color: colors.onSurfaceVariant }]}>
                🎓
              </ThemedText>
            </View>
          )}

          {/* Type Badge */}
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: typeColor + 'E6' }
            ]}
          >
            <ThemedText style={[styles.typeLabel, { color: '#FFFFFF' }]}>
              {typeLabel}
            </ThemedText>
          </View>

          {/* Capacity Indicator */}
          {workshop.isFull ? (
            <View style={[styles.fullBadge, { backgroundColor: '#FF6B6B' }]}>
              <ThemedText style={styles.fullText}>⚠️ Lleno</ThemedText>
            </View>
          ) : (
            <View style={[styles.capacityBadge, { backgroundColor: '#4ECDC4' }]}>
              <ThemedText style={styles.capacityText}>
                {workshop.availableSpots} {workshop.availableSpots === 1 ? 'lugar' : 'lugares'}
              </ThemedText>
            </View>
          )}
        </View>

        {/* Content Section */}
        <View style={[styles.content, { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md }]}>
          {/* Title */}
          <ThemedText
            style={[
              styles.title,
              {
                color: colors.onSurface,
                marginBottom: Spacing.sm,
              },
            ]}
            numberOfLines={2}
          >
            {workshop.title}
          </ThemedText>

          {/* Description */}
          <ThemedText
            style={[
              styles.description,
              {
                color: colors.onSurfaceVariant,
                marginBottom: Spacing.md,
              },
            ]}
            numberOfLines={2}
          >
            {workshop.shortDescription}
          </ThemedText>

          {/* Date and Time */}
          <View style={styles.infoRow}>
            <ThemedText style={[styles.infoLabel, { color: colors.onSurfaceVariant }]}>
              📅 {workshopService.formatDateRange(workshop.startDate, workshop.endDate)}
            </ThemedText>
          </View>

          {/* Capacity Bar */}
          <View style={styles.capacityContainer}>
            <View
              style={[
                styles.capacityBar,
                { backgroundColor: colors.surfaceVariant, height: 4, borderRadius: BorderRadius.sm },
              ]}
            >
              <View
                style={[
                  styles.capacityFill,
                  {
                    width: `${capacityPercent}%`,
                    backgroundColor: capacityPercent > 80 ? '#FF6B6B' : '#4ECDC4',
                    borderRadius: BorderRadius.sm,
                  },
                ]}
              />
            </View>
            <ThemedText
              style={[
                styles.capacityInfo,
                {
                  color: colors.onSurfaceVariant,
                  fontSize: 11,
                  marginTop: 4,
                },
              ]}
            >
              {workshop.currentAttendees}/{workshop.maxCapacity} participantes
            </ThemedText>
          </View>

          {/* Footer Info */}
          <View style={[styles.footer, { marginTop: Spacing.md }]}>
            <View style={styles.iconRow}>
              {isOnline && (
                <View style={[styles.iconBadge, { backgroundColor: colors.primaryContainer }]}>
                  <ThemedText style={styles.iconText}>💻</ThemedText>
                </View>
              )}
              {isHybrid && (
                <View style={[styles.iconBadge, { backgroundColor: colors.primaryContainer }]}>
                  <ThemedText style={styles.iconText}>🌐</ThemedText>
                </View>
              )}
              {workshop.allowsDonations && (
                <View style={[styles.iconBadge, { backgroundColor: colors.secondaryContainer }]}>
                  <ThemedText style={styles.iconText}>💝</ThemedText>
                </View>
              )}
            </View>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  card: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
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
    fontSize: 48,
  },
  typeBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  fullBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  fullText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  capacityBadge: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  capacityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  infoRow: {
    marginVertical: Spacing.sm,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  capacityContainer: {
    marginVertical: Spacing.md,
  },
  capacityBar: {
    width: '100%',
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
  },
  capacityInfo: {
    marginTop: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  iconText: {
    fontSize: 12,
  },
});
