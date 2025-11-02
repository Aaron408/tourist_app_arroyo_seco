# Diseño de Referencia - Pantalla de Login Mobile

## 📋 Documento de Referencia de Estilos

Este documento describe el diseño visual y los estilos que se deben mantener en la pantalla de login de la aplicación móvil.

---

## 🎨 Paleta de Colores (Tema PWA)

```typescript
const colors = {
  // Grises
  gray900: "#111827",
  gray800: "#1F2937",
  gray700: "#374151",
  gray600: "#4B5563",
  gray500: "#6B7280",
  gray400: "#9CA3AF",
  gray300: "#D1D5DB",
  gray100: "#F3F4F6",
  white: "#FFFFFF",
  
  // Colores principales (Amber/Orange - tema gastronómico)
  amber50: "#FFFBEB",
  amber500: "#F59E0B",
  amber600: "#D97706",
  amber700: "#B45309",
  orange500: "#F97316",
  orange600: "#EA580C",
  orange700: "#C2410C",
  
  // Colores de error
  red500: "#EF4444",
  red400: "#F87171",
};
```

---

## 🖼️ Estructura Visual

### 1. **Fondo con Gradiente**
- **Gradiente**: `amber600 → orange600 → orange700`
- **Dirección**: Diagonal (start: {x: 0, y: 0}, end: {x: 1, y: 1})
- **Propósito**: Crear un ambiente cálido que refleje la gastronomía

### 2. **Círculos Decorativos**
Tres círculos semi-transparentes en el fondo:

```typescript
circle1: {
  tamaño: 350x350,
  posición: top: -120, right: -100,
  color: amber500,
  opacity: 0.2
}

circle2: {
  tamaño: 250x250,
  posición: bottom: -80, left: -60,
  color: orange500,
  opacity: 0.2
}

circle3: {
  tamaño: 180x180,
  posición: top: 35%, right: -90,
  color: amber600,
  opacity: 0.2
}
```

### 3. **Header (Logo y Títulos)**

**Logo:**
- Tamaño: 100x100px
- Border radius: 50 (círculo perfecto)
- Gradiente: `amber500 → orange600`
- Emoji: 🍽️ (fontSize: 48)
- Borde: 3px blanco semitransparente (rgba(255, 255, 255, 0.3))
- Sombra pronunciada: amber600, offset(0, 10), opacity: 0.5, radius: 20
- Elevation: 12

**Título Principal:**
- Texto: "Bienvenido de nuevo"
- Font size: 32
- Font weight: 800 (extra bold)
- Color: white
- Letter spacing: -0.5
- Margin bottom: 8

**Subtítulo:**
- Texto: "Arroyo Seco Tourism"
- Font size: 18
- Font weight: 500
- Color: amber50
- Text align: center

**Espaciado:**
- Margin bottom del header: 48px
- Margin bottom del logo: 28px

---

## 🃏 Card Principal (Glassmorphic)

### Contenedor Card:
- **Border radius**: 24px
- **Overflow**: hidden
- **Border**: 1px, rgba(255, 255, 255, 0.1)
- **Fondo**: Usa BlurView con intensity: 80, tint: "dark"

### Contenido del Card:
- **Padding**: 24px (uniforme en todos los lados)
- **IMPORTANTE**: NO agregar backgroundColor ni borderRadius adicional al cardContent
- El efecto glassmorphic viene del BlurView

---

## 📝 Inputs (Email y Password)

### Label:
- Font size: 15
- Font weight: 700 (bold)
- Color: white
- Margin bottom: 10
- Letter spacing: 0.3

### Input Container:
**Estado Normal:**
- Background: rgba(255, 255, 255, 0.08)
- Border: 1.5px, rgba(255, 255, 255, 0.15)
- Border radius: 12
- Height: 56px
- Padding horizontal: 16px

**Estado Focused:**
- Border color: amber500
- Background: rgba(245, 158, 11, 0.15)
- Shadow: amber500, offset(0, 4), opacity: 0.2, radius: 8
- Elevation: 4

### Iconos:
- Font size: 20
- Margin right: 12

### TextInput:
- Font size: 16
- Color: white
- Flex: 1
- Placeholder color: gray400

### Espaciado:
- Margin bottom entre inputs: 20px

---

## ⚠️ Mensaje de Error

```typescript
errorContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "rgba(220, 38, 38, 0.2)",
  borderRadius: 12,
  borderWidth: 1.5,
  borderColor: "rgba(239, 68, 68, 0.4)",
  padding: 14,
  marginBottom: 20,
  shadowColor: red500,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 4,
}

errorIcon: {
  fontSize: 20,
  marginRight: 10,
  emoji: "⚠️"
}

errorText: {
  flex: 1,
  fontSize: 14,
  color: white,
  fontWeight: "600",
  lineHeight: 20,
}
```

---

## 🔘 Botón de Login

### Gradiente del Botón:
- Colors: `amber600 → orange600`
- Direction: horizontal (start: {x: 0, y: 0}, end: {x: 1, y: 0})

### Estilos:
- Height: 56px
- Border radius: 12
- Shadow color: orange700
- Shadow offset: (0, 8)
- Shadow opacity: 0.5
- Shadow radius: 16
- Elevation: 10

### Texto del Botón:
- Font size: 17
- Font weight: 700
- Color: white
- Letter spacing: 0.8
- Text transform: uppercase

### Loading State:
- 3 puntos blancos
- Tamaño: 8x8px
- Opacidad: 0.6, 0.4, 0.2
- Gap: 8px

---

## 🔗 Enlaces

### "¿Olvidaste tu contraseña?":
- Font size: 14
- Color: amber500
- Font weight: 600
- Align: flex-end
- Margin bottom: 24

### "Contacta soporte":
- Font size: 14
- Color: amber500
- Font weight: 600
- Dentro del footerText (gray400)
- Margin top: 24

---

## 📐 Layout General

### Container Principal:
```typescript
container: { flex: 1 }
gradient: { flex: 1 }
```

### KeyboardAvoidingView & ScrollView:
- Behavior: iOS → "padding", Android → "height"
- keyboardShouldPersistTaps: "handled"
- contentContainerStyle: { flexGrow: 1, justifyContent: "center", padding: 24 }

---

## ⚡ Características Importantes

1. **Efecto Glassmorphic**: Usar BlurView con intensity: 80, tint: "dark"
2. **Gradientes**: Siempre de amber a orange para consistencia con PWA
3. **Sombras**: Usar colores cálidos (amber/orange) para sombras de elementos destacados
4. **Bordes redondeados**: Generosos (12-24px) para un look moderno
5. **Espaciado**: Consistente y generoso (20-28px entre elementos)
6. **Transparencias**: Usar rgba con valores bajos (0.05-0.2) para fondos
7. **Estados focused**: Siempre agregar feedback visual con color y sombra

---

## 🎯 Principios de Diseño

1. **Cálido y Acogedor**: Los colores amber/orange evocan la gastronomía
2. **Moderno y Limpio**: Bordes redondeados generosos, espaciado amplio
3. **Feedback Visual**: Estados hover/focus claramente definidos
4. **Consistencia con PWA**: Misma paleta de colores y estilo
5. **Accesibilidad**: Contraste adecuado, tamaños de texto legibles

---

## 📱 Funcionalidad

### Validaciones:
- ✅ Campos vacíos
- ✅ Formato de email (regex)
- ✅ Mensajes de error visuales

### Navegación:
- ✅ Después de login exitoso: router.replace("/(tabs)")
- ✅ Alert de error en caso de fallo

### Estados:
- ✅ Loading con animación de puntos
- ✅ Disabled durante carga
- ✅ Focus visual en inputs

---

## 🔧 Notas Técnicas

**IMPORTANTE - Problema del Teclado:**
El KeyboardAvoidingView y ScrollView pueden causar que el teclado se cierre inmediatamente en algunos dispositivos Android. Si esto ocurre:

1. NO modificar los estilos del BlurView o cardContent (mantener simples)
2. Usar exactly: `behavior={Platform.OS === 'ios' ? 'padding' : 'height'}`
3. Asegurar que keyboardShouldPersistTaps="handled"
4. Si persiste el problema, considerar usar `react-native-keyboard-aware-scroll-view`

---

**Fecha de creación**: 2 de noviembre de 2025
**Última actualización**: 2 de noviembre de 2025
