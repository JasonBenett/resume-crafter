# Contributing to Resume Crafter

Thank you for your interest in contributing to Resume Crafter! This guide will help you get started with development.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Running Tests](#running-tests)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)
- [Creating Themes](#creating-themes)

---

## Development Setup

### Prerequisites

- **Node.js** v20 or higher
- **Git**
- Text editor or IDE (VS Code recommended)

### Setup Steps

**1. Fork and clone:**

```bash
# Fork on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/resume-crafter.git
cd resume-crafter
```

**2. Install dependencies:**

```bash
npm install
```

**3. Verify setup:**

```bash
# Run tests
npm test

# Build example
npm run build

# Preview
open dist/index.html
```

---

## Project Structure

```
resume-crafter/
├── src/
│   ├── cli.js                  # CLI entry point
│   ├── config/                 # Configuration loading & validation
│   │   ├── index.js
│   │   ├── loader.js           # YAML loading
│   │   ├── i18n.js             # Internationalization
│   │   ├── translator.js       # Content translation
│   │   └── schemas/            # JSON Schema validation
│   ├── generator/              # Build orchestration
│   │   └── index.js
│   ├── themes/                 # Theme loading & rendering
│   │   └── index.js
│   └── utils/                  # Utilities
│       ├── cssProcessor.js     # Tailwind CSS compilation
│       └── fileHandler.js      # File operations
│
├── themes/                     # Theme templates
│   └── default/
│       ├── theme.json          # Theme metadata
│       ├── locales/            # UI translations
│       ├── templates/          # Handlebars templates
│       └── assets/             # CSS and assets
│
├── examples/                   # Example configurations
│   ├── basic/
│   └── multilingual/
│
├── tests/                      # Test files
│   └── *.test.js
│
├── docs/                       # Documentation
└── dist/                       # Build output (gitignored)
```

### Key Modules

- **`src/config/`** - Handles YAML loading, schema validation, and translations
- **`src/generator/`** - Orchestrates the build process
- **`src/themes/`** - Loads themes and renders HTML with Handlebars
- **`src/utils/cssProcessor.js`** - Compiles Tailwind CSS
- **`themes/default/`** - Default theme implementation

---

## Development Workflow

### Making Changes

**1. Create a branch:**

```bash
git checkout -b feature/your-feature-name
```

**2. Make your changes**

Edit source files in `src/` or themes in `themes/`.

**3. Test locally:**

```bash
# Run tests
npm test

# Lint code
npm run lint

# Build and preview
npm run build
open dist/index.html
```

**4. Format code:**

```bash
npm run format
```

**5. Commit:**

```bash
git add .
git commit -m "Add feature: description"
```

### Testing Your Changes

Always test with multiple scenarios:

```bash
# Test basic example
node src/cli.js build -c examples/basic/resume.yaml -o dist-basic

# Test multilingual
node src/cli.js build -c examples/multilingual/resume.yaml -o dist-multi

# Test validation
node src/cli.js validate -c examples/basic/resume.yaml

# Test specific language
node src/cli.js build -c examples/multilingual/resume.yaml -l fr -o dist-fr
```

---

## Running Tests

Resume Crafter uses **Node.js native test runner** (node:test).

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
node --test tests/config.test.js
```

### Watch Mode

```bash
npm run test:watch
```

### Writing Tests

Tests use the native Node.js test runner:

```javascript
const { test, describe } = require('node:test');
const assert = require('node:assert');

describe('Feature Name', () => {
  test('should do something', () => {
    const result = functionToTest();
    assert.strictEqual(result, expectedValue);
  });
});
```

### Test Coverage

```bash
node --test --experimental-test-coverage
```

---

## Code Style

Resume Crafter uses **ESLint** and **Prettier**.

### Linting

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### Style Guidelines

- **Use CommonJS** (`require()`, `module.exports`)
- **Async/await** for asynchronous code
- **JSDoc comments** for functions
- **Descriptive variable names**
- **Early returns** for error handling

**Example:**

```javascript
/**
 * Load and validate configuration file
 * @param {string} configPath - Path to config file
 * @returns {Promise<Object>} Validated configuration
 */
async function loadAndValidateConfig(configPath) {
  // Validate input
  if (!configPath) {
    throw new Error('Config path is required');
  }

  // Load YAML
  const config = await loadYamlFile(configPath);

  // Validate schema
  validateConfig(config);

  return config;
}
```

---

## Submitting Changes

### Pull Request Process

**1. Push your branch:**

```bash
git push origin feature/your-feature-name
```

**2. Create Pull Request:**

- Go to GitHub and create a PR from your branch
- Fill out the PR template
- Link any related issues

**3. PR Requirements:**

- ✅ All tests pass
- ✅ Code is linted and formatted
- ✅ New features have tests
- ✅ Documentation is updated
- ✅ Commit messages are descriptive

**4. Review Process:**

- Maintainers will review your PR
- Address any feedback
- Once approved, it will be merged

### Commit Message Guidelines

Use clear, descriptive commit messages:

```
Add feature: inline content translation

- Implemented translator module with fallback system
- Updated schemas to support translatable fields
- Added comprehensive tests
- Updated documentation
```

**Format:**
- First line: Brief description (50 chars max)
- Blank line
- Detailed description with bullet points

---

## Creating Themes

See the [Theme Development Guide](theme-development.md) for detailed instructions on creating custom themes.

**Quick steps:**

1. Copy default theme as template:
   ```bash
   cp -r themes/default themes/my-theme
   ```

2. Update `themes/my-theme/theme.json`:
   ```json
   {
     "name": "My Custom Theme",
     "version": "1.0.0",
     "description": "Description of your theme"
   }
   ```

3. Modify templates and styles

4. Test:
   ```bash
   node src/cli.js build -t my-theme
   ```

5. Submit PR with your theme!

---

## Development Tips

### Debugging

**Enable verbose logging:**

```bash
# Add console.log statements in src/
node src/cli.js build
```

**Inspect generated HTML:**

```bash
# Check dist/index.html
cat dist/index.html | head -100
```

**Test CSS compilation:**

```bash
# Check Tailwind output
cat dist/styles.css | less
```

### Hot Reload (Watch Mode)

For faster development:

```bash
npm run dev
```

Watches for changes and rebuilds automatically.

### Testing Translation Features

Create test configs with different translation scenarios:

```yaml
# Test fallback
profile:
  introduction:
    en: "English text"
    # Missing fr - should fallback to en

# Test mixed content
experience:
  - position: "Simple string"  # Works in all languages
  - position:
      en: "Translated"
      fr: "Traduit"
```

---

## Project Architecture

### Build Flow

```
1. Load config (src/config/loader.js)
   ↓
2. Validate (src/config/schemas/)
   ↓
3. Load theme (src/themes/index.js)
   ↓
4. Detect/configure languages (src/config/i18n.js)
   ↓
5. For each language:
   a. Translate content (src/config/translator.js)
   b. Merge UI translations (src/config/i18n.js)
   c. Render HTML (src/themes/ + Handlebars)
   ↓
6. Process CSS (src/utils/cssProcessor.js)
   ↓
7. Copy assets (src/utils/fileHandler.js)
   ↓
8. Output to dist/
```

### Key Technologies

- **Handlebars** - Templating engine
- **Tailwind CSS v4** - Styling
- **Ajv** - JSON Schema validation
- **js-yaml** - YAML parsing
- **Node.js native modules** - File operations, testing

---

## Getting Help

- **Questions:** Open a [GitHub Discussion](https://github.com/JasonBenett/resume-crafter/discussions)
- **Bugs:** Report an [Issue](https://github.com/JasonBenett/resume-crafter/issues)
- **Chat:** Join the community chat (if available)

---

## Code of Conduct

Be respectful and inclusive:

- Welcome newcomers
- Provide constructive feedback
- Respect different perspectives
- Focus on the code, not the person

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Resume Crafter!**

Your contributions help make resume creation easier for everyone.
