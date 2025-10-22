/**
 * Author: Angel Anaya
 * 
 * Description:
 * Language provider improved to load each translation dynamically increasing 
 * the performance based on ISO-639 and mirror file-structure strategy
 * we aim to load translations as fast as possible avoiding 
 * overload with enormous JSON objects and third-party libraries.
 * 
 * Date Creation: 9/29/2025
 * 
 * Last Update: 9/29/2025
 * 
 * Comments:
 * 
 */
import { LanguageCode, useLanguageStore } from '@/stores/languageStore';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// Import all language translations
import { translationModules } from '@/i18n/translationLoader';

// Typos definition
type TranslationKey = string;

// Interfaces
interface LanguageContextType {
  t: (key: TranslationKey) => any;
  currentLanguage: LanguageCode;
  isLoading: boolean;
  setLanguage: (language: LanguageCode) => void;
}
interface LanguageProviderProps {
  children: ReactNode;
}


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { currentLanguage, isLoading, setLanguage, initializeLanguage } = useLanguageStore();

  // Cache-first for language translations
  const [cache, setCache] = useState<Record<string, any>>({});

  useEffect(() => {
    initializeLanguage();
  }, []);

  // Preload translations when language changes
  useEffect(() => {
    Object.keys(translationModules)
      .filter((k) => k.startsWith(currentLanguage))
      .forEach((cacheKey) => {
        if (!cache[cacheKey]) {
          translationModules[cacheKey]()
            .then((mod) => {
              setCache((prev) => ({
                ...prev,
                [cacheKey]: mod.default,
              }));
            })
            .catch((err) =>
              console.error(`Failed to load translations for ${cacheKey}`, err)
            );
        }
      });
  }, [currentLanguage]);

  // Safe dot notation for consult t('Layout.greet')
  const getNestedValue = (obj: any, path: string) =>
      path.split(".").reduce((acc, part) => acc?.[part], obj);

  // Translation provider (sync)
  const t = (key: TranslationKey) => {
    const [namespace, ...rest] = key.split('.');
    const cacheKey = `${currentLanguage}.${namespace}`;
    const translations = cache[cacheKey];

    if (!translations) {
      // Fallback if not loaded yet
      return key;
    }

    return rest.length > 0
      ? getNestedValue(translations, rest.join('.'))
      : translations;
  };


  const value: LanguageContextType = {
    t,
    currentLanguage,
    isLoading,
    setLanguage,
  };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};