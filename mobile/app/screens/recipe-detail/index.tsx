import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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

// Mock data
const recipeData = {
  id: 1,
  title: "Mole Queretano",
  emoji: "🍲",
  description:
    "Receta tradicional de mole con ingredientes locales de Querétaro que ha sido transmitida por generaciones",
  difficulty: "Intermedio",
  time: "3 horas",
  servings: "6-8 personas",
  region: "Xiao Gourmet",
  imageUrl:
    "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800",
  ingredients: [
    {
      name: "Chiles guajillo",
      amount: "8 piezas",
      notes: "Desvenados y sin semillas",
    },
    {
      name: "Chiles ancho",
      amount: "4 piezas",
      notes: "Desvenados y sin semillas",
    },
    { name: "Jitomate", amount: "2 piezas grandes", notes: "Maduros" },
    {
      name: "Cebolla blanca",
      amount: "1/2 pieza",
      notes: "Cortada en cuartos",
    },
    { name: "Ajo", amount: "4 dientes", notes: "Pelados" },
    { name: "Almendras", amount: "1/2 taza", notes: "Peladas" },
    { name: "Chocolate de mesa", amount: "2 tablillas", notes: "Rallado" },
    { name: "Canela", amount: "1 rama", notes: "Entera" },
  ],
  steps: [
    {
      step: 1,
      title: "Preparar los chiles",
      description:
        "Tostar los chiles en un comal caliente por 2-3 minutos de cada lado. Remojar en agua caliente por 20 minutos.",
      time: "25 minutos",
      tips: "No dejes que se quemen los chiles, solo que cambien ligeramente de color.",
    },
    {
      step: 2,
      title: "Tostar especias y frutos secos",
      description:
        "En el mismo comal, tostar las almendras, cacahuates, ajonjolí, canela, pimienta y clavo hasta que estén dorados.",
      time: "10 minutos",
      tips: "Tuesta cada ingrediente por separado para controlar el punto exacto.",
    },
    {
      step: 3,
      title: "Asar vegetales",
      description:
        "Asar los jitomates, cebolla y ajo en el comal hasta que estén suaves y ligeramente quemados.",
      time: "15 minutos",
      tips: "La piel quemada aporta un sabor ahumado característico.",
    },
    {
      step: 4,
      title: "Licuar y cocinar",
      description:
        "Licuar todos los ingredientes y cocinar a fuego lento durante 30 minutos, agregando el chocolate al final.",
      time: "35 minutos",
      tips: "Revuelve constantemente para evitar que se pegue.",
    },
  ],
};

export default function RecipeDetailScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const recipe = recipeData;

  const handleBack = () => {
    router.back();
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
          {/* Hero Image Section */}
          <View style={styles.heroSection}>
            <BlurView intensity={90} tint="dark" style={styles.heroCard}>
              <View style={styles.heroContent}>
                {/* Image or Emoji */}
                <View style={styles.imageContainer}>
                  <LinearGradient
                    colors={[colors.amber500, colors.orange600]}
                    style={styles.imageGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.heroEmoji}>{recipe.emoji}</Text>
                  </LinearGradient>
                </View>

                {/* Title and Meta */}
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeRegion}>📍 {recipe.region}</Text>

                {/* Meta Badges */}
                <View style={styles.metaTags}>
                  <View style={styles.metaBadge}>
                    <Ionicons
                      name="bar-chart"
                      size={14}
                      color={colors.amber500}
                    />
                    <Text style={styles.metaText}>{recipe.difficulty}</Text>
                  </View>
                  <View style={styles.metaBadge}>
                    <Ionicons name="time" size={14} color={colors.amber500} />
                    <Text style={styles.metaText}>{recipe.time}</Text>
                  </View>
                </View>

                {/* Description */}
                <Text style={styles.recipeDescription}>
                  {recipe.description}
                </Text>
              </View>
            </BlurView>
          </View>

          {/* Video Section */}
          <BlurView intensity={80} tint="dark" style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>🎥 Video Tutorial</Text>
                <TouchableOpacity
                  style={styles.smallButton}
                  onPress={() => setShowVideo(!showVideo)}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={[colors.amber600, colors.orange600]}
                    style={styles.smallButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Ionicons
                      name={showVideo ? "eye-off" : "play"}
                      size={14}
                      color={colors.white}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {showVideo && (
                <View style={styles.videoPlaceholder}>
                  <Ionicons name="videocam" size={48} color={colors.amber500} />
                  <Text style={styles.videoPlaceholderText}>
                    Video: {recipe.title}
                  </Text>
                  <Text style={styles.videoNote}>Próximamente disponible</Text>
                </View>
              )}
            </View>
          </BlurView>

          {/* Ingredients Section */}
          <BlurView intensity={80} tint="dark" style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>🥄 Ingredientes</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>
                    {recipe.ingredients.length}
                  </Text>
                </View>
              </View>

              <View style={styles.ingredientsList}>
                {recipe.ingredients.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientItem}>
                    <View style={styles.ingredientDot} />
                    <View style={styles.ingredientInfo}>
                      <View style={styles.ingredientHeader}>
                        <Text style={styles.ingredientName}>
                          {ingredient.name}
                        </Text>
                        <View style={styles.amountBadge}>
                          <Text style={styles.ingredientAmount}>
                            {ingredient.amount}
                          </Text>
                        </View>
                      </View>
                      {ingredient.notes && (
                        <Text style={styles.ingredientNotes}>
                          {ingredient.notes}
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </BlurView>

          {/* Steps Section */}
          <BlurView intensity={80} tint="dark" style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.stepsHeader}>
                <Text style={styles.cardTitle}>👨‍🍳 Preparación</Text>
                <View style={styles.progressBadge}>
                  <Text style={styles.progressText}>
                    {currentStep + 1}/{recipe.steps.length}
                  </Text>
                </View>
              </View>

              {/* Current Step - Highlighted */}
              <View style={styles.currentStep}>
                <LinearGradient
                  colors={[colors.amber500, colors.orange600]}
                  style={styles.stepGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View style={styles.stepContent}>
                    <View style={styles.stepTop}>
                      <View style={styles.stepNumberContainer}>
                        <Text style={styles.stepNumber}>
                          {recipe.steps[currentStep].step}
                        </Text>
                      </View>
                      <View style={styles.stepTitleContainer}>
                        <Text style={styles.stepTitle}>
                          {recipe.steps[currentStep].title}
                        </Text>
                        <View style={styles.stepTimeBadge}>
                          <Ionicons
                            name="time"
                            size={12}
                            color={colors.white}
                          />
                          <Text style={styles.stepTime}>
                            {recipe.steps[currentStep].time}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <Text style={styles.stepDescription}>
                      {recipe.steps[currentStep].description}
                    </Text>

                    {recipe.steps[currentStep].tips && (
                      <View style={styles.tipsBox}>
                        <Ionicons name="bulb" size={16} color={colors.white} />
                        <Text style={styles.tipsText}>
                          {recipe.steps[currentStep].tips}
                        </Text>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </View>

              {/* Navigation */}
              <View style={styles.navigationContainer}>
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    currentStep === 0 && styles.navButtonDisabled,
                  ]}
                  onPress={() =>
                    currentStep > 0 && setCurrentStep(currentStep - 1)
                  }
                  disabled={currentStep === 0}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="chevron-back"
                    size={20}
                    color={currentStep === 0 ? colors.gray500 : colors.white}
                  />
                  <Text
                    style={[
                      styles.navButtonText,
                      currentStep === 0 && styles.navButtonTextDisabled,
                    ]}
                  >
                    Anterior
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.navButton,
                    currentStep === recipe.steps.length - 1 &&
                      styles.navButtonDisabled,
                  ]}
                  onPress={() =>
                    currentStep < recipe.steps.length - 1 &&
                    setCurrentStep(currentStep + 1)
                  }
                  disabled={currentStep === recipe.steps.length - 1}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.navButtonText,
                      currentStep === recipe.steps.length - 1 &&
                        styles.navButtonTextDisabled,
                    ]}
                  >
                    Siguiente
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={
                      currentStep === recipe.steps.length - 1
                        ? colors.gray500
                        : colors.white
                    }
                  />
                </TouchableOpacity>
              </View>

              {/* Step Indicators */}
              <View style={styles.stepIndicators}>
                {recipe.steps.map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.stepIndicator,
                      index === currentStep && styles.stepIndicatorActive,
                      index < currentStep && styles.stepIndicatorCompleted,
                    ]}
                    onPress={() => setCurrentStep(index)}
                    activeOpacity={0.7}
                  />
                ))}
              </View>

              {/* All Steps Overview - Collapsed */}
              <View style={styles.allStepsContainer}>
                <Text style={styles.allStepsTitle}>Todos los pasos:</Text>
                {recipe.steps.map((step, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.miniStep,
                      index === currentStep && styles.miniStepActive,
                    ]}
                    onPress={() => setCurrentStep(index)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.miniStepNumber,
                        index === currentStep && styles.miniStepNumberActive,
                        index < currentStep && styles.miniStepNumberCompleted,
                      ]}
                    >
                      <Text style={styles.miniStepNumberText}>
                        {index < currentStep ? "✓" : step.step}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.miniStepTitle,
                        index === currentStep && styles.miniStepTitleActive,
                      ]}
                    >
                      {step.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </BlurView>

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
    paddingTop: 60,
  },
  heroSection: {
    padding: 24,
    paddingTop: 40,
  },
  heroCard: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  heroContent: {
    padding: 24,
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 20,
  },
  imageGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  heroEmoji: {
    fontSize: 56,
  },
  recipeTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.white,
    textAlign: "center",
    marginBottom: 8,
  },
  recipeRegion: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray300,
    marginBottom: 16,
  },
  metaTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  metaText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.white,
  },
  recipeDescription: {
    fontSize: 16,
    color: colors.gray300,
    lineHeight: 24,
    textAlign: "center",
  },
  card: {
    marginHorizontal: 24,
    marginBottom: 16,
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
  cardTitle: {
    fontSize: 20,
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
  ingredientsList: {
    gap: 12,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  ingredientDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.amber500,
    marginTop: 6,
    marginRight: 12,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  ingredientName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.white,
    flex: 1,
  },
  amountBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  ingredientAmount: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.amber500,
  },
  ingredientNotes: {
    fontSize: 13,
    color: colors.gray400,
  },
  stepsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  stepGradient: {
    padding: 20,
  },
  stepContent: {},
  stepTop: {
    flexDirection: "row",
    marginBottom: 12,
  },
  stepNumberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.white,
  },
  stepTitleContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 4,
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
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 22,
    marginBottom: 12,
  },
  tipsBox: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 12,
    borderRadius: 10,
    gap: 8,
    alignItems: "flex-start",
  },
  tipsText: {
    flex: 1,
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 20,
  },
  navigationContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  navButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.white,
  },
  navButtonTextDisabled: {
    color: colors.gray500,
  },
  stepIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  stepIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  stepIndicatorActive: {
    width: 24,
    backgroundColor: colors.amber500,
  },
  stepIndicatorCompleted: {
    backgroundColor: colors.green500,
  },
  allStepsContainer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  allStepsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray400,
    marginBottom: 12,
  },
  miniStep: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  miniStepActive: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  miniStepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  miniStepNumberActive: {
    backgroundColor: colors.amber500,
  },
  miniStepNumberCompleted: {
    backgroundColor: colors.green500,
  },
  miniStepNumberText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
  },
  miniStepTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: colors.gray300,
  },
  miniStepTitleActive: {
    color: colors.white,
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 40,
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
});
