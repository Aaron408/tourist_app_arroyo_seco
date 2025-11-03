import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LanguageSwitcher } from '@/components/languageSwitcher';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/languageProvider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = async () => {
    setLogoutModalVisible(false);
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  const handleContactSupport = () => {
    Linking.openURL('mailto:soporte@arroyoseco.com?subject=Soporte App Móvil');
  };

  const SettingsSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <ThemedText style={[styles.sectionTitle, { color: colors.outline }]}>{title}</ThemedText>
      <View style={[styles.sectionContent, { backgroundColor: colors.surface, ...Shadows.sm }]}>
        {children}
      </View>
    </View>
  );

  const SettingsItem = ({
    icon,
    label,
    value,
    onPress,
    showArrow = true,
    rightElement,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value?: string;
    onPress?: () => void;
    showArrow?: boolean;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={[styles.settingsItem, { borderBottomColor: colors.outlineVariant }]}
      onPress={onPress}
      disabled={!onPress && !rightElement}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.settingsItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primaryContainer }]}>
          <Ionicons name={icon} size={20} color={colors.primary} />
        </View>
        <View style={styles.settingsItemText}>
          <ThemedText style={[styles.settingsLabel, { color: colors.text }]}>{label}</ThemedText>
          {value && (
            <ThemedText style={[styles.settingsValue, { color: colors.outline }]}>
              {value}
            </ThemedText>
          )}
        </View>
      </View>
      {rightElement || (showArrow && (
        <Ionicons name="chevron-forward" size={20} color={colors.outline} />
      ))}
    </TouchableOpacity>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: colors.surface, ...Shadows.md }]}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.primaryContainer }]}>
            <ThemedText style={[styles.avatarText, { color: colors.primary }]}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </ThemedText>
          </View>
          <View style={styles.profileInfo}>
            <ThemedText style={[styles.profileName, { color: colors.text }]}>
              {user?.name || 'Usuario'}
            </ThemedText>
            <ThemedText style={[styles.profileEmail, { color: colors.outline }]}>
              {user?.email || 'usuario@ejemplo.com'}
            </ThemedText>
          </View>
          <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primaryContainer }]}>
            <Ionicons name="pencil" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <SettingsSection title={t('Settings.preferences.title')}>
          <SettingsItem
            icon="language"
            label={t('Settings.preferences.language')}
            showArrow={false}
            rightElement={<LanguageSwitcher />}
          />
          <SettingsItem
            icon="color-palette"
            label={t('Settings.preferences.theme')}
            value={colorScheme === 'dark' ? t('Settings.preferences.themeOptions.dark') : t('Settings.preferences.themeOptions.light')}
          />
          <SettingsItem
            icon="notifications"
            label={t('Settings.preferences.notifications')}
            showArrow={false}
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.outlineVariant, true: colors.primary }}
                thumbColor={colors.surface}
              />
            }
          />
        </SettingsSection>

        {/* Support Section */}
        <SettingsSection title={t('Settings.support.title')}>
          <SettingsItem
            icon="mail"
            label={t('Settings.support.contactSupport')}
            onPress={handleContactSupport}
          />
          <SettingsItem
            icon="bug"
            label={t('Settings.support.reportBug')}
            onPress={() => Alert.alert('Reportar problema', 'Función en desarrollo')}
          />
          <SettingsItem
            icon="help-circle"
            label={t('Settings.support.faq')}
            onPress={() => Alert.alert('FAQ', 'Función en desarrollo')}
          />
        </SettingsSection>

        {/* About Section */}
        <SettingsSection title={t('Settings.about.title')}>
          <SettingsItem
            icon="information-circle"
            label={t('Settings.about.aboutApp')}
            onPress={() => Alert.alert('Arroyo Seco', 'Plataforma Turística Cultural v1.0.0')}
          />
          <SettingsItem icon="code-slash" label={t('Settings.about.version')} value="1.0.0" showArrow={false} />
          <SettingsItem
            icon="document-text"
            label={t('Settings.about.terms')}
            onPress={() => Alert.alert('Términos', 'Función en desarrollo')}
          />
          <SettingsItem
            icon="shield-checkmark"
            label={t('Settings.about.privacy')}
            onPress={() => Alert.alert('Privacidad', 'Función en desarrollo')}
          />
        </SettingsSection>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.errorContainer }]}
          onPress={() => setLogoutModalVisible(true)}
        >
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
          <ThemedText style={[styles.logoutText, { color: colors.error }]}>
            {t('Settings.account.logout')}
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <ThemedText style={[styles.modalTitle, { color: colors.text }]}>
              {t('Settings.account.logout')}
            </ThemedText>
            <ThemedText style={[styles.modalMessage, { color: colors.outline }]}>
              {t('Settings.account.logoutConfirm')}
            </ThemedText>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton, { backgroundColor: colors.surfaceVariant }]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <ThemedText style={[styles.cancelButtonText, { color: colors.text }]}>
                  {t('Settings.account.cancel')}
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton, { backgroundColor: colors.error }]}
                onPress={handleLogout}
              >
                <ThemedText style={styles.confirmButtonText}>
                  {t('Settings.account.confirm')}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: Spacing.xl,
  },
  profileHeader: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    ...Typography.headlineMedium,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...Typography.titleLarge,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    ...Typography.bodyMedium,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.labelLarge,
    fontWeight: '600',
    marginLeft: Spacing.lg,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
  },
  sectionContent: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  settingsItemText: {
    flex: 1,
  },
  settingsLabel: {
    ...Typography.bodyLarge,
    fontWeight: '500',
  },
  settingsValue: {
    ...Typography.bodyMedium,
    marginTop: 2,
  },
  logoutButton: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    ...Typography.titleMedium,
    fontWeight: '600',
    marginLeft: Spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
  },
  modalTitle: {
    ...Typography.headlineSmall,
    fontWeight: '600',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  modalMessage: {
    ...Typography.bodyLarge,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  modalButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  cancelButton: {},
  confirmButton: {},
  cancelButtonText: {
    ...Typography.titleMedium,
    fontWeight: '600',
  },
  confirmButtonText: {
    ...Typography.titleMedium,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
