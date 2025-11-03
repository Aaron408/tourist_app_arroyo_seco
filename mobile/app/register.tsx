import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

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
  red500: "#EF4444",
  red400: "#F87171",
  blue500: "#3B82F6",
  green500: "#10B981",
};

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [localError, setLocalError] = useState("");

  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    // Reset error
    setLocalError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setLocalError("Por favor completa todos los campos");
      return;
    }

    if (name.trim().length < 2) {
      setLocalError("El nombre debe tener al menos 2 caracteres");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Formato de email inválido");
      return;
    }

    if (password.length < 6) {
      setLocalError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    const result = await register(name.trim(), email.trim(), password);
    setIsLoading(false);

    if (result.success) {
      Alert.alert(
        "Registro exitoso",
        "Tu cuenta ha sido creada correctamente",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(tabs)"),
          },
        ]
      );
    } else {
      setLocalError(result.error || "Error al crear la cuenta");
      Alert.alert("Error", result.error || "Error al crear la cuenta");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient
        colors={[colors.amber600, colors.orange600, colors.orange700]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View
          style={[
            styles.circle,
            styles.circle1,
            { backgroundColor: colors.amber500 },
          ]}
        />
        <View
          style={[
            styles.circle,
            styles.circle2,
            { backgroundColor: colors.orange500 },
          ]}
        />
        <View
          style={[
            styles.circle,
            styles.circle3,
            { backgroundColor: colors.amber600 },
          ]}
        />

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={[colors.amber500, colors.orange600]}
                  style={styles.logoGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.logoEmoji}>🍽️</Text>
                </LinearGradient>
              </View>
              <Text style={styles.title}>Crear cuenta</Text>
              <Text style={styles.subtitle}>Arroyo Seco Tourism</Text>
            </View>

            {/* Glassmorphic Card */}
            <BlurView intensity={80} tint="dark" style={styles.card}>
              <View style={styles.cardContent}>
                {/* Name Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nombre completo</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      focusedInput === "name" && styles.inputWrapperFocused,
                    ]}
                  >
                    <Text style={styles.inputIcon}>👤</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Tú nombre"
                      placeholderTextColor={colors.gray400}
                      value={name}
                      onChangeText={setName}
                      onFocus={() => setFocusedInput("name")}
                      onBlur={() => setFocusedInput(null)}
                      autoCapitalize="words"
                      autoComplete="name"
                    />
                  </View>
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Correo electrónico</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      focusedInput === "email" && styles.inputWrapperFocused,
                    ]}
                  >
                    <Text style={styles.inputIcon}>✉️</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="tu@email.com"
                      placeholderTextColor={colors.gray400}
                      value={email}
                      onChangeText={setEmail}
                      onFocus={() => setFocusedInput("email")}
                      onBlur={() => setFocusedInput(null)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Contraseña</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      focusedInput === "password" && styles.inputWrapperFocused,
                    ]}
                  >
                    <Text style={styles.inputIcon}>🔒</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Mínimo 6 caracteres"
                      placeholderTextColor={colors.gray400}
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => setFocusedInput("password")}
                      onBlur={() => setFocusedInput(null)}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={24}
                        color={colors.gray400}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Confirmar contraseña</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      focusedInput === "confirmPassword" &&
                        styles.inputWrapperFocused,
                    ]}
                  >
                    <Text style={styles.inputIcon}>🔒</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Repite tu contraseña"
                      placeholderTextColor={colors.gray400}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      onFocus={() => setFocusedInput("confirmPassword")}
                      onBlur={() => setFocusedInput(null)}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={styles.eyeButton}
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-outline"
                            : "eye-off-outline"
                        }
                        size={24}
                        color={colors.gray400}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Error Message */}
                {localError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorText}>{localError}</Text>
                  </View>
                ) : null}

                {/* Register Button */}
                <TouchableOpacity
                  onPress={handleRegister}
                  disabled={isLoading}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={[colors.amber600, colors.orange600]}
                    style={styles.registerButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {isLoading ? (
                      <View style={styles.loadingContainer}>
                        <View style={styles.loadingDot} />
                        <View
                          style={[styles.loadingDot, styles.loadingDotDelay1]}
                        />
                        <View
                          style={[styles.loadingDot, styles.loadingDotDelay2]}
                        />
                      </View>
                    ) : (
                      <Text style={styles.registerButtonText}>
                        Crear Cuenta
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Footer */}
                <Text style={styles.footerText}>
                  ¿Ya tienes una cuenta?{" "}
                  <Text
                    style={styles.footerLink}
                    onPress={() => router.push("/login")}
                  >
                    Inicia sesión aquí
                  </Text>
                </Text>
              </View>
            </BlurView>
          </ScrollView>
        </KeyboardAvoidingView>
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
  },
  circle: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.15,
  },
  circle1: {
    width: 350,
    height: 350,
    top: -100,
    right: -100,
    opacity: 0.2,
  },
  circle2: {
    width: 250,
    height: 250,
    bottom: -50,
    left: -50,
    opacity: 0.2,
  },
  circle3: {
    width: 180,
    height: 180,
    top: "40%",
    right: -75,
    opacity: 0.2,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: colors.blue500,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  logoEmoji: {
    fontSize: 52,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.white,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray400,
    textAlign: "center",
  },
  card: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardContent: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.amber500,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    height: 56,
  },
  inputWrapperFocused: {
    borderColor: colors.amber500,
    backgroundColor: "rgba(245, 158, 11, 0.1)",
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.white,
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(220, 38, 38, 0.2)",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(239, 68, 68, 0.4)",
    padding: 14,
    marginBottom: 20,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  errorIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: colors.white,
    fontWeight: "600",
    lineHeight: 20,
  },
  registerButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.blue500,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    marginTop: 8,
  },
  registerButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  loadingContainer: {
    flexDirection: "row",
    gap: 8,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    opacity: 0.6,
  },
  loadingDotDelay1: {
    opacity: 0.4,
  },
  loadingDotDelay2: {
    opacity: 0.2,
  },
  footerText: {
    fontSize: 14,
    color: colors.gray400,
    textAlign: "center",
    marginTop: 24,
  },
  footerLink: {
    color: colors.amber500,
    fontWeight: "600",
  },
});
