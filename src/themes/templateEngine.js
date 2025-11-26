const Handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

/**
 * Register Handlebars helpers
 */
function registerHelpers() {
  // Format date helper
  Handlebars.registerHelper('formatDate', function (dateStr) {
    if (!dateStr) return '';
    if (dateStr === 'present' || dateStr === 'Present') return 'Present';

    // Handle YYYY-MM or YYYY-MM-DD format
    const parts = dateStr.split('-');
    if (parts.length >= 2) {
      const year = parts[0];
      const month = parts[1];
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    }

    return dateStr;
  });

  // Check if array has items
  Handlebars.registerHelper('hasItems', function (array) {
    return array && array.length > 0;
  });

  // Conditional equality
  Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });

  // Get locale string
  Handlebars.registerHelper('t', function (key, options) {
    const locale = options.data.root.locale || {};
    const keys = key.split('.');
    let value = locale;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  });
}

/**
 * Load and register partial templates
 * @param {string} themePath - Path to theme directory
 * @param {string[]} partialNames - Array of partial file names
 */
async function registerPartials(themePath, partialNames) {
  const templatesDir = path.join(themePath, 'templates');

  for (const partialName of partialNames) {
    const partialPath = path.join(templatesDir, partialName);
    try {
      const content = await fs.readFile(partialPath, 'utf-8');
      const name = path.basename(partialName, '.hbs');
      Handlebars.registerPartial(name, content);
    } catch (error) {
      console.warn(
        `Warning: Could not load partial "${partialName}": ${error.message}`
      );
    }
  }
}

/**
 * Load and compile main template
 * @param {string} themePath - Path to theme directory
 * @param {string} templateName - Name of the main template file
 * @returns {Promise<Function>} Compiled Handlebars template
 */
async function loadTemplate(themePath, templateName) {
  const templatePath = path.join(themePath, 'templates', templateName);

  try {
    const content = await fs.readFile(templatePath, 'utf-8');
    return Handlebars.compile(content);
  } catch (error) {
    throw new Error(
      `Failed to load template "${templateName}": ${error.message}`
    );
  }
}

/**
 * Initialize template engine with theme
 * @param {string} themePath - Path to theme directory
 * @param {Object} themeConfig - Theme configuration object
 * @returns {Promise<Function>} Compiled main template
 */
async function initializeEngine(themePath, themeConfig) {
  // Register helpers
  registerHelpers();

  // Register partials if specified
  if (themeConfig.templates.partials) {
    await registerPartials(themePath, themeConfig.templates.partials);
  }

  // Load and compile main template
  const mainTemplate = await loadTemplate(
    themePath,
    themeConfig.templates.main
  );

  return mainTemplate;
}

/**
 * Render template with data
 * @param {Function} template - Compiled Handlebars template
 * @param {Object} data - Data to inject into template
 * @returns {string} Rendered HTML
 */
function renderTemplate(template, data) {
  return template(data);
}

module.exports = {
  initializeEngine,
  renderTemplate,
  registerHelpers,
  registerPartials,
  loadTemplate,
};
