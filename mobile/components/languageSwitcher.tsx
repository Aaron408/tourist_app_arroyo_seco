import { ThemedText } from '@/components/themed-text';
import { useLanguage } from '@/contexts/languageProvider';
import { LANGUAGES, LanguageCode } from '@/stores/languageStore';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [visible, setVisible] = useState(false);

  const handleSelect = (code :LanguageCode) => {
    setLanguage(code);
    setVisible(false);
  };

  return (
    <View>
      {/* Current selection button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setVisible(true)}
      >
        <ThemedText style={styles.dropdownText}>
          {LANGUAGES[currentLanguage].flag} {LANGUAGES[currentLanguage].name}
        </ThemedText>
      </TouchableOpacity>

      {/* Modal with options */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={Object.values(LANGUAGES)}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.code === currentLanguage && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item.code)}
                >
                  <ThemedText
                    style={[
                      styles.optionText,
                      item.code === currentLanguage && styles.selectedOptionText,
                    ]}
                  >
                    {item.flag} {item.name}
                  </ThemedText>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  dropdown: {
    width: 220,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOption: {
    backgroundColor: '#007AFF20',
  },
  selectedOptionText: {
    fontWeight: '700',
    color: '#007AFF',
  },
});
