/**
 * Title: Dynamic loader
 * 
 * Description:
 * In this file we'll map our current translations for get the translated in values
 * dynamically to improve application loads
 * 
 * Author: Angel Anaya
 * 
 */

export const translationModules: Record<string, () => Promise<any>> = {
  "en-US.Layout": () => import("@/i18n/en-US/tabs/_layout/_layout.json"),
  "es-MX.Layout": () => import("@/i18n/es-MX/tabs/_layout/_layout.json"),
  
  // Settings translations
  "en-US.Settings": () => import("@/i18n/en-US/tabs/settings/settings.json"),
  "es-MX.Settings": () => import("@/i18n/es-MX/tabs/settings/settings.json"),
  
  // Gastronomy translations
  "en-US.Gastronomy": () => import("@/i18n/en-US/tabs/gastronomy/gastronomy.json"),
  "es-MX.Gastronomy": () => import("@/i18n/es-MX/tabs/gastronomy/gastronomy.json"),
  
  // Experiences translations
  "en-US.Experiences": () => import("@/i18n/en-US/tabs/experiences/experiences.json"),
  "es-MX.Experiences": () => import("@/i18n/es-MX/tabs/experiences/experiences.json"),
  
  // Index (Home) translations
  "en-US.index": () => import("@/i18n/en-US/tabs/index/index.json"),
  "es-MX.index": () => import("@/i18n/es-MX/tabs/index/index.json"),
  
  // Explore translations
  "en-US.explore": () => import("@/i18n/en-US/tabs/explore/explore.json"),
  "es-MX.explore": () => import("@/i18n/es-MX/tabs/explore/explore.json"),
};