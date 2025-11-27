# Themes Guide

Learn how to use and customize themes to create beautiful resume websites.

## Table of Contents

- [Overview](#overview)
- [Using Themes](#using-themes)
- [Available Themes](#available-themes)
- [Customizing Themes](#customizing-themes)
- [When to Create a Custom Theme](#when-to-create-a-custom-theme)

---

## Overview

Themes in Resume Crafter control the visual appearance and layout of your resume website. They define:

- **HTML structure** - Layout and components
- **Styling** - Colors, typography, spacing
- **Responsive design** - Mobile and print layouts
- **UI translations** - Section headings and labels

---

## Using Themes

### Default Theme

By default, all resumes use the **Brittany** theme:

```bash
node src/cli.js build
```

### Specify a Theme

Use a different theme with the `-t` flag:

```bash
node src/cli.js build -t theme-name
```

### List Available Themes

See all installed themes:

```bash
node src/cli.js list-themes
```

Output example:

```
Available themes:

✓ default
  Name: Default Professional
  Version: 1.0.0
  Description: A clean, professional resume theme with modern design
  Supported Languages: en, fr, es
```

---

## Available Themes

### Brittany (Default)

**Theme ID:** `brittany`

A modern, minimalist theme inspired by Brittany Chiang's portfolio design. Features a dark background with a two-column layout.

**Features:**
- Dark theme with gradient background
- Two-column layout (fixed sidebar + scrolling content)
- Sticky navigation with smooth scrolling
- Interactive hover effects on experience/education items
- Optional floating particles background effect
- Contact information in hero section
- Multi-language support (en, fr)
- Tailwind CSS v4 styling
- Mobile responsive design

**Unique Features:**
- Animated particles background (configurable)
- External link indicators on experience/education items
- Technology tags with subtle backgrounds
- Sticky sidebar with navigation

**Best for:**
- Software engineers and developers
- Tech-focused resumes
- Creative professionals seeking modern design

**Example:**

```bash
node src/cli.js build -t brittany
# Or simply (brittany is the default):
node src/cli.js build
```

### Default Professional

**Theme ID:** `default`

A clean, modern theme optimized for traditional professional resumes.

**Features:**
- Responsive design (mobile, tablet, desktop)
- Print-friendly layout
- Multi-language support (en, fr, es)
- Tailwind CSS v4 styling
- Header with language switcher
- Organized sections with clear hierarchy

**Best for:**
- Traditional professional resumes
- Multi-language audiences
- Print-focused resumes

**Example:**

```bash
node src/cli.js build -t default
```

---

## Customizing Themes

You can customize themes without creating a new one.

### Method 1: Override UI Labels

Create custom translations for section headings and labels:

```
resumes/
  resume.yaml
  locales/
    en/
      content.yaml
```

**Example (locales/en/content.yaml):**

```yaml
sections:
  experience: Professional Experience
  education: Academic Background
  skills: Technical Skills

labels:
  present: Current Position
  location: Based in
```

See [Multi-Language Guide](multi-language.md#ui-translations) for details.

### Method 2: Custom CSS (Advanced)

For advanced users, you can modify theme styles:

1. Copy the theme to a new directory:
   ```bash
   cp -r themes/default themes/my-custom-theme
   ```

2. Edit `themes/my-custom-theme/assets/styles.css`

3. Update theme name in `themes/my-custom-theme/theme.json`

4. Use your custom theme:
   ```bash
   node src/cli.js build -t my-custom-theme
   ```

---

## When to Create a Custom Theme

Consider creating a custom theme when:

### You Should Customize

- ✅ Different color scheme
- ✅ Different fonts or typography
- ✅ Adjusted spacing or sizing
- ✅ Custom UI labels

→ **Solution:** Override styles or labels (see above)

### You Should Create New Theme

- ✅ Completely different layout structure
- ✅ Different section ordering
- ✅ Additional components (charts, timelines, etc.)
- ✅ Industry-specific design (creative, academic, etc.)

→ **Solution:** Create custom theme (see [Theme Development Guide](theme-development.md))

---

## Theme Features

### Responsive Design

All themes should support:

- **Desktop** - Full layout with all sections
- **Tablet** - Adapted for medium screens
- **Mobile** - Single column, optimized for small screens

Test responsiveness:

```bash
node src/cli.js build
open dist/index.html  # Resize browser window to test
```

### Print Layout

Themes optimize for printing to PDF:

- Removes interactive elements (language switcher, buttons)
- Adjusts colors for print
- Manages page breaks
- Optimizes spacing

**Print your resume:**

1. Open in browser: `open dist/index.html`
2. Print: `Cmd/Ctrl + P`
3. Save as PDF or print directly

### Multi-Language Support

Themes provide:

- UI translations for standard languages
- Language switcher component
- Dynamic path handling for subdirectories

See [Multi-Language Guide](multi-language.md) for using multi-language features.

---

## Theme Comparison

| Feature | Brittany (Default) | Default Professional |
|---------|-------------------|---------------------|
| Layout | Two-column (sidebar + content) | Single column with clear sections |
| Color Scheme | Dark theme with teal accents | Professional blue/gray |
| Typography | Inter font family | System fonts (optimized for web and print) |
| Languages | English, French | English, French, Spanish |
| Particles Effect | Optional animated background | Not available |
| Print | Good | Optimized |
| Mobile | Fully responsive | Fully responsive |
| Best For | Tech/creative professionals | Traditional professional resumes |

---

## Next Steps

- **Using themes:** You're done! Just specify `-t theme-name`
- **Creating themes:** See [Theme Development Guide](theme-development.md)
- **Contributing themes:** See [Contributing Guide](contributing.md)

---

## Related Documentation

- **[Theme Development](theme-development.md)** - Create custom themes
- **[Configuration Reference](configuration.md)** - Available data for templates
- **[Multi-Language](multi-language.md)** - Multi-language themes

---

**Need help?** Open an issue on [GitHub](https://github.com/JasonBenett/resume-crafter/issues)
