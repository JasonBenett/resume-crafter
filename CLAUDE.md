# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Resume Crafter is a static website generator for creating professional resume websites. It generates deployment-ready static sites from JSON configuration files without requiring a database.

Key features:
- **Theme-based system**: Fully configurable output using built-in or custom themes
- **Multi-language support**: Generate resumes in different languages if theme supports it
- **Config-driven**: All content stored in JSON files (no database)
- **Static output**: Generates ready-to-deploy static HTML/CSS

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

- `npm run build` - Build resume from example config (examples/basic/resume.yaml)
- `npm run dev` - Watch mode for development (rebuilds on source/example changes)
- `npm run lint` - Run ESLint on source code
- `npm run format` - Auto-format code with Prettier
- `npm run format:check` - Check if code is properly formatted
- `npm test` - Run tests (placeholder for Phase 8)

### CLI Commands

- `node src/cli.js build` - Build with default options (resume.yaml, default theme, English)
- `node src/cli.js build -c path/to/resume.yaml` - Specify YAML config file
- `node src/cli.js build -t theme-name` - Use specific theme
- `node src/cli.js build -o output/dir` - Specify output directory
- `node src/cli.js build -l fr` - Build with French locale (if available)

## Architecture

### Directory Structure

- `src/` - Core generator logic
  - `cli.js` - Command-line interface using Commander
  - `index.js` - Main module exports
  - `generator/` - Build orchestration
    - `index.js` - Main build function that coordinates the generation process
  - `config/` - Configuration loading and validation (Phase 2 - Complete)
    - `index.js` - Main config module exports
    - `loader.js` - YAML file loading with js-yaml
    - `validator.js` - JSON schema validation with Ajv
    - `i18n.js` - Multi-language support utilities
    - `schemas/` - JSON schemas for validation
      - `resume.schema.js` - Master schema
      - `profile.schema.js` - Profile/personal info
      - `experience.schema.js` - Work experience
      - `education.schema.js` - Education/diplomas
      - `hobbies.schema.js` - Hobbies list
      - `social.schema.js` - Social media links
  - `themes/` - Theme loading and processing (Phase 3)
  - `utils/` - Utility functions
    - `cssProcessor.js` - Tailwind CSS processing with PostCSS
    - `fileHandler.js` - File system operations (copy, write, clean)
- `themes/` - Theme templates and assets
  - `default/` - Default professional theme
    - `templates/` - Handlebars templates (Phase 5)
    - `assets/` - Theme-specific assets
      - `styles.css` - Base CSS with Tailwind imports
- `examples/` - Example configuration files
  - `basic/` - Basic example with all features
    - `resume.yaml` - Complete resume configuration example
    - `locales/en/content.yaml` - English translations
- `dist/` - Generated static site output (gitignored)

### Configuration System (Phase 2 - Complete)

**YAML-based Configuration:**
- Uses YAML for human-friendly configuration files
- JSON Schema validation ensures data integrity
- Comprehensive schemas for all content types (profile, experience, education, skills, languages, hobbies, social)
- Helpful error messages for validation failures

**Multi-language Support (i18n):**
- Themes provide default UI translations in `themes/{theme}/locales/{lang}/content.yaml`
- Users can optionally override translations in their config's `locales/` directory
- Merge priority: Theme defaults → User overrides
- CLI flag `--language` to specify language
- Graceful fallback when locale not found
- Default theme supports: English (en), French (fr), Spanish (es)

**Example Usage:**
```bash
# Build with theme's English translations
node src/cli.js build -c examples/basic/resume.yaml -l en

# Build with theme's French translations
node src/cli.js build -c examples/basic/resume.yaml -l fr

# Build with user's custom locale overrides (if provided)
node src/cli.js build -c examples/multilingual/resume.yaml -l fr
```

### Theme System (Phase 3 - Complete)

**Handlebars-based Templating:**
- Uses Handlebars for flexible, powerful templates
- Support for partials (reusable components)
- Custom helpers: `formatDate`, `hasItems`, `eq`, `t` (translations)
- Theme configuration via theme.json

**Theme Structure:**
```
themes/
  default/
    theme.json           # Theme metadata and configuration
    locales/             # Theme UI translations
      en/content.yaml    # English UI labels
      fr/content.yaml    # French UI labels
      es/content.yaml    # Spanish UI labels
    templates/
      index.hbs          # Main template
      header.hbs         # Header partial
      experience.hbs     # Experience section
      education.hbs      # Education section
      skills.hbs         # Skills section
      languages.hbs      # Languages section
      hobbies.hbs        # Hobbies section
      social.hbs         # Social links section
    assets/
      styles.css         # Theme CSS with Tailwind
```

**Theme Discovery & Loading:**
- Automatic theme discovery in `themes/` directory
- JSON schema validation for theme.json
- Theme loader with error handling
- Support for custom themes

**Default Theme Features:**
- Clean, professional design
- Responsive layout (mobile-friendly)
- Print-friendly styles
- All content sections supported
- Tailwind CSS styling with custom primary colors

### Build Pipeline

1. Load and validate resume configuration (YAML)
2. Load theme (Handlebars templates + theme config)
3. Load and merge locale translations (theme defaults + user overrides)
4. Clean output directory
5. Generate HTML from templates + data + locales
6. Process CSS with Tailwind v4 via PostCSS
7. Copy theme assets (images, fonts, etc.)
8. Output ready-to-deploy static site

### Code Quality

- ESLint with flat config format (eslint.config.js)
- Prettier for consistent formatting
- All code follows CommonJS module pattern