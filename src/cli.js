#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const { buildResume } = require('./generator');

program
  .name('resume-crafter')
  .description(
    'A static website generator for creating professional resume websites'
  )
  .version('1.0.0');

program
  .command('build')
  .description('Build a resume website from configuration')
  .option('-c, --config <path>', 'Path to config file', './config.json')
  .option('-t, --theme <name>', 'Theme name to use', 'default')
  .option('-o, --output <path>', 'Output directory', './dist')
  .action(async (options) => {
    try {
      console.log('Building resume...');
      await buildResume({
        configPath: path.resolve(options.config),
        themeName: options.theme,
        outputPath: path.resolve(options.output),
      });
      console.log('✓ Resume built successfully!');
    } catch (error) {
      console.error('Error building resume:', error.message);
      process.exit(1);
    }
  });

program.parse();
