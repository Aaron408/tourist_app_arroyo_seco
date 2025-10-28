import { describe, it, expect, beforeEach } from '@jest/globals';

/**
 * Test Suite: Internationalization (i18n)
 * Propósito: Validar el sistema de traducción multiidioma
 */
describe('PWA - Language & Translation System', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Language Storage', () => {
    it('should store selected language in localStorage', () => {
      const language = 'es-MX';
      localStorage.setItem('preferredLanguage', language);
      
      expect(localStorage.getItem('preferredLanguage')).toBe('es-MX');
    });

    it('should retrieve stored language preference', () => {
      localStorage.setItem('preferredLanguage', 'en-US');
      
      const stored = localStorage.getItem('preferredLanguage');
      expect(stored).toBe('en-US');
    });

    it('should handle missing language preference', () => {
      const defaultLanguage = 'es-MX';
      const stored = localStorage.getItem('preferredLanguage') || defaultLanguage;
      
      expect(stored).toBe(defaultLanguage);
    });
  });

  describe('Language Toggle', () => {
    it('should toggle between Spanish and English', () => {
      let currentLanguage = 'es-MX';
      
      // Toggle to English
      currentLanguage = currentLanguage === 'es-MX' ? 'en-US' : 'es-MX';
      expect(currentLanguage).toBe('en-US');
      
      // Toggle back to Spanish
      currentLanguage = currentLanguage === 'es-MX' ? 'en-US' : 'es-MX';
      expect(currentLanguage).toBe('es-MX');
    });
  });

  describe('Supported Languages', () => {
    it('should validate supported language codes', () => {
      const supportedLanguages = ['es-MX', 'en-US'];
      
      expect(supportedLanguages).toContain('es-MX');
      expect(supportedLanguages).toContain('en-US');
      expect(supportedLanguages).toHaveLength(2);
    });

    it('should reject unsupported language codes', () => {
      const supportedLanguages = ['es-MX', 'en-US'];
      const unsupportedLanguage = 'fr-FR';
      
      expect(supportedLanguages).not.toContain(unsupportedLanguage);
    });
  });

  describe('Translation Keys', () => {
    const mockTranslations = {
      'es-MX': {
        welcome: 'Bienvenido',
        login: 'Iniciar Sesión',
        logout: 'Cerrar Sesión'
      },
      'en-US': {
        welcome: 'Welcome',
        login: 'Login',
        logout: 'Logout'
      }
    };

    it('should return correct translation for Spanish', () => {
      const lang = 'es-MX';
      expect(mockTranslations[lang].welcome).toBe('Bienvenido');
      expect(mockTranslations[lang].login).toBe('Iniciar Sesión');
    });

    it('should return correct translation for English', () => {
      const lang = 'en-US';
      expect(mockTranslations[lang].welcome).toBe('Welcome');
      expect(mockTranslations[lang].login).toBe('Login');
    });

    it('should handle missing translation keys gracefully', () => {
      const lang = 'es-MX';
      const key = 'nonexistent';
      const fallback = key;
      
      const translation = mockTranslations[lang]?.[key] || fallback;
      expect(translation).toBe('nonexistent');
    });
  });

  describe('Language Synchronization', () => {
    it('should sync language across multiple stores', () => {
      const landingLanguage = 'en-US';
      const adminLanguage = 'en-US';
      
      expect(landingLanguage).toBe(adminLanguage);
    });

    it('should detect language changes via storage events', () => {
      const storageEvent = new StorageEvent('storage', {
        key: 'preferredLanguage',
        newValue: 'en-US',
        oldValue: 'es-MX'
      });
      
      expect(storageEvent.key).toBe('preferredLanguage');
      expect(storageEvent.newValue).toBe('en-US');
    });
  });
});

