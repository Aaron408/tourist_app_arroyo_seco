import { LanguageProvider } from "@/contexts/languageProvider";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import SplashScreen from "./splash_screen";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Ocultar splash después de 3 segundos
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (isLoading || showSplash) return; // Esperar a que termine la verificación inicial y la splash

    const inAuthGroup = segments[0] === "(tabs)";
    const isLoginScreen = segments[0] === "login" || segments.length < 1;

    console.log("🧭 Navegación:", {
      isAuthenticated,
      isLoading,
      inAuthGroup,
      isLoginScreen,
      segments: segments.join("/"),
    });

    if (!isAuthenticated && inAuthGroup) {
      // Usuario no autenticado intentando acceder a tabs → redirigir a login
      console.log("↩️ Redirigiendo a login (no autenticado en tabs)");
      router.replace("/login");
    } else if (isAuthenticated && isLoginScreen) {
      // Usuario autenticado en pantalla de login → redirigir a tabs
      console.log("✅ Redirigiendo a tabs (usuario ya autenticado)");
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, segments, isLoading, router, showSplash]);

  // Mostrar splash screen
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
