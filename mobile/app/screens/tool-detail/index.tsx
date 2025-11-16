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
import { gastronomyService, Tool } from "@/services/gastronomyService";

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

// Helper to convert language code to API format
const getLanguageCode = (lang: string): string => {
  return lang === 'es' ? 'es-MX' : 'en-US';
};

// Default emoji
const DEFAULT_EMOJI = '🔪';

export default function ToolDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { currentLanguage } = useLanguageStore();

  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tool data
  useEffect(() => {
    const fetchTool = async () => {
      if (!params.id) {
        setError('ID de herramienta no proporcionado');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const language = getLanguageCode(currentLanguage);
        const toolId = parseInt(params.id, 10);
        const data = await gastronomyService.getToolById(toolId, language);
        setTool(data);
      } catch (err) {
        console.error('Error fetching tool:', err);
        setError('No se pudo cargar la herramienta');
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [params.id, currentLanguage]);

  const handleBack = () => {
    router.back();
  };

  // Get translated data
  const language = getLanguageCode(currentLanguage);
  const translation = tool ? gastronomyService.getTranslation(tool.translations, language) : null;

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient
          colors={[colors.amber600, colors.orange600, colors.orange700]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.white} />
            <Text style={styles.loadingText}>Cargando herramienta...</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Error state
  if (error || !tool || !translation) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient
          colors={[colors.amber600, colors.orange600, colors.orange700]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.backButtonContainer}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={handleBack}
            >
              <BlurView intensity={80} tint="dark" style={styles.backButtonBlur}>
                <Ionicons name="arrow-back" size={24} color={colors.white} />
              </BlurView>
            </TouchableOpacity>
          </View>
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={64} color={colors.red400} />
            <Text style={styles.errorText}>
              {error || 'No se pudo cargar la herramienta'}
            </Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => {
                setLoading(true);
                setError(null);
              }}
              activeOpacity={0.9}
            >
              <BlurView intensity={80} tint="dark" style={styles.retryButtonBlur}>
                <Text style={styles.retryButtonText}>Reintentar</Text>
              </BlurView>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

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

        {/* Fixed Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={handleBack}
          >
            <BlurView intensity={80} tint="dark" style={styles.backButtonBlur}>
              <Ionicons name="arrow-back" size={24} color={colors.white} />
            </BlurView>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            {/* Icon */}
            <View style={styles.emojiContainer}>
              <Text style={styles.heroEmoji}>{DEFAULT_EMOJI}</Text>
            </View>

            {/* Title */}
            <Text style={styles.toolTitle}>{translation.name}</Text>
            <Text style={styles.toolBadge}>🔧 Herramienta de Cocina</Text>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>📝 Descripción</Text>
            </View>
            <Text style={styles.descriptionText}>{translation.description}</Text>
          </View>

          {/* Banner Image if available */}
          {tool.banner_image && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>🖼️ Imagen de Referencia</Text>
              </View>
              <Text style={styles.imageNote}>
                URL: {tool.banner_image}
              </Text>
            </View>
          )}

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Bar */}
        <View style={styles.bottomBarContainer}>
          <BlurView intensity={90} tint="dark" style={styles.bottomBar} />
        </View>
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
  backButtonContainer: {
    position: "absolute",
    top: 60,
    left: 24,
    zIndex: 10,
  },
  backButton: {},
  backButtonBlur: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  scrollContent: {
    paddingTop: 50,
  },
  heroSection: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
  },
  emojiContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  heroCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  heroContent: {
    padding: 20,
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 16,
  },
  imageGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  heroEmoji: {
    fontSize: 48,
  },
  toolTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.white,
    textAlign: "center",
    marginBottom: 6,
  },
  toolBadge: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray300,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.gray300,
    lineHeight: 21,
  },
  imageNote: {
    fontSize: 14,
    color: colors.gray400,
    fontStyle: "italic",
  },
  bottomSpacing: {
    height: 30,
  },
  bottomBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomBar: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
  },
  retryButtonBlur: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  retryButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
});
