const path = require('path');
const { processCSS } = require('../utils/cssProcessor');
const {
  cleanDir,
  ensureDir,
  writeFile,
  copyDir,
} = require('../utils/fileHandler');
const { loadAndValidateConfig } = require('../config');
const {
  loadAndMergeLocales,
  getAllAvailableLanguages,
  mergeConfigWithLocale,
} = require('../config/i18n');
const { translateConfig } = require('../config/translator');
const { loadTheme, generateHTML } = require('../themes');

/**
 * Build a single language version
 * @param {Object} options - Build options
 * @param {Object} options.config - Validated configuration
 * @param {Object} options.theme - Loaded theme
 * @param {string} options.language - Language code
 * @param {string} options.configDir - Config directory path
 * @param {string} options.outputPath - Output directory path
 * @param {string} options.filename - Output filename (e.g., 'index.html')
 * @param {string[]} options.availableLanguages - All available languages
 * @param {boolean} options.isDefaultLanguage - Whether this is the default language at root
 * @returns {Promise<Object>} Merged config with locale
 */
async function buildSingleLanguage({
  config,
  theme,
  language,
  configDir,
  outputPath,
  filename,
  availableLanguages = [],
  isDefaultLanguage = false,
}) {
  // Translate content fields to target language
  const translatedConfig = translateConfig(config, language);

  // Load and merge locales (theme defaults + user overrides)
  const locale = await loadAndMergeLocales(theme.path, configDir, language);

  let localizedConfig = translatedConfig;
  if (locale) {
    localizedConfig = mergeConfigWithLocale(translatedConfig, locale);
  }

  // Add language metadata for templates
  localizedConfig.currentLanguage = language;
  localizedConfig.availableLanguages = availableLanguages;
  localizedConfig.isMultiLanguage = availableLanguages.length > 1;
  localizedConfig.isAtRoot = isDefaultLanguage;

  // Determine CSS path (relative from language subdirectory or root)
  const isInSubdirectory = !isDefaultLanguage && availableLanguages.length > 1;
  localizedConfig.cssPath = isInSubdirectory ? '../styles.css' : 'styles.css';
  localizedConfig.assetsPath = isInSubdirectory ? '../assets' : 'assets';

  // Adjust photo path for subdirectories
  if (localizedConfig.profile?.photo) {
    const photoFilename = path.basename(localizedConfig.profile.photo);
    localizedConfig.profile.photo = isInSubdirectory
      ? `../${photoFilename}`
      : photoFilename;
  }

  // Generate HTML from theme and config
  const html = generateHTML(theme, localizedConfig);
  const htmlOutput = path.join(outputPath, filename);
  await writeFile(htmlOutput, html);

  return localizedConfig;
}

/**
 * Build resume website from configuration
 * @param {Object} options - Build options
 * @param {string} options.configPath - Path to config file
 * @param {string} options.themeName - Theme name to use
 * @param {string} options.outputPath - Output directory path
 * @param {string} options.language - Language code for i18n (if null, builds all available languages)
 * @param {boolean} options.multiLanguage - Force multi-language build (default: auto-detect)
 */
async function buildResume({
  configPath,
  themeName,
  outputPath,
  language,
  multiLanguage,
}) {
  try {
    console.log(`Loading configuration: ${configPath}`);

    // Load and validate configuration
    const config = await loadAndValidateConfig(configPath);
    console.log('✓ Configuration validated successfully');

    // Load theme first (needed for theme locales)
    console.log(`Loading theme: ${themeName}`);
    const theme = await loadTheme(themeName);
    console.log(`✓ Theme loaded: ${theme.config.name}`);

    console.log(`✓ Loaded profile for: ${config.profile.name}`);

    // Determine available languages
    const configDir = path.dirname(configPath);
    const themeLanguages = await getAllAvailableLanguages(
      theme.path,
      configDir
    );

    // Use configured languages or all available languages
    const availableLanguages = config.site?.languages || themeLanguages;

    // Validate that configured languages are available
    if (config.site?.languages) {
      const unavailable = config.site.languages.filter(
        (lang) => !themeLanguages.includes(lang)
      );
      if (unavailable.length > 0) {
        throw new Error(
          `Configured language(s) not available in theme: ${unavailable.join(', ')}. Available: ${themeLanguages.join(', ')}`
        );
      }
      console.log(
        `✓ Using configured languages: ${availableLanguages.join(', ')}`
      );
    } else {
      console.log(
        `✓ Found ${availableLanguages.length} language(s): ${availableLanguages.join(', ')}`
      );
    }

    // Get default language from config (if specified)
    const defaultLanguage = config.site?.defaultLanguage;
    if (defaultLanguage && !availableLanguages.includes(defaultLanguage)) {
      throw new Error(
        `Default language "${defaultLanguage}" not found in available languages: ${availableLanguages.join(', ')}`
      );
    }

    // Decide if building single or multiple languages
    const shouldBuildMulti =
      multiLanguage === true ||
      (multiLanguage !== false && !language && availableLanguages.length > 1);

    console.log(`Output directory: ${outputPath}`);

    // Clean output directory
    await cleanDir(outputPath);
    await ensureDir(outputPath);

    if (shouldBuildMulti) {
      // Multi-language build
      console.log(
        `Building multi-language site (${availableLanguages.join(', ')})...`
      );

      if (defaultLanguage) {
        console.log(`Default language: ${defaultLanguage} (will be at root)`);
      }

      // Build a page for each language
      for (const lang of availableLanguages) {
        const isDefault = lang === defaultLanguage;
        const langOutputPath = isDefault
          ? outputPath
          : path.join(outputPath, lang);

        if (!isDefault) {
          console.log(`\nGenerating ${lang} version...`);
          await ensureDir(langOutputPath);
        } else {
          console.log(`\nGenerating ${lang} version (default, at root)...`);
        }

        await buildSingleLanguage({
          config,
          theme,
          language: lang,
          configDir,
          outputPath: langOutputPath,
          filename: 'index.html',
          availableLanguages,
          isDefaultLanguage: isDefault,
        });

        if (isDefault) {
          console.log(`✓ Generated index.html (${lang})`);
        } else {
          console.log(`✓ Generated ${lang}/index.html`);
        }
      }

      // Generate language selector only if no default language
      if (!defaultLanguage) {
        console.log('\nGenerating language selector...');
        await generateLanguageSelector({
          outputPath,
          availableLanguages,
          defaultLanguage: availableLanguages[0],
        });
        console.log('✓ Generated index.html');
      }
    } else {
      // Single language build
      const targetLanguage = language || availableLanguages[0] || 'en';
      console.log(`Building single language (${targetLanguage})...`);

      await buildSingleLanguage({
        config,
        theme,
        language: targetLanguage,
        configDir,
        outputPath,
        filename: 'index.html',
        availableLanguages: [targetLanguage],
      });
      console.log('✓ Generated index.html');
    }

    // Process CSS (shared across all language versions)
    const cssInput = path.join(theme.path, 'assets/styles.css');
    const cssOutput = path.join(outputPath, 'styles.css');
    console.log('\nProcessing CSS with Tailwind...');
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

    // Copy user photo if specified
    if (config.profile?.photo) {
      try {
        const fs = require('fs').promises;
        const photoSrc = path.join(configDir, config.profile.photo);
        const photoFilename = path.basename(config.profile.photo);
        const photoDest = path.join(outputPath, photoFilename);

        // Check if source file exists
        await fs.access(photoSrc);
        await fs.copyFile(photoSrc, photoDest);
        console.log(`✓ Profile photo copied: ${photoFilename}`);
      } catch (error) {
        console.log(
          `⚠ Warning: Could not copy profile photo "${config.profile.photo}": ${error.message}`
        );
      }
    }

    console.log('\n✅ Build completed successfully!');
  } catch (error) {
    throw new Error(`Build failed: ${error.message}`);
  }
}

/**
 * Generate language selector index.html
 * @param {Object} options - Generation options
 * @param {string} options.outputPath - Output directory path
 * @param {string[]} options.availableLanguages - Available language codes
 * @param {string} options.defaultLanguage - Default/fallback language
 */
async function generateLanguageSelector({ outputPath, availableLanguages }) {
  const languageNames = {
    en: 'English',
    fr: 'Français',
    es: 'Español',
    de: 'Deutsch',
    it: 'Italiano',
    pt: 'Português',
    ja: '日本語',
    zh: '中文',
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume - Select Language</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 3rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      max-width: 500px;
      width: 90%;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: #1a202c;
    }
    p {
      color: #718096;
      margin-bottom: 2rem;
    }
    .languages {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .language-link {
      display: block;
      padding: 1rem 1.5rem;
      background: #f7fafc;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      text-decoration: none;
      color: #2d3748;
      font-weight: 500;
      transition: all 0.2s;
    }
    .language-link:hover {
      background: #667eea;
      border-color: #667eea;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Select Language</h1>
    <p>Choisissez une langue / Seleccione un idioma</p>
    <div class="languages">
${availableLanguages
  .map(
    (lang) =>
      `      <a href="${lang}/" class="language-link">${languageNames[lang] || lang.toUpperCase()}</a>`
  )
  .join('\n')}
    </div>
  </div>
</body>
</html>`;

  const htmlOutput = path.join(outputPath, 'index.html');
  await writeFile(htmlOutput, html);
}

module.exports = {
  buildResume,
};
