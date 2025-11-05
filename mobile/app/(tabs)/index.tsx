import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLanguage } from "@/contexts/languageProvider";

const { width } = Dimensions.get("window");

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
};

const sections = [
  {
    id: "recipes",
    title: "Recetas Tradicionales",
    icon: "🍲",
    description: "Descubre los sabores auténticos de Arroyo Seco",
    route: "recipes",
  },
  {
    id: "gastronomy",
    title: "Ingredientes Indígenas",
    icon: "🌱",
    description: "Catálogo de ingredientes locales y sus propiedades",
    route: "gastronomy",
  },
  {
    id: "restaurants",
    title: "Ruta del Sabor",
    icon: "🍽️",
    description: "Restaurantes tradicionales de la región",
    route: "restaurants",
  },
  {
    id: "workshops",
    title: "Técnicas Culinarias",
    icon: "👨‍🍳",
    description: "Métodos ancestrales de preparación",
    route: "workshops",
  },
];

const stats = [
  { label: "Recetas", value: "25+", icon: "📖" },
  { label: "Ingredientes", value: "50+", icon: "🌿" },
  { label: "Restaurantes", value: "15", icon: "🏪" },
  { label: "Técnicas", value: "12", icon: "⚡" },
];

export default function HomeScreen() {
  const router = useRouter();
  const { t, isLoading } = useLanguage();

  // Return loading state if translations aren't ready
  if (isLoading || !t.index) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.amber600, colors.orange600, colors.orange700]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.white, fontSize: 18 }}>Cargando...</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  const sections = [
    {
      id: "recipes",
      title: t.index.modules.recipes.title,
      icon: "🍲",
      description: t.index.modules.recipes.description,
      route: "gastronomy",
      params: { initialTab: "recipes" },
    },
    {
      id: "gastronomy",
      title: t.index.modules.ingredients.title,
      icon: "🌱",
      description: t.index.modules.ingredients.description,
      route: "gastronomy",
      params: { initialTab: "ingredients" },
    },
    {
      id: "restaurants",
      title: t.index.modules.restaurants.title,
      icon: "🍽️",
      description: t.index.modules.restaurants.description,
      route: "explore",
      params: { initialView: "map" },
    },
    {
      id: "workshops",
      title: t.index.modules.techniques.title,
      icon: "👨‍🍳",
      description: t.index.modules.techniques.description,
      route: "gastronomy",
      params: { initialTab: "techniques" },
    },
  ];

  const stats = [
    { label: t.index.stats.recipes, value: "25+", icon: "📖" },
    { label: t.index.stats.ingredients, value: "50+", icon: "🌿" },
    { label: t.index.stats.restaurants, value: "15", icon: "🏪" },
    { label: t.index.stats.techniques, value: "12", icon: "⚡" },
  ];

  const navigateToSection = (route: string, params?: { initialTab?: string; initialView?: string }) => {
    if (params) {
      router.push({
        pathname: `/(tabs)/${route}` as any,
        params: params,
      });
    } else {
      router.push(`/(tabs)/${route}` as any);
    }
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

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={[colors.amber500, colors.orange600]}
                style={styles.logoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.logoEmoji}>🏛️</Text>
              </LinearGradient>
            </View>
            <Text style={styles.title}>{t.index.title}</Text>
            <Text style={styles.subtitle}>{t.index.subtitle}</Text>
            <View style={styles.divider} />
          </View>

          {/* Stats Cards */}
          <BlurView intensity={80} tint="dark" style={styles.statsContainer}>
            <View style={styles.statsContent}>
              <Text style={styles.sectionTitle}>{t.index.contentAvailable}</Text>
              <View style={styles.statsGrid}>
                {stats.map((stat, index) => (
                  <View key={index} style={styles.statCard}>
                    <Text style={styles.statIcon}>{stat.icon}</Text>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </BlurView>

          {/* Modules Section */}
          <View style={styles.modulesSection}>
            <Text style={styles.modulesTitle}>{t.index.exploreModules}</Text>
            {sections.map((section) => (
              <TouchableOpacity
                key={section.id}
                activeOpacity={0.9}
                onPress={() => navigateToSection(section.route, section.params)}
              >
                <BlurView intensity={80} tint="dark" style={styles.moduleCard}>
                  <View style={styles.moduleContent}>
                    <View style={styles.moduleIconContainer}>
                      <LinearGradient
                        colors={[colors.amber500, colors.orange600]}
                        style={styles.moduleIconGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Text style={styles.moduleIcon}>{section.icon}</Text>
                      </LinearGradient>
                    </View>
                    <View style={styles.moduleTextContainer}>
                      <Text style={styles.moduleTitle}>{section.title}</Text>
                      <Text style={styles.moduleDescription}>
                        {section.description}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color={colors.amber500}
                      style={styles.moduleArrow}
                    />
                  </View>
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>

          {/* CTA Button */}
          <TouchableOpacity 
            activeOpacity={0.9} 
            style={styles.ctaContainer}
            onPress={() => navigateToSection("explore", { initialView: "list" })}
          >
            <LinearGradient
              colors={[colors.amber600, colors.orange600]}
              style={styles.ctaButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.ctaIconContainer}>
                <Text style={styles.ctaEmoji}>🧭</Text>
              </View>
              <Text style={styles.ctaText}>{t.index.startExploring}</Text>
              <Ionicons
                name="arrow-forward"
                size={24}
                color={colors.white}
                style={styles.ctaArrow}
              />
            </LinearGradient>
          </TouchableOpacity>
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
    bottom: 100,
    left: -50,
    opacity: 0.2,
  },
  circle3: {
    width: 180,
    height: 180,
    top: "50%",
    right: -75,
    opacity: 0.2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: colors.amber500,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  logoEmoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.white,
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray300,
    textAlign: "center",
    fontWeight: "600",
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: colors.amber500,
    borderRadius: 2,
    marginTop: 16,
  },
  statsContainer: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 24,
  },
  statsContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 16,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  statCard: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.amber500,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray300,
    textAlign: "center",
    fontWeight: "600",
  },
  modulesSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  modulesTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 16,
  },
  moduleCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 12,
  },
  moduleContent: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  moduleIconContainer: {
    marginRight: 16,
  },
  moduleIconGradient: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  moduleIcon: {
    fontSize: 28,
  },
  moduleTextContainer: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: colors.gray300,
    lineHeight: 18,
  },
  moduleArrow: {
    marginLeft: 8,
  },
  infoCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 24,
  },
  infoContent: {
    padding: 24,
    alignItems: "center",
  },
  infoIconContainer: {
    marginBottom: 16,
  },
  infoIconGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  infoIcon: {
    fontSize: 32,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 12,
    textAlign: "center",
  },
  infoDescription: {
    fontSize: 15,
    color: colors.gray300,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  featuresContainer: {
    width: "100%",
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 15,
    color: colors.gray300,
    fontWeight: "600",
  },
  ctaContainer: {
    paddingHorizontal: 24,
  },
  ctaButton: {
    height: 64,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.amber500,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  ctaIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  ctaEmoji: {
    fontSize: 22,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.5,
  },
  ctaArrow: {
    marginLeft: 8,
  },
});