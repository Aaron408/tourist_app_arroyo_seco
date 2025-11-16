import React, { useState, useEffect, useRef } from "react";
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
import { Video, ResizeMode } from "expo-av";
import { useLanguageStore } from "@/stores/languageStore";
import { gastronomyService, Recipe } from "@/services/gastronomyService";

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
  green500: "#10B981",
};

// Helper to convert language code to API format
const getLanguageCode = (lang: string): string => {
  return lang === 'es' ? 'es-MX' : 'en-US';
};

// Default emojis
const DEFAULT_EMOJI = '🍲';

export default function RecipeDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { currentLanguage } = useLanguageStore();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch recipe data
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!params.id) {
        setError('ID de receta no proporcionado');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const language = getLanguageCode(currentLanguage);
        const recipeId = parseInt(params.id, 10);
        const data = await gastronomyService.getRecipeById(recipeId, language);
        setRecipe(data);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('No se pudo cargar la receta');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params.id, currentLanguage]);

  const handleBack = () => {
    router.back();
  };

  // Handle reference navigation
  const handleReferencePress = (type: 'ingredient' | 'technique' | 'tool', id: number) => {
    if (type === 'technique') {
      router.push({
        pathname: '/screens/technique-detail',
        params: { id: id.toString() },
      });
    } else if (type === 'tool') {
      router.push({
        pathname: '/screens/tool-detail',
        params: { id: id.toString() },
      });
    }
    // For ingredients, we could add navigation later if needed
  };

  // Render step description with clickable references
  const renderStepDescription = (description: string) => {
    const segments = gastronomyService.parseStepSegments(description);

    return (
      <Text style={styles.stepDescription}>
        {segments.map((segment, index) => {
          if (segment.isReference && segment.referenceType && segment.referenceId) {
            return (
              <Text
                key={index}
                style={styles.stepReference}
                onPress={() => handleReferencePress(segment.referenceType!, segment.referenceId!)}
              >
                {segment.text}
              </Text>
            );
          }
          return <Text key={index}>{segment.text}</Text>;
        })}
      </Text>
    );
  };

  // Get translated data
  const language = getLanguageCode(currentLanguage);
  const translation = recipe ? gastronomyService.getTranslation(recipe.translations, language) : null;
  const difficultyLabel = recipe ? gastronomyService.getDifficultyLabel(recipe.difficulty) : '';
  const duration = recipe ? gastronomyService.formatDuration(recipe.duration) : '';

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
            <Text style={styles.loadingText}>Cargando receta...</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Error state
  if (error || !recipe || !translation) {
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
              {error || 'No se pudo cargar la receta'}
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
        <View
          style={[
            styles.circle,
            styles.circle3,
            { backgroundColor: colors.amber600 },
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
          {/* Hero Section - Directly on gradient */}
          <View style={styles.heroSection}>
            {/* Emoji Icon */}
            <View style={styles.emojiContainer}>
              <Text style={styles.heroEmoji}>{DEFAULT_EMOJI}</Text>
            </View>

            {/* Title */}
            <Text style={styles.recipeTitle}>{translation.name}</Text>

            {/* Meta Row */}
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="bar-chart-outline" size={16} color="rgba(255,255,255,0.9)" />
                <Text style={styles.metaText}>{difficultyLabel}</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.9)" />
                <Text style={styles.metaText}>{duration}</Text>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description}>{translation.description}</Text>
          </View>

          {/* Video Section - Only if available */}
          {recipe.multimedia && recipe.multimedia.filter((m) => m.type === 'video').length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="play-circle" size={20} color={colors.amber500} />
                <Text style={styles.sectionTitle}>Video Tutorial</Text>
              </View>
              <View style={styles.videoWrapper}>
                <Video
                  ref={videoRef}
                  source={{
                    uri: recipe.multimedia.filter((m) => m.type === 'video')[0].url
                  }}
                  style={styles.video}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  onPlaybackStatusUpdate={(status) => {
                    if ('isPlaying' in status) {
                      setIsPlaying(status.isPlaying);
                    }
                  }}
                />
              </View>
            </View>
          )}

          {/* Ingredients Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="restaurant" size={20} color={colors.amber500} />
              <Text style={styles.sectionTitle}>Ingredientes</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{recipe.ingredients?.length || 0}</Text>
              </View>
            </View>

            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              <View style={styles.ingredientsList}>
                {recipe.ingredients.map((ingredient, index) => {
                  const ingredientTranslation = gastronomyService.getTranslation(
                    ingredient.translations,
                    language
                  );
                  if (!ingredientTranslation) return null;

                  return (
                    <View key={ingredient.id} style={styles.ingredientRow}>
                      <Text style={styles.ingredientName}>{ingredientTranslation.name}</Text>
                      <Text style={styles.ingredientAmount}>
                        {ingredient.RecipeIngredient.quantity} {ingredient.unit}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.emptyText}>No hay ingredientes disponibles</Text>
            )}
          </View>

          {/* Steps Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="list" size={20} color={colors.amber500} />
              <Text style={styles.sectionTitle}>Preparación</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {currentStep + 1}/{recipe.steps?.length || 0}
                </Text>
              </View>
            </View>

            {recipe.steps && recipe.steps.length > 0 ? (
              <>
                {/* Current Step Card */}
                <View style={styles.currentStepCard}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>
                      {recipe.steps[currentStep].step_number}
                    </Text>
                  </View>
                  {renderStepDescription(
                    gastronomyService.getTranslation(
                      recipe.steps[currentStep].translations,
                      language
                    )?.description || ''
                  )}
                </View>

                {/* Navigation */}
                <View style={styles.stepNavigation}>
                  <TouchableOpacity
                    style={[
                      styles.stepNavButton,
                      currentStep === 0 && styles.stepNavButtonDisabled,
                    ]}
                    onPress={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 0}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={18}
                      color={currentStep === 0 ? colors.gray500 : colors.white}
                    />
                    <Text
                      style={[
                        styles.stepNavText,
                        currentStep === 0 && styles.stepNavTextDisabled,
                      ]}
                    >
                      Anterior
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.stepDots}>
                    {recipe.steps.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.stepDot,
                          index === currentStep && styles.stepDotActive,
                          index < currentStep && styles.stepDotCompleted,
                        ]}
                      />
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.stepNavButton,
                      currentStep === recipe.steps.length - 1 && styles.stepNavButtonDisabled,
                    ]}
                    onPress={() =>
                      currentStep < recipe.steps.length - 1 && setCurrentStep(currentStep + 1)
                    }
                    disabled={currentStep === recipe.steps.length - 1}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.stepNavText,
                        currentStep === recipe.steps.length - 1 && styles.stepNavTextDisabled,
                      ]}
                    >
                      Siguiente
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={
                        currentStep === recipe.steps.length - 1 ? colors.gray500 : colors.white
                      }
                    />
                  </TouchableOpacity>
                </View>

                {/* All Steps List */}
                <View style={styles.allStepsList}>
                  <Text style={styles.allStepsLabel}>Todos los pasos:</Text>
                  {recipe.steps.map((step, index) => {
                    const stepTranslation = gastronomyService.getTranslation(
                      step.translations,
                      language
                    );
                    if (!stepTranslation) return null;

                    return (
                      <TouchableOpacity
                        key={step.id}
                        style={[
                          styles.stepListItem,
                          index === currentStep && styles.stepListItemActive,
                        ]}
                        onPress={() => setCurrentStep(index)}
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            styles.stepListNumber,
                            index === currentStep && styles.stepListNumberActive,
                            index < currentStep && styles.stepListNumberCompleted,
                          ]}
                        >
                          <Text style={styles.stepListNumberText}>
                            {index < currentStep ? '✓' : step.step_number}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.stepListText,
                            index === currentStep && styles.stepListTextActive,
                          ]}
                          numberOfLines={2}
                        >
                          {gastronomyService.getPlainTextFromStep(stepTranslation.description)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            ) : (
              <Text style={styles.emptyText}>No hay pasos de preparación disponibles</Text>
            )}
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Bar to Cover Phone Icons */}
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
  circle3: {
    width: 180,
    height: 180,
    top: "40%",
    right: -75,
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
  recipeTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.white,
    textAlign: "center",
    marginBottom: 6,
  },
  recipeRegion: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray300,
    marginBottom: 12,
  },
  metaTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    marginBottom: 14,
  },
  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  metaText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.white,
  },
  recipeDescription: {
    fontSize: 14,
    color: colors.gray300,
    lineHeight: 20,
    textAlign: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  smallButton: {},
  smallButtonGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  countBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  countText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.amber500,
  },
  videoPlaceholder: {
    padding: 40,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderStyle: "dashed",
  },
  videoPlaceholderText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginTop: 12,
    marginBottom: 4,
  },
  videoNote: {
    fontSize: 13,
    color: colors.gray400,
  },
  videoContainer: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  video: {
    width: "100%",
    height: 200,
    backgroundColor: colors.gray900,
  },
  videoCaption: {
    fontSize: 12,
    color: colors.gray300,
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  ingredientsList: {
    gap: 10,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.amber500,
    marginTop: 6,
    marginRight: 10,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  ingredientNotes: {
    fontSize: 12,
    color: colors.gray400,
  },
  stepsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  progressBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  progressText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.amber500,
  },
  currentStep: {
    marginBottom: 16,
    borderRadius: 14,
    overflow: "hidden",
  },
  stepGradient: {
    padding: 16,
  },
  stepContent: {},
  stepTop: {
    flexDirection: "row",
    marginBottom: 10,
  },
  stepNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.white,
  },
  stepTitleContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 2,
  },
  stepTimeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  stepTime: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
  },
  stepDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 20,
    marginBottom: 10,
  },
  stepReference: {
    color: colors.amber500,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  tipsBox: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 10,
    borderRadius: 8,
    gap: 6,
    alignItems: "flex-start",
  },
  tipsText: {
    flex: 1,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 18,
  },
  navigationContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },
  navButtonTextDisabled: {
    color: colors.gray500,
  },
  stepIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 16,
  },
  stepIndicator: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  stepIndicatorActive: {
    width: 20,
    backgroundColor: colors.amber500,
  },
  stepIndicatorCompleted: {
    backgroundColor: colors.green500,
  },
  allStepsContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  allStepsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray400,
    marginBottom: 10,
  },
  miniStep: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  miniStepActive: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  miniStepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  miniStepNumberActive: {
    backgroundColor: colors.amber500,
  },
  miniStepNumberCompleted: {
    backgroundColor: colors.green500,
  },
  miniStepNumberText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  miniStepTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: colors.gray300,
  },
  miniStepTitleActive: {
    color: colors.white,
    fontWeight: "600",
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
  emptyText: {
    fontSize: 14,
    color: colors.gray400,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 20,
  },
  // New Section Styles
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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
    flex: 1,
  },
  badge: {
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.amber500,
  },
  // Hero Styles
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
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 12,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaDivider: {
    width: 1,
    height: 16,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  description: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: 21,
    textAlign: "center",
  },
  // Video Styles
  videoWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  // Ingredients Styles
  ingredientsList: {
    gap: 8,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.amber500,
  },
  ingredientName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
    flex: 1,
  },
  ingredientAmount: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.amber500,
  },
  // Steps Styles
  currentStepCard: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "rgba(245, 158, 11, 0.5)",
    marginBottom: 16,
  },
  stepNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.amber500,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.white,
  },
  stepNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  stepNavButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  stepNavButtonDisabled: {
    opacity: 0.3,
  },
  stepNavText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.white,
  },
  stepNavTextDisabled: {
    color: colors.gray500,
  },
  stepDots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    justifyContent: "center",
  },
  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  stepDotActive: {
    width: 18,
    backgroundColor: colors.amber500,
  },
  stepDotCompleted: {
    backgroundColor: colors.green500,
  },
  allStepsList: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  allStepsLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.gray400,
    marginBottom: 8,
  },
  stepListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  stepListItemActive: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderWidth: 2,
    borderColor: "rgba(245, 158, 11, 0.5)",
  },
  stepListNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  stepListNumberActive: {
    backgroundColor: colors.amber500,
  },
  stepListNumberCompleted: {
    backgroundColor: colors.green500,
  },
  stepListNumberText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.white,
  },
  stepListText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
    color: colors.gray300,
  },
  stepListTextActive: {
    color: colors.white,
    fontWeight: "600",
  },
});
