const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs').promises;

/**
 * Process CSS file with Tailwind and PostCSS
 * @param {string} inputPath - Path to input CSS file
 * @param {string} outputPath - Path to output CSS file
 * @returns {Promise<void>}
 */
async function processCSS(inputPath, outputPath) {
  try {
    const css = await fs.readFile(inputPath, 'utf-8');

    const result = await postcss([tailwindcss, autoprefixer]).process(css, {
      from: inputPath,
      to: outputPath,
    });

    await fs.writeFile(outputPath, result.css);

    if (result.map) {
      await fs.writeFile(outputPath + '.map', result.map.toString());
    }
  } catch (error) {
    throw new Error(`CSS processing failed: ${error.message}`);
  }
}

module.exports = {
  processCSS,
};
