import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

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
};

export default function SplashScreen() {
  // Animaciones
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(30)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;
  const dotAnimation1 = useRef(new Animated.Value(0)).current;
  const dotAnimation2 = useRef(new Animated.Value(0)).current;
  const dotAnimation3 = useRef(new Animated.Value(0)).current;
  const circleScale1 = useRef(new Animated.Value(0)).current;
  const circleScale2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Secuencia de animaciones más rápidas
    Animated.sequence([
      // 1. Círculos de fondo - más rápidos
      Animated.parallel([
        Animated.spring(circleScale1, {
          toValue: 1,
          tension: 40,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.spring(circleScale2, {
          toValue: 1,
          tension: 35,
          friction: 6,
          delay: 50,
          useNativeDriver: true,
        }),
      ]),
      // 2. Logo aparece con escala y rotación - más rápido
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 80,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]),
      // 3. Título y subtítulo simultáneos - más rápidos
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          tension: 80,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 400,
          delay: 150,
          useNativeDriver: true,
        }),
        Animated.spring(subtitleTranslateY, {
          toValue: 0,
          tension: 80,
          friction: 6,
          delay: 150,
          useNativeDriver: true,
        }),
      ]),
      // 4. Indicador de carga - más rápido
      Animated.timing(loadingOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Animación de puntos de carga (loop) - empieza antes
    const dotSequence = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.sequence([
              Animated.timing(dotAnimation1, {
                toValue: -10,
                duration: 250,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(dotAnimation1, {
                toValue: 0,
                duration: 250,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
            Animated.sequence([
              Animated.timing(dotAnimation2, {
                toValue: -10,
                duration: 250,
                delay: 80,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(dotAnimation2, {
                toValue: 0,
                duration: 250,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
            Animated.sequence([
              Animated.timing(dotAnimation3, {
                toValue: -10,
                duration: 250,
                delay: 160,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(dotAnimation3, {
                toValue: 0,
                duration: 250,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.delay(250),
        ])
      ).start();
    };

    setTimeout(dotSequence, 1200);
  }, []);

  const rotation = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

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
        <Animated.View
          style={[
            styles.circle,
            styles.circle1,
            {
              backgroundColor: colors.amber500,
              transform: [{ scale: circleScale1 }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.circle,
            styles.circle2,
            {
              backgroundColor: colors.orange500,
              transform: [{ scale: circleScale2 }],
            },
          ]}
        />
        <View
          style={[
            styles.circle,
            styles.circle3,
            { backgroundColor: colors.amber600 },
          ]}
        />

        {/* Content */}
        <View style={styles.content}>
          {/* Logo Container */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [{ scale: logoScale }, { rotate: rotation }],
              },
            ]}
          >
            <LinearGradient
              colors={[colors.white, colors.amber50]}
              style={styles.logoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.logoInner}>
                <LinearGradient
                  colors={[colors.amber500, colors.orange600]}
                  style={styles.logoInnerGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.logoEmoji}>🏛️</Text>
                </LinearGradient>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Title */}
          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslateY }],
              },
            ]}
          >
            <Text style={styles.title}>Arroyo Seco</Text>
            <View style={styles.divider} />
          </Animated.View>

          {/* Subtitle */}
          <Animated.View
            style={[
              styles.subtitleContainer,
              {
                opacity: subtitleOpacity,
                transform: [{ translateY: subtitleTranslateY }],
              },
            ]}
          >
            <Text style={styles.subtitle}>Turismo Cultural</Text>
            <Text style={styles.tagline}>Descubre la esencia de Querétaro</Text>
          </Animated.View>

          {/* Loading indicator */}
          <Animated.View
            style={[styles.loadingContainer, { opacity: loadingOpacity }]}
          >
            <View style={styles.loadingDots}>
              <Animated.View
                style={[
                  styles.dot,
                  { transform: [{ translateY: dotAnimation1 }] },
                ]}
              />
              <Animated.View
                style={[
                  styles.dot,
                  { transform: [{ translateY: dotAnimation2 }] },
                ]}
              />
              <Animated.View
                style={[
                  styles.dot,
                  { transform: [{ translateY: dotAnimation3 }] },
                ]}
              />
            </View>
            <Text style={styles.loadingText}>Cargando experiencia...</Text>
          </Animated.View>
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
    position: "relative",
  },
  circle: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.2,
  },
  circle1: {
    width: 400,
    height: 400,
    top: -150,
    right: -150,
  },
  circle2: {
    width: 300,
    height: 300,
    bottom: -100,
    left: -100,
  },
  circle3: {
    width: 200,
    height: 200,
    top: "40%",
    right: -80,
    opacity: 0.15,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoGradient: {
    width: 160,
    height: 160,
    borderRadius: 80,
    padding: 6,
    shadowColor: colors.amber500,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 15,
  },
  logoInner: {
    flex: 1,
    borderRadius: 77,
    overflow: "hidden",
  },
  logoInnerGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoEmoji: {
    fontSize: 72,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: colors.white,
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  divider: {
    width: 80,
    height: 4,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  subtitleContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.white,
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray100,
    textAlign: "center",
    opacity: 0.9,
  },
  loadingContainer: {
    alignItems: "center",
  },
  loadingDots: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.white,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  loadingText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.white,
    opacity: 0.9,
    letterSpacing: 0.3,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.gray100,
    opacity: 0.7,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  footerBrand: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.8,
  },
});
