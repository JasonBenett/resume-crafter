const { describe, test, before, after } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs-extra');
const { buildResume } = require('../../src/generator');

describe('Build Integration Tests', () => {
  const testOutputDir = path.join(__dirname, '../tmp/test-output');

  before(async () => {
    // Clean up test output directory before tests
    await fs.remove(testOutputDir);
  });

  after(async () => {
    // Clean up after all tests
    await fs.remove(path.join(__dirname, '../tmp'));
  });

  describe('Basic Example Build', () => {
    test('should build basic example successfully', async () => {
      const configPath = path.join(
        __dirname,
        '../../examples/basic/resume.yaml'
      );
      const outputPath = path.join(testOutputDir, 'basic');

      await buildResume({
        configPath,
        themeName: 'default',
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
    });

    test('should generate valid HTML', async () => {
      const configPath = path.join(
        __dirname,
        '../../examples/basic/resume.yaml'
      );
      const outputPath = path.join(testOutputDir, 'basic-html');

      await buildResume({
        configPath,
        themeName: 'default',
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
    });

    test('should include profile data in output', async () => {
      const configPath = path.join(
        __dirname,
        '../../examples/basic/resume.yaml'
      );
      const outputPath = path.join(testOutputDir, 'basic-profile');

      await buildResume({
        configPath,
        themeName: 'default',
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
    });
  });

  describe('Minimal Example Build', () => {
    test('should build minimal example successfully', async () => {
      const configPath = path.join(
        __dirname,
        '../../examples/minimal/resume.yaml'
      );
      const outputPath = path.join(testOutputDir, 'minimal');

      await buildResume({
        configPath,
        themeName: 'default',
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
      const outputPath = path.join(testOutputDir, 'minimal-data');

      await buildResume({
        configPath,
        themeName: 'default',
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
      const outputPath = path.join(testOutputDir, 'multilingual-en');

      await buildResume({
        configPath,
        themeName: 'default',
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
      const outputPath = path.join(testOutputDir, 'multilingual-fr');

      await buildResume({
        configPath,
        themeName: 'default',
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
      const outputPath = path.join(testOutputDir, 'multilingual-es');

      await buildResume({
        configPath,
        themeName: 'default',
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
      await assert.rejects(
        buildResume({
          configPath: '/non/existent/config.yaml',
          themeName: 'default',
          outputPath: testOutputDir,
          language: 'en',
        })
      );
    });

    test('should throw error for invalid theme', async () => {
      const configPath = path.join(
        __dirname,
        '../../examples/basic/resume.yaml'
      );

      await assert.rejects(
        buildResume({
          configPath,
          themeName: 'non-existent-theme',
          outputPath: testOutputDir,
          language: 'en',
        })
      );
    });
  });

  describe('CSS Generation', () => {
    test('should generate CSS file', async () => {
      const configPath = path.join(
        __dirname,
        '../../examples/basic/resume.yaml'
      );
      const outputPath = path.join(testOutputDir, 'css-test');

      await buildResume({
        configPath,
        themeName: 'default',
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
