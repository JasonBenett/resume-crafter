# Contributing to Resume Crafter

Thank you for your interest in contributing to Resume Crafter! This project was created entirely with [Claude Code](https://claude.com/claude-code), and we welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to build something useful together.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/resume-crafter.git
   cd resume-crafter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Prerequisites

- Node.js 18+ (for native test runner)
- npm or yarn
- Git

### Install Dependencies

```bash
npm install
```

### Development Commands

```bash
# Build the example resume
npm run build

# Watch for changes and rebuild
npm run dev

# Run tests
npm test

# Run linting
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

## Project Structure

```
resume-crafter/
├── src/
│   ├── cli.js              # CLI interface (Commander.js)
│   ├── generator/          # Build orchestration
│   ├── config/             # YAML loading & validation
│   │   ├── loader.js       # YAML file loading
│   │   ├── validator.js    # Ajv schema validation
│   │   ├── i18n.js         # Internationalization
│   │   └── schemas/        # JSON schemas
│   ├── themes/             # Theme system
│   │   ├── loader.js       # Theme discovery
│   │   └── templateEngine.js  # Handlebars engine
│   └── utils/              # Utilities
├── themes/
│   └── default/            # Default theme
│       ├── theme.json      # Theme configuration
│       ├── templates/      # Handlebars templates
│       └── assets/         # CSS and assets
├── examples/               # Example configurations
├── tests/                  # Test files
│   ├── unit/              # Unit tests
│   └── integration/       # Integration tests
└── requirements/           # Project requirements
```

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/JasonBenett/resume-crafter/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (Node version, OS)
   - Error messages or logs

### Suggesting Features

1. Check existing issues and discussions
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Contributing Code

Good first issues:
- Fix typos in documentation
- Improve error messages
- Add tests for existing features
- Create new themes
- Add new locale translations

## Coding Guidelines

### Code Style

- Use **CommonJS** modules (`require`/`module.exports`)
- Follow existing code patterns
- Run `npm run format` before committing
- Ensure `npm run lint` passes

### JavaScript

- Use async/await for asynchronous code
- Prefer const over let, avoid var
- Use descriptive variable names
- Add JSDoc comments for functions

Example:
```javascript
/**
 * Load and validate a resume configuration file
 * @param {string} configPath - Path to the YAML configuration file
 * @returns {Promise<Object>} Validated configuration object
 * @throws {Error} If file not found or validation fails
 */
async function loadAndValidateConfig(configPath) {
  // Implementation
}
```

### Error Handling

- Always provide helpful error messages
- Include context in error messages
- Use try-catch for async operations

Good:
```javascript
throw new Error(`Theme "${themeName}" not found in themes directory`);
```

Bad:
```javascript
throw new Error('Theme not found');
```

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Adding or updating tests
- `refactor:` Code refactoring
- `style:` Formatting changes
- `chore:` Maintenance tasks

Example:
```
feat: add PDF export functionality

- Implement PDF generation using puppeteer
- Add --pdf flag to CLI
- Update documentation
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Writing Tests

We use Node's native test runner (`node:test`).

Example unit test:
```javascript
const { describe, test } = require('node:test');
const assert = require('node:assert');

describe('Feature Name', () => {
  test('should do something', () => {
    const result = myFunction();
    assert.strictEqual(result, expectedValue);
  });
});
```

### Test Guidelines

- Write tests for new features
- Maintain or improve test coverage
- Test both success and error cases
- Use descriptive test names

## Submitting Changes

### Pull Request Process

1. **Update your fork:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ensure quality:**
   - All tests pass (`npm test`)
   - Code is formatted (`npm run format`)
   - Linting passes (`npm run lint`)
   - Documentation is updated

3. **Create pull request:**
   - Clear title describing the change
   - Description of what changed and why
   - Reference related issues
   - Include screenshots for UI changes

4. **PR Review:**
   - Address review feedback
   - Keep PR focused on one feature/fix
   - Squash commits if requested

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Tests pass locally
- [ ] Added new tests

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## Creating Themes

See [THEME_DEVELOPMENT.md](THEME_DEVELOPMENT.md) for detailed guide on creating custom themes.

Quick checklist:
- Create theme directory in `themes/`
- Add `theme.json` with metadata
- Create templates using Handlebars
- Add styles (Tailwind CSS v4)
- Test with all example configs
- Document special features

## Adding Translations

To add a new language:

1. Create locale directory:
   ```
   examples/multilingual/locales/[lang-code]/content.yaml
   ```

2. Translate all keys:
   ```yaml
   sections:
     experience: [Translation]
     education: [Translation]

   labels:
     present: [Translation]
     location: [Translation]
   ```

3. Test with:
   ```bash
   node src/cli.js build -c examples/multilingual/resume.yaml -l [lang-code]
   ```

## Questions?

- Open an issue for questions
- Check existing documentation
- Review [THEME_DEVELOPMENT.md](THEME_DEVELOPMENT.md)

## Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- Project documentation

Thank you for contributing to Resume Crafter!

---

**Built with [Claude Code](https://claude.com/claude-code)**
