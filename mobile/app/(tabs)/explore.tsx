import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/AuthContext';
import SessionDebugInfo from '@/components/SessionDebugInfo';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';

const culturalSections = [
  {
    id: 'techniques',
    title: 'Técnicas Culinarias Tradicionales',
    icon: '👨‍🍳',
    description: 'Métodos ancestrales de preparación de alimentos',
    content: [
      {
        title: 'Cocción en Comal de Barro',
        description: 'Técnica prehispánica para tortillas y quesadillas',
        details: 'El comal de barro mantiene el calor de manera uniforme y da un sabor único a los alimentos.'
      },
      {
        title: 'Molcajete',
        description: 'Molienda tradicional de especias y salsas',
        details: 'Herramienta de piedra volcánica que libera aceites naturales de las especias.'
      },
      {
        title: 'Barbacoa de Hoyo',
        description: 'Cocción lenta enterrada en la tierra',
        details: 'Método que preserva jugos y aporta sabores ahumados naturales.'
      },
    ]
  },
  {
    id: 'drinks',
    title: 'Bebidas Tradicionales',
    icon: '🍹',
    description: 'Bebidas ancestrales y su significado cultural',
    content: [
      {
        title: 'Atole de Pinole',
        description: 'Bebida caliente de maíz tostado',
        details: 'Rico en nutrientes, tradicionalmente consumido en celebraciones.'
      },
      {
        title: 'Agua de Chía',
        description: 'Bebida refrescante de semillas ancestrales',
        details: 'Fuente de omega-3 y energía natural para los trabajadores del campo.'
      },
      {
        title: 'Tepache',
        description: 'Fermentado de piña con especias',
        details: 'Bebida probiótica con propiedades digestivas y refrescantes.'
      },
    ]
  },
  {
    id: 'seasonal',
    title: 'Calendario Estacional',
    icon: '📅',
    description: 'Ingredientes silvestres por temporada',
    content: [
      {
        title: 'Primavera (Mar-May)',
        description: 'Quelites, flores de calabaza, chía silvestre',
        details: 'Época de abundancia de hojas verdes y flores comestibles.'
      },
      {
        title: 'Verano (Jun-Ago)',
        description: 'Nopales, tunas, hierbas aromáticas',
        details: 'Temporada de frutos del desierto y plantas medicinales.'
      },
      {
        title: 'Otoño (Sep-Nov)',
        description: 'Hongos, semillas, frutos secos',
        details: 'Recolección de semillas para almacenamiento invernal.'
      },
      {
        title: 'Invierno (Dic-Feb)',
        description: 'Raíces, conservas, hierbas secas',
        details: 'Uso de alimentos preservados y medicina herbal.'
      },
    ]
  },
  {
    id: 'knowledge',
    title: 'Conocimiento Ecológico Tradicional',
    icon: '🌿',
    description: 'Sabiduría ancestral sobre la naturaleza',
    content: [
      {
        title: 'Identificación de Plantas',
        description: 'Reconocimiento de especies comestibles y medicinales',
        details: 'Conocimiento transmitido generacionalmente sobre propiedades de plantas locales.'
      },
      {
        title: 'Ciclos Lunares',
        description: 'Influencia de la luna en siembra y recolección',
        details: 'Calendario lunar para optimizar la calidad de ingredientes.'
      },
      {
        title: 'Conservación Natural',
        description: 'Métodos tradicionales de preservación',
        details: 'Técnicas de secado, fermentación y almacenamiento sin refrigeración.'
      },
    ]
  }
];

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { logout, user } = useAuth();

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: async () => {
            await logout();
          }
        }
      ]
    );
  };

  const ModernContentCard = ({ item }: { item: { title: string; description: string; details: string } }) => (
    <View style={[styles.modernContentCard, { backgroundColor: colors.surfaceVariant, ...Shadows.sm }]}>
      <ThemedText style={[styles.modernContentTitle, { color: colors.onSurface }]}>
        {item.title}
      </ThemedText>
      <ThemedText style={[styles.modernContentDescription, { color: colors.secondary }]}>
        {item.description}
      </ThemedText>
      <ThemedText style={[styles.modernContentDetails, { color: colors.onSurfaceVariant }]}>
        {item.details}
      </ThemedText>
    </View>
  );

  const ModernSectionCard = ({ section }: { section: typeof culturalSections[0] }) => {
    const isExpanded = expandedSection === section.id;
    
    return (
      <View style={[styles.modernSectionContainer, { backgroundColor: colors.surface, ...Shadows.md }]}>
        <TouchableOpacity
          style={styles.modernSectionHeader}
          onPress={() => toggleSection(section.id)}
          activeOpacity={0.8}
        >
          <View style={styles.modernSectionHeaderContent}>
            <View style={[styles.modernSectionIconContainer, { backgroundColor: colors.primaryContainer }]}>
              <ThemedText style={[styles.modernSectionIcon, { color: colors.primary }]}>
                {section.icon}
              </ThemedText>
            </View>
            <View style={styles.modernSectionInfo}>
              <ThemedText style={[styles.modernSectionTitle, { color: colors.onSurface }]}>
                {section.title}
              </ThemedText>
              <ThemedText style={[styles.modernSectionDescription, { color: colors.onSurfaceVariant }]}>
                {section.description}
              </ThemedText>
            </View>
            <View style={[styles.modernExpandIconContainer, { backgroundColor: colors.tertiaryContainer }]}>
              <ThemedText style={[styles.modernExpandIcon, { color: colors.onTertiaryContainer }]}>
                {isExpanded ? '▼' : '▶'}
              </ThemedText>
            </View>
          </View>
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.modernSectionContent}>
            {section.content.map((item, index) => (
              <ModernContentCard key={index} item={item} />
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedView style={[styles.header, { backgroundColor: colors.surface }]}>
        <View style={styles.headerContent}>
          <View>
            <ThemedText type="title" style={[styles.headerTitle, { color: colors.primary }]}>
              🧭 Explorar Cultura
            </ThemedText>
            <ThemedText style={[styles.headerSubtitle, { color: colors.gray600 }]}>
              Conocimiento tradicional de Arroyo Seco
            </ThemedText>
          </View>
          {user && (
            <TouchableOpacity
              onPress={handleLogout}
              style={[styles.logoutButton, { backgroundColor: colors.errorContainer }]}
              activeOpacity={0.7}
            >
              <ThemedText style={[styles.logoutButtonText, { color: colors.error }]}>
                Salir
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>
        {user && (
          <ThemedText style={[styles.userGreeting, { color: colors.onSurfaceVariant }]}>
            👋 Hola, {user.name}
          </ThemedText>
        )}
      </ThemedView>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedView style={styles.introSection}>
          <ThemedText style={[styles.introText, { color: colors.text }]}>
            Descubre las técnicas ancestrales, bebidas tradicionales y el calendario estacional 
            que han formado parte de la cultura gastronómica de Querétaro durante generaciones.
          </ThemedText>
        </ThemedView>

        {culturalSections.map((section) => (
          <ModernSectionCard key={section.id} section={section} />
        ))}

        <ThemedView style={[styles.comingSoon, { backgroundColor: colors.gray100 }]}>
          <ThemedText style={[styles.comingSoonText, { color: colors.gray500 }]}>
            📚 Más contenido educativo y videos en desarrollo...
          </ThemedText>
        </ThemedView>
      </ScrollView>

      {/* Debug component - solo visible en desarrollo */}
      <SessionDebugInfo />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + 40,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    ...Typography.headlineMedium,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.bodyLarge,
  },
  userGreeting: {
    ...Typography.bodyMedium,
    marginTop: Spacing.xs,
  },
  logoutButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  logoutButtonText: {
    ...Typography.labelMedium,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  introSection: {
    padding: Spacing.lg,
  },
  introText: {
    ...Typography.bodyLarge,
    lineHeight: 24,
    textAlign: 'center',
  },
  
  // Modern Section Styles
  modernSectionContainer: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  modernSectionHeader: {
    padding: Spacing.lg,
  },
  modernSectionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modernSectionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  modernSectionIcon: {
    ...Typography.headlineSmall,
  },
  modernSectionInfo: {
    flex: 1,
  },
  modernSectionTitle: {
    ...Typography.titleMedium,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  modernSectionDescription: {
    ...Typography.bodyMedium,
    lineHeight: 20,
  },
  modernExpandIconContainer: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modernExpandIcon: {
    ...Typography.labelMedium,
    fontWeight: 'bold',
  },
  modernSectionContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.md,
  },
  
  // Modern Content Card Styles
  modernContentCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  modernContentTitle: {
    ...Typography.titleSmall,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  modernContentDescription: {
    ...Typography.labelMedium,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  modernContentDetails: {
    ...Typography.bodyMedium,
    lineHeight: 20,
  },
  
  comingSoon: {
    padding: Spacing.xl,
    margin: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  comingSoonText: {
    ...Typography.bodyLarge,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
