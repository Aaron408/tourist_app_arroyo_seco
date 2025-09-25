import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

const { width } = Dimensions.get('window');

// Datos expandidos de recetas con pasos e ingredientes
const recipeDetails = {
  1: {
    id: 1,
    title: 'Mole Queretano',
    description: 'Receta tradicional de mole con ingredientes locales de Querétaro',
    difficulty: 'Intermedio',
    time: '3 horas',
    servings: '6-8 personas',
    region: 'Arroyo Seco',
    videoUrl: 'https://example.com/mole-video', // URL del video
    ingredients: [
      { name: 'Chiles guajillo', amount: '8 piezas', notes: 'Desvenados y sin semillas' },
      { name: 'Chiles ancho', amount: '4 piezas', notes: 'Desvenados y sin semillas' },
      { name: 'Chiles mulato', amount: '2 piezas', notes: 'Desvenados y sin semillas' },
      { name: 'Jitomate', amount: '2 piezas grandes', notes: 'Maduros' },
      { name: 'Cebolla blanca', amount: '1/2 pieza', notes: 'Cortada en cuartos' },
      { name: 'Ajo', amount: '4 dientes', notes: 'Pelados' },
      { name: 'Almendras', amount: '1/2 taza', notes: 'Peladas' },
      { name: 'Cacahuates', amount: '1/4 taza', notes: 'Sin sal' },
      { name: 'Ajonjolí', amount: '2 cucharadas', notes: 'Tostado' },
      { name: 'Chocolate de mesa', amount: '2 tablillas', notes: 'Rallado' },
      { name: 'Canela', amount: '1 rama', notes: 'Entera' },
      { name: 'Pimienta gorda', amount: '4 piezas', notes: 'Enteras' },
      { name: 'Clavo', amount: '3 piezas', notes: 'Enteros' },
      { name: 'Sal', amount: 'Al gusto', notes: '' },
      { name: 'Caldo de pollo', amount: '4 tazas', notes: 'Caliente' },
    ],
    steps: [
      {
        step: 1,
        title: 'Preparar los chiles',
        description: 'Tostar los chiles en un comal caliente por 2-3 minutos de cada lado. Remojar en agua caliente por 20 minutos.',
        time: '25 minutos',
        tips: 'No dejes que se quemen los chiles, solo que cambien ligeramente de color.'
      },
      {
        step: 2,
        title: 'Tostar especias y frutos secos',
        description: 'En el mismo comal, tostar las almendras, cacahuates, ajonjolí, canela, pimienta y clavo hasta que estén dorados.',
        time: '10 minutos',
        tips: 'Tuesta cada ingrediente por separado para controlar el punto exacto.'
      },
      {
        step: 3,
        title: 'Asar vegetales',
        description: 'Asar los jitomates, cebolla y ajo en el comal hasta que estén suaves y ligeramente quemados.',
        time: '15 minutos',
        tips: 'La piel quemada aporta un sabor ahumado característico.'
      },
      {
        step: 4,
        title: 'Licuar primera mezcla',
        description: 'Licuar los chiles remojados con una taza del agua donde se remojaron hasta obtener una pasta lisa.',
        time: '5 minutos',
        tips: 'Cuela la mezcla para eliminar restos de piel y semillas.'
      },
      {
        step: 5,
        title: 'Licuar segunda mezcla',
        description: 'Licuar los vegetales asados con las especias tostadas y un poco de caldo hasta obtener una pasta homogénea.',
        time: '5 minutos',
        tips: 'Agrega caldo gradualmente para lograr la consistencia correcta.'
      },
      {
        step: 6,
        title: 'Cocinar el mole',
        description: 'En una olla grande, freír la pasta de chiles por 10 minutos. Agregar la segunda mezcla y cocinar 15 minutos más.',
        time: '25 minutos',
        tips: 'Revuelve constantemente para evitar que se pegue.'
      },
      {
        step: 7,
        title: 'Agregar chocolate y sazonar',
        description: 'Incorporar el chocolate rallado y sazonar con sal. Cocinar a fuego bajo por 30 minutos más, añadiendo caldo según sea necesario.',
        time: '30 minutos',
        tips: 'El mole debe quedar espeso pero cremoso. La consistencia correcta es que cubra el dorso de una cuchara.'
      }
    ],
    culturalNotes: [
      'El mole queretano es una variante regional que incorpora ingredientes locales de la Sierra Gorda.',
      'Tradicionalmente se prepara en ocasiones especiales como bodas, quinceañeras y festividades religiosas.',
      'La receta ha sido transmitida de generación en generación por las mujeres de Arroyo Seco.',
      'Los chiles utilizados crecen en la región y le dan su sabor característico, diferente al mole poblano.',
      'Es común acompañarlo con guajolote o pollo, arroz rojo y tortillas hechas a mano.'
    ]
  },
  // Más recetas se pueden agregar aquí...
};

export default function RecipeDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const recipeId = parseInt(params.id as string);
  const recipe = recipeDetails[recipeId as keyof typeof recipeDetails];

  if (!recipe) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedText>Receta no encontrada</ThemedText>
      </ThemedView>
    );
  }

  const IngredientItem = ({ ingredient }: { ingredient: typeof recipe.ingredients[0] }) => (
    <View style={[styles.ingredientItem, { backgroundColor: colors.surfaceVariant }]}>
      <View style={styles.ingredientHeader}>
        <ThemedText style={[styles.ingredientName, { color: colors.onSurfaceVariant }]}>
          {ingredient.name}
        </ThemedText>
        <View style={[styles.amountBadge, { backgroundColor: colors.primaryContainer }]}>
          <ThemedText style={[styles.ingredientAmount, { color: colors.onPrimaryContainer }]}>
            {ingredient.amount}
          </ThemedText>
        </View>
      </View>
      {ingredient.notes ? (
        <ThemedText style={[styles.ingredientNotes, { color: colors.onSurfaceVariant }]}>
          {ingredient.notes}
        </ThemedText>
      ) : null}
    </View>
  );

  const StepCard = ({ step, index, isActive }: { 
    step: typeof recipe.steps[0]; 
    index: number; 
    isActive: boolean 
  }) => (
    <TouchableOpacity
      style={[
        styles.stepCard, 
        { 
          backgroundColor: isActive ? colors.primaryContainer : colors.surface,
          borderColor: isActive ? colors.primary : colors.outline,
          ...Shadows.sm
        }
      ]}
      onPress={() => setCurrentStep(index)}
      activeOpacity={0.8}
    >
      <View style={styles.stepHeader}>
        <View style={[
          styles.stepNumber, 
          { backgroundColor: isActive ? colors.primary : colors.secondaryContainer }
        ]}>
          <ThemedText style={[
            styles.stepNumberText, 
            { color: isActive ? colors.onPrimary : colors.onSecondaryContainer }
          ]}>
            {step.step}
          </ThemedText>
        </View>
        
        <View style={styles.stepInfo}>
          <ThemedText style={[
            styles.stepTitle, 
            { color: isActive ? colors.onPrimaryContainer : colors.onSurface }
          ]}>
            {step.title}
          </ThemedText>
          <View style={[styles.timeBadge, { backgroundColor: colors.tertiaryContainer }]}>
            <ThemedText style={[styles.stepTime, { color: colors.onTertiaryContainer }]}>
              {step.time}
            </ThemedText>
          </View>
        </View>
      </View>
      
      <ThemedText style={[
        styles.stepDescription, 
        { color: isActive ? colors.onPrimaryContainer : colors.onSurfaceVariant }
      ]}>
        {step.description}
      </ThemedText>
      
      {step.tips && (
        <View style={[styles.tipsContainer, { backgroundColor: colors.secondaryContainer }]}>
          <ThemedText style={[styles.tipsLabel, { color: colors.onSecondaryContainer }]}>
            💡 Consejo:
          </ThemedText>
          <ThemedText style={[styles.tipsText, { color: colors.onSecondaryContainer }]}>
            {step.tips}
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );

  const VideoSection = () => (
    <View style={[styles.videoSection, { backgroundColor: colors.surface, ...Shadows.sm }]}>
      <View style={styles.videoHeader}>
        <ThemedText style={[styles.videoTitle, { color: colors.onSurface }]}>
          🎥 Video Instructivo
        </ThemedText>
        <TouchableOpacity
          style={[styles.videoButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowVideo(!showVideo)}
          activeOpacity={0.8}
        >
          <ThemedText style={[styles.videoButtonText, { color: colors.onPrimary }]}>
            {showVideo ? '⏸️ Ocultar' : '▶️ Ver Video'}
          </ThemedText>
        </TouchableOpacity>
      </View>
      
      {showVideo && (
        <View style={[styles.videoPlaceholder, { backgroundColor: colors.surfaceVariant }]}>
          <ThemedText style={[styles.videoPlaceholderText, { color: colors.onSurfaceVariant }]}>
            🎬 Video: Preparación del {recipe.title}
          </ThemedText>
          <ThemedText style={[styles.videoNote, { color: colors.onSurfaceVariant }]}>
            Integración de video en desarrollo
          </ThemedText>
        </View>
      )}
    </View>
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: "",
          headerBackTitle: "Recetas"
        }} 
      />
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header compacto */}
        <View style={[styles.compactHeader, { backgroundColor: colors.surface, ...Shadows.sm }]}>
          <ThemedText style={[styles.recipeTitle, { color: colors.onSurface }]}>
            {recipe.title}
          </ThemedText>
          <View style={styles.compactMeta}>
            <View style={[styles.metaBadge, { backgroundColor: colors.secondaryContainer }]}>
              <ThemedText style={[styles.metaText, { color: colors.onSecondaryContainer }]}>
                {recipe.difficulty}
              </ThemedText>
            </View>
            <View style={[styles.metaBadge, { backgroundColor: colors.tertiaryContainer }]}>
              <ThemedText style={[styles.metaText, { color: colors.onTertiaryContainer }]}>
                ⏱️ {recipe.time}
              </ThemedText>
            </View>
          </View>
        </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
      >
        {/* Descripción */}
        <View style={[styles.descriptionSection, { backgroundColor: colors.surface, ...Shadows.sm }]}>
          <ThemedText style={[styles.descriptionText, { color: colors.onSurfaceVariant }]}>
            {recipe.description}
          </ThemedText>
        </View>

        {/* Video Section */}
        <VideoSection />

        {/* Ingredientes */}
        <View style={[styles.section, { backgroundColor: colors.surface, ...Shadows.sm }]}>
          <ThemedText style={[styles.sectionTitle, { color: colors.onSurface }]}>
            🥄 Ingredientes
          </ThemedText>
          <View style={styles.ingredientsList}>
            {recipe.ingredients.map((ingredient, index) => (
              <IngredientItem key={index} ingredient={ingredient} />
            ))}
          </View>
        </View>

        {/* Pasos con Paginación */}
        <View style={[styles.section, { backgroundColor: colors.surface, ...Shadows.sm }]}>
          <View style={styles.stepsHeader}>
            <ThemedText style={[styles.sectionTitle, { color: colors.onSurface }]}>
              👨‍🍳 Pasos de Preparación
            </ThemedText>
            <ThemedText style={[styles.stepsProgress, { color: colors.onSurfaceVariant }]}>
              Paso {currentStep + 1} de {recipe.steps.length}
            </ThemedText>
          </View>
          
          {/* Paso Actual */}
          <View style={styles.currentStepContainer}>
            <StepCard 
              step={recipe.steps[currentStep]} 
              index={currentStep} 
              isActive={true}
            />
          </View>

          {/* Controles de Navegación */}
          <View style={styles.stepNavigationContainer}>
            {/* Botones de navegación */}
            <View style={styles.stepNavButtons}>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  { 
                    backgroundColor: currentStep === 0 ? colors.surfaceVariant : colors.primaryContainer,
                    opacity: currentStep === 0 ? 0.5 : 1
                  }
                ]}
                onPress={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 0}
                activeOpacity={0.8}
              >
                <ThemedText style={[styles.navButtonText, { 
                  color: currentStep === 0 ? colors.onSurfaceVariant : colors.onPrimaryContainer 
                }]}>
                  ← Anterior
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.navButton,
                  { 
                    backgroundColor: currentStep === recipe.steps.length - 1 ? colors.surfaceVariant : colors.primaryContainer,
                    opacity: currentStep === recipe.steps.length - 1 ? 0.5 : 1
                  }
                ]}
                onPress={() => currentStep < recipe.steps.length - 1 && setCurrentStep(currentStep + 1)}
                disabled={currentStep === recipe.steps.length - 1}
                activeOpacity={0.8}
              >
                <ThemedText style={[styles.navButtonText, { 
                  color: currentStep === recipe.steps.length - 1 ? colors.onSurfaceVariant : colors.onPrimaryContainer 
                }]}>
                  Siguiente →
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Indicadores de pasos - modo compacto si hay muchos pasos */}
            <View style={styles.stepIndicatorsWrapper}>
              {recipe.steps.length <= 8 ? (
                <View style={styles.stepIndicators}>
                  {recipe.steps.map((_, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.stepIndicator,
                        {
                          backgroundColor: index === currentStep 
                            ? colors.primary 
                            : index < currentStep 
                              ? colors.tertiary 
                              : colors.outline
                        }
                      ]}
                      onPress={() => setCurrentStep(index)}
                      activeOpacity={0.7}
                    >
                      {index < currentStep && (
                        <ThemedText style={[styles.checkMark, { color: colors.onTertiary }]}>
                          ✓
                        </ThemedText>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                // Modo compacto para muchos pasos
                <View style={styles.compactProgressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: colors.outline }]}>
                    <View 
                      style={[
                        styles.progressFill,
                        { 
                          backgroundColor: colors.primary,
                          width: `${((currentStep + 1) / recipe.steps.length) * 100}%`
                        }
                      ]}
                    />
                  </View>
                  <ThemedText style={[styles.compactProgressText, { color: colors.onSurfaceVariant }]}>
                    {currentStep + 1} / {recipe.steps.length} pasos
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Notas Culturales */}
        <View style={[styles.section, { backgroundColor: colors.surface, ...Shadows.sm }]}>
          <ThemedText style={[styles.sectionTitle, { color: colors.onSurface }]}>
            🏛️ Notas Culturales
          </ThemedText>
          <View style={styles.culturalNotes}>
            {recipe.culturalNotes.map((note, index) => (
              <View key={index} style={[styles.culturalNote, { backgroundColor: colors.surfaceVariant }]}>
                <ThemedText style={[styles.culturalNoteText, { color: colors.onSurfaceVariant }]}>
                  • {note}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
    </>
  );
}