import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useLanguage } from '@/contexts/languageProvider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

type TabType = 'recipes' | 'ingredients' | 'techniques';

const mockRecipes = [
  {
    id: 1,
    title: 'Mole Queretano',
    description: 'Receta tradicional de mole con ingredientes locales',
    difficulty: 'Intermedio',
    time: '3 horas',
    icon: '🍲',
  },
  {
    id: 2,
    title: 'Gorditas de Frijol',
    description: 'Antojito tradicional hecho con masa de maíz',
    difficulty: 'Fácil',
    time: '45 min',
    icon: '🫔',
  },
  {
    id: 3,
    title: 'Atole de Pinole',
    description: 'Bebida caliente preparada con maíz tostado',
    difficulty: 'Fácil',
    time: '30 min',
    icon: '☕',
  },
];

const mockIngredients = [
  {
    id: 1,
    name: 'Chile Serrano',
    description: 'Chile picante cultivado en la región',
    season: 'Todo el año',
    icon: '🌶️',
  },
  {
    id: 2,
    name: 'Maíz Criollo',
    description: 'Variedad local de maíz tradicional',
    season: 'Agosto - Octubre',
    icon: '🌽',
  },
  {
    id: 3,
    name: 'Nopal',
    description: 'Cactus comestible rico en fibra',
    season: 'Primavera',
    icon: '🌵',
  },
  {
    id: 4,
    name: 'Frijol Negro',
    description: 'Leguminosa básica en la dieta regional',
    season: 'Julio - Septiembre',
    icon: '🫘',
  },
];

const mockTechniques = [
  {
    id: 1,
    name: 'Nixtamalización',
    description: 'Proceso ancestral de preparación del maíz',
    difficulty: 'Avanzado',
    icon: '🫕',
  },
  {
    id: 2,
    name: 'Molienda en Metate',
    description: 'Técnica tradicional para moler ingredientes',
    difficulty: 'Intermedio',
    icon: '🪨',
  },
  {
    id: 3,
    name: 'Cocción en Comal',
    description: 'Método de cocción sobre superficie caliente',
    difficulty: 'Fácil',
    icon: '🔥',
  },
];

export default function GastronomyScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('recipes');

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

  const RecipeCard = ({ recipe }: { recipe: typeof mockRecipes[0] }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, ...Shadows.md }]}
      onPress={() => router.push(`/screens/recipe-detail?id=${recipe.id}`)}
      activeOpacity={0.8}
    >
      <View style={[styles.cardIcon, { backgroundColor: colors.primaryContainer }]}>
        <ThemedText style={styles.cardIconText}>{recipe.icon}</ThemedText>
      </View>
      <View style={styles.cardContent}>
        <ThemedText style={[styles.cardTitle, { color: colors.text }]}>
          {recipe.title}
        </ThemedText>
        <ThemedText style={[styles.cardDescription, { color: colors.outline }]}>
          {recipe.description}
        </ThemedText>
        <View style={styles.cardFooter}>
          <View style={[styles.badge, { backgroundColor: colors.secondaryContainer }]}>
            <ThemedText style={[styles.badgeText, { color: colors.secondary }]}>
              {recipe.difficulty}
            </ThemedText>
          </View>
          <ThemedText style={[styles.timeText, { color: colors.outline }]}>
            ⏱ {recipe.time}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );

  const IngredientCard = ({ ingredient }: { ingredient: typeof mockIngredients[0] }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, ...Shadows.md }]}
      onPress={() => router.push('/screens/ingredients')}
      activeOpacity={0.8}
    >
      <View style={[styles.cardIcon, { backgroundColor: colors.tertiaryContainer }]}>
        <ThemedText style={styles.cardIconText}>{ingredient.icon}</ThemedText>
      </View>
      <View style={styles.cardContent}>
        <ThemedText style={[styles.cardTitle, { color: colors.text }]}>
          {ingredient.name}
        </ThemedText>
        <ThemedText style={[styles.cardDescription, { color: colors.outline }]}>
          {ingredient.description}
        </ThemedText>
        <View style={styles.cardFooter}>
          <View style={[styles.badge, { backgroundColor: colors.tertiaryContainer }]}>
            <ThemedText style={[styles.badgeText, { color: colors.tertiary }]}>
              🌱 {ingredient.season}
            </ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const TechniqueCard = ({ technique }: { technique: typeof mockTechniques[0] }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, ...Shadows.md }]}
      activeOpacity={0.8}
    >
      <View style={[styles.cardIcon, { backgroundColor: colors.secondaryContainer }]}>
        <ThemedText style={styles.cardIconText}>{technique.icon}</ThemedText>
      </View>
      <View style={styles.cardContent}>
        <ThemedText style={[styles.cardTitle, { color: colors.text }]}>
          {technique.name}
        </ThemedText>
        <ThemedText style={[styles.cardDescription, { color: colors.outline }]}>
          {technique.description}
        </ThemedText>
        <View style={styles.cardFooter}>
          <View style={[styles.badge, { backgroundColor: colors.primaryContainer }]}>
            <ThemedText style={[styles.badgeText, { color: colors.primary }]}>
              {technique.difficulty}
            </ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, ...Shadows.sm }]}>
        <ThemedText style={[styles.headerTitle, { color: colors.text }]}>
          🍽️ {t('Gastronomy.title')}
        </ThemedText>
        <ThemedText style={[styles.headerSubtitle, { color: colors.outline }]}>
          {t('Gastronomy.subtitle')}
        </ThemedText>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { backgroundColor: colors.surface }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          <TabButton tab="recipes" label={t('Gastronomy.tabs.recipes')} icon="🍲" />
          <TabButton tab="ingredients" label={t('Gastronomy.tabs.ingredients')} icon="🌱" />
          <TabButton tab="techniques" label={t('Gastronomy.tabs.techniques')} icon="👨‍🍳" />
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'recipes' && (
          <View style={styles.grid}>
            {mockRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </View>
        )}

        {activeTab === 'ingredients' && (
          <View style={styles.grid}>
            {mockIngredients.map((ingredient) => (
              <IngredientCard key={ingredient.id} ingredient={ingredient} />
            ))}
          </View>
        )}

        {activeTab === 'techniques' && (
          <View style={styles.grid}>
            {mockTechniques.map((technique) => (
              <TechniqueCard key={technique.id} technique={technique} />
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
  },
  tabsContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
  card: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  cardIconText: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    ...Typography.titleMedium,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    ...Typography.bodyMedium,
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    ...Typography.labelSmall,
    fontWeight: '600',
  },
  timeText: {
    ...Typography.bodySmall,
  },
});
