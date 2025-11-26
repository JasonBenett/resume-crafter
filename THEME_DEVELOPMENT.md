# Theme Development Guide

This guide explains how to create custom themes for Resume Crafter.

## Table of Contents

- [Theme Structure](#theme-structure)
- [Theme Configuration](#theme-configuration)
- [Template System](#template-system)
- [Available Data](#available-data)
- [Handlebars Helpers](#handlebars-helpers)
- [Styling with Tailwind](#styling-with-tailwind)
- [Best Practices](#best-practices)
- [Example Theme](#example-theme)

## Theme Structure

Each theme is a directory in `themes/` with the following structure:

```
themes/
  your-theme-name/
    theme.json              # Theme metadata and configuration
    templates/
      index.hbs             # Main template
      header.hbs            # Partial templates
      experience.hbs
      education.hbs
      skills.hbs
      languages.hbs
      hobbies.hbs
      social.hbs
    assets/
      styles.css            # Theme styles (Tailwind CSS)
```

## Theme Configuration

Create a `theme.json` file with theme metadata:

```json
{
  "name": "Your Theme Name",
  "version": "1.0.0",
  "description": "A brief description of your theme",
  "author": "Your Name",
  "supportedLanguages": ["en", "fr", "es"],
  "templates": {
    "main": "index.hbs",
    "partials": [
      "header.hbs",
      "experience.hbs",
      "education.hbs",
      "skills.hbs",
      "languages.hbs",
      "hobbies.hbs",
      "social.hbs"
    ]
  },
  "assets": {
    "styles": "styles.css"
  }
}
```

### Required Fields

- `name` - Display name of the theme
- `version` - Semantic version number
- `templates.main` - Main template file
- `assets.styles` - Main CSS file

### Optional Fields

- `description` - Theme description
- `author` - Theme creator name
- `supportedLanguages` - Array of language codes
- `templates.partials` - Array of partial template files

## Template System

Resume Crafter uses Handlebars for templating. Templates have access to all resume data and locale strings.

### Main Template (index.hbs)

The main template defines the overall page structure:

```handlebars
<!DOCTYPE html>
<html lang="{{language}}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{profile.name}} - Resume</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    {{> header}}

    <main>
      {{#if experience}}
        {{> experience}}
      {{/if}}

      {{#if education}}
        {{> education}}
      {{/if}}

      {{#if skills}}
        {{> skills}}
      {{/if}}

      {{#if languages}}
        {{> languages}}
      {{/if}}

      {{#if hobbies}}
        {{> hobbies}}
      {{/if}}

      {{#if social}}
        {{> social}}
      {{/if}}
    </main>
  </div>
</body>
</html>
```

### Partial Templates

Partials are reusable template components included with `{{> partialName}}`.

Example `experience.hbs`:

```handlebars
<section class="experience">
  <h2>{{t "sections.experience"}}</h2>

  <div class="experience-list">
    {{#each experience}}
      <div class="experience-item">
        <div class="experience-header">
          <div>
            <h3>{{position}}</h3>
            <p class="company">{{company}}</p>
          </div>
          <div class="dates">
            <p>{{formatDate startDate}} - {{formatDate endDate}}</p>
            {{#if location}}
              <p>{{location}}</p>
            {{/if}}
          </div>
        </div>

        {{#if description}}
          <p class="description">{{description}}</p>
        {{/if}}

        {{#if tasks}}
          <ul class="tasks">
            {{#each tasks}}
              <li>{{this}}</li>
            {{/each}}
          </ul>
        {{/if}}

        {{#if technologies}}
          <div class="technologies">
            {{#each technologies}}
              <span class="tech-tag">{{this}}</span>
            {{/each}}
          </div>
        {{/if}}
      </div>
    {{/each}}
  </div>
</section>
```

## Available Data

Your templates have access to the following data:

### Profile Data

```javascript
{
  profile: {
    name: "string",
    email: "string",
    phone: "string",
    city: "string",
    country: "string",
    address: "string",
    website: "string",
    introduction: "string",
    photo: "string"
  }
}
```

### Experience Data

```javascript
{
  experience: [
    {
      company: "string",
      position: "string",
      location: "string",
      startDate: "YYYY-MM",
      endDate: "YYYY-MM" or "present",
      description: "string",
      tasks: ["string", ...],
      technologies: ["string", ...]
    }
  ]
}
```

### Education Data

```javascript
{
  education: [
    {
      institution: "string",
      degree: "string",
      field: "string",
      location: "string",
      startDate: "YYYY",
      endDate: "YYYY",
      gpa: "string",
      honors: "string",
      description: "string"
    }
  ]
}
```

### Skills Data

```javascript
{
  skills: [
    {
      category: "string",
      items: ["string", ...]
    }
  ]
}
```

### Languages Data

```javascript
{
  languages: [
    {
      language: "string",
      proficiency: "native|fluent|advanced|intermediate|basic"
    }
  ]
}
```

### Other Data

```javascript
{
  hobbies: ["string", ...],
  social: [
    {
      platform: "string",
      url: "string",
      username: "string"
    }
  ],
  language: "en" // Current language code
}
```

## Handlebars Helpers

Resume Crafter provides custom Handlebars helpers:

### formatDate

Formats dates from YYYY-MM to human-readable format:

```handlebars
{{formatDate "2020-03"}}  <!-- Output: Mar 2020 -->
{{formatDate "present"}}   <!-- Output: Present -->
```

### t (translate)

Retrieves translated strings from locale files:

```handlebars
{{t "sections.experience"}}  <!-- Output: "Experience" (or translated) -->
{{t "labels.present"}}       <!-- Output: "Present" (or translated) -->
```

Common translation keys:

- `sections.experience` - "Experience"
- `sections.education` - "Education"
- `sections.skills` - "Skills"
- `sections.languages` - "Languages"
- `sections.hobbies` - "Hobbies & Interests"
- `sections.social` - "Connect With Me"
- `labels.present` - "Present"
- `labels.location` - "Location"
- `labels.email` - "Email"
- `labels.phone` - "Phone"
- `labels.website` - "Website"

### hasItems

Checks if an array has items:

```handlebars
{{#if (hasItems experience)}}
  <!-- Render experience section -->
{{/if}}
```

### eq (equals)

Compares two values:

```handlebars
{{#if (eq proficiency "native")}}
  <span class="native-badge">Native</span>
{{/if}}
```

## Styling with Tailwind

Resume Crafter uses Tailwind CSS v4 for styling.

### Basic Styles (styles.css)

```css
@import 'tailwindcss';

/* Theme customization */
@theme {
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-200: #bae6fd;
  --color-primary-300: #7dd3fc;
  --color-primary-400: #38bdf8;
  --color-primary-500: #0ea5e9;
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;
  --color-primary-800: #075985;
  --color-primary-900: #0c4a6e;
}

/* Custom base styles */
body {
  font-family: system-ui, -apple-system, sans-serif;
  color: #111827;
}

/* Print styles */
@media print {
  body {
    color: black;
  }

  .no-print {
    display: none !important;
  }

  a {
    text-decoration: none;
  }
}
```

### Using Tailwind Classes

Use Tailwind utility classes directly in your templates:

```handlebars
<div class="max-w-4xl mx-auto bg-white shadow-lg">
  <header class="bg-primary-600 text-white p-8">
    <h1 class="text-4xl font-bold mb-2">{{profile.name}}</h1>
  </header>
</div>
```

## Best Practices

### 1. Mobile-First Design

Use responsive Tailwind classes:

```handlebars
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <!-- Content -->
</div>
```

### 2. Print-Friendly Styling

Add print-specific styles and hide interactive elements:

```handlebars
<a href="{{url}}" class="no-print">Link</a>
```

### 3. Accessibility

- Use semantic HTML elements
- Include proper heading hierarchy (h1, h2, h3)
- Add ARIA labels where needed
- Ensure sufficient color contrast

### 4. Conditional Rendering

Check for data before rendering sections:

```handlebars
{{#if profile.photo}}
  <img src="{{profile.photo}}" alt="{{profile.name}}">
{{/if}}
```

### 5. Fallback Content

Provide defaults when optional data is missing:

```handlebars
{{#if profile.website}}
  <a href="{{profile.website}}">{{profile.website}}</a>
{{else}}
  <span class="text-gray-400">No website</span>
{{/if}}
```

### 6. Multi-language Support

Always use the `{{t}}` helper for UI strings:

```handlebars
<!-- Good -->
<h2>{{t "sections.experience"}}</h2>

<!-- Bad - hardcoded English -->
<h2>Experience</h2>
```

## Example Theme

See the `themes/default/` directory for a complete, production-ready theme example.

Key files to study:

- `themes/default/theme.json` - Theme configuration
- `themes/default/templates/index.hbs` - Main template structure
- `themes/default/templates/*.hbs` - Partial templates
- `themes/default/assets/styles.css` - Tailwind styling

## Testing Your Theme

1. **Build with your theme:**

```bash
node src/cli.js build -t your-theme-name
```

2. **Test with different configurations:**

```bash
# Minimal config
node src/cli.js build -c examples/minimal/resume.yaml -t your-theme-name

# Full config
node src/cli.js build -c examples/basic/resume.yaml -t your-theme-name

# Multilingual
node src/cli.js build -c examples/multilingual/resume.yaml -t your-theme-name -l fr
```

3. **Check responsiveness:**
   - Open `dist/index.html` in a browser
   - Test at different screen sizes
   - Use browser dev tools mobile emulation

4. **Test print layout:**
   - Use browser print preview
   - Check page breaks
   - Verify colors work in print

## Contributing Your Theme

Want to share your theme?

1. Ensure your theme works with all example configurations
2. Include a screenshot in your theme directory
3. Document any special features in a README
4. Submit a pull request to the repository

## Support

For questions or issues:
- Check existing themes for examples
- Open an issue on GitHub
- Refer to Handlebars and Tailwind CSS documentation

---

Happy theming! We can't wait to see what you create.
