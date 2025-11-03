import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WorkshopCard } from '@/components/workshop-card';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useLanguage } from '@/contexts/languageProvider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import workshopService, { Workshop } from '@/services/workshopService';

type TabType = 'workshops' | 'events';

const mockEvents = [
  {
    id: 1,
    name: 'Festival Gastronómico Arroyo Seco',
    description: 'Celebración de la gastronomía tradicional con demostraciones en vivo',
    date: '2025-12-15',
    location: 'Plaza Principal',
    icon: '🎉',
    category: 'Festival',
  },
  {
    id: 2,
    name: 'Ruta del Sabor',
    description: 'Recorrido guiado por los restaurantes tradicionales',
    date: '2025-11-20',
    location: 'Centro Histórico',
    icon: '🚶',
    category: 'Tour',
  },
  {
    id: 3,
    name: 'Feria de Ingredientes Locales',
    description: 'Exhibición y venta de productos regionales',
    date: '2025-11-25',
    location: 'Mercado Municipal',
    icon: '🌽',
    category: 'Feria',
  },
];

export default function ExperiencesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('workshops');
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'workshops') {
      loadWorkshops();
    }
  }, [activeTab]);

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
      params: { id: workshopId },
    });
  };

  const TabButton = ({ tab, label, icon }: { tab: TabType; label: string; icon: string }) => {
    const isActive = activeTab === tab;
    return (
      <TouchableOpacity
        style={[
          styles.tabButton,
          {
            backgroundColor: isActive ? colors.primaryContainer : 'transparent',
          },
        ]}
        onPress={() => setActiveTab(tab)}
      >
        <ThemedText
          style={[
            styles.tabIcon,
            { color: isActive ? colors.primary : colors.outline },
          ]}
        >
          {icon}
        </ThemedText>
        <ThemedText
          style={[
            styles.tabLabel,
            { color: isActive ? colors.primary : colors.outline },
          ]}
        >
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  const EventCard = ({ event }: { event: typeof mockEvents[0] }) => {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return (
      <TouchableOpacity
        style={[styles.eventCard, { backgroundColor: colors.surface, ...Shadows.md }]}
        activeOpacity={0.8}
      >
        <View style={[styles.eventIcon, { backgroundColor: colors.tertiaryContainer }]}>
          <ThemedText style={styles.eventIconText}>{event.icon}</ThemedText>
        </View>
        <View style={styles.eventContent}>
          <View style={[styles.categoryBadge, { backgroundColor: colors.primaryContainer }]}>
            <ThemedText style={[styles.categoryText, { color: colors.primary }]}>
              {event.category}
            </ThemedText>
          </View>
          <ThemedText style={[styles.eventName, { color: colors.text }]}>
            {event.name}
          </ThemedText>
          <ThemedText style={[styles.eventDescription, { color: colors.outline }]}>
            {event.description}
          </ThemedText>
          <View style={styles.eventMeta}>
            <View style={styles.eventMetaItem}>
              <Ionicons name="calendar" size={16} color={colors.outline} />
              <ThemedText style={[styles.eventMetaText, { color: colors.outline }]}>
                {formattedDate}
              </ThemedText>
            </View>
            <View style={styles.eventMetaItem}>
              <Ionicons name="location" size={16} color={colors.outline} />
              <ThemedText style={[styles.eventMetaText, { color: colors.outline }]}>
                {event.location}
              </ThemedText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, ...Shadows.sm }]}>
        <ThemedText style={[styles.headerTitle, { color: colors.text }]}>
          ✨ {t('Experiences.title')}
        </ThemedText>
        <ThemedText style={[styles.headerSubtitle, { color: colors.outline }]}>
          {t('Experiences.subtitle')}
        </ThemedText>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { backgroundColor: colors.surface }]}>
        <View style={styles.tabsContent}>
          <TabButton tab="workshops" label={t('Experiences.tabs.workshops')} icon="🎓" />
          <TabButton tab="events" label={t('Experiences.tabs.events')} icon="🎉" />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'workshops' && (
          <>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <ThemedText style={[styles.loadingText, { color: colors.outline }]}>
                  Cargando talleres...
                </ThemedText>
              </View>
            ) : error ? (
              <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptyIcon}>⚠️</ThemedText>
                <ThemedText style={[styles.emptyTitle, { color: colors.text }]}>
                  Error al cargar talleres
                </ThemedText>
                <ThemedText style={[styles.emptyText, { color: colors.outline }]}>
                  {error}
                </ThemedText>
                <TouchableOpacity
                  style={[styles.retryButton, { backgroundColor: colors.primary }]}
                  onPress={loadWorkshops}
                >
                  <ThemedText style={styles.retryButtonText}>
                    Intentar de nuevo
                  </ThemedText>
                </TouchableOpacity>
              </View>
            ) : workshops.length === 0 ? (
              <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptyIcon}>🔍</ThemedText>
                <ThemedText style={[styles.emptyTitle, { color: colors.text }]}>
                  No hay talleres disponibles
                </ThemedText>
                <ThemedText style={[styles.emptyText, { color: colors.outline }]}>
                  Vuelve pronto para ver nuevos talleres
                </ThemedText>
              </View>
            ) : (
              <View style={styles.grid}>
                {workshops.map((workshop) => (
                  <WorkshopCard
                    key={workshop.id}
                    workshop={workshop}
                    onPress={() => handleWorkshopPress(workshop.id)}
                  />
                ))}
              </View>
            )}
          </>
        )}

        {activeTab === 'events' && (
          <View style={styles.grid}>
            <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
              Próximos Eventos
            </ThemedText>
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  headerTitle: {
    ...Typography.headlineMedium,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.bodyLarge,
  },
  tabsContainer: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  tabsContent: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    ...Typography.labelLarge,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  grid: {
    gap: Spacing.md,
  },
  sectionTitle: {
    ...Typography.titleLarge,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  eventCard: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
  },
  eventIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  eventIconText: {
    fontSize: 28,
  },
  eventContent: {
    flex: 1,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
  },
  categoryText: {
    ...Typography.labelSmall,
    fontWeight: '600',
  },
  eventName: {
    ...Typography.titleMedium,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventDescription: {
    ...Typography.bodyMedium,
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
  eventMeta: {
    gap: Spacing.xs,
  },
  eventMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  eventMetaText: {
    ...Typography.bodySmall,
  },
  loadingContainer: {
    paddingTop: 60,
    alignItems: 'center',
  },
  loadingText: {
    ...Typography.bodyMedium,
    marginTop: Spacing.md,
  },
  emptyContainer: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    ...Typography.titleLarge,
    fontWeight: '600',
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  emptyText: {
    ...Typography.bodyMedium,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  retryButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
  },
  retryButtonText: {
    ...Typography.titleMedium,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
