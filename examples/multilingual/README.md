# Multilingual Resume Example

This example demonstrates how to create a resume that can be built in multiple languages using locale files.

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
│   │   └── content.yaml  # English translations
│   ├── fr/
│   │   └── content.yaml  # French translations
│   └── es/
│       └── content.yaml  # Spanish translations
└── README.md
```

## Building in Different Languages

### English Version

```bash
node src/cli.js build -c examples/multilingual/resume.yaml -l en -o dist-en
```

### French Version / Version française

```bash
node src/cli.js build -c examples/multilingual/resume.yaml -l fr -o dist-fr
```

### Spanish Version / Versión en español

```bash
node src/cli.js build -c examples/multilingual/resume.yaml -l es -o dist-es
```

## How It Works

1. **resume.yaml** contains all your actual resume data (name, experience, skills, etc.)
2. **locales/{lang}/content.yaml** contains UI labels and section headings in each language
3. When building, the `-l` flag selects which locale to use
4. The theme uses the `{{t}}` helper to insert translated strings

## What Gets Translated

- Section headings (Experience, Education, Skills, etc.)
- UI labels (Present, Location, Email, etc.)
- Month names for date formatting

## What Stays the Same

Your actual resume content (job titles, company names, descriptions) should be written in the target language directly in resume.yaml. For truly multilingual resumes with different content per language, create separate config files:

```bash
# Spanish version with Spanish content
node src/cli.js build -c resumes/resume-es.yaml -l es -o dist-es

# English version with English content
node src/cli.js build -c resumes/resume-en.yaml -l en -o dist-en
```

## Using This as a Template

Copy this example to your resumes directory:

```bash
cp -r examples/multilingual resumes/my-multilingual-resume
```

Then edit the files with your information and build in your preferred language!
