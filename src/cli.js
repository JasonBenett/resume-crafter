#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs-extra');
const { buildResume } = require('./generator');
const { loadAndValidateConfig } = require('./config');
const { discoverThemes, loadThemeConfig } = require('./themes');

program
  .name('resume-crafter')
  .description(
    'A static website generator for creating professional resume websites'
  )
  .version('1.0.0');

program
  .command('build')
  .description('Build a resume website from configuration')
  .option('-c, --config <path>', 'Path to config file', 'resumes/resume.yaml')
  .option('-t, --theme <name>', 'Theme name to use', 'default')
  .option('-o, --output <path>', 'Output directory', './dist')
  .option(
    '-l, --language <code>',
    'Language code (e.g., en, fr, es). If omitted, builds all available languages.'
  )
  .option(
    '--single-language',
    'Force single-language build (uses first available language)'
  )
  .action(async (options) => {
    try {
      console.log('Building resume...');
      await buildResume({
        configPath: path.resolve(options.config),
        themeName: options.theme,
        outputPath: path.resolve(options.output),
        language: options.language,
        multiLanguage: options.singleLanguage ? false : undefined,
      });
      console.log('✓ Resume built successfully!');
    } catch (error) {
      console.error('Error building resume:', error.message);
      process.exit(1);
    }
  });

// Init command - scaffold a starter configuration
program
  .command('init')
  .description('Create a starter resume configuration file')
  .option('-o, --output <path>', 'Output file path', 'resumes/resume.yaml')
  .action(async (options) => {
    try {
      const outputPath = path.resolve(options.output);

      // Ensure resumes directory exists
      await fs.ensureDir(path.dirname(outputPath));

      // Check if file already exists
      if (await fs.pathExists(outputPath)) {
        console.error(`Error: File already exists at ${outputPath}`);
        console.log('Use a different path or remove the existing file.');
        process.exit(1);
      }

      // Copy the example config
      const examplePath = path.join(__dirname, '../examples/basic/resume.yaml');
      await fs.copy(examplePath, outputPath);

      console.log('✓ Created starter configuration!');
      console.log(`  File: ${outputPath}`);
      console.log('\nNext steps:');
      console.log('  1. Edit the configuration file with your information');
      console.log('  2. Build your resume: node src/cli.js build');
    } catch (error) {
      console.error('Error creating configuration:', error.message);
      process.exit(1);
    }
  });

// List themes command
program
  .command('list-themes')
  .description('List all available themes')
  .action(async () => {
    try {
      console.log('Available themes:\n');
      const themes = await discoverThemes();

      for (const themeName of themes) {
        const config = await loadThemeConfig(themeName);
        console.log(`  ${themeName}`);
        console.log(`    Name: ${config.name}`);
        console.log(`    Version: ${config.version}`);
        if (config.description) {
          console.log(`    Description: ${config.description}`);
        }
        if (config.supportedLanguages) {
          console.log(`    Languages: ${config.supportedLanguages.join(', ')}`);
        }
        console.log('');
      }

      console.log(`Total: ${themes.length} theme(s)`);
    } catch (error) {
      console.error('Error listing themes:', error.message);
      process.exit(1);
    }
  });

// Validate command - check config without building
program
  .command('validate')
  .description('Validate a resume configuration file')
  .option('-c, --config <path>', 'Path to config file', 'resumes/resume.yaml')
  .action(async (options) => {
    try {
      const configPath = path.resolve(options.config);
      console.log(`Validating: ${configPath}`);

      const config = await loadAndValidateConfig(configPath);

      console.log('✓ Configuration is valid!');
      console.log(`  Profile: ${config.profile.name}`);

      // Show summary of content
      const sections = [];
      if (config.experience)
        sections.push(`${config.experience.length} experience entries`);
      if (config.education)
        sections.push(`${config.education.length} education entries`);
      if (config.skills)
        sections.push(`${config.skills.length} skill categories`);
      if (config.languages)
        sections.push(`${config.languages.length} languages`);
      if (config.hobbies) sections.push(`${config.hobbies.length} hobbies`);
      if (config.social) sections.push(`${config.social.length} social links`);

      if (sections.length > 0) {
        console.log(`  Content: ${sections.join(', ')}`);
      }
    } catch (error) {
      console.error('✗ Validation failed:', error.message);
      process.exit(1);
    }
  });

program.parse();
