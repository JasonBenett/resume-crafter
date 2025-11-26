const path = require('path');
const { processCSS } = require('../utils/cssProcessor');
const {
  cleanDir,
  ensureDir,
  writeFile,
  copyDir,
} = require('../utils/fileHandler');
const { loadAndValidateConfig } = require('../config');
const { loadLocale, mergeConfigWithLocale } = require('../config/i18n');
const { loadTheme, generateHTML } = require('../themes');

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

    console.log(`✓ Loaded profile for: ${config.profile.name}`);

    // Load theme
    console.log(`Loading theme: ${themeName}`);
    const theme = await loadTheme(themeName);
    console.log(`✓ Theme loaded: ${theme.config.name}`);

    console.log(`Output directory: ${outputPath}`);

    // Clean output directory
    await cleanDir(outputPath);
    await ensureDir(outputPath);

    // Generate HTML from theme and config
    console.log('Generating HTML...');
    const html = generateHTML(theme, config);
    const htmlOutput = path.join(outputPath, 'index.html');
    await writeFile(htmlOutput, html);
    console.log('✓ HTML generated');

    // Process CSS
    const cssInput = path.join(theme.path, 'assets/styles.css');
    const cssOutput = path.join(outputPath, 'styles.css');
    console.log('Processing CSS with Tailwind...');
    await processCSS(cssInput, cssOutput);
    console.log('✓ CSS processed');

    // Copy theme assets (images, fonts, etc.)
    const assetsPath = path.join(theme.path, 'assets');
    const outputAssetsPath = path.join(outputPath, 'assets');

    try {
      await ensureDir(outputAssetsPath);
      // Copy all assets except styles.css (already processed)
      const fs = require('fs').promises;
      const assets = await fs.readdir(assetsPath);
      for (const asset of assets) {
        if (asset !== 'styles.css' && !asset.endsWith('.css')) {
          const src = path.join(assetsPath, asset);
          const dest = path.join(outputAssetsPath, asset);
          const stat = await fs.stat(src);
          if (stat.isFile()) {
            await fs.copyFile(src, dest);
          } else if (stat.isDirectory()) {
            await copyDir(src, dest);
          }
        }
      }
      console.log('✓ Assets copied');
    } catch {
      console.log('ℹ No additional assets to copy');
    }

    console.log('✅ Build completed successfully!');
  } catch (error) {
    throw new Error(`Build failed: ${error.message}`);
  }
}

module.exports = {
  buildResume,
};
