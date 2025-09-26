import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const sections = [
  {
    id: 'recipes',
    title: 'Recetas Tradicionales',
    icon: '🍲',
    description: 'Descubre los sabores auténticos de Arroyo Seco',
    route: 'recipes' as const,
  },
  {
    id: 'ingredients',
    title: 'Ingredientes Indígenas',
    icon: '🌱',
    description: 'Catálogo de ingredientes locales y sus propiedades',
    route: 'ingredients' as const,
  },
  {
    id: 'restaurants',
    title: 'Ruta del Sabor',
    icon: '🍽',
    description: 'Restaurantes tradicionales de la región',
    route: 'restaurants' as const,
  },
  {
    id: 'techniques',
    title: 'Técnicas Culinarias',
    icon: '👨‍🍳',
    description: 'Métodos ancestrales de preparación',
    route: 'explore' as const,
  },
];

const stats = [
  { label: 'Recetas Tradicionales', value: '25+', icon: '📖' },
  { label: 'Ingredientes Locales', value: '50+', icon: '🌿' },
  { label: 'Restaurantes', value: '15', icon: '🏪' },
  { label: 'Técnicas Ancestrales', value: '12', icon: '⚡' },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const navigateToSection = (route: string) => {
    if (route === 'ingredients') {
      router.push('/screens/ingredients');
    } else {
      router.push(`/(tabs)/${route}` as any);
    }
  };

  const SectionCard = ({ section }: { section: typeof sections[0] }) => (
    <TouchableOpacity
      style={[
        styles.modernSectionCard, 
        { 
          backgroundColor: colors.surface,
          ...Shadows.md,
        }
      ]}
      onPress={() => navigateToSection(section.route)}
      activeOpacity={0.8}
    >
      <View style={[styles.modernSectionIconContainer, { backgroundColor: colors.primaryContainer }]}>
        <ThemedText style={[styles.modernSectionIcon, { color: colors.primary }]}>
          {section.icon}
        </ThemedText>
      </View>
      <View style={styles.modernSectionContent}>
        <ThemedText style={[styles.modernSectionTitle, { color: colors.text }]}>
          {section.title}
        </ThemedText>
        <ThemedText style={[styles.modernSectionDescription, { color: colors.outline }]}>
          {section.description}
        </ThemedText>
        <View style={[styles.modernSectionArrow, { borderLeftColor: colors.primary }]} />
      </View>
    </TouchableOpacity>
  );

  const StatCard = ({ stat }: { stat: typeof stats[0] }) => (
    <View 
      style={[
        styles.modernStatCard, 
        { 
          backgroundColor: colors.surface,
          ...Shadows.sm,
        }
      ]}
    >
      <View style={[styles.modernStatIconContainer, { backgroundColor: colors.secondaryContainer }]}>
        <ThemedText style={[styles.modernStatIcon, { color: colors.secondary }]}>
          {stat.icon}
        </ThemedText>
      </View>
      <ThemedText style={[styles.modernStatValue, { color: colors.primary }]}>
        {stat.value}
      </ThemedText>
      <ThemedText style={[styles.modernStatLabel, { color: colors.outline }]}>
        {stat.label}
      </ThemedText>
    </View>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Modern Header */}
      <View style={[styles.modernHeader, { backgroundColor: colors.surface }]}>
        <View style={styles.modernHeaderContent}>
          <View style={[styles.modernHeaderBadge, { backgroundColor: colors.primaryContainer }]}>
            <ThemedText style={[styles.modernHeaderEmoji, { color: colors.primary }]}>
              🏛️
            </ThemedText>
          </View>
          <ThemedText style={[styles.modernHeaderTitle, { color: colors.text }]}>
            Arroyo Seco
          </ThemedText>
          <ThemedText style={[styles.modernHeaderSubtitle, { color: colors.outline }]}>
            Plataforma Turística Cultural
          </ThemedText>
          <View style={[styles.modernHeaderDivider, { backgroundColor: colors.outlineVariant }]} />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Modern Stats Grid */}
        <View style={styles.modernStatsSection}>
          <View style={styles.modernSectionHeader}>
            <ThemedText style={[styles.modernSectionHeaderTitle, { color: colors.text }]}>
              Contenido Disponible
            </ThemedText>
            <ThemedText style={[styles.modernSectionHeaderSubtitle, { color: colors.outline }]}>
              Explora nuestro catálogo cultural
            </ThemedText>
          </View>
          <View style={styles.modernStatsGrid}>
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </View>
        </View>

        {/* Modern Modules Section */}
        <View style={styles.modernModulesSection}>
          <View style={styles.modernSectionHeader}>
            <ThemedText style={[styles.modernSectionHeaderTitle, { color: colors.text }]}>
              Explorar Módulos
            </ThemedText>
            <ThemedText style={[styles.modernSectionHeaderSubtitle, { color: colors.outline }]}>
              Descubre la cultura gastronómica tradicional
            </ThemedText>
          </View>
          {sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </View>

        {/* Modern Info Card */}
        <View style={[styles.modernInfoCard, { backgroundColor: colors.surfaceVariant, ...Shadows.sm }]}>
          <View style={[styles.modernInfoIconContainer, { backgroundColor: colors.tertiaryContainer }]}>
            <ThemedText style={[styles.modernInfoIcon, { color: colors.tertiary }]}>💡</ThemedText>
          </View>
          <ThemedText style={[styles.modernInfoTitle, { color: colors.text }]}>
            Acerca de la Plataforma
          </ThemedText>
          <ThemedText style={[styles.modernInfoDescription, { color: colors.outline }]}>
            Preservamos el conocimiento gastronómico tradicional de Arroyo Seco, 
            promoviendo la 
          </ThemedText>
          <View style={styles.modernFeaturesList}>
            {[
              { icon: '📱', text: 'Diseño responsivo' },
              { icon: '🌐', text: 'Modo offline' },
              { icon: '🎨', text: 'Contenido visual' },
            ].map((feature, index) => (
              <View key={index} style={styles.modernFeatureItem}>
                <ThemedText style={styles.modernFeatureIcon}>{feature.icon}</ThemedText>
                <ThemedText style={[styles.modernFeatureText, { color: colors.outline }]}>
                  {feature.text}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Modern CTA Button */}
        <TouchableOpacity
          style={[styles.modernCtaButton, { backgroundColor: colors.primary, ...Shadows.md }]}
          onPress={() => router.push('/(tabs)/explore')}
          activeOpacity={0.9}
        >
          <View style={styles.modernCtaContent}>
            <View style={[styles.modernCtaIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <ThemedText style={styles.modernCtaEmoji}>🧭</ThemedText>
            </View>
            <ThemedText style={[styles.modernCtaText, { color: colors.surface }]}>
              Comenzar Exploración
            </ThemedText>
          </View>
        </TouchableOpacity>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  statsSection: {
    padding: 20,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (screenWidth - 56) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  sectionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  sectionCard: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionIcon: {
    marginRight: 16,
  },
  iconText: {
    fontSize: 32,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  infoSection: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  featuresContainer: {
    gap: 8,
  },
  feature: {
    fontSize: 14,
    lineHeight: 20,
  },
  ctaButton: {
    margin: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  ctaText: {
    ...Typography.titleLarge,
    fontWeight: '600',
  },
  
  // Estilos modernos para tarjetas de sección
  modernSectionCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modernSectionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  modernSectionIcon: {
    fontSize: 28,
  },
  modernSectionContent: {
    flex: 1,
    position: 'relative',
  },
  modernSectionTitle: {
    ...Typography.titleMedium,
    fontWeight: '600',
    marginBottom: 4,
  },
  modernSectionDescription: {
    ...Typography.bodyMedium,
    lineHeight: 20,
  },
  modernSectionArrow: {
    position: 'absolute',
    right: 0,
    top: '50%',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ translateY: -6 }],
  },
  
  // Estilos modernos para tarjetas de estadísticas
  modernStatCard: {
    width: (screenWidth - Spacing.lg * 3) / 2,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  modernStatIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  modernStatIcon: {
    fontSize: 24,
  },
  modernStatValue: {
    ...Typography.headlineSmall,
    fontWeight: '700',
    marginBottom: 4,
  },
  modernStatLabel: {
    ...Typography.bodySmall,
    textAlign: 'center',
    lineHeight: 16,
  },
  
  // Estilos modernos para el header
  modernHeader: {
    paddingTop: 60,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  modernHeaderContent: {
    alignItems: 'center',
  },
  modernHeaderBadge: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  modernHeaderEmoji: {
    fontSize: 40,
  },
  modernHeaderTitle: {
    ...Typography.headlineLarge,
    fontWeight: '700',
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  modernHeaderSubtitle: {
    ...Typography.titleMedium,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  modernHeaderDivider: {
    width: 60,
    height: 3,
    borderRadius: BorderRadius.sm,
  },
  
  // Estilos para secciones modernas
  modernStatsSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  modernSectionHeader: {
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  modernSectionHeaderTitle: {
    ...Typography.titleLarge,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  modernSectionHeaderSubtitle: {
    ...Typography.bodyMedium,
    textAlign: 'center',
  },
  modernStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
  modernModulesSection: {
    paddingTop: Spacing.lg,
  },
  
  // Estilos para tarjeta de información moderna
  modernInfoCard: {
    margin: Spacing.lg,
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
  },
  modernInfoIconContainer: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  modernInfoIcon: {
    fontSize: 32,
  },
  modernInfoTitle: {
    ...Typography.titleLarge,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  modernInfoDescription: {
    ...Typography.bodyMedium,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  modernFeaturesList: {
    width: '100%',
    gap: Spacing.sm,
  },
  modernFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  modernFeatureIcon: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },
  modernFeatureText: {
    ...Typography.bodyMedium,
    flex: 1,
  },
  
  // Estilos para botón CTA moderno
  modernCtaButton: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xl,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  modernCtaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  modernCtaIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  modernCtaEmoji: {
    fontSize: 20,
  },
  modernCtaText: {
    ...Typography.titleMedium,
    fontWeight: '600',
  },
});
