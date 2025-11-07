import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

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

type TabType = "recipes" | "ingredients" | "techniques";

const mockRecipes = [
  {
    id: 1,
    title: "Mole Queretano",
    description: "Receta tradicional de mole con ingredientes locales",
    difficulty: "Intermedio",
    time: "3 horas",
    icon: "🍲",
  },
  {
    id: 2,
    title: "Gorditas de Frijol",
    description: "Antojito tradicional hecho con masa de maíz",
    difficulty: "Fácil",
    time: "45 min",
    icon: "🫔",
  },
  {
    id: 3,
    title: "Atole de Pinole",
    description: "Bebida caliente preparada con maíz tostado",
    difficulty: "Fácil",
    time: "30 min",
    icon: "☕",
  },
];

const mockIngredients = [
  {
    id: 1,
    name: "Chile Serrano",
    description: "Chile picante cultivado en la región",
    season: "Todo el año",
    icon: "🌶️",
  },
  {
    id: 2,
    name: "Maíz Criollo",
    description: "Variedad local de maíz tradicional",
    season: "Agosto - Octubre",
    icon: "🌽",
  },
  {
    id: 3,
    name: "Nopal",
    description: "Cactus comestible rico en fibra",
    season: "Primavera",
    icon: "🌵",
  },
  {
    id: 4,
    name: "Frijol Negro",
    description: "Leguminosa básica en la dieta regional",
    season: "Julio - Septiembre",
    icon: "🫘",
  },
];

const mockTechniques = [
  {
    id: 1,
    name: "Nixtamalización",
    description: "Proceso ancestral de preparación del maíz",
    difficulty: "Avanzado",
    icon: "🫕",
  },
  {
    id: 2,
    name: "Molienda en Metate",
    description: "Técnica tradicional para moler ingredientes",
    difficulty: "Intermedio",
    icon: "🪨",
  },
  {
    id: 3,
    name: "Cocción en Comal",
    description: "Método de cocción sobre superficie caliente",
    difficulty: "Fácil",
    icon: "🔥",
  },
];

export default function GastronomyScreen() {
  const params = useLocalSearchParams<{ initialTab?: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("recipes");
  const router = useRouter();

  // Set initial tab from navigation params
  useEffect(() => {
    if (params.initialTab && 
        (params.initialTab === "recipes" || params.initialTab === "ingredients" || params.initialTab === "techniques")) {
      setActiveTab(params.initialTab as TabType);
    }
  }, [params.initialTab]);

  const handleRecipePress = (recipeId: number) => {
    router.push({
      pathname: '/screens/recipe-detail',
      params: { id: recipeId.toString() },
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

  const RecipeCard = ({ recipe }: { recipe: (typeof mockRecipes)[0] }) => (
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
                <Text style={styles.cardIcon}>{recipe.icon}</Text>
              </LinearGradient>
            </View>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>{recipe.title}</Text>
          <Text style={styles.cardDescription}>{recipe.description}</Text>

          <View style={styles.cardFooter}>
            <View style={styles.timeContainer}>
              <Ionicons name="time" size={16} color={colors.amber500} />
              <Text style={styles.timeText}>{recipe.time}</Text>
            </View>
            <TouchableOpacity 
              style={styles.viewButton} 
              activeOpacity={0.8}
              onPress={() => handleRecipePress(recipe.id)}
            >
              <Text style={styles.viewButtonText}>Ver receta</Text>
              <Ionicons
                name="arrow-forward"
                size={14}
                color={colors.amber500}
              />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  const IngredientCard = ({
    ingredient,
  }: {
    ingredient: (typeof mockIngredients)[0];
  }) => (
    <TouchableOpacity activeOpacity={0.9}>
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
                <Text style={styles.cardIcon}>{ingredient.icon}</Text>
              </LinearGradient>
            </View>
            <View style={styles.seasonBadge}>
              <Ionicons name="leaf" size={12} color={colors.amber500} />
              <Text style={styles.seasonText}>{ingredient.season}</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>{ingredient.name}</Text>
          <Text style={styles.cardDescription}>{ingredient.description}</Text>

          <TouchableOpacity style={styles.learnMoreButton} activeOpacity={0.8}>
            <Text style={styles.learnMoreText}>Más información</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.gray400} />
          </TouchableOpacity>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  const TechniqueCard = ({
    technique,
  }: {
    technique: (typeof mockTechniques)[0];
  }) => (
    <TouchableOpacity activeOpacity={0.9}>
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
                <Text style={styles.cardIcon}>{technique.icon}</Text>
              </LinearGradient>
            </View>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{technique.difficulty}</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>{technique.name}</Text>
          <Text style={styles.cardDescription}>{technique.description}</Text>

          <TouchableOpacity style={styles.exploreButton} activeOpacity={0.9}>
            <LinearGradient
              colors={[colors.amber600, colors.orange600]}
              style={styles.exploreGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.exploreText}>Explorar técnica</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

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
              {mockRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </View>
          )}

          {activeTab === "ingredients" && (
            <View style={styles.grid}>
              <Text style={styles.sectionTitle}>Ingredientes Locales</Text>
              {mockIngredients.map((ingredient) => (
                <IngredientCard key={ingredient.id} ingredient={ingredient} />
              ))}
            </View>
          )}

          {activeTab === "techniques" && (
            <View style={styles.grid}>
              <Text style={styles.sectionTitle}>Técnicas Culinarias</Text>
              {mockTechniques.map((technique) => (
                <TechniqueCard key={technique.id} technique={technique} />
              ))}
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
    color: colors.gray400,
    fontWeight: "600",
  },
  tabsContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
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
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 8,
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
    color: colors.amber500,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.white,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: colors.gray300,
    lineHeight: 22,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
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
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  learnMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray300,
  },
  exploreButton: {
    marginTop: 8,
  },
  exploreGradient: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  exploreText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
});
