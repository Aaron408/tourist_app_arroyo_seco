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
  t: any; // Changed to any to support object notation
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

  // Map short codes to full locale codes
  const getLocaleCode = (lang: LanguageCode) => {
    return lang === 'en' ? 'en-US' : 'es-MX';
  };

  // Cache-first for language translations
  const [cache, setCache] = useState<Record<string, any>>({});

  useEffect(() => {
    initializeLanguage();
  }, []);

  // Preload translations when language changes
  useEffect(() => {
    const localeCode = getLocaleCode(currentLanguage);
    Object.keys(translationModules)
      .filter((k) => k.startsWith(localeCode))
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

  // Build the translations object from cache
  const buildTranslationsObject = () => {
    const translations: any = {};
    const localeCode = getLocaleCode(currentLanguage);
    
    Object.keys(cache).forEach((cacheKey) => {
      const [lang, namespace] = cacheKey.split('.');
      if (lang === localeCode) {
        translations[namespace] = cache[cacheKey];
      }
    });
    
    return translations;
  };

  // Translation provider - Hybrid approach: function that also works as object
  const translationsObj = buildTranslationsObject();
  
  // Create a function that can be called AND has properties
  const translationFunction = (key: TranslationKey) => {
    const [namespace, ...rest] = key.split('.');
    const localeCode = getLocaleCode(currentLanguage);
    const cacheKey = `${localeCode}.${namespace}`;
    const translations = cache[cacheKey];

    if (!translations) {
      return key; // Fallback if not loaded yet
    }

    return rest.length > 0
      ? getNestedValue(translations, rest.join('.'))
      : translations;
  };
  
  // Add all translation properties to the function
  Object.keys(translationsObj).forEach((key) => {
    (translationFunction as any)[key] = translationsObj[key];
  });

  const t = translationFunction;

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