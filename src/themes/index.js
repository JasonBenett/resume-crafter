const {
  discoverThemes,
  loadThemeConfig,
  getThemePath,
  themeExists,
} = require('./loader');
const { initializeEngine, renderTemplate } = require('./templateEngine');

/**
 * Load and initialize a theme
 * @param {string} themeName - Name of the theme to load
 * @returns {Promise<Object>} Theme object with config, path, and template
 */
async function loadTheme(themeName) {
  // Check if theme exists
  if (!(await themeExists(themeName))) {
    const available = await discoverThemes();
    throw new Error(
      `Theme "${themeName}" not found. Available themes: ${available.join(', ')}`
    );
  }

  // Load theme configuration
  const config = await loadThemeConfig(themeName);
  const themePath = getThemePath(themeName);

  // Initialize template engine
  const template = await initializeEngine(themePath, config);

  return {
    name: themeName,
    config,
    path: themePath,
    template,
  };
}

/**
 * Generate HTML from theme and data
 * @param {Object} theme - Loaded theme object
 * @param {Object} data - Resume data and locale
 * @returns {string} Generated HTML
 */
function generateHTML(theme, data) {
  return renderTemplate(theme.template, data);
}

module.exports = {
  loadTheme,
  generateHTML,
  discoverThemes,
  loadThemeConfig,
  getThemePath,
  themeExists,
};
