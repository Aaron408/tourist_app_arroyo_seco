import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  Linking,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLanguage } from '@/contexts/languageProvider';

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
  red600: "#DC2626",
};

// Mock user data - replace with actual context
const mockUser = {
  name: "Aaron Reyes Ruiz",
  email: "aaron@email.com",
};

export default function SettingsScreen() {
  const router = useRouter();
  const { t, currentLanguage, setLanguage } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const languages = [
    { code: "es", name: "Español", flag: "🇲🇽", nativeName: "Español" },
    { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
  ];

  const handleLanguageChange = (languageCode: "es" | "en") => {
    setLanguageModalVisible(false);
    setLanguage(languageCode);
  };

  const getCurrentLanguageName = () => {
    const lang = languages.find((l) => l.code === currentLanguage);
    return lang ? `${lang.flag} ${lang.name}` : "Español";
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    // Implement logout logic
    Alert.alert(
      t.Settings?.account?.logoutSuccess || "Sesión cerrada", 
      t.Settings?.account?.logoutSuccessMessage || "Has cerrado sesión correctamente"
    );
    // router.replace('/login');
  };

  const handleContactSupport = () => {
    Linking.openURL("mailto:soporte@arroyoseco.com?subject=Soporte App Móvil");
  };

  const SettingsItem = ({
    icon,
    label,
    value,
    onPress,
    showArrow = true,
    rightElement,
  }: {
    icon: string;
    label: string;
    value?: string;
    onPress?: () => void;
    showArrow?: boolean;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.8 : 1}
    >
      <View style={styles.settingsItemLeft}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={[colors.amber500, colors.orange600]}
            style={styles.iconGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={icon as any} size={20} color={colors.white} />
          </LinearGradient>
        </View>
        <View style={styles.settingsItemText}>
          <Text style={styles.settingsLabel}>{label}</Text>
          {value && <Text style={styles.settingsValue}>{value}</Text>}
        </View>
      </View>
      {rightElement ||
        (showArrow && (
          <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
        ))}
    </TouchableOpacity>
  );

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

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>⚙️ {t.Settings?.title || 'Configuración'}</Text>
          <Text style={styles.headerSubtitle}>{t.Settings?.subtitle || 'Personaliza tu experiencia'}</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Card */}
          <BlurView intensity={80} tint="dark" style={styles.profileCard}>
            <View style={styles.profileContent}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={[colors.amber500, colors.orange600]}
                  style={styles.avatarGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.avatarText}>
                    {mockUser.name.charAt(0).toUpperCase()}
                  </Text>
                </LinearGradient>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{mockUser.name}</Text>
                <Text style={styles.profileEmail}>{mockUser.email}</Text>
              </View>
            </View>
          </BlurView>

          {/* Preferences Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.Settings?.preferences?.title || 'PREFERENCIAS'}</Text>
            <BlurView intensity={80} tint="dark" style={styles.sectionCard}>
              <View style={styles.sectionContent}>
                <SettingsItem
                  icon="language"
                  label={t.Settings?.preferences?.language || 'Idioma'}
                  value={getCurrentLanguageName()}
                  onPress={() => setLanguageModalVisible(true)}
                />
                {/* <View style={styles.divider} /> */}
                {/* <SettingsItem
                  icon="moon"
                  label="Modo oscuro"
                  showArrow={false}
                  rightElement={
                    <Switch
                      value={darkMode}
                      onValueChange={setDarkMode}
                      trackColor={{
                        false: colors.gray600,
                        true: colors.amber500,
                      }}
                      thumbColor={colors.white}
                      ios_backgroundColor={colors.gray600}
                    />
                  }
                /> */}
                {/* <View style={styles.divider} />
                <SettingsItem
                  icon="notifications"
                  label="Notificaciones"
                  showArrow={false}
                  rightElement={
                    <Switch
                      value={notificationsEnabled}
                      onValueChange={setNotificationsEnabled}
                      trackColor={{
                        false: colors.gray600,
                        true: colors.amber500,
                      }}
                      thumbColor={colors.white}
                      ios_backgroundColor={colors.gray600}
                    />
                  }
                /> */}
              </View>
            </BlurView>
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.Settings?.support?.title || 'SOPORTE'}</Text>
            <BlurView intensity={80} tint="dark" style={styles.sectionCard}>
              <View style={styles.sectionContent}>
                <SettingsItem
                  icon="mail"
                  label={t.Settings?.support?.contactSupport || 'Contactar soporte'}
                  onPress={handleContactSupport}
                />
                <View style={styles.divider} />
                <SettingsItem
                  icon="bug"
                  label={t.Settings?.support?.reportBug || 'Reportar problema'}
                  onPress={() =>
                    Alert.alert(
                      t.Settings?.alerts?.report || "Reportar", 
                      t.Settings?.alerts?.inDevelopment || "Función en desarrollo"
                    )
                  }
                />
                <View style={styles.divider} />
                <SettingsItem
                  icon="help-circle"
                  label={t.Settings?.support?.faq || 'Preguntas frecuentes'}
                  onPress={() => Alert.alert(
                    t.Settings?.alerts?.faq || "FAQ", 
                    t.Settings?.alerts?.inDevelopment || "Función en desarrollo"
                  )}
                />
              </View>
            </BlurView>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.Settings?.about?.title || 'ACERCA DE'}</Text>
            <BlurView intensity={80} tint="dark" style={styles.sectionCard}>
              <View style={styles.sectionContent}>
                <SettingsItem
                  icon="information-circle"
                  label={t.Settings?.about?.aboutApp || 'Acerca de la app'}
                  onPress={() =>
                    Alert.alert(
                      "" + (t.Settings?.about?.aboutApp || "Acerca de la app"),
                      t.Settings?.about?.aboutAppMessage || "Plataforma Turística Cultural v1.0.0"
                    )
                  }
                />
                <View style={styles.divider} />
                <SettingsItem
                  icon="code-slash"
                  label={t.Settings?.about?.version || 'Versión'}
                  value="1.0.0"
                  showArrow={false}
                />
                <View style={styles.divider} />
                <SettingsItem
                  icon="document-text"
                  label={t.Settings?.about?.terms || 'Términos y condiciones'}
                  onPress={() =>
                    Alert.alert(
                      t.Settings?.alerts?.terms || "Términos", 
                      t.Settings?.alerts?.inDevelopment || "Función en desarrollo"
                    )
                  }
                />
                <View style={styles.divider} />
                <SettingsItem
                  icon="shield-checkmark"
                  label={t.Settings?.about?.privacy || 'Política de privacidad'}
                  onPress={() =>
                    Alert.alert(
                      t.Settings?.alerts?.privacy || "Privacidad", 
                      t.Settings?.alerts?.inDevelopment || "Función en desarrollo"
                    )
                  }
                />
              </View>
            </BlurView>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setLogoutModalVisible(true)}
            activeOpacity={0.9}
          >
            <BlurView intensity={80} tint="dark" style={styles.logoutBlur}>
              <View style={styles.logoutContent}>
                <View style={styles.logoutIconContainer}>
                  <Ionicons
                    name="log-out-outline"
                    size={24}
                    color={colors.red500}
                  />
                </View>
                <Text style={styles.logoutText}>{t.Settings?.account?.logout || 'Cerrar Sesión'}</Text>
              </View>
            </BlurView>
          </TouchableOpacity>

        </ScrollView>
      </LinearGradient>

      {/* Logout Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={90} tint="dark" style={styles.modalBlur}>
            <View style={styles.modalContent}>
              <View style={styles.modalIconContainer}>
                <LinearGradient
                  colors={[colors.red500, colors.red600]}
                  style={styles.modalIconGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons
                    name="log-out-outline"
                    size={32}
                    color={colors.white}
                  />
                </LinearGradient>
              </View>
              <Text style={styles.modalTitle}>{t.Settings?.account?.logoutTitle || 'Cerrar Sesión'}</Text>
              <Text style={styles.modalMessage}>
                {t.Settings?.account?.logoutMessage || '¿Estás seguro que deseas cerrar tu sesión?'}
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setLogoutModalVisible(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelButtonText}>{t.Settings?.account?.cancel || 'Cancelar'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleLogout}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={[colors.red500, colors.red600]}
                    style={styles.confirmButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.confirmButtonText}>{t.Settings?.account?.logout || 'Cerrar Sesión'}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </View>
      </Modal>

      {/* Language Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={languageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={90} tint="dark" style={styles.modalBlur}>
            <View style={styles.modalContent}>
              <View style={styles.modalIconContainer}>
                <LinearGradient
                  colors={[colors.amber500, colors.orange600]}
                  style={styles.modalIconGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="language" size={32} color={colors.white} />
                </LinearGradient>
              </View>
              <Text style={styles.modalTitle}>{t.Settings?.language?.title || 'Seleccionar Idioma'}</Text>
              <Text style={styles.modalMessage}>{t.Settings?.language?.subtitle || 'Elige tu idioma preferido'}</Text>

              <View style={styles.languageList}>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      styles.languageItem,
                      currentLanguage === lang.code &&
                        styles.languageItemActive,
                    ]}
                    onPress={() =>
                      handleLanguageChange(lang.code as "es" | "en")
                    }
                    activeOpacity={0.8}
                  >
                    <View style={styles.languageItemLeft}>
                      <Text style={styles.languageFlag}>{lang.flag}</Text>
                      <View style={styles.languageTextContainer}>
                        <Text style={styles.languageName}>{lang.name}</Text>
                        <Text style={styles.languageNativeName}>
                          {lang.nativeName}
                        </Text>
                      </View>
                    </View>
                    {currentLanguage === lang.code && (
                      <View style={styles.checkmarkContainer}>
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color={colors.amber500}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setLanguageModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCloseButtonText}>{t.Settings?.language?.close || 'Cerrar'}</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>
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
    width: 300,
    height: 300,
    top: -100,
    right: -100,
    opacity: 0.2,
  },
  circle2: {
    width: 250,
    height: 250,
    bottom: 50,
    left: -75,
    opacity: 0.2,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.gray300,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  profileCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 24,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatarGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.gray300,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 12,
    letterSpacing: 1,
    opacity: 0.8,
  },
  sectionCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  sectionContent: {
    padding: 0,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconGradient: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsItemText: {
    flex: 1,
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 2,
  },
  settingsValue: {
    fontSize: 14,
    color: colors.gray400,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginLeft: 72,
  },
  logoutButton: {
    marginTop: 8,
    borderRadius: 20,
    overflow: "hidden",
  },
  logoutBlur: {
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    borderRadius: 20,
  },
  logoutContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoutIconContainer: {
    marginRight: 12,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.red500,
  },
  footer: {
    alignItems: "center",
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  footerText: {
    fontSize: 14,
    color: colors.gray300,
    marginBottom: 8,
    fontWeight: "600",
  },
  footerVersion: {
    fontSize: 12,
    color: colors.gray400,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalBlur: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalContent: {
    padding: 32,
    alignItems: "center",
  },
  modalIconContainer: {
    marginBottom: 20,
  },
  modalIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.white,
    marginBottom: 12,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    color: colors.gray300,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  modalButton: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
  confirmButtonGradient: {
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
  languageList: {
    width: "100%",
    gap: 12,
    marginBottom: 24,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  languageItemActive: {
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    borderColor: colors.amber500,
  },
  languageItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  languageFlag: {
    fontSize: 32,
  },
  languageTextContainer: {
    gap: 4,
  },
  languageName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  languageNativeName: {
    fontSize: 14,
    color: colors.gray400,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
  },
  modalCloseButton: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
});
