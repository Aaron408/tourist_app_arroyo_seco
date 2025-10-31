import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import authService from '../services/authService';
import { Colors, Spacing, BorderRadius, Typography } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';
import { useAuth } from '../contexts/AuthContext';

/**
 * Componente de desarrollo para ver información de la sesión
 * Solo visible en modo desarrollo (__DEV__ = true)
 */
export default function SessionDebugInfo() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  // No mostrar en producción
  if (!__DEV__) {
    return null;
  }

  const loadSessionInfo = async () => {
    const info = await authService.getSessionInfo();
    setSessionInfo(info);
  };

  useEffect(() => {
    loadSessionInfo();
  }, [user]);

  const handleClearCache = async () => {
    Alert.alert(
      'Limpiar Caché',
      '¿Estás seguro? Esto cerrará tu sesión.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: async () => {
            await authService.clearAllData();
            loadSessionInfo();
            Alert.alert('Éxito', 'Caché limpiado correctamente');
          },
        },
      ]
    );
  };

  if (!isVisible) {
    return (
      <TouchableOpacity
        style={[styles.toggleButton, { backgroundColor: colors.primaryContainer }]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={[styles.toggleButtonText, { color: colors.primary }]}>
          🔧 Debug
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          🔧 Información de Sesión (DEV)
        </Text>
        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Text style={[styles.closeButton, { color: colors.error }]}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: colors.surfaceVariant }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Estado de Autenticación
          </Text>
          <InfoRow
            label="Token guardado"
            value={sessionInfo?.hasToken ? '✅ Sí' : '❌ No'}
            colors={colors}
          />
          <InfoRow
            label="Usuario guardado"
            value={sessionInfo?.hasUser ? '✅ Sí' : '❌ No'}
            colors={colors}
          />
          <InfoRow
            label="Usuario actual"
            value={user?.name || 'No autenticado'}
            colors={colors}
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.surfaceVariant }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Fechas
          </Text>
          <InfoRow
            label="Login"
            value={sessionInfo?.loginDate ? new Date(sessionInfo.loginDate).toLocaleString() : 'N/A'}
            colors={colors}
          />
          <InfoRow
            label="Expiración"
            value={sessionInfo?.expiryDate ? new Date(sessionInfo.expiryDate).toLocaleString() : 'N/A'}
            colors={colors}
          />
          <InfoRow
            label="Días restantes"
            value={sessionInfo?.daysRemaining !== null ? `${sessionInfo.daysRemaining} días` : 'N/A'}
            colors={colors}
            highlight={sessionInfo?.daysRemaining !== null && sessionInfo.daysRemaining < 5}
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.surfaceVariant }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Almacenamiento
          </Text>
          <InfoRow label="Tipo" value="AsyncStorage (caché persistente)" colors={colors} />
          <InfoRow label="Persistencia" value="Sí (hasta expiracion)" colors={colors} />
          <InfoRow label="Duración token" value="30 días" colors={colors} />
        </View>

        <TouchableOpacity
          style={[styles.button, styles.refreshButton, { backgroundColor: colors.primaryContainer }]}
          onPress={loadSessionInfo}
        >
          <Text style={[styles.buttonText, { color: colors.primary }]}>🔄 Actualizar Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.clearButton, { backgroundColor: colors.errorContainer }]}
          onPress={handleClearCache}
        >
          <Text style={[styles.buttonText, { color: colors.error }]}>🗑️ Limpiar Caché</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const InfoRow = ({
  label,
  value,
  colors,
  highlight = false,
}: {
  label: string;
  value: string;
  colors: any;
  highlight?: boolean;
}) => (
  <View style={styles.infoRow}>
    <Text style={[styles.label, { color: colors.onSurfaceVariant }]}>{label}:</Text>
    <Text
      style={[
        styles.value,
        { color: highlight ? colors.error : colors.text },
        highlight && styles.valueHighlight,
      ]}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  toggleButton: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
    zIndex: 1000,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  toggleButtonText: {
    ...Typography.labelMedium,
    fontWeight: '600',
  },
  container: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    left: 16,
    maxHeight: 500,
    borderRadius: BorderRadius.lg,
    zIndex: 1000,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    ...Typography.titleMedium,
    fontWeight: '700',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: Spacing.md,
  },
  section: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.titleSmall,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  label: {
    ...Typography.bodyMedium,
    flex: 1,
  },
  value: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  valueHighlight: {
    fontWeight: '700',
  },
  button: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  refreshButton: {},
  clearButton: {},
  buttonText: {
    ...Typography.labelLarge,
    fontWeight: '600',
  },
});
