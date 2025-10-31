import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import { Colors, Spacing, BorderRadius, Typography } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';
import { router } from 'expo-router';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleLogin = async () => {
    // Reset error
    setLocalError('');

    // Validaciones básicas
    if (!email.trim() || !password.trim()) {
      setLocalError('Por favor completa todos los campos');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Formato de email inválido');
      return;
    }

    // Intentar login
    const result = await login(email.trim(), password);

    if (result.success) {
      // El router navegará automáticamente cuando el AuthContext actualice isAuthenticated
      router.replace('/(tabs)');
    } else {
      setLocalError(result.error || 'Error al iniciar sesión');
      Alert.alert('Error', result.error || 'Error al iniciar sesión');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <LinearGradient
        colors={
          colorScheme === 'dark'
            ? [colors.background, colors.surface, colors.surfaceVariant]
            : [colors.primaryContainer, colors.background, colors.surface]
        }
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo y título */}
          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
              <Text style={styles.logoEmoji}>🍽️</Text>
            </View>
            <Text style={[styles.title, { color: colors.text }]}>Bienvenido</Text>
            <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
              Arroyo Seco Tourism
            </Text>
          </View>

          {/* Formulario */}
          <View style={[styles.formContainer, { backgroundColor: colors.surface }]}>
            {/* Credenciales de prueba */}
            <View style={[styles.infoBox, { backgroundColor: colors.infoContainer, borderLeftColor: colors.info }]}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                📝 Credenciales de prueba:
              </Text>
              <Text style={[styles.infoText, { color: colors.onSurfaceVariant }]}>
                Email: admin@arroyoseco.com
              </Text>
              <Text style={[styles.infoText, { color: colors.onSurfaceVariant }]}>
                Contraseña: admin123
              </Text>
            </View>

            {/* Error message */}
            {localError ? (
              <View style={[styles.errorBox, { backgroundColor: colors.errorContainer, borderLeftColor: colors.error }]}>
                <Text style={[styles.errorText, { color: colors.error }]}>⚠️ {localError}</Text>
              </View>
            ) : null}

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Correo electrónico</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.surfaceVariant,
                    color: colors.text,
                    borderColor: colors.outline,
                  },
                ]}
                placeholder="admin@arroyoseco.com"
                placeholderTextColor={colors.onSurfaceVariant}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setLocalError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    {
                      backgroundColor: colors.surfaceVariant,
                      color: colors.text,
                      borderColor: colors.outline,
                    },
                  ]}
                  placeholder="••••••••"
                  placeholderTextColor={colors.onSurfaceVariant}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setLocalError('');
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect={false}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                { backgroundColor: colors.primary },
                isLoading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.onPrimary} size="small" />
              ) : (
                <Text style={[styles.loginButtonText, { color: colors.onPrimary }]}>
                  Iniciar Sesión
                </Text>
              )}
            </TouchableOpacity>

            {/* Footer text */}
            <Text style={[styles.footerText, { color: colors.onSurfaceVariant }]}>
              ¿Problemas para acceder? Contacta al administrador
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    ...Typography.headlineLarge,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.bodyLarge,
  },
  formContainer: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  infoBox: {
    borderLeftWidth: 4,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  infoTitle: {
    ...Typography.labelLarge,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  infoText: {
    ...Typography.bodySmall,
    marginTop: 2,
  },
  errorBox: {
    borderLeftWidth: 4,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  errorText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.labelLarge,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  input: {
    ...Typography.bodyLarge,
    height: 52,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: Spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  eyeIcon: {
    fontSize: 24,
  },
  loginButton: {
    height: 52,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    ...Typography.labelLarge,
    fontWeight: '700',
  },
  footerText: {
    ...Typography.bodySmall,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
});
