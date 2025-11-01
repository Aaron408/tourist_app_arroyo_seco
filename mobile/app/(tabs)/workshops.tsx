import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WorkshopCard } from '@/components/workshop-card';
import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { useLanguage } from '@/contexts/languageProvider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import workshopService, { Workshop } from '@/services/workshopService';

interface WorkshopFilter {
  type: 'all' | 'in_person' | 'online' | 'hybrid';
}

export default function WorkshopsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useLanguage();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<WorkshopFilter>({ type: 'all' });

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
      setError('No se pudieron cargar los talleres. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkshops = workshops.filter(
    (workshop) => filter.type === 'all' || workshop.workshopType === filter.type
  );

  const handleWorkshopPress = (workshopId: number) => {
    router.push({
      pathname: '/screens/workshop-detail/[id]',
      params: { id: workshopId },
    });
  };

  const FilterChip = ({
    label,
    type,
    isActive,
  }: {
    label: string;
    type: WorkshopFilter['type'];
    isActive: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        {
          backgroundColor: isActive ? colors.primary : colors.surfaceVariant,
          borderColor: isActive ? colors.primary : colors.outline,
          ...Shadows.sm,
        },
      ]}
      onPress={() => setFilter({ type })}
      activeOpacity={0.8}
    >
      <ThemedText
        style={[
          styles.filterChipText,
          {
            color: isActive ? colors.onPrimary : colors.onSurfaceVariant,
            fontWeight: isActive ? '600' : '500',
          },
        ]}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <ThemedText style={[styles.headerTitle, { color: colors.onSurface }]}>
        🎓 Talleres
      </ThemedText>
      <ThemedText
        style={[
          styles.headerSubtitle,
          {
            color: colors.onSurfaceVariant,
            marginBottom: Spacing.lg,
          },
        ]}
      >
        Aprende nuevas habilidades con nuestros talleres
      </ThemedText>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <FilterChip
          label="Todos"
          type="all"
          isActive={filter.type === 'all'}
        />
        <FilterChip
          label="Presencial"
          type="in_person"
          isActive={filter.type === 'in_person'}
        />
        <FilterChip
          label="En línea"
          type="online"
          isActive={filter.type === 'online'}
        />
        <FilterChip
          label="Híbrido"
          type="hybrid"
          isActive={filter.type === 'hybrid'}
        />
      </View>

      {/* Workshop Count */}
      {!loading && (
        <ThemedText
          style={[
            styles.countText,
            {
              color: colors.onSurfaceVariant,
              marginTop: Spacing.lg,
              marginBottom: Spacing.md,
            },
          ]}
        >
          {filteredWorkshops.length} {filteredWorkshops.length === 1 ? 'taller' : 'talleres'} disponible
          {filteredWorkshops.length !== 1 ? 's' : ''}
        </ThemedText>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={[styles.emptyContainer, { paddingTop: 60 }]}>
      <ThemedText style={[styles.emptyIcon, { fontSize: 64 }]}>🔍</ThemedText>
      <ThemedText
        style={[
          styles.emptyTitle,
          { color: colors.onSurface, marginTop: Spacing.lg },
        ]}
      >
        No hay talleres disponibles
      </ThemedText>
      <ThemedText
        style={[
          styles.emptyText,
          { color: colors.onSurfaceVariant, marginTop: Spacing.md },
        ]}
      >
        Intenta con otro filtro o vuelve más tarde
      </ThemedText>
      <TouchableOpacity
        style={[styles.refreshButton, { backgroundColor: colors.primary }]}
        onPress={loadWorkshops}
        activeOpacity={0.8}
      >
        <ThemedText style={[styles.refreshButtonText, { color: colors.onPrimary }]}>
          🔄 Actualizar
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  const renderError = () => (
    <View style={[styles.errorContainer, { paddingTop: 60 }]}>
      <ThemedText style={[styles.emptyIcon, { fontSize: 64 }]}>⚠️</ThemedText>
      <ThemedText
        style={[
          styles.emptyTitle,
          { color: colors.onSurface, marginTop: Spacing.lg },
        ]}
      >
        Error al cargar talleres
      </ThemedText>
      <ThemedText
        style={[
          styles.emptyText,
          { color: colors.onSurfaceVariant, marginTop: Spacing.md },
        ]}
      >
        {error}
      </ThemedText>
      <TouchableOpacity
        style={[styles.refreshButton, { backgroundColor: colors.primary }]}
        onPress={loadWorkshops}
        activeOpacity={0.8}
      >
        <ThemedText style={[styles.refreshButtonText, { color: colors.onPrimary }]}>
          🔄 Intentar de nuevo
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <View
          style={[
            styles.loadingContainer,
            {
              paddingTop: insets.top + Spacing.lg,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <ActivityIndicator size="large" color={colors.primary} />
          <ThemedText
            style={[
              styles.loadingText,
              { color: colors.onSurfaceVariant, marginTop: Spacing.lg },
            ]}
          >
            Cargando talleres...
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredWorkshops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WorkshopCard
            workshop={item}
            onPress={() => handleWorkshopPress(item.id)}
          />
        )}
        ListHeaderComponent={renderHeader()}
        ListEmptyComponent={error ? renderError() : renderEmpty()}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingHorizontal: Spacing.lg,
            paddingTop: insets.top,
            paddingBottom: insets.bottom + Spacing.lg,
          },
        ]}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 12,
  },
  countText: {
    fontSize: 12,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  emptyIcon: {
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  refreshButton: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  refreshButtonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
