# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Resume Crafter is a static website generator for creating professional resume websites. It generates deployment-ready static sites from JSON configuration files without requiring a database.

Key features:
- **Theme-based system**: Fully configurable output using built-in or custom themes
- **Multi-language support**: Generate resumes in different languages if theme supports it
- **Config-driven**: All content stored in JSON files (no database)
- **Static output**: Generates ready-to-deploy static HTML/CSS

## Project Documentation

- `requirements/MVP_TASKS.md` - Detailed MVP task list (kept up-to-date with progress)
  - **Phase 1: Project Foundation & Setup** ✅ Complete
  - Phase 2-9: In progress

## Tech Stack

- Node.js (runtime and build tooling)
- Tailwind CSS v4 with `@tailwindcss/postcss`
- Handlebars (templating engine)
- PostCSS + Autoprefixer (CSS processing)
- Commander (CLI framework)
- Ajv (JSON schema validation)
- CommonJS modules (`"type": "commonjs"` in package.json)

## Content Types

The system supports these resume content types via config files:

- **Profile**: name, date of birth, phone, city, country, introduction/description
- **Professional Experience**: date ranges, company, title, description, tasks
- **Education/Diplomas**: date, school, title, results, description
- **Hobbies**: list of interests
- **Social Networks**: LinkedIn, Dribbble, and other platform links

## Development Commands

- `npm run build` - Build resume from config (uses default theme, looks for config.json)
- `npm run dev` - Watch mode for development (rebuilds on file changes)
- `npm run lint` - Run ESLint on source code
- `npm run format` - Auto-format code with Prettier
- `npm run format:check` - Check if code is properly formatted
- `npm test` - Run tests (placeholder for Phase 8)

### CLI Commands

- `node src/cli.js build` - Build with default options
- `node src/cli.js build -c path/to/config.json` - Specify config file
- `node src/cli.js build -t theme-name` - Use specific theme
- `node src/cli.js build -o output/dir` - Specify output directory

## Architecture

### Directory Structure

- `requirements/` - Project requirements and task tracking
  - `reqs.md` - Original requirements
  - `MVP_TASKS.md` - Detailed MVP checklist (kept up-to-date)
- `src/` - Core generator logic
  - `cli.js` - Command-line interface using Commander
  - `index.js` - Main module exports
  - `generator/` - Build orchestration
    - `index.js` - Main build function that coordinates the generation process
  - `config/` - Configuration loading and validation (Phase 2)
  - `themes/` - Theme loading and processing (Phase 3)
  - `utils/` - Utility functions
    - `cssProcessor.js` - Tailwind CSS processing with PostCSS
    - `fileHandler.js` - File system operations (copy, write, clean)
- `themes/` - Theme templates and assets
  - `default/` - Default professional theme
    - `templates/` - Handlebars templates (Phase 5)
    - `assets/` - Theme-specific assets
      - `styles.css` - Base CSS with Tailwind imports
- `examples/` - Example configuration files (Phase 7)
- `dist/` - Generated static site output (gitignored)

### Build Pipeline (Phase 1 - Complete)

1. Clean output directory
2. Process CSS with Tailwind v4 via PostCSS
3. Copy theme assets to output
4. (Phase 4) Generate HTML from templates and config
5. (Phase 4) Optimize output files

### Code Quality

- ESLint with flat config format (eslint.config.js)
- Prettier for consistent formatting
- All code follows CommonJS module pattern