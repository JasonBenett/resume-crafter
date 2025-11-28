const { describe, test } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs-extra');
const { buildResume } = require('../../src/generator');

describe('Build Integration Tests', () => {
  // Helper to get unique output directory for each test
  function getTestOutputDir(testName) {
    return path.join(__dirname, '../tmp', testName.replace(/\s+/g, '-'));
  }

  // Helper to clean up after test
  async function cleanup(testDir) {
    try {
      await fs.remove(testDir);
    } catch (error) {
      // Ignore cleanup errors
    }
  }

  describe('Basic Example Build', () => {
    test('should build basic example successfully', async () => {
      const outputPath = getTestOutputDir('basic-example-build');
      const configPath = path.join(
        __dirname,
        '../../examples/basic/resume.yaml'
      );

      await cleanup(outputPath);

      await buildResume({
        configPath,
        themeName: 'brittany',
        outputPath,
        language: 'en',
      });

      // Check that output files exist
      const indexExists = await fs.pathExists(
        path.join(outputPath, 'index.html')
      );
      const stylesExist = await fs.pathExists(
        path.join(outputPath, 'styles.css')
      );

      assert.strictEqual(indexExists, true);
      assert.strictEqual(stylesExist, true);

      await cleanup(outputPath);
    });

    test('should generate valid HTML', async () => {
      const outputPath = getTestOutputDir('basic-html');
      const configPath = path.join(
        __dirname,
        '../../examples/basic/resume.yaml'
      );

      await cleanup(outputPath);

      await buildResume({
        configPath,
        themeName: 'brittany',
        outputPath,
        language: 'en',
      });

      const html = await fs.readFile(
        path.join(outputPath, 'index.html'),
        'utf8'
      );

      // Check for valid HTML structure
      assert.ok(html.includes('<!DOCTYPE html>'));
      assert.ok(html.includes('<html'));
      assert.ok(html.includes('<head>'));
      assert.ok(html.includes('<body'));  // Match <body with or without attributes
      assert.ok(html.includes('</html>'));

      await cleanup(outputPath);
    });

    test('should include profile data in output', async () => {
      const outputPath = getTestOutputDir('basic-profile');
      const configPath = path.join(
        __dirname,
        '../../examples/basic/resume.yaml'
      );

      await cleanup(outputPath);

      await buildResume({
        configPath,
        themeName: 'brittany',
        outputPath,
        language: 'en',
      });

      const html = await fs.readFile(
        path.join(outputPath, 'index.html'),
        'utf8'
      );

      // Check that profile data is included
      assert.ok(html.includes('John Doe'));
      assert.ok(html.includes('john.doe@example.com'));

      await cleanup(outputPath);
    });
  });

  describe('Minimal Example Build', () => {
    test('should build minimal example successfully', async () => {
      const configPath = path.join(
        __dirname,
        '../../examples/minimal/resume.yaml'
      );
      const outputPath = getTestOutputDir('minimal');

      await buildResume({
        configPath,
        themeName: 'brittany',
        outputPath,
        language: 'en',
      });

      const indexExists = await fs.pathExists(
        path.join(outputPath, 'index.html')
      );
      assert.strictEqual(indexExists, true);
    });

    test('should handle minimal data gracefully', async () => {
      const configPath = path.join(
        __dirname,
        '../../examples/minimal/resume.yaml'
      );
      const outputPath = getTestOutputDir('minimal-data');

      await buildResume({
        configPath,
        themeName: 'brittany',
        outputPath,
        language: 'en',
      });

      const html = await fs.readFile(
        path.join(outputPath, 'index.html'),
        'utf8'
      );

      assert.ok(html.includes('Jane Smith'));
    });
  });

  describe('Multilingual Example Build', () => {
    test('should build English version', async () => {
      const configPath = path.join(
        __dirname,
        '../../examples/multilingual/resume.yaml'
      );
      const outputPath = getTestOutputDir('multilingual-en');

      await buildResume({
        configPath,
        themeName: 'brittany',
        outputPath,
        language: 'en',
      });

      const html = await fs.readFile(
        path.join(outputPath, 'index.html'),
        'utf8'
      );

      assert.ok(html.includes('Experience'));
      assert.ok(html.includes('Education'));
    });

    test('should build French version', async () => {
      const configPath = path.join(
        __dirname,
        '../../examples/multilingual/resume.yaml'
      );
      const outputPath = getTestOutputDir('multilingual-fr');

      await buildResume({
        configPath,
        themeName: 'brittany',
        outputPath,
        language: 'fr',
      });

      const html = await fs.readFile(
        path.join(outputPath, 'index.html'),
        'utf8'
      );

      assert.ok(html.includes('Expérience'));
      assert.ok(html.includes('Formation'));
    });

    test('should build Spanish version', async () => {
      const configPath = path.join(
        __dirname,
        '../../examples/multilingual/resume.yaml'
      );
      const outputPath = getTestOutputDir('multilingual-es');

      await buildResume({
        configPath,
        themeName: 'brittany',
        outputPath,
        language: 'es',
      });

      const html = await fs.readFile(
        path.join(outputPath, 'index.html'),
        'utf8'
      );

      assert.ok(html.includes('Experiencia'));
      assert.ok(html.includes('Educación'));
    });
  });

  describe('Error Handling', () => {
    test('should throw error for non-existent config', async () => {
      const outputPath = getTestOutputDir('error-nonexistent');

      await assert.rejects(
        buildResume({
          configPath: '/non/existent/config.yaml',
          themeName: 'brittany',
          outputPath,
          language: 'en',
        })
      );

      await cleanup(outputPath);
    });

    test('should throw error for invalid theme', async () => {
      const outputPath = getTestOutputDir('error-invalid-theme');
      const configPath = path.join(
        __dirname,
        '../../examples/basic/resume.yaml'
      );

      await assert.rejects(
        buildResume({
          configPath,
          themeName: 'non-existent-theme',
          outputPath,
          language: 'en',
        })
      );

      await cleanup(outputPath);
    });
  });

  describe('CSS Generation', () => {
    test('should generate CSS file', async () => {
      const configPath = path.join(
        __dirname,
        '../../examples/basic/resume.yaml'
      );
      const outputPath = getTestOutputDir('css-test');

      await buildResume({
        configPath,
        themeName: 'brittany',
        outputPath,
        language: 'en',
      });

      const cssExists = await fs.pathExists(
        path.join(outputPath, 'styles.css')
      );
      assert.strictEqual(cssExists, true);

      const css = await fs.readFile(
        path.join(outputPath, 'styles.css'),
        'utf8'
      );

      // Check that CSS has some content
      assert.ok(css.length > 0);
    });
  });
});
