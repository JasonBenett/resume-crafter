# Multi-Language Support

Resume Crafter provides comprehensive multi-language support, allowing you to create resumes that work seamlessly across multiple languages.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Language Configuration](#language-configuration)
- [Inline Content Translation](#inline-content-translation)
- [UI Translations](#ui-translations)
- [Build Strategies](#build-strategies)
- [Complete Example](#complete-example)
- [Best Practices](#best-practices)

---

## Overview

Resume Crafter supports two types of translations:

1. **Content Translation** - Your resume content (job titles, descriptions, etc.)
2. **UI Translation** - Interface labels (section headings, buttons, etc.)

**Key Features:**

- Inline content translation in a single YAML file
- Automatic multi-language site generation
- Dynamic language switching in the browser
- Theme-provided UI translations with optional overrides
- Fallback system for missing translations

---

## Quick Start

Create a multilingual resume in 3 steps:

### 1. Configure Languages

```yaml
site:
  languages: [en, fr, es]
  defaultLanguage: en
```

### 2. Add Content Translations

```yaml
profile:
  name: María García
  introduction:
    en: Experienced software engineer...
    fr: Ingénieure logicielle expérimentée...
    es: Ingeniera de software experimentada...
```

### 3. Build

```bash
node src/cli.js build
```

This generates:
- `/index.html` - English (default)
- `/fr/index.html` - French
- `/es/index.html` - Spanish
- Language switcher in header

---

## Language Configuration

Control which languages to build and how they're organized.

### `site.languages`

Specify which languages to build:

```yaml
site:
  languages: [en, fr, es]  # Build only these languages
```

- **If specified:** Only listed languages are built
- **If omitted:** All available theme languages are built
- **Validation:** Languages must be supported by the theme

**Examples:**

```yaml
# Build only English and French
site:
  languages: [en, fr]

# Build all theme languages (default theme supports: en, fr, es)
site:
  # Omit languages to build all
```

### `site.defaultLanguage`

Set which language appears at the root URL:

```yaml
site:
  defaultLanguage: en  # English at root (/)
```

- **If specified:** That language is at `/`, others in `/lang/` subdirectories
- **If omitted:** Root shows language selector, all languages in subdirectories
- **Must be included in `languages` array** if both are specified

**URL Structure Examples:**

```yaml
# With defaultLanguage
site:
  languages: [en, fr, es]
  defaultLanguage: en

# Generates:
# /           → English
# /fr/        → French
# /es/        → Spanish
```

```yaml
# Without defaultLanguage
site:
  languages: [en, fr, es]

# Generates:
# /           → Language selector page
# /en/        → English
# /fr/        → French
# /es/        → Spanish
```

---

## Inline Content Translation

Provide language-specific versions of your content fields.

### Syntax

Any text field can be either a simple string or a language object:

```yaml
# Simple string (single language)
position: Software Engineer

# Language object (multiple languages)
position:
  en: Software Engineer
  fr: Ingénieur Logiciel
  es: Ingeniero de Software
```

### Translation Resolution

When building each language version, Resume Crafter resolves translations using this fallback chain:

1. **Target language** - `position.fr` for French build
2. **English fallback** - `position.en` if target not found
3. **First available** - First language key if neither target nor English exist

**Example:**

```yaml
description:
  en: "Led team of 5 developers"
  fr: "Direction d'une équipe de 5 développeurs"
  # Spanish not provided

# Spanish build will use English (fallback)
```

### Translatable Fields

All text fields support translation:

| Section | Fields |
|---------|--------|
| **Profile** | `introduction`, `address` |
| **Experience** | `position`, `description`, `tasks` (array items) |
| **Education** | `degree`, `field`, `honors`, `description` |
| **Skills** | `category`, `items` (array items) |
| **Languages** | `language` (name) |
| **Hobbies** | array items |

### Examples

**Profile:**

```yaml
profile:
  name: John Doe
  introduction:
    en: "Passionate software developer with 5 years of experience"
    fr: "Développeur passionné avec 5 ans d'expérience"
    es: "Desarrollador apasionado con 5 años de experiencia"
```

**Experience:**

```yaml
experience:
  - company: Tech Corp
    position:
      en: Senior Developer
      fr: Développeur Senior
      es: Desarrollador Senior
    tasks:
      - en: Led team of 5 developers
        fr: Direction d'une équipe de 5 développeurs
        es: Lideré un equipo de 5 desarrolladores
      - en: Improved performance by 40%
        fr: Amélioration des performances de 40%
        es: Mejoré el rendimiento en un 40%
```

**Skills:**

```yaml
skills:
  - category:
      en: Programming Languages
      fr: Langages de Programmation
      es: Lenguajes de Programación
    items:
      - JavaScript
      - Python  # Technology names often don't need translation
      - Go
```

**Hobbies:**

```yaml
hobbies:
  - en: Hiking
    fr: Randonnée
    es: Senderismo
  - en: Photography
    fr: Photographie
    es: Fotografía
```

---

## UI Translations

UI elements (section headings, labels) are handled separately from content.

### Theme-Provided UI Translations

Themes provide default translations for UI elements:

- Section headings (Experience, Education, Skills, etc.)
- Labels (Present, Location, Email, etc.)
- Month names for date formatting

The **default theme** includes: English (en), French (fr), Spanish (es)

### Custom UI Label Overrides (Optional)

If you want custom UI labels, create locale files:

```
resumes/
  resume.yaml
  locales/
    en/
      content.yaml      # Override English labels
    fr/
      content.yaml      # Override French labels
```

**Example override (locales/en/content.yaml):**

```yaml
sections:
  experience: Work History         # Override "Experience"
  education: Academic Background   # Override "Education"

labels:
  present: Current                 # Override "Present"
```

**Priority:** Theme defaults → User overrides

See [Theme Development](theme-development.md#theme-locales) for complete locale structure.

---

## Build Strategies

### Automatic Multi-Language Build (Default)

By default, Resume Crafter detects all available languages and generates a multi-language site:

```bash
node src/cli.js build
```

Generates all language versions based on:
1. `site.languages` if specified
2. All available theme languages if not specified

### Single Language Build

Build only one language:

```bash
# Build only French version
node src/cli.js build -l fr

# Force single-language build (first available)
node src/cli.js build --single-language
```

### Subset of Languages

Use `site.languages` to build only specific languages:

```yaml
site:
  languages: [en, fr]  # Only build English and French
```

This is useful when:
- You've only translated content to certain languages
- You want to exclude some theme languages
- You're testing specific language versions

---

## Complete Example

Here's a complete multilingual resume configuration:

```yaml
site:
  languages: [en, fr, es]
  defaultLanguage: en

profile:
  name: María García
  email: maria@example.com
  phone: "+34 612 345 678"
  city: Madrid
  country: Spain
  introduction:
    en: Experienced software engineer with a passion for building scalable web applications.
    fr: Ingénieure logicielle expérimentée passionnée par le développement d'applications web évolutives.
    es: Ingeniera de software experimentada con pasión por crear aplicaciones web escalables.

experience:
  - company: Tech Solutions S.L.
    position:
      en: Senior Full-Stack Developer
      fr: Développeuse Full-Stack Senior
      es: Desarrolladora Full-Stack Senior
    location: Madrid, Spain
    startDate: "2020-01"
    endDate: present
    description:
      en: Leading development of microservices architecture for enterprise clients.
      fr: Direction du développement d'architecture de microservices pour clients d'entreprise.
      es: Liderando el desarrollo de arquitectura de microservicios para clientes empresariales.
    tasks:
      - en: Architected RESTful APIs serving 1M+ daily requests
        fr: Conception d'APIs RESTful traitant 1M+ requêtes quotidiennes
        es: Diseñé APIs RESTful que sirven 1M+ solicitudes diarias
      - en: Mentored team of 4 junior developers
        fr: Mentorat d'une équipe de 4 développeurs juniors
        es: Mentoría de un equipo de 4 desarrolladores junior
    technologies:
      - Node.js
      - React
      - PostgreSQL

education:
  - institution: Universidad Politécnica de Madrid
    degree:
      en: Master's Degree
      fr: Master
      es: Máster
    field:
      en: Computer Science
      fr: Informatique
      es: Ciencias de la Computación
    startDate: "2016"
    endDate: "2018"

skills:
  - category:
      en: Programming Languages
      fr: Langages de Programmation
      es: Lenguajes de Programación
    items:
      - JavaScript/TypeScript
      - Python
      - Go

languages:
  - language:
      en: Spanish
      fr: Espagnol
      es: Español
    proficiency: native
  - language:
      en: English
      fr: Anglais
      es: Inglés
    proficiency: fluent

hobbies:
  - en: Hiking
    fr: Randonnée
    es: Senderismo
  - en: Photography
    fr: Photographie
    es: Fotografía

social:
  - platform: GitHub
    url: https://github.com/mariagarcia
  - platform: LinkedIn
    url: https://linkedin.com/in/maria-garcia
```

---

## Best Practices

### 1. Start with One Language

Begin with your primary language, then add translations incrementally:

```yaml
# Start simple
profile:
  introduction: "Software engineer with 5 years of experience"

# Add translations later
profile:
  introduction:
    en: "Software engineer with 5 years of experience"
    fr: "Ingénieur logiciel avec 5 ans d'expérience"
```

### 2. Use Fallbacks Strategically

You don't need to translate everything. Key fields to prioritize:

- **High priority:** Profile introduction, job titles, job descriptions
- **Medium priority:** Education degrees/fields, skills categories
- **Low priority:** Technology names, company names, locations

### 3. What Not to Translate

Some fields typically don't need translation:

- **Company names** - Keep original
- **Technology names** - JavaScript, React, PostgreSQL, etc.
- **Location names** - City and country names
- **Platform names** - GitHub, LinkedIn, etc.
- **URLs and email addresses**

### 4. Consistent Terminology

Use consistent translations across your resume:

```yaml
# Good - consistent
position:
  en: Software Engineer
tasks:
  - en: Developed software...

# Avoid - inconsistent
position:
  en: Software Engineer
tasks:
  - en: Developed programmes...  # UK English vs US English
```

### 5. Test Each Language

Build and preview each language version:

```bash
# Test French version
node src/cli.js build -l fr
open dist/index.html

# Test Spanish version
node src/cli.js build -l es
open dist/index.html

# Build all
node src/cli.js build
```

### 6. Quality Translations

For professional results:

- **Use native speakers** or professional translation services
- **Avoid machine translation** for final versions (okay for drafts)
- **Consider cultural context** - Job titles may differ by country
- **Maintain consistent tone** across all languages

---

## Troubleshooting

### Language Not Building

**Problem:** Configured language doesn't build

**Solution:** Verify language is supported by theme:

```bash
# See theme-supported languages
node src/cli.js list-themes

# Error message will show available languages
```

### Missing Translations

**Problem:** Some content not translated

**Solution:** Use fallback system - provide at least English:

```yaml
# This works - falls back to English for other languages
description:
  en: "Job description here"
```

### Wrong Language at Root

**Problem:** Wrong language appears at `/`

**Solution:** Check `site.defaultLanguage`:

```yaml
site:
  defaultLanguage: en  # Ensure this matches desired language
```

---

## Related Documentation

- **[Configuration Reference](configuration.md)** - All field details
- **[Theme Development](theme-development.md)** - Creating multilingual themes
- **[Examples](../examples/multilingual/)** - Complete multilingual example

---

## Live Example

See a complete working example:

```bash
# Build the multilingual example
node src/cli.js build -c examples/multilingual/resume.yaml

# Open in browser
open dist/index.html
```

This demonstrates all multi-language features in action!
