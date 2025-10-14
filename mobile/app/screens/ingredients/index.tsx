import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

// Datos de ingredientes locales organizados por categoría
const ingredientCategories = {
  chiles: {
    title: '🌶️ Chiles',
    ingredients: [
      {
        name: 'Chile Guajillo',
        description: 'Chile seco de sabor dulce y ligeramente picante',
        season: 'Todo el año',
        icon: '🌶️',
        uses: ['Moles', 'Salsas', 'Adobos']
      },
      {
        name: 'Chile Ancho',
        description: 'Chile poblano seco, de sabor dulce y terroso',
        season: 'Septiembre-Noviembre',
        icon: '🫑',
        uses: ['Moles', 'Rellenos', 'Caldos']
      },
      {
        name: 'Chile Mulato',
        description: 'Chile con sabor ahumado y ligeramente dulce',
        season: 'Octubre-Diciembre',
        icon: '🌶️',
        uses: ['Moles tradicionales']
      },
      {
        name: 'Chile de Árbol',
        description: 'Chile pequeño muy picante y aromático',
        season: 'Todo el año',
        icon: '🌶️',
        uses: ['Salsas picantes', 'Condimentos']
      }
    ]
  },
  vegetales: {
    title: '🥬 Vegetales Locales',
    ingredients: [
      {
        name: 'Nopal',
        description: 'Cactus comestible, rico en fibra y minerales',
        season: 'Todo el año',
        icon: '🌵',
        uses: ['Ensaladas', 'Guisos', 'Jugos']
      },
      {
        name: 'Quelites',
        description: 'Hierbas silvestres comestibles de la región',
        season: 'Junio-Septiembre',
        icon: '🌿',
        uses: ['Sopas', 'Quesadillas', 'Guisos']
      },
      {
        name: 'Flor de Calabaza',
        description: 'Flores comestibles de sabor delicado',
        season: 'Mayo-Octubre',
        icon: '🌼',
        uses: ['Quesadillas', 'Sopas', 'Guisos']
      },
      {
        name: 'Verdolagas',
        description: 'Planta silvestre rica en omega-3',
        season: 'Junio-Octubre',
        icon: '🌱',
        uses: ['Ensaladas', 'Guisos', 'Salsas verdes']
      }
    ]
  },
  granos: {
    title: '🌽 Granos y Legumbres',
    ingredients: [
      {
        name: 'Maíz Criollo',
        description: 'Maíz nativo de colores variados',
        season: 'Octubre-Diciembre',
        icon: '🌽',
        uses: ['Tortillas', 'Tamales', 'Atoles']
      },
      {
        name: 'Frijol Ayocote',
        description: 'Frijol grande de la región serrana',
        season: 'Noviembre-Enero',
        icon: '🫘',
        uses: ['Guisos', 'Caldos', 'Ensaladas']
      },
      {
        name: 'Amaranto',
        description: 'Grano ancestral rico en proteínas',
        season: 'Septiembre-Noviembre',
        icon: '🌾',
        uses: ['Dulces', 'Atoles', 'Barras energéticas']
      },
      {
        name: 'Chía',
        description: 'Semilla rica en omega-3 y fibra',
        season: 'Octubre-Diciembre',
        icon: '🫘',
        uses: ['Bebidas', 'Postres', 'Panes']
      }
    ]
  },
  hierbas: {
    title: '🌿 Hierbas Aromáticas',
    ingredients: [
      {
        name: 'Hierba Santa',
        description: 'Hoja aromática de sabor anisado',
        season: 'Todo el año',
        icon: '🍃',
        uses: ['Tamales', 'Moles', 'Pescados']
      },
      {
        name: 'Pitiona',
        description: 'Hierba aromática local, similar al tomillo',
        season: 'Mayo-Septiembre',
        icon: '🌿',
        uses: ['Condimento', 'Tés', 'Carnes']
      },
      {
        name: 'Pápalo',
        description: 'Hierba de sabor fuerte y cítrico',
        season: 'Junio-Octubre',
        icon: '🌿',
        uses: ['Tacos', 'Salsas', 'Ensaladas']
      },
      {
        name: 'Chepiche',
        description: 'Hierba aromática de la Sierra Gorda',
        season: 'Abril-Octubre',
        icon: '🌱',
        uses: ['Frijoles', 'Guisos', 'Salsas']
      }
    ]
  }
};

export default function IngredientsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');

  // Función para formatear las fechas con las primeras 3 letras de los meses
  const formatSeason = (season: string) => {
    if (season === 'Todo el año') return season;
    
    const monthMap: { [key: string]: string } = {
      'Enero': 'Ene', 'Febrero': 'Feb', 'Marzo': 'Mar', 'Abril': 'Abr',
      'Mayo': 'May', 'Junio': 'Jun', 'Julio': 'Jul', 'Agosto': 'Ago',
      'Septiembre': 'Sep', 'Octubre': 'Oct', 'Noviembre': 'Nov', 'Diciembre': 'Dec'
    };

    let formatted = season;
    Object.entries(monthMap).forEach(([full, short]) => {
      formatted = formatted.replace(full, short);
    });
    
    return formatted;
  };

  // Filtrar ingredientes basado en búsqueda, categoría y temporada
  const filteredCategories = Object.entries(ingredientCategories).reduce((acc, [key, category]) => {
    // Filtrar por categoría seleccionada
    if (selectedCategory !== 'all' && key !== selectedCategory) {
      return acc;
    }

    const filteredIngredients = category.ingredients.filter(ingredient => {
      // Filtro de búsqueda
      const matchesSearch = searchQuery === '' || 
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ingredient.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ingredient.uses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filtro de temporada
      const matchesSeason = selectedSeason === 'all' || 
        ingredient.season === 'Todo el año' ||
        ingredient.season.toLowerCase().includes(selectedSeason.toLowerCase());

      return matchesSearch && matchesSeason;
    });

    if (filteredIngredients.length > 0) {
      (acc as any)[key] = { ...category, ingredients: filteredIngredients };
    }

    return acc;
  }, {} as typeof ingredientCategories);

  const IngredientCard = ({ ingredient }: { ingredient: any }) => (
    <TouchableOpacity
      style={[styles.ingredientCard, { backgroundColor: colors.surface, ...Shadows.sm }]}
      activeOpacity={0.8}
    >
      <ThemedText style={styles.ingredientIcon}>
        {ingredient.icon}
      </ThemedText>
      <ThemedText style={[styles.ingredientName, { color: colors.onSurface }]}>
        {ingredient.name}
      </ThemedText>
      <ThemedText style={[styles.ingredientDescription, { color: colors.onSurfaceVariant }]}>
        {ingredient.description}
      </ThemedText>
      <View style={[styles.seasonBadge, { backgroundColor: colors.primaryContainer }]}>
        <ThemedText style={[styles.seasonText, { color: colors.onPrimaryContainer }]}>
          📅 {formatSeason(ingredient.season)}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <ThemedText style={[styles.emptyIcon, { color: colors.onSurfaceVariant }]}>
        🔍
      </ThemedText>
      <ThemedText style={[styles.emptyTitle, { color: colors.onSurface }]}>
        No se encontraron ingredientes
      </ThemedText>
      <ThemedText style={[styles.emptyDescription, { color: colors.onSurfaceVariant }]}>
        Intenta con otro término de búsqueda o explora las categorías disponibles
      </ThemedText>
    </View>
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: "",
          headerBackTitle: "Inicio"
        }} 
      />
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface, ...Shadows.sm }]}>
          <ThemedText style={[styles.headerTitle, { color: colors.onSurface }]}>
            🥬 Ingredientes de Arroyo Seco
          </ThemedText>
          <ThemedText style={[styles.headerSubtitle, { color: colors.onSurfaceVariant }]}>
            Descubre los sabores auténticos de nuestra región
          </ThemedText>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.surface, ...Shadows.sm, marginHorizontal: 16, marginTop: 16 }]}>
          <TextInput
            style={[styles.searchInput, { color: colors.onSurface }]}
            placeholder="Buscar ingredientes..."
            placeholderTextColor={colors.onSurfaceVariant}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filtros */}
        <View style={[styles.filtersContainer, { marginHorizontal: 16, marginTop: 12 }]}>
          {/* Filtro de Categorías */}
          <View style={styles.filterSection}>
            <ThemedText style={[styles.filterLabel, { color: colors.onSurface }]}>
              Categoría:
            </ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  { 
                    backgroundColor: selectedCategory === 'all' ? colors.primary : colors.surfaceVariant,
                  }
                ]}
                onPress={() => setSelectedCategory('all')}
              >
                <ThemedText style={[
                  styles.filterChipText,
                  { color: selectedCategory === 'all' ? colors.onPrimary : colors.onSurfaceVariant }
                ]}>
                  Todas
                </ThemedText>
              </TouchableOpacity>
              
              {Object.entries(ingredientCategories).map(([key, category]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.filterChip,
                    { 
                      backgroundColor: selectedCategory === key ? colors.primary : colors.surfaceVariant,
                    }
                  ]}
                  onPress={() => setSelectedCategory(key)}
                >
                  <ThemedText style={[
                    styles.filterChipText,
                    { color: selectedCategory === key ? colors.onPrimary : colors.onSurfaceVariant }
                  ]}>
                    {category.title.split(' ')[1] || category.title}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Filtro de Temporada */}
          <View style={styles.filterSection}>
            <ThemedText style={[styles.filterLabel, { color: colors.onSurface }]}>
              Temporada:
            </ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  { 
                    backgroundColor: selectedSeason === 'all' ? colors.primary : colors.surfaceVariant,
                  }
                ]}
                onPress={() => setSelectedSeason('all')}
              >
                <ThemedText style={[
                  styles.filterChipText,
                  { color: selectedSeason === 'all' ? colors.onPrimary : colors.onSurfaceVariant }
                ]}>
                  Todo el año
                </ThemedText>
              </TouchableOpacity>
              
              {['mayo', 'junio', 'septiembre', 'octubre', 'noviembre', 'diciembre'].map((month) => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.filterChip,
                    { 
                      backgroundColor: selectedSeason === month ? colors.primary : colors.surfaceVariant,
                    }
                  ]}
                  onPress={() => setSelectedSeason(month)}
                >
                  <ThemedText style={[
                    styles.filterChipText,
                    { color: selectedSeason === month ? colors.onPrimary : colors.onSurfaceVariant }
                  ]}>
                    {month.charAt(0).toUpperCase() + month.slice(1).substring(0, 2)}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        >
          {Object.keys(filteredCategories).length === 0 ? (
            <EmptyState />
          ) : (
            Object.entries(filteredCategories).map(([key, category]) => (
              <View key={key} style={styles.categorySection}>
                <ThemedText style={[styles.categoryTitle, { color: colors.onSurface }]}>
                  {category.title}
                </ThemedText>
                <View style={styles.ingredientsGrid}>
                  {category.ingredients.map((ingredient, index) => (
                    <IngredientCard key={index} ingredient={ingredient} />
                  ))}
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </ThemedView>
    </>
  );
}