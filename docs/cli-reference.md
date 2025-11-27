# CLI Reference

Complete reference for all Resume Crafter command-line interface commands.

## Table of Contents

- [Commands](#commands)
  - [init](#init)
  - [build](#build)
  - [validate](#validate)
  - [list-themes](#list-themes)
- [Global Options](#global-options)
- [Examples](#examples)

---

## Commands

### `init`

Create a new resume configuration file.

**Usage:**

```bash
node src/cli.js init [options]
```

**Options:**

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--output <path>` | `-o` | Output file path | `resumes/resume.yaml` |

**Examples:**

```bash
# Create resume in default location
node src/cli.js init

# Create resume with custom path
node src/cli.js init -o resumes/my-resume.yaml

# Create multiple resumes
node src/cli.js init -o resumes/resume-en.yaml
node src/cli.js init -o resumes/resume-fr.yaml
```

**What it does:**

- Creates a template `resume.yaml` with all available sections
- Includes helpful comments and examples
- Creates parent directories if needed
- Does not overwrite existing files (shows error)

---

### `build`

Build a resume website from configuration.

**Usage:**

```bash
node src/cli.js build [options]
```

**Options:**

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--config <path>` | `-c` | Path to resume config file | `resumes/resume.yaml` |
| `--theme <name>` | `-t` | Theme name to use | `brittany` |
| `--output <path>` | `-o` | Output directory | `./dist` |
| `--language <code>` | `-l` | Language code (e.g., en, fr, es) | Auto-detect all |
| `--single-language` | | Force single-language build | `false` |

**Examples:**

```bash
# Build with defaults
node src/cli.js build

# Build specific config
node src/cli.js build -c resumes/my-resume.yaml

# Build with specific theme
node src/cli.js build -t custom-theme

# Build to custom output directory
node src/cli.js build -o public

# Build only French version
node src/cli.js build -l fr

# Build single language (first available)
node src/cli.js build --single-language

# Combined options
node src/cli.js build -c resumes/resume-fr.yaml -t default -o dist-fr -l fr
```

**What it does:**

1. Loads and validates configuration
2. Loads specified theme
3. Detects or uses specified languages
4. Translates content for each language
5. Generates HTML for each language
6. Processes CSS with Tailwind
7. Copies theme assets
8. Creates output in specified directory

**Build Behavior:**

**Multi-language (default):**
- Builds all languages specified in `site.languages`
- Or all available theme languages if not specified
- Creates language subdirectories (e.g., `/fr/`, `/es/`)
- Adds language switcher to pages

**Single language:**
- Use `-l <code>` to build only one language
- Use `--single-language` to force single-language mode
- No language subdirectories
- No language switcher

**Output Structure:**

Multi-language:
```
dist/
├── index.html           # Default language or selector
├── fr/index.html        # French version
├── es/index.html        # Spanish version
├── styles.css           # Compiled CSS
└── assets/              # Theme assets
```

Single language:
```
dist/
├── index.html           # Resume in specified language
├── styles.css
└── assets/
```

---

### `validate`

Validate a resume configuration file without building.

**Usage:**

```bash
node src/cli.js validate [options]
```

**Options:**

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--config <path>` | `-c` | Path to config file | `resumes/resume.yaml` |

**Examples:**

```bash
# Validate default resume
node src/cli.js validate

# Validate specific file
node src/cli.js validate -c resumes/my-resume.yaml
```

**What it validates:**

- YAML syntax is correct
- Required fields are present (`profile.name`, etc.)
- Field types are correct (strings, arrays, objects)
- Date formats are valid (YYYY-MM)
- Email format is valid
- URLs are properly formatted
- Enum values are valid (proficiency levels)
- Translatable fields have correct structure

**Example Output:**

```bash
# Success
Loading configuration: resumes/resume.yaml
✓ Configuration validated successfully
✓ Resume configuration is valid

# Error
Loading configuration: resumes/resume.yaml
✗ Configuration validation failed
Error: profile.email must be a valid email address
```

---

### `list-themes`

Display all available themes with their metadata.

**Usage:**

```bash
node src/cli.js list-themes
```

**No options required.**

**Example Output:**

```
Available themes:

✓ default
  Name: Default Professional
  Version: 1.0.0
  Description: A clean, professional resume theme with modern design
  Supported Languages: en, fr, es

✓ minimal
  Name: Minimal
  Version: 1.0.0
  Description: A minimalist theme focused on content
  Supported Languages: en
```

**What it shows:**

- Theme ID (used with `-t` flag)
- Display name
- Version number
- Description
- Supported languages

---

## Global Options

These options work with all commands:

| Option | Description |
|--------|-------------|
| `-h, --help` | Display help for command |
| `-V, --version` | Display version number |

**Examples:**

```bash
# Show help for build command
node src/cli.js build --help

# Show CLI version
node src/cli.js --version

# Show general help
node src/cli.js --help
```

---

## Examples

### Common Workflows

**Create and build a new resume:**

```bash
# 1. Initialize
node src/cli.js init

# 2. Edit resumes/resume.yaml (use your editor)

# 3. Validate
node src/cli.js validate

# 4. Build
node src/cli.js build

# 5. Preview
open dist/index.html
```

**Build multilingual resume:**

```bash
# Ensure resume.yaml has translations
# Then build all languages
node src/cli.js build

# Or build specific languages
node src/cli.js build -l en  # English only
node src/cli.js build -l fr  # French only
```

**Test different themes:**

```bash
# List available themes
node src/cli.js list-themes

# Try each theme
node src/cli.js build -t default -o dist-default
node src/cli.js build -t minimal -o dist-minimal

# Compare in browser
open dist-default/index.html
open dist-minimal/index.html
```

**Multiple resume configs:**

```bash
# Create multiple resumes
node src/cli.js init -o resumes/resume-tech.yaml
node src/cli.js init -o resumes/resume-academic.yaml

# Build separately
node src/cli.js build -c resumes/resume-tech.yaml -o dist-tech
node src/cli.js build -c resumes/resume-academic.yaml -o dist-academic
```

**Development workflow:**

```bash
# Make changes to resume.yaml
# Quick validate and build
node src/cli.js validate && node src/cli.js build && open dist/index.html
```

---

## NPM Scripts

For convenience, common commands are available as npm scripts:

```bash
# Build example resume
npm run build

# Watch mode for development
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

These scripts are defined in `package.json` and use the CLI commands internally.

---

## Exit Codes

Resume Crafter CLI uses standard exit codes:

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | Error (validation failed, build failed, etc.) |

**Use in scripts:**

```bash
# Stop on error
node src/cli.js validate && node src/cli.js build

# Continue on error
node src/cli.js validate || echo "Validation failed, but continuing..."
node src/cli.js build
```

---

## Environment Variables

None currently used. Configuration is through command-line options only.

---

## Related Documentation

- **[Getting Started](getting-started.md)** - First steps
- **[Configuration](configuration.md)** - Config file reference
- **[Themes](themes.md)** - Using themes
- **[Deployment](deployment.md)** - Publishing your resume

---

## Troubleshooting

**Command not found:**

```bash
# Use full path
node src/cli.js build

# Or create alias in ~/.bashrc or ~/.zshrc
alias resume-crafter="node /path/to/resume-crafter/src/cli.js"
resume-crafter build
```

**Permission errors:**

```bash
# Ensure write permissions
chmod +w dist/

# Or build to different directory
node src/cli.js build -o ~/my-resume/dist
```

**Memory issues (large builds):**

```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" node src/cli.js build
```

---

**Need help?** Open an issue on [GitHub](https://github.com/JasonBenett/resume-crafter/issues)
