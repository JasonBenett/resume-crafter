const path = require('path');
const { loadYamlFile } = require('./loader');

/**
 * I18n structure for multi-language support
 *
 * Expected directory structure:
 * resume.yaml (main config, language-agnostic data)
 * locales/
 *   en/
 *     content.yaml (English translations)
 *   fr/
 *     content.yaml (French translations)
 *   es/
 *     content.yaml (Spanish translations)
 *
 * The content.yaml files contain translatable strings like:
 * - Section headings (Experience, Education, etc.)
 * - UI labels
 * - Any text that should be localized
 *
 * The main resume.yaml contains the actual content data
 */

/**
 * Load locale/translation file for a specific language
 * @param {string} basePath - Base directory containing locales folder
 * @param {string} language - Language code (e.g., 'en', 'fr', 'es')
 * @returns {Promise<Object>} Translation strings
 */
async function loadLocale(basePath, language) {
  const localePath = path.join(basePath, 'locales', language, 'content.yaml');

  try {
    return await loadYamlFile(localePath);
  } catch (error) {
    throw new Error(`Failed to load locale "${language}": ${error.message}`);
  }
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
  getAvailableLanguages,
  mergeConfigWithLocale,
};
