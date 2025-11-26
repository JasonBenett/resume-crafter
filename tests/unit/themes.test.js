const { describe, test } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const {
  discoverThemes,
  loadThemeConfig,
} = require('../../src/themes/loader');

describe('Theme System', () => {
  describe('Theme Discovery', () => {
    test('should discover existing themes', async () => {
      const themes = await discoverThemes();

      assert.ok(Array.isArray(themes));
      assert.ok(themes.length > 0);
      assert.ok(themes.includes('default'));
    });

    test('should return valid theme names', async () => {
      const themes = await discoverThemes();

      themes.forEach((theme) => {
        assert.strictEqual(typeof theme, 'string');
        assert.ok(theme.length > 0);
      });
    });
  });

  describe('Theme Configuration Loading', () => {
    test('should load default theme config', async () => {
      const config = await loadThemeConfig('default');

      assert.ok(config.name);
      assert.ok(config.version);
      assert.ok(config.templates);
      assert.ok(config.assets);
    });

    test('should validate theme has required fields', async () => {
      const config = await loadThemeConfig('default');

      assert.strictEqual(config.name, 'Default Professional');
      assert.ok(config.version);
      assert.strictEqual(config.templates.main, 'index.hbs');
      assert.strictEqual(config.assets.styles, 'styles.css');
    });

    test('should have valid templates configuration', async () => {
      const config = await loadThemeConfig('default');

      assert.ok(config.templates.main);
      assert.ok(Array.isArray(config.templates.partials));
      assert.ok(config.templates.partials.length > 0);
    });

    test('should have supported languages', async () => {
      const config = await loadThemeConfig('default');

      assert.ok(Array.isArray(config.supportedLanguages));
      assert.ok(config.supportedLanguages.includes('en'));
    });

    test('should throw error for non-existent theme', async () => {
      await assert.rejects(
        loadThemeConfig('non-existent-theme'),
        /theme.*not found/i
      );
    });
  });

  describe('Theme Structure', () => {
    test('should have templates directory', async () => {
      const fs = require('fs-extra');
      const themePath = path.join(
        __dirname,
        '../../themes/default/templates'
      );

      const exists = await fs.pathExists(themePath);
      assert.strictEqual(exists, true);
    });

    test('should have assets directory', async () => {
      const fs = require('fs-extra');
      const themePath = path.join(__dirname, '../../themes/default/assets');

      const exists = await fs.pathExists(themePath);
      assert.strictEqual(exists, true);
    });

    test('should have main template file', async () => {
      const fs = require('fs-extra');
      const config = await loadThemeConfig('default');
      const templatePath = path.join(
        __dirname,
        '../../themes/default/templates',
        config.templates.main
      );

      const exists = await fs.pathExists(templatePath);
      assert.strictEqual(exists, true);
    });

    test('should have styles file', async () => {
      const fs = require('fs-extra');
      const config = await loadThemeConfig('default');
      const stylesPath = path.join(
        __dirname,
        '../../themes/default/assets',
        config.assets.styles
      );

      const exists = await fs.pathExists(stylesPath);
      assert.strictEqual(exists, true);
    });
  });
});
