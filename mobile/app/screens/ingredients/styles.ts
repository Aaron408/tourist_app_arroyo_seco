import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  headerTitle: {
    ...Typography.headlineMedium,
    fontWeight: '700',
  },
  headerSubtitle: {
    ...Typography.bodyLarge,
    textAlign: 'center',
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  searchContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  searchInput: {
    ...Typography.bodyMedium,
    paddingVertical: Spacing.sm,
  },
  categorySection: {
    marginBottom: Spacing.lg,
  },
  categoryTitle: {
    ...Typography.titleLarge,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  ingredientsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    justifyContent: 'space-between',
  },
  ingredientCard: {
    width: '48%',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  ingredientIcon: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  ingredientName: {
    ...Typography.titleSmall,
    fontWeight: '600',
    textAlign: 'center',
  },
  ingredientDescription: {
    ...Typography.bodySmall,
    textAlign: 'center',
    opacity: 0.8,
  },
  seasonBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.xs,
  },
  seasonText: {
    ...Typography.labelSmall,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.md,
  },
  emptyIcon: {
    fontSize: 48,
    opacity: 0.5,
  },
  emptyTitle: {
    ...Typography.titleMedium,
    fontWeight: '600',
    opacity: 0.7,
  },
  emptyDescription: {
    ...Typography.bodyMedium,
    textAlign: 'center',
    opacity: 0.5,
    paddingHorizontal: Spacing.xl,
  },
  // Estilos de filtros
  filtersContainer: {
    gap: Spacing.md,
  },
  filterSection: {
    gap: Spacing.xs,
  },
  filterLabel: {
    ...Typography.labelMedium,
    fontWeight: '600',
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
    marginRight: Spacing.xs,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterChipText: {
    ...Typography.labelMedium,
    fontWeight: '500',
  },
});