import { LanguageProvider } from '@/contexts/languageProvider';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Esperar a que termine la verificación inicial

    const inAuthGroup = segments[0] === '(tabs)';
    const isLoginScreen = segments[0] === 'login' || segments.length < 1;

    console.log('🧭 Navegación:', { 
      isAuthenticated, 
      isLoading, 
      inAuthGroup, 
      isLoginScreen, 
      segments: segments.join('/') 
    });

    if (!isAuthenticated && inAuthGroup) {
      // Usuario no autenticado intentando acceder a tabs → redirigir a login
      console.log('↩️ Redirigiendo a login (no autenticado en tabs)');
      router.replace('/login');
    } else if (isAuthenticated && isLoginScreen) {
      // Usuario autenticado en pantalla de login → redirigir a tabs
      console.log('✅ Redirigiendo a tabs (usuario ya autenticado)');
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, isLoading, router]);

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <RootLayoutNav />
      </LanguageProvider>
    </AuthProvider>
  );
}
