# Multilingual Resume Example

This example demonstrates how to create a fully multilingual resume with:
- **Inline content translation** - Your resume content in multiple languages
- **Multi-language site generation** - Single build creates all language versions
- **Dynamic language switching** - Users can switch between languages in-browser

## Supported Languages

- **English** (en)
- **French** (fr) / Français
- **Spanish** (es) / Español

## Structure

```
examples/multilingual/
├── resume.yaml           # Main resume data (language-neutral)
├── locales/
│   ├── en/
│   │   └── content.yaml  # English translations (optional)
│   ├── fr/
│   │   └── content.yaml  # French translations (optional)
│   └── es/
│       └── content.yaml  # Spanish translations (optional)
└── README.md
```

## Key Features Demonstrated

### 1. Inline Content Translation

Resume content fields support language-specific values:

```yaml
profile:
  introduction:
    en: Experienced software engineer...
    fr: Ingénieure logicielle expérimentée...
    es: Ingeniera de software experimentada...

experience:
  - position:
      en: Senior Full-Stack Developer
      fr: Développeuse Full-Stack Senior
      es: Desarrolladora Full-Stack Senior
    tasks:
      - en: Led team of 5 developers
        fr: Direction d'une équipe de 5 développeurs
        es: Lideré un equipo de 5 desarrolladores
```

### 2. Multi-Language Site Generation

A single build creates a complete multi-language site:

```bash
node src/cli.js build -c examples/multilingual/resume.yaml -o dist
```

This generates:
- `/index.html` - English version (default language)
- `/fr/index.html` - French version
- `/es/index.html` - Spanish version
- Language switcher in header for easy navigation

### 3. Language Configuration

Control which languages to build and where to place them:

```yaml
site:
  languages: [en, fr, es]  # Only build these languages (optional)
  defaultLanguage: en      # Place English at root (optional)
```

**`languages`**:
- Specifies which languages to build
- If omitted, builds all available theme languages
- Must be valid theme-supported languages

**`defaultLanguage`**:
- Places specified language at root URL
- If omitted, root shows a language selector page
- Must be included in `languages` array if both are specified

## Building Options

### Build All Languages (Default)

```bash
node src/cli.js build -c examples/multilingual/resume.yaml -o dist
```

Generates a multi-language site with all available languages.

### Build Single Language

```bash
# Build only French version
node src/cli.js build -c examples/multilingual/resume.yaml -l fr -o dist

# Build only Spanish version
node src/cli.js build -c examples/multilingual/resume.yaml -l es -o dist
```

## How It Works

### Content Translation Flow

1. **resume.yaml** contains content with inline language objects
2. During build, `translateConfig()` resolves each field to the target language
3. Falls back: target language → English → first available language
4. Theme receives fully translated content for each language version

### UI Translation

- Section headings (Experience, Education, etc.) come from theme locales
- Labels (Present, Location, Email, etc.) come from theme locales
- Users can override theme labels by creating `locales/` directory

### Translation Resolution

For each translatable field:
```yaml
# Simple string (backwards compatible)
position: Senior Developer

# Multi-language object
position:
  en: Senior Developer
  fr: Développeur Senior
  es: Desarrollador Senior
```

## Translatable Fields

All text fields support inline translation:

- **Profile**: `introduction`, `address`
- **Experience**: `position`, `description`, `tasks` (array items)
- **Education**: `degree`, `field`, `honors`, `description`
- **Skills**: `category`, `items` (array items)
- **Languages**: `language` (name)
- **Hobbies**: array items

## Using This as a Template

Copy this example to create your own multilingual resume:

```bash
cp -r examples/multilingual resumes/my-resume
cd resumes/my-resume
```

Edit `resume.yaml` with your content:
1. Update profile information
2. Add your experience, education, skills
3. Provide translations for each language you want to support
4. Build: `node src/cli.js build -c resumes/my-resume/resume.yaml`

## Tips

- Start with one language, then add translations incrementally
- Use fallback: if you only translate key fields, others default to English
- Technologies and platform names usually don't need translation
- Test each language: `node src/cli.js build -c resume.yaml -l fr`
