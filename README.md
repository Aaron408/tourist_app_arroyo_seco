# 🏛 Plataforma Turística Cultural de Arroyo Seco

Una aplicación móvil desarrollada con React Native y Expo que preserva y comparte el conocimiento gastronómico tradicional de Arroyo Seco, Querétaro. Esta plataforma promueve la cultura local y apoya el turismo sostenible mediante la documentación de recetas, ingredientes y establecimientos tradicionales de la región.

## 🎯 Características Principales

### 📱 Módulos Implementados

- **🏠 Inicio**: Dashboard principal con acceso rápido a todas las funcionalidades
- **🍲 Recetas**: Catálogo interactivo con pantallas detalladas, paginación de pasos y videos instructivos
- **🍽 Restaurantes**: Directorio de establecimientos tradicionales con información de contacto
- **🌟 Explorar**: Contenido cultural adicional y experiencias gastronómicas
- **🌱 Ingredientes**: Base de datos especializada con filtros avanzados y búsqueda por temporada

### 🎨 Diseño Cultural con Material Design 3

- **Sistema de Tokens**: Implementación completa de Material Design 3 adaptada culturalmente
- **Paleta de Colores**: Terracota, verde bosque y oro mexicano representando la tradición local
- **Tipografía**: Jerarquía tipográfica clara con fuentes optimizadas para legibilidad
- **Componentes**: Cards modernas, navegación fluida y interfaces intuitivas
- **Tema Adaptativo**: Soporte nativo para modo claro y oscuro

### 🚀 Funcionalidades Avanzadas

- **Navegación Inteligente**: Sistema de tabs con pantallas independientes organizadas por contexto
- **Recetas Interactivas**: Pantalla detallada con paginación de pasos, ingredientes y videos
- **Filtros Dinámicos**: Búsqueda y filtrado por categoría y temporada en ingredientes
- **Diseño Responsivo**: Optimizado para múltiples tamaños de pantalla
- **Arquitectura Escalable**: Estructura modular con separación clara de responsabilidades

## 🏗 Arquitectura del Proyecto

### Estructura de Navegación

```
app/
├── (tabs)/                    # Navegación principal por pestañas
│   ├── index.tsx             # Dashboard principal
│   ├── recipes.tsx           # Catálogo de recetas
│   ├── restaurants.tsx       # Directorio de restaurantes
│   └── explore.tsx           # Contenido cultural
├── screens/                  # Pantallas independientes
│   ├── recipe-detail/        # Detalle de receta con pasos
│   │   ├── index.tsx
│   │   └── styles.ts
│   └── ingredients/          # Pantalla de ingredientes
│       ├── index.tsx
│       └── styles.ts
└── _layout.tsx              # Layout principal
```

### Sistema de Componentes

```
components/
├── ui/                      # Componentes base reutilizables
│   ├── collapsible.tsx      # Acordeones expandibles
│   ├── icon-symbol.tsx      # Sistema de iconos
│   └── ...
├── themed-text.tsx          # Texto con tema
├── themed-view.tsx          # Vistas temáticas
├── parallax-scroll-view.tsx # Scroll con paralaje
└── haptic-tab.tsx          # Navegación con feedback háptico
```

### Gestión de Estilos

```
constants/
└── theme.ts                 # Sistema completo de tokens de diseño
    ├── Colors               # Paleta de colores cultural
    ├── Typography           # Jerarquía tipográfica
    ├── Spacing             # Sistema de espaciado
    ├── BorderRadius        # Bordes consistentes
    └── Shadows             # Elevaciones Material Design
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Expo CLI
- Para desarrollo móvil: Android Studio o Xcode

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Aaron408/tourist_app_arroyo_seco.git
   cd tourist_app_arroyo_seco
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```

### Opciones de Ejecución

- **📱 Dispositivo móvil**: Escanea el código QR con Expo Go
- **🌐 Navegador web**: Presiona `w` para abrir en localhost
- **📱 Emulador Android**: Presiona `a` (requiere Android Studio)
- **📱 Simulador iOS**: Presiona `i` (requiere Xcode - solo macOS)

## 🎨 Sistema de Diseño

### Paleta de Colores Cultural

```typescript
// Colores principales inspirados en la tradición mexicana
const Colors = {
  light: {
    primary: '#8B4513',        // Terracota tradicional
    secondary: '#228B22',      // Verde bosque queretano
    tertiary: '#DAA520',       // Oro mexicano
    surface: '#FFF8E7',        // Crema cálido
    background: '#FFFEF7',     // Beige natural
  },
  dark: {
    primary: '#CD853F',        // Terracota claro
    secondary: '#32CD32',      // Verde lima
    tertiary: '#FFD700',       // Oro brillante
    surface: '#2C1810',        // Marrón oscuro
    background: '#1A1A0A',     // Negro cálido
  }
}
```

### Componentes Clave

- **RecipeCard**: Tarjetas modernas con imágenes, tiempo de preparación y navegación
- **RestaurantCard**: Cards con información de contacto, ubicación y horarios
- **IngredientCard**: Componentes especializados con temporada y categorización
- **FilterChips**: Sistema de filtros interactivos con estados visuales
- **StepPagination**: Navegación por pasos con indicadores de progreso

## 📚 Contenido Cultural Implementado

### Recetas Tradicionales
- **Mole Queretano**: 8 pasos detallados con video tutorial
- **Gorditas de Frijol**: Proceso tradicional paso a paso  
- **Atole de Pinole**: Preparación ancestral documentada
- **Nopalitos en Escabeche**: Técnica de conservación regional

### Ingredientes Regionales
- **Chiles**: Variedad local con temporadas específicas
- **Vegetales**: Quelites y nopales con propiedades nutricionales
- **Granos**: Maíz criollo y frijoles nativos
- **Hierbas**: Aromáticas tradicionales y medicinales

### Establecimientos Documentados
- **La Cocina de la Abuela**: Tradición familiar desde 1950
- **Restaurante El Portal**: Especialidad en platillos regionales
- **Fonda Doña María**: Antojitos y comida casera
- **El Rincón del Sabor**: Experiencia gastronómica auténtica

## 🛠 Tecnologías Utilizadas

### Core Framework
- **React Native**: Framework principal para desarrollo móvil
- **Expo**: Plataforma de desarrollo y deploy
- **TypeScript**: Tipado estático para mayor robustez

### Navegación y Estado
- **Expo Router**: Sistema de navegación basado en archivos
- **React Hooks**: Gestión de estado local (useState, useEffect)

### UI y Diseño
- **Material Design 3**: Sistema de diseño base
- **Custom Theme System**: Tokens personalizados culturalmente apropiados
- **Responsive Design**: Adaptación automática a diferentes pantallas

### Herramientas de Desarrollo
- **ESLint**: Linting y calidad de código
- **TypeScript Config**: Configuración estricta de tipos
- **Expo Development Build**: Testing en dispositivos reales

## 🔄 Funcionalidades Específicas

### Sistema de Recetas
- Navegación fluida desde el catálogo al detalle
- Paginación intuitiva de pasos con indicadores visuales
- Sección de ingredientes organizada por categorías
- Placeholder para integración de videos futura
- Notas culturales y contexto histórico

### Pantalla de Ingredientes
- **Búsqueda Avanzada**: Filtrado por texto en tiempo real
- **Filtros por Categoría**: Chiles, vegetales, granos, hierbas
- **Filtros Estacionales**: Selección por meses de temporada
- **Formato de Fechas**: Abreviaciones culturalmente apropiadas (Ene, Feb, Mar)
- **Navegación Independiente**: Accesible solo desde la pantalla principal

### Sistema de Filtrado
```typescript
// Ejemplo de implementación de filtros
const filteredIngredients = ingredients.filter(ingredient => {
  const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesCategory = selectedCategory === 'all' || ingredient.category === selectedCategory;
  const matchesSeason = selectedSeason === 'all' || ingredient.season.includes(selectedSeason);
  
  return matchesSearch && matchesCategory && matchesSeason;
});
```

## 🚦 Estado del Proyecto

### ✅ Completado
- Navegación por tabs con diseño Material Design 3
- Pantallas de recetas con detalle completo y paginación
- Sistema de ingredientes con filtros avanzados
- Arquitectura escalable con separación de screens y tabs
- Paleta de colores cultural y sistema de temas

### 🔄 En Progreso
- Integración de videos en recetas
- Contenido adicional para la sección Explorar
- Optimizaciones de rendimiento

### 📋 Planificado
- Funcionalidad offline
- Sistema de favoritos
- Compartir recetas en redes sociales
- Mapa interactivo de restaurantes
- Notificaciones de temporada de ingredientes

## 🤝 Contribuciones

Este proyecto está abierto a contribuciones de la comunidad. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

### Áreas de Contribución Prioritarias

- 📝 **Contenido Cultural**: Añadir más recetas, ingredientes o establecimientos
- 🎨 **Experiencia de Usuario**: Mejorar interfaces y flujos de navegación
- 💻 **Funcionalidades**: Implementar características planificadas
- 📱 **Testing**: Pruebas en diferentes dispositivos y sistemas
- 🌐 **Accesibilidad**: Mejoras para usuarios con discapacidades

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto y Reconocimientos

**Desarrollado para preservar y compartir la riqueza cultural de Arroyo Seco, Querétaro**

Para más información sobre Expo y React Native:
- [Expo documentation](https://docs.expo.dev/)
- [React Native documentation](https://reactnative.dev/)
- [Material Design 3](https://m3.material.io/)

---