import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useLanguageStore } from "@/stores/languageStore";
import {
  gastronomyService,
  Recipe,
  Ingredient,
  Technique,
  Tool,
} from "@/services/gastronomyService";

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
};

type TabType = "recipes" | "ingredients" | "techniques" | "tools";

// Helper to convert language code to API format
const getLanguageCode = (lang: string): string => {
  return lang === 'es' ? 'es-MX' : 'en-US';
};

// Default emojis for items without banner images
const DEFAULT_EMOJIS = {
  recipes: ['🍲', '🫔', '☕', '🌮', '🥘', '🍜'],
  ingredients: ['🌶️', '🌽', '🌵', '🫘', '🥑', '🍅', '🧅', '🧄'],
  techniques: ['🫕', '🪨', '🔥', '👨‍🍳', '🔪', '🥄'],
  tools: ['🔪', '🍳', '🥘', '🥄', '🔥', '⚗️', '🫕'],
};

export default function GastronomyScreen() {
  const params = useLocalSearchParams<{ initialTab?: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("recipes");
  const router = useRouter();
  const { currentLanguage } = useLanguageStore();

  // Data states
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);

  // Loading states
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [loadingTechniques, setLoadingTechniques] = useState(false);
  const [loadingTools, setLoadingTools] = useState(false);

  // Error states
  const [errorRecipes, setErrorRecipes] = useState<string | null>(null);
  const [errorIngredients, setErrorIngredients] = useState<string | null>(null);
  const [errorTechniques, setErrorTechniques] = useState<string | null>(null);
  const [errorTools, setErrorTools] = useState<string | null>(null);

  // Set initial tab from navigation params
  useEffect(() => {
    if (params.initialTab &&
        (params.initialTab === "recipes" || params.initialTab === "ingredients" || params.initialTab === "techniques" || params.initialTab === "tools")) {
      setActiveTab(params.initialTab as TabType);
    }
  }, [params.initialTab]);

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoadingRecipes(true);
      setErrorRecipes(null);
      try {
        const language = getLanguageCode(currentLanguage);
        const data = await gastronomyService.getAllRecipes(language);
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setErrorRecipes('No se pudieron cargar las recetas');
      } finally {
        setLoadingRecipes(false);
      }
    };

    fetchRecipes();
  }, [currentLanguage]);

  // Fetch ingredients
  useEffect(() => {
    const fetchIngredients = async () => {
      setLoadingIngredients(true);
      setErrorIngredients(null);
      try {
        const language = getLanguageCode(currentLanguage);
        const data = await gastronomyService.getAllIngredients(language);
        setIngredients(data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        setErrorIngredients('No se pudieron cargar los ingredientes');
      } finally {
        setLoadingIngredients(false);
      }
    };

    fetchIngredients();
  }, [currentLanguage]);

  // Fetch techniques
  useEffect(() => {
    const fetchTechniques = async () => {
      setLoadingTechniques(true);
      setErrorTechniques(null);
      try {
        const language = getLanguageCode(currentLanguage);
        const data = await gastronomyService.getAllTechniques(language);
        setTechniques(data);
      } catch (error) {
        console.error('Error fetching techniques:', error);
        setErrorTechniques('No se pudieron cargar las técnicas');
      } finally {
        setLoadingTechniques(false);
      }
    };

    fetchTechniques();
  }, [currentLanguage]);

  // Fetch tools
  useEffect(() => {
    const fetchTools = async () => {
      setLoadingTools(true);
      setErrorTools(null);
      try {
        const language = getLanguageCode(currentLanguage);
        const data = await gastronomyService.getAllTools(language);
        setTools(data);
      } catch (error) {
        console.error('Error fetching tools:', error);
        setErrorTools('No se pudieron cargar las herramientas');
      } finally {
        setLoadingTools(false);
      }
    };

    fetchTools();
  }, [currentLanguage]);

  const handleRecipePress = (recipeId: number) => {
    router.push({
      pathname: '/screens/recipe-detail',
      params: { id: recipeId.toString() },
    });
  };

  const handleIngredientPress = (ingredientId: number) => {
    router.push({
      pathname: '/screens/ingredient-detail',
      params: { id: ingredientId.toString() },
    });
  };

  const handleTechniquePress = (techniqueId: number) => {
    router.push({
      pathname: '/screens/technique-detail',
      params: { id: techniqueId.toString() },
    });
  };

  const handleToolPress = (toolId: number) => {
    router.push({
      pathname: '/screens/tool-detail',
      params: { id: toolId.toString() },
    });
  };

  const TabButton = ({
    tab,
    label,
    icon,
  }: {
    tab: TabType;
    label: string;
    icon: string;
  }) => {
    const isActive = activeTab === tab;
    return (
      <TouchableOpacity
        style={[styles.tabButton, isActive && styles.tabButtonActive]}
        onPress={() => setActiveTab(tab)}
        activeOpacity={0.8}
      >
        <Text style={styles.tabIcon}>{icon}</Text>
        <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const RecipeCard = ({ recipe, index }: { recipe: Recipe; index: number }) => {
    const language = getLanguageCode(currentLanguage);
    const translation = gastronomyService.getTranslation(recipe.translations, language);

    if (!translation) return null;

    const difficultyLabel = gastronomyService.getDifficultyLabel(recipe.difficulty);
    const duration = gastronomyService.formatDuration(recipe.duration);
    const emoji = DEFAULT_EMOJIS.recipes[index % DEFAULT_EMOJIS.recipes.length];

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleRecipePress(recipe.id)}
      >
        <BlurView intensity={80} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconContainer}>
                <LinearGradient
                  colors={[colors.amber500, colors.orange600]}
                  style={styles.cardIconGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.cardIcon}>{emoji}</Text>
                </LinearGradient>
              </View>
              <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyText}>{difficultyLabel}</Text>
              </View>
            </View>

            <Text style={styles.cardTitle}>{translation.name}</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              {translation.description}
            </Text>

            <View style={styles.cardFooter}>
              <View style={styles.timeContainer}>
                <Ionicons name="time" size={16} color={colors.amber500} />
                <Text style={styles.timeText}>{duration}</Text>
              </View>
              <View style={styles.viewButton}>
                <Text style={styles.viewButtonText}>Ver receta</Text>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color={colors.amber500}
                />
              </View>
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  };

  const IngredientCard = ({
    ingredient,
    index,
  }: {
    ingredient: Ingredient;
    index: number;
  }) => {
    const language = getLanguageCode(currentLanguage);
    const translation = gastronomyService.getTranslation(ingredient.translations, language);

    if (!translation) return null;

    const season = gastronomyService.getHarvestSeason(
      ingredient.harvest_start_month,
      ingredient.harvest_end_month
    );
    const isInSeason = gastronomyService.isInSeason(
      ingredient.harvest_start_month,
      ingredient.harvest_start_day,
      ingredient.harvest_end_month,
      ingredient.harvest_end_day
    );
    const emoji = DEFAULT_EMOJIS.ingredients[index % DEFAULT_EMOJIS.ingredients.length];

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleIngredientPress(ingredient.id)}
      >
        <BlurView intensity={80} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconContainer}>
                <LinearGradient
                  colors={[colors.amber500, colors.orange600]}
                  style={styles.cardIconGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.cardIcon}>{emoji}</Text>
                </LinearGradient>
              </View>
              <View style={[styles.seasonBadge, isInSeason && styles.seasonBadgeActive]}>
                <Ionicons name="leaf" size={12} color={isInSeason ? colors.amber500 : colors.gray400} />
                <Text style={[styles.seasonText, isInSeason && styles.seasonTextActive]}>
                  {season}
                </Text>
              </View>
            </View>

            <Text style={styles.cardTitle}>{translation.name}</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              {translation.description}
            </Text>

            <View style={styles.learnMoreButton}>
              <Text style={styles.learnMoreText}>Más información</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.gray400} />
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  };

  const TechniqueCard = ({
    technique,
    index,
  }: {
    technique: Technique;
    index: number;
  }) => {
    const language = getLanguageCode(currentLanguage);
    const translation = gastronomyService.getTranslation(technique.translations, language);

    if (!translation) return null;

    const emoji = DEFAULT_EMOJIS.techniques[index % DEFAULT_EMOJIS.techniques.length];

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleTechniquePress(technique.id)}
      >
        <BlurView intensity={80} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconContainer}>
                <LinearGradient
                  colors={[colors.amber500, colors.orange600]}
                  style={styles.cardIconGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.cardIcon}>{emoji}</Text>
                </LinearGradient>
              </View>
            </View>

            <Text style={styles.cardTitle}>{translation.name}</Text>
            <Text style={styles.cardDescription} numberOfLines={3}>
              {translation.description}
            </Text>

            <View style={styles.cardFooter}>
              <Text style={styles.exploreFooterText}>Explorar técnica</Text>
              <Ionicons name="arrow-forward" size={14} color={colors.amber500} />
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  };

  const ToolCard = ({
    tool,
    index,
  }: {
    tool: Tool;
    index: number;
  }) => {
    const language = getLanguageCode(currentLanguage);
    const translation = gastronomyService.getTranslation(tool.translations, language);

    if (!translation) return null;

    const emoji = DEFAULT_EMOJIS.tools[index % DEFAULT_EMOJIS.tools.length];

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleToolPress(tool.id)}
      >
        <BlurView intensity={80} tint="dark" style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconContainer}>
                <LinearGradient
                  colors={[colors.amber500, colors.orange600]}
                  style={styles.cardIconGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.cardIcon}>{emoji}</Text>
                </LinearGradient>
              </View>
            </View>

            <Text style={styles.cardTitle}>{translation.name}</Text>
            <Text style={styles.cardDescription} numberOfLines={3}>
              {translation.description}
            </Text>

            <View style={styles.cardFooter}>
              <Text style={styles.exploreFooterText}>Ver herramienta</Text>
              <Ionicons name="arrow-forward" size={14} color={colors.amber500} />
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  };

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
        <View
          style={[
            styles.circle,
            styles.circle3,
            { backgroundColor: colors.amber600 },
          ]}
        />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🍽️ Gastronomía</Text>
          <Text style={styles.headerSubtitle}>
            Descubre la riqueza culinaria de Xiao Gourmet
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <BlurView intensity={80} tint="dark" style={styles.tabsBlur}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabsContent}
            >
              <TabButton tab="recipes" label="Recetas" icon="🍲" />
              <TabButton tab="ingredients" label="Ingredientes" icon="🌱" />
              <TabButton tab="techniques" label="Técnicas" icon="👨‍🍳" />
              <TabButton tab="tools" label="Herramientas" icon="🔪" />
            </ScrollView>
          </BlurView>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {activeTab === "recipes" && (
            <View style={styles.grid}>
              <Text style={styles.sectionTitle}>Recetas Tradicionales</Text>
              {loadingRecipes ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={colors.amber500} />
                  <Text style={styles.loadingText}>Cargando recetas...</Text>
                </View>
              ) : errorRecipes ? (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={48} color={colors.red400} />
                  <Text style={styles.errorText}>{errorRecipes}</Text>
                </View>
              ) : recipes.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No hay recetas disponibles</Text>
                </View>
              ) : (
                recipes.map((recipe, index) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                ))
              )}
            </View>
          )}

          {activeTab === "ingredients" && (
            <View style={styles.grid}>
              <Text style={styles.sectionTitle}>Ingredientes Locales</Text>
              {loadingIngredients ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={colors.amber500} />
                  <Text style={styles.loadingText}>Cargando ingredientes...</Text>
                </View>
              ) : errorIngredients ? (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={48} color={colors.red400} />
                  <Text style={styles.errorText}>{errorIngredients}</Text>
                </View>
              ) : ingredients.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No hay ingredientes disponibles</Text>
                </View>
              ) : (
                ingredients.map((ingredient, index) => (
                  <IngredientCard key={ingredient.id} ingredient={ingredient} index={index} />
                ))
              )}
            </View>
          )}

          {activeTab === "techniques" && (
            <View style={styles.grid}>
              <Text style={styles.sectionTitle}>Técnicas Culinarias</Text>
              {loadingTechniques ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={colors.amber500} />
                  <Text style={styles.loadingText}>Cargando técnicas...</Text>
                </View>
              ) : errorTechniques ? (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={48} color={colors.red400} />
                  <Text style={styles.errorText}>{errorTechniques}</Text>
                </View>
              ) : techniques.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No hay técnicas disponibles</Text>
                </View>
              ) : (
                techniques.map((technique, index) => (
                  <TechniqueCard key={technique.id} technique={technique} index={index} />
                ))
              )}
            </View>
          )}

          {activeTab === "tools" && (
            <View style={styles.grid}>
              <Text style={styles.sectionTitle}>Herramientas de Cocina</Text>
              {loadingTools ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={colors.amber500} />
                  <Text style={styles.loadingText}>Cargando herramientas...</Text>
                </View>
              ) : errorTools ? (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={48} color={colors.red400} />
                  <Text style={styles.errorText}>{errorTools}</Text>
                </View>
              ) : tools.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No hay herramientas disponibles</Text>
                </View>
              ) : (
                tools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))
              )}
            </View>
          )}
        </ScrollView>
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
    width: 350,
    height: 350,
    top: -100,
    right: -100,
    opacity: 0.2,
  },
  circle2: {
    width: 250,
    height: 250,
    bottom: -50,
    left: -50,
    opacity: 0.2,
  },
  circle3: {
    width: 180,
    height: 180,
    top: "40%",
    right: -75,
    opacity: 0.2,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.gray300,
    fontWeight: "600",
  },
  tabsContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  tabsBlur: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tabsContent: {
    padding: 4,
    gap: 8,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: colors.amber500,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.gray300,
  },
  tabLabelActive: {
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  grid: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 6,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardIconContainer: {},
  cardIconGradient: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  cardIcon: {
    fontSize: 28,
  },
  difficultyBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  seasonBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  seasonText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.gray400,
  },
  seasonBadgeActive: {
    backgroundColor: "rgba(245, 158, 11, 0.2)",
  },
  seasonTextActive: {
    color: colors.amber500,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.white,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.gray300,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray300,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.amber500,
  },
  learnMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  learnMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray300,
  },
  exploreFooterText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.amber500,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: colors.gray300,
    fontWeight: "600",
  },
  errorContainer: {
    paddingVertical: 40,
    alignItems: "center",
    gap: 12,
  },
  errorText: {
    fontSize: 14,
    color: colors.red400,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray400,
    fontWeight: "600",
  },
});
