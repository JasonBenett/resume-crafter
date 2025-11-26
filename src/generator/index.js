const path = require('path');
const { processCSS } = require('../utils/cssProcessor');
const { cleanDir, ensureDir } = require('../utils/fileHandler');

/**
 * Build resume website from configuration
 * @param {Object} options - Build options
 * @param {string} options.configPath - Path to config file (unused in Phase 1)
 * @param {string} options.themeName - Theme name to use
 * @param {string} options.outputPath - Output directory path
 */
async function buildResume({ configPath: _configPath, themeName, outputPath }) {
  try {
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
