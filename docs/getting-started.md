# Getting Started

This guide will help you create your first resume website with Resume Crafter.

## Prerequisites

- **Node.js** (v20 or higher recommended)
- Basic familiarity with YAML syntax
- A text editor

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/JasonBenett/resume-crafter.git
cd resume-crafter
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including Tailwind CSS, Handlebars, and validation tools.

### 3. Verify Installation

Build the example resume to verify everything works:

```bash
npm run build
```

The generated site will be in the `dist/` directory. Open `dist/index.html` in your browser to preview.

## Directory Structure

Resume Crafter separates your personal content from project files:

```
resume-crafter/
├── resumes/              # Your personal resume configurations (gitignored)
│   ├── resume.yaml       # Your main resume
│   ├── locales/          # Optional: UI translation overrides
│   └── README.md         # Guide for managing multiple resumes
├── examples/             # Example configurations for reference
│   ├── basic/
│   └── multilingual/
├── themes/               # Theme templates
│   └── default/
├── dist/                 # Generated output
└── src/                  # Project source code
```

**Note:** The `resumes/` directory is automatically ignored by git to keep your personal information private.

## Create Your First Resume

### Step 1: Initialize Your Resume

Run the init command to create a starter configuration:

```bash
node src/cli.js init
```

This creates `resumes/resume.yaml` with a template structure.

### Step 2: Edit Your Information

Open `resumes/resume.yaml` in your text editor and fill in your information:

```yaml
profile:
  name: Your Name
  email: your.email@example.com
  phone: "+1 (555) 123-4567"
  city: Your City
  country: Your Country
  introduction: |
    Your professional summary here. This is a brief overview
    of your experience, skills, and what you're looking for.

experience:
  - company: Company Name
    position: Your Position
    location: City, Country
    startDate: "2020-01"
    endDate: present
    description: Brief description of your role
    tasks:
      - Key achievement or responsibility 1
      - Key achievement or responsibility 2
      - Key achievement or responsibility 3
    technologies:
      - JavaScript
      - React
      - Node.js

education:
  - institution: University Name
    degree: Bachelor's Degree
    field: Computer Science
    location: City, Country
    startDate: "2016"
    endDate: "2020"
    gpa: "3.8/4.0"

skills:
  - category: Programming Languages
    items:
      - JavaScript/TypeScript
      - Python
      - Java
  - category: Frameworks & Tools
    items:
      - React
      - Node.js
      - Docker

languages:
  - language: English
    proficiency: native
  - language: Spanish
    proficiency: fluent

hobbies:
  - Photography
  - Hiking
  - Open source contributions

social:
  - platform: GitHub
    url: https://github.com/yourusername
    username: yourusername
  - platform: LinkedIn
    url: https://linkedin.com/in/yourprofile
    username: yourprofile
```

### Step 3: Build Your Resume

Build your resume website:

```bash
node src/cli.js build
```

The output will be in `dist/index.html`. Open it in your browser to see your resume!

### Step 4: Customize Further

- **Change the theme:** `node src/cli.js build -t default`
- **See all themes:** `node src/cli.js list-themes`
- **Validate your config:** `node src/cli.js validate`

## Understanding the Build Output

After running `build`, your `dist/` directory contains:

```
dist/
├── index.html           # Your resume HTML
├── styles.css           # Compiled and minified CSS
└── assets/              # Images, fonts, etc.
```

For multi-language sites, you'll see:

```
dist/
├── index.html           # Default language or language selector
├── fr/
│   └── index.html       # French version
├── es/
│   └── index.html       # Spanish version
├── styles.css
└── assets/
```

## Using NPM Scripts

For convenience, you can use these npm scripts:

```bash
# Build the example resume
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

## Common Tasks

### Updating Your Resume

1. Edit `resumes/resume.yaml`
2. Run `node src/cli.js build`
3. Preview `dist/index.html`
4. Repeat until satisfied

### Adding a Photo

1. Place your photo in `resumes/` (e.g., `resumes/photo.jpg`)
2. Reference it in your config:
   ```yaml
   profile:
     photo: photo.jpg
   ```
3. Rebuild

### Validating Your Configuration

Before building, validate your YAML is correct:

```bash
node src/cli.js validate
```

This checks for:
- Required fields
- Correct date formats
- Valid email addresses
- Proper structure

## Next Steps

Now that you have a basic resume, explore:

- **[Configuration Guide](configuration.md)** - Learn about all available fields
- **[Multi-Language Support](multi-language.md)** - Create multilingual resumes
- **[Themes](themes.md)** - Customize the appearance
- **[Deployment](deployment.md)** - Publish your resume online
- **[CLI Reference](cli-reference.md)** - Master all commands

## Getting Help

- Check the [examples/](../examples/) directory for inspiration
- Read the full [Configuration Reference](configuration.md)
- Report issues on [GitHub](https://github.com/JasonBenett/resume-crafter/issues)

---

**Ready to go further?** Check out [Multi-Language Support](multi-language.md) to create resumes in multiple languages!
