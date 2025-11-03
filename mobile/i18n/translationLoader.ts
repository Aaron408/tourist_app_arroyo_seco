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
  "en.Layout": () => import("@/i18n/en-US/tabs/_layout/_layout.json"),
  "es.Layout": () => import("@/i18n/es-MX/tabs/_layout/_layout.json"),
  
  // Settings translations
  "en.Settings": () => import("@/i18n/en-US/tabs/settings/settings.json"),
  "es.Settings": () => import("@/i18n/es-MX/tabs/settings/settings.json"),
  
  // Gastronomy translations
  "en.Gastronomy": () => import("@/i18n/en-US/tabs/gastronomy/gastronomy.json"),
  "es.Gastronomy": () => import("@/i18n/es-MX/tabs/gastronomy/gastronomy.json"),
  
  // Experiences translations
  "en.Experiences": () => import("@/i18n/en-US/tabs/experiences/experiences.json"),
  "es.Experiences": () => import("@/i18n/es-MX/tabs/experiences/experiences.json"),
};