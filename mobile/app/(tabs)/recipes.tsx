import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const mockRecipes = [
  {
    id: 1,
    title: 'Mole Queretano',
    description: 'Receta tradicional de mole con ingredientes locales de Querétaro',
    difficulty: 'Intermedio',
    time: '3 horas',
    region: 'Arroyo Seco',
  },
  {
    id: 2,
    title: 'Gorditas de Frijol',
    description: 'Antojito tradicional hecho con masa de maíz y frijoles de la región',
    difficulty: 'Fácil',
    time: '45 min',
    region: 'Querétaro',
  },
  {
    id: 3,
    title: 'Atole de Pinole',
    description: 'Bebida caliente preparada con maíz tostado y especias',
    difficulty: 'Fácil',
    time: '30 min',
    region: 'Arroyo Seco',
  },
  {
    id: 4,
    title: 'Nopalitos en Escabeche',
    description: 'Nopales preparados en vinagre con verduras de temporada',
    difficulty: 'Fácil',
    time: '20 min',
    region: 'Querétaro',
  },
];

export default function RecipesScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];




  const ModernRecipeCard = ({ recipe }: { recipe: typeof mockRecipes[0] }) => (
    <TouchableOpacity 
      style={[
        styles.modernRecipeCard, 
        { 
          backgroundColor: colors.surface,
          ...Shadows.md,
        }
      ]}
      activeOpacity={0.95}
      onPress={() => router.push(`/screens/recipe-detail?id=${recipe.id}`)}
    >
      <View style={styles.modernCardContent}>
        <View style={styles.modernRecipeHeader}>
          <View style={styles.modernTitleSection}>
            <ThemedText style={[styles.modernRecipeTitle, { color: colors.onSurface }]}>
              {recipe.title}
            </ThemedText>
            <View style={[styles.modernRegionBadge, { backgroundColor: colors.tertiaryContainer }]}>
              <ThemedText style={[styles.modernRegionText, { color: colors.onTertiaryContainer }]}>
                📍 {recipe.region}
              </ThemedText>
            </View>
          </View>
        </View>
        
        <ThemedText style={[styles.modernRecipeDescription, { color: colors.onSurfaceVariant }]}>
          {recipe.description}
        </ThemedText>
        
        <View style={styles.modernRecipeFooter}>
          <View style={styles.modernMetrics}>
            <View style={[styles.modernDifficultyChip, { backgroundColor: colors.secondaryContainer }]}>
              <ThemedText style={[styles.modernChipText, { color: colors.onSecondaryContainer }]}>
                {recipe.difficulty}
              </ThemedText>
            </View>
            <View style={styles.modernTimeContainer}>
              <ThemedText style={[styles.modernTimeText, { color: colors.onSurfaceVariant }]}>
                ⏱ {recipe.time}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );



  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.modernHeader, { backgroundColor: colors.surface, ...Shadows.sm }]}>
        <ThemedText style={[styles.modernHeaderTitle, { color: colors.onSurface }]}>
          🍲 Recetas Tradicionales
        </ThemedText>
        <ThemedText style={[styles.modernHeaderSubtitle, { color: colors.onSurfaceVariant }]}>
          Sabores auténticos de Arroyo Seco, Querétaro
        </ThemedText>
        

      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.modernScrollContent}
      >
        <View style={styles.modernRecipeGrid}>
          {mockRecipes.map((recipe) => (
            <ModernRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </View>
        
        <View style={[styles.modernComingSoon, { backgroundColor: colors.surfaceContainer }]}>
          <ThemedText style={[styles.modernComingSoonText, { color: colors.onSurfaceVariant }]}>
            � Más recetas tradicionales próximamente
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Modern Header Styles
  modernHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + 40,
    paddingBottom: Spacing.lg,
  },
  modernHeaderTitle: {
    ...Typography.headlineMedium,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  modernHeaderSubtitle: {
    ...Typography.bodyLarge,
    marginBottom: Spacing.lg,
  },

  
  // Modern Scroll Styles
  scrollView: {
    flex: 1,
  },
  modernScrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  modernRecipeGrid: {
    gap: Spacing.md,
  },
  
  // Modern Recipe Card Styles
  modernRecipeCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  modernCardContent: {
    padding: Spacing.lg,
  },
  modernRecipeHeader: {
    marginBottom: Spacing.md,
  },
  modernTitleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  modernRecipeTitle: {
    ...Typography.headlineSmall,
    fontWeight: '600',
    flex: 1,
    marginRight: Spacing.md,
  },
  modernRegionBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  modernRegionText: {
    ...Typography.labelSmall,
    fontWeight: '600',
  },
  modernRecipeDescription: {
    ...Typography.bodyMedium,
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  modernRecipeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modernMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  modernDifficultyChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  modernChipText: {
    ...Typography.labelSmall,
    fontWeight: '600',
  },
  modernTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modernTimeText: {
    ...Typography.bodySmall,
    fontWeight: '500',
  },
  
  // Modern Coming Soon Styles
  modernComingSoon: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  modernComingSoonText: {
    ...Typography.bodyLarge,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});