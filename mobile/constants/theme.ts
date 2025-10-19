import { Platform } from 'react-native';

const primaryTerracotta = '#E8744B';
const secondaryForest = '#2D5A27';
const accentGold = '#F4C430';
const modernSage = '#8FBC8F';

export const Colors = {
  light: {
    text: '#1A1A1A',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceVariant: '#F8F6F3',
    surfaceContainer: '#F3F1EE',
    
    primary: primaryTerracotta,
    primaryContainer: '#FFE4D6',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#8B4513',
    secondary: secondaryForest,
    secondaryContainer: '#E8F5E8',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#1A3E1A',
    tertiary: modernSage,
    tertiaryContainer: '#F0F4EF',
    onTertiary: '#2D4A2D',
    onTertiaryContainer: '#1F3A1F',
    accent: accentGold,

    onSurface: '#1A1A1A',
    onSurfaceVariant: '#49454F',

    // Navegación moderna
    tint: primaryTerracotta,
    tabIconDefault: '#6B7280',
    tabIconSelected: primaryTerracotta,
    
    success: '#16A34A',
    successContainer: '#DCFCE7',
    warning: '#EA580C',
    warningContainer: '#FED7AA',
    error: '#DC2626',
    errorContainer: '#FEE2E2',
    info: '#2563EB',
    infoContainer: '#DBEAFE',

    // Grises modernos (Material Design 3)
    outline: '#79747E',
    outlineVariant: '#CAC4D0',
    surfaceTint: primaryTerracotta,
    
    gray50: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#E5E5E5',
    gray300: '#D4D4D4',
    gray400: '#A3A3A3',
    gray500: '#737373',
    gray600: '#525252',
    gray700: '#404040',
    gray800: '#262626',
    gray900: '#171717',

    recipe: '#F97316',
    recipeContainer: '#FFEDD5',
    ingredient: '#65A30D',
    ingredientContainer: '#ECFCCB',
    restaurant: '#D97706',
    restaurantContainer: '#FEF3C7',
    tradition: '#8B5CF6',
    traditionContainer: '#EDE9FE',
    seasonal: '#90EE90',
  },
  dark: {
    text: '#E6E1E5',
    background: '#141218',
    surface: '#1D1B20',
    surfaceVariant: '#49454F',
    surfaceContainer: '#2B2930',

    primary: '#FFB59D',
    primaryContainer: '#872100',
    onPrimary: '#1A1A1A',
    onPrimaryContainer: '#FFE4D6',
    secondary: '#B7CCB8',
    secondaryContainer: '#2F4F2F',
    onSecondary: '#1A1A1A',
    onSecondaryContainer: '#E8F5E8',
    tertiary: '#D3C4B2',
    tertiaryContainer: '#4A5A47',
    onTertiary: '#1A1A1A',
    onTertiaryContainer: '#F0F4EF',
    accent: '#F4C430',

    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',

    tint: '#FFB59D',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#FFB59D',
    
    success: '#4ADE80',
    successContainer: '#15803D',
    warning: '#FB923C',
    warningContainer: '#C2410C',
    error: '#F87171',
    errorContainer: '#B91C1C',
    info: '#60A5FA',
    infoContainer: '#1D4ED8',

    outline: '#938F99',
    outlineVariant: '#49454F',
    surfaceTint: '#FFB59D',

    gray50: '#262626',
    gray100: '#404040',
    gray200: '#525252',
    gray300: '#737373',
    gray400: '#A3A3A3',
    gray500: '#D4D4D4',
    gray600: '#E5E5E5',
    gray700: '#F5F5F5',
    gray800: '#FAFAFA',
    gray900: '#FFFFFF',
    
    // Colores específicos del dominio oscuros
    recipe: '#FFA07A',
    recipeContainer: '#7C2D12',
    ingredient: '#84CC16',
    ingredientContainer: '#365314',
    restaurant: '#FBBF24',
    restaurantContainer: '#92400E',
    tradition: '#A78BFA',
    traditionContainer: '#5B21B6',
    seasonal: '#6EE7B7',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

export const Typography = {
  displayLarge: { fontSize: 57, fontWeight: '400' as const, lineHeight: 64 },
  displayMedium: { fontSize: 45, fontWeight: '400' as const, lineHeight: 52 },
  displaySmall: { fontSize: 36, fontWeight: '400' as const, lineHeight: 44 },
  
  headlineLarge: { fontSize: 32, fontWeight: '400' as const, lineHeight: 40 },
  headlineMedium: { fontSize: 28, fontWeight: '400' as const, lineHeight: 36 },
  headlineSmall: { fontSize: 24, fontWeight: '400' as const, lineHeight: 32 },
  
  titleLarge: { fontSize: 22, fontWeight: '400' as const, lineHeight: 28 },
  titleMedium: { fontSize: 16, fontWeight: '500' as const, lineHeight: 24 },
  titleSmall: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20 },
  
  bodyLarge: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodyMedium: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  bodySmall: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  
  labelLarge: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20 },
  labelMedium: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16 },
  labelSmall: { fontSize: 11, fontWeight: '500' as const, lineHeight: 16 },
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
