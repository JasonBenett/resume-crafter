const fs = require('fs').promises;
const path = require('path');
const Ajv = require('ajv');
const themeSchema = require('./theme.schema');

const ajv = new Ajv({ strict: false });
const validateTheme = ajv.compile(themeSchema);

/**
 * Get the base themes directory path
 * @returns {string} Path to themes directory
 */
function getThemesDir() {
  return path.join(__dirname, '../../themes');
}

/**
 * Discover available themes in the themes directory
 * @returns {Promise<string[]>} Array of theme names
 */
async function discoverThemes() {
  const themesDir = getThemesDir();

  try {
    const entries = await fs.readdir(themesDir, { withFileTypes: true });
    const themes = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const themeJsonPath = path.join(themesDir, entry.name, 'theme.json');
        try {
          await fs.access(themeJsonPath);
          themes.push(entry.name);
        } catch {
          // Skip directories without theme.json
        }
      }
    }

    return themes;
  } catch (error) {
    throw new Error(`Failed to discover themes: ${error.message}`);
  }
}

/**
 * Load theme configuration from theme.json
 * @param {string} themeName - Name of the theme
 * @returns {Promise<Object>} Theme configuration object
 */
async function loadThemeConfig(themeName) {
  const themesDir = getThemesDir();
  const themeDir = path.join(themesDir, themeName);
  const themeJsonPath = path.join(themeDir, 'theme.json');

  try {
    const content = await fs.readFile(themeJsonPath, 'utf-8');
    const config = JSON.parse(content);

    // Validate theme config
    const valid = validateTheme(config);
    if (!valid) {
      const errors = validateTheme.errors
        .map((e) => `${e.instancePath} ${e.message}`)
        .join(', ');
      throw new Error(`Invalid theme configuration: ${errors}`);
    }

    return config;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Theme "${themeName}" not found`);
    }
    throw error;
  }
}

/**
 * Get theme directory path
 * @param {string} themeName - Name of the theme
 * @returns {string} Full path to theme directory
 */
function getThemePath(themeName) {
  return path.join(getThemesDir(), themeName);
}

/**
 * Check if theme exists
 * @param {string} themeName - Name of the theme
 * @returns {Promise<boolean>} True if theme exists
 */
async function themeExists(themeName) {
  const themePath = getThemePath(themeName);
  const themeJsonPath = path.join(themePath, 'theme.json');

  try {
    await fs.access(themeJsonPath);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  discoverThemes,
  loadThemeConfig,
  getThemePath,
  getThemesDir,
  themeExists,
};
