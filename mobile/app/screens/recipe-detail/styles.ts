import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header Styles
  compactHeader: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  compactMeta: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  recipeTitle: {
    ...Typography.headlineMedium,
    fontWeight: '700',
  },
  recipeMeta: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  metaBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  metaText: {
    ...Typography.labelSmall,
    fontWeight: '600',
  },
  
  // Scroll Styles
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  
  // Section Styles
  section: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  sectionTitle: {
    ...Typography.titleMedium,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  descriptionSection: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  descriptionText: {
    ...Typography.bodyLarge,
    lineHeight: 24,
    textAlign: 'center',
  },
  
  // Video Styles
  videoSection: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  videoTitle: {
    ...Typography.titleMedium,
    fontWeight: '600',
  },
  videoButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  videoButtonText: {
    ...Typography.labelMedium,
    fontWeight: '600',
  },
  videoPlaceholder: {
    height: 140,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  videoPlaceholderText: {
    ...Typography.titleMedium,
    fontWeight: '600',
  },
  videoNote: {
    ...Typography.bodyMedium,
    fontStyle: 'italic',
  },
  
  // Ingredients Styles
  ingredientsList: {
    gap: Spacing.sm,
  },
  ingredientItem: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  ingredientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  ingredientName: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    flex: 1,
  },
  amountBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  ingredientAmount: {
    ...Typography.labelSmall,
    fontWeight: '700',
  },
  ingredientNotes: {
    ...Typography.bodySmall,
    fontStyle: 'italic',
  },
  
  // Steps Styles
  stepsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  stepsProgress: {
    ...Typography.labelMedium,
    fontWeight: '600',
  },
  stepsList: {
    gap: Spacing.sm,
  },
  stepCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  stepNumberText: {
    ...Typography.titleSmall,
    fontWeight: '700',
  },
  stepInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepTitle: {
    ...Typography.titleSmall,
    fontWeight: '600',
    flex: 1,
  },
  timeBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  stepTime: {
    ...Typography.labelSmall,
    fontWeight: '600',
  },
  stepDescription: {
    ...Typography.bodyMedium,
    lineHeight: 22,
    marginBottom: Spacing.sm,
  },
  tipsContainer: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.sm,
  },
  tipsLabel: {
    ...Typography.labelSmall,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  tipsText: {
    ...Typography.bodySmall,
    lineHeight: 18,
  },
  
  // Step Navigation Styles
  currentStepContainer: {
    marginBottom: Spacing.md,
  },
  stepNavigationContainer: {
    gap: Spacing.md,
  },
  stepNavButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    minWidth: 100,
    alignItems: 'center',
    flex: 1,
    maxWidth: '45%',
  },
  navButtonText: {
    ...Typography.labelMedium,
    fontWeight: '600',
  },
  stepIndicatorsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicators: {
    flexDirection: 'row',
    gap: Spacing.xs,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  stepIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    fontSize: 10,
    fontWeight: '900',
  },
  
  // Compact Progress Styles (for many steps)
  compactProgressContainer: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    width: '80%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  compactProgressText: {
    ...Typography.labelSmall,
    fontWeight: '600',
  },

  // Cultural Notes Styles
  culturalNotes: {
    gap: Spacing.sm,
  },
  culturalNote: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  culturalNoteText: {
    ...Typography.bodyMedium,
    lineHeight: 20,
  },
});