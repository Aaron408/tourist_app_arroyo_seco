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
};