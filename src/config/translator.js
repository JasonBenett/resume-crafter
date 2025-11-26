/**
 * Content translation utilities
 * Resolves inline multi-language content to specific language
 */

/**
 * Check if a value is a translatable object (has language keys)
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a translatable object
 */
function isTranslatable(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  // Check if object has language code keys (2-letter codes)
  const keys = Object.keys(value);
  return keys.length > 0 && keys.every((key) => /^[a-z]{2}$/.test(key));
}

/**
 * Resolve a translatable value to specific language
 * @param {*} value - Value to resolve (string or language object)
 * @param {string} language - Target language code
 * @param {string} fallbackLanguage - Fallback language if target not found
 * @returns {*} Resolved value
 */
function resolveTranslation(value, language, fallbackLanguage = 'en') {
  // If not translatable, return as-is
  if (!isTranslatable(value)) {
    return value;
  }

  // Try target language
  if (value[language]) {
    return value[language];
  }

  // Try fallback language
  if (value[fallbackLanguage]) {
    return value[fallbackLanguage];
  }

  // Return first available language
  const firstKey = Object.keys(value)[0];
  return value[firstKey];
}

/**
 * Recursively translate all translatable fields in an object
 * @param {*} obj - Object to translate
 * @param {string} language - Target language code
 * @param {string} fallbackLanguage - Fallback language
 * @returns {*} Translated object
 */
function translateContent(obj, language, fallbackLanguage = 'en') {
  // Handle null/undefined
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      translateContent(item, language, fallbackLanguage)
    );
  }

  // Handle non-objects (primitives)
  if (typeof obj !== 'object') {
    return obj;
  }

  // Handle translatable objects
  if (isTranslatable(obj)) {
    return resolveTranslation(obj, language, fallbackLanguage);
  }

  // Recursively translate object properties
  const translated = {};
  for (const [key, value] of Object.entries(obj)) {
    translated[key] = translateContent(value, language, fallbackLanguage);
  }

  return translated;
}

/**
 * Translate entire config to specific language
 * @param {Object} config - Configuration object
 * @param {string} language - Target language code
 * @param {string} fallbackLanguage - Fallback language
 * @returns {Object} Translated configuration
 */
function translateConfig(config, language, fallbackLanguage = 'en') {
  // Clone config to avoid mutating original
  const cloned = JSON.parse(JSON.stringify(config));

  // Translate all content
  return translateContent(cloned, language, fallbackLanguage);
}

module.exports = {
  isTranslatable,
  resolveTranslation,
  translateContent,
  translateConfig,
};
