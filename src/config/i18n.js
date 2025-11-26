const path = require('path');
const { loadYamlFile } = require('./loader');

/**
 * I18n structure for multi-language support
 *
 * Theme provides default UI translations:
 * themes/default/locales/
 *   en/content.yaml (Default English UI labels)
 *   fr/content.yaml (Default French UI labels)
 *
 * User can optionally override specific translations:
 * resume.yaml (main config)
 * locales/
 *   en/content.yaml (Optional user overrides for English)
 *
 * Merge priority: Theme defaults → User overrides
 *
 * This separates concerns:
 * - Theme controls UI labels (sections, buttons, etc.)
 * - User only overrides if custom labels are needed
 */

/**
 * Load locale/translation file for a specific language from a single source
 * @param {string} basePath - Base directory containing locales folder
 * @param {string} language - Language code (e.g., 'en', 'fr', 'es')
 * @returns {Promise<Object|null>} Translation strings or null if not found
 */
async function loadLocale(basePath, language) {
  const localePath = path.join(basePath, 'locales', language, 'content.yaml');
  return await loadYamlFile(localePath, { optional: true });
}

/**
 * Deep merge two objects, with source overriding target
 * @param {Object} target - Base object
 * @param {Object} source - Override object
 * @returns {Object} Merged object
 */
function deepMerge(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * Load and merge theme locale with optional user overrides
 * @param {string} themePath - Path to theme directory
 * @param {string} userConfigPath - Path to user config directory
 * @param {string} language - Language code (e.g., 'en', 'fr', 'es')
 * @returns {Promise<Object>} Merged translations (theme defaults + user overrides)
 */
async function loadAndMergeLocales(themePath, userConfigPath, language) {
  // Load theme's default UI translations
  const themeLocale = await loadLocale(themePath, language);

  // Load user's optional overrides
  const userLocale = await loadLocale(userConfigPath, language);

  // If no theme locale and no user locale, return empty object
  if (!themeLocale && !userLocale) {
    return null;
  }

  // If only theme locale, return it
  if (themeLocale && !userLocale) {
    return themeLocale;
  }

  // If only user locale (unlikely but possible), return it
  if (!themeLocale && userLocale) {
    return userLocale;
  }

  // Merge: theme defaults + user overrides
  return deepMerge(themeLocale, userLocale);
}

/**
 * Get available languages from locales directory
 * @param {string} basePath - Base directory containing locales folder
 * @returns {Promise<string[]>} Array of available language codes
 */
async function getAvailableLanguages(basePath) {
  const fs = require('fs').promises;
  const localesPath = path.join(basePath, 'locales');

  try {
    const entries = await fs.readdir(localesPath, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

/**
 * Get all available languages from theme and user config
 * @param {string} themePath - Path to theme directory
 * @param {string} userConfigPath - Path to user config directory
 * @returns {Promise<string[]>} Array of unique language codes
 */
async function getAllAvailableLanguages(themePath, userConfigPath) {
  const themeLanguages = await getAvailableLanguages(themePath);
  const userLanguages = await getAvailableLanguages(userConfigPath);

  // Combine and deduplicate languages
  const allLanguages = [...new Set([...themeLanguages, ...userLanguages])];

  // Theme languages take priority (user can only override what theme supports)
  // But if user has additional languages, include them too
  return allLanguages.sort();
}

/**
 * Merge config with locale data
 * @param {Object} config - Main configuration
 * @param {Object} locale - Locale translations
 * @returns {Object} Merged configuration with locale data
 */
function mergeConfigWithLocale(config, locale) {
  return {
    ...config,
    locale: locale || {},
  };
}

module.exports = {
  loadLocale,
  loadAndMergeLocales,
  getAvailableLanguages,
  getAllAvailableLanguages,
  mergeConfigWithLocale,
};
