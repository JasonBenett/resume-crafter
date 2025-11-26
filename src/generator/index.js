const path = require('path');
const { processCSS } = require('../utils/cssProcessor');
const { cleanDir, ensureDir } = require('../utils/fileHandler');
const { loadAndValidateConfig } = require('../config');
const { loadLocale, mergeConfigWithLocale } = require('../config/i18n');

/**
 * Build resume website from configuration
 * @param {Object} options - Build options
 * @param {string} options.configPath - Path to config file
 * @param {string} options.themeName - Theme name to use
 * @param {string} options.outputPath - Output directory path
 * @param {string} options.language - Language code for i18n
 */
async function buildResume({ configPath, themeName, outputPath, language }) {
  try {
    console.log(`Loading configuration: ${configPath}`);

    // Load and validate configuration
    let config = await loadAndValidateConfig(configPath);
    console.log('✓ Configuration validated successfully');

    // Load locale if available
    const configDir = path.dirname(configPath);
    try {
      const locale = await loadLocale(configDir, language);
      config = mergeConfigWithLocale(config, locale);
      console.log(`✓ Loaded locale: ${language}`);
    } catch {
      console.log(
        `ℹ No locale found for "${language}", continuing without translations`
      );
    }

    // TODO: In Phase 4, use config to generate HTML
    // For now, we just validate it
    console.log(`✓ Loaded profile for: ${config.profile.name}`);

    console.log(`Using theme: ${themeName}`);
    console.log(`Output directory: ${outputPath}`);

    // Clean output directory
    await cleanDir(outputPath);

    // Resolve theme directory
    const themePath = path.join(__dirname, '../../themes', themeName);

    // Process CSS
    const cssInput = path.join(themePath, 'assets/styles.css');
    const cssOutput = path.join(outputPath, 'styles.css');

    await ensureDir(outputPath);
    console.log('Processing CSS with Tailwind...');
    await processCSS(cssInput, cssOutput);

    // Copy theme assets (excluding CSS source)
    // const assetsPath = path.join(themePath, 'assets');
    const outputAssetsPath = path.join(outputPath, 'assets');

    console.log('Copying theme assets...');
    await ensureDir(outputAssetsPath);
    // In Phase 4, we'll copy other assets and generate HTML

    console.log('Build pipeline configured successfully!');
  } catch (error) {
    throw new Error(`Build failed: ${error.message}`);
  }
}

module.exports = {
  buildResume,
};
