# Resume Crafter

A modern, flexible static website generator for creating beautiful, professional resume websites from simple YAML configuration files.

> **Note**: This entire project was created using [Claude Code](https://claude.com/claude-code), Anthropic's AI-powered development environment. From initial architecture to final implementation, Claude Code handled the complete development process including design decisions, code implementation, testing, and documentation.

## ✨ Features

- **📝 YAML Configuration** - Write your resume in human-friendly YAML format
- **🎨 Theme System** - Fully customizable themes with Handlebars templates
- **🌍 Multi-language Support** - Built-in i18n with locale files
- **📱 Responsive Design** - Mobile-friendly and print-ready layouts
- **✅ Schema Validation** - Comprehensive validation ensures data integrity
- **🚀 Zero Database** - Pure static site generation
- **⚡ Fast Build** - Quick compilation with Tailwind CSS
- **🎯 SEO Ready** - Semantic HTML structure
- **🖨️ Print Friendly** - Optimized for PDF export and printing

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/JasonBenett/resume-crafter.git
cd resume-crafter

# Install dependencies
npm install

# Build the example resume
npm run build
```

The generated site will be in the `dist/` directory. Open `dist/index.html` in your browser to preview.

## 📖 Usage

### Create Your Resume

1. **Copy the example configuration:**

```bash
cp examples/basic/resume.yaml my-resume.yaml
```

2. **Edit your resume data:**

```yaml
profile:
  name: Your Name
  email: your.email@example.com
  phone: "+1 (555) 123-4567"
  city: Your City
  country: Your Country
  introduction: |
    Your professional summary here...

experience:
  - company: Company Name
    position: Your Position
    startDate: "2020-01"
    endDate: present
    description: Brief description of your role
    tasks:
      - Achievement or responsibility 1
      - Achievement or responsibility 2
    technologies:
      - JavaScript
      - React
      - Node.js

# ... more sections
```

3. **Build your resume:**

```bash
node src/cli.js build -c my-resume.yaml
```

Or use npm scripts:

```bash
npm run build
```

## 🎨 Themes

Resume Crafter uses a powerful theme system built on Handlebars templates.

### Using a Theme

```bash
node src/cli.js build -c my-resume.yaml -t default
```

### Creating a Custom Theme

1. Create a new directory in `themes/`:

```
themes/
  my-theme/
    theme.json           # Theme metadata
    templates/
      index.hbs          # Main template
      header.hbs         # Partials
      experience.hbs
      # ... more partials
    assets/
      styles.css         # Theme styles
```

2. Configure your theme in `theme.json`:

```json
{
  "name": "My Custom Theme",
  "version": "1.0.0",
  "description": "A custom theme for resumes",
  "supportedLanguages": ["en", "fr"],
  "templates": {
    "main": "index.hbs",
    "partials": ["header.hbs", "experience.hbs"]
  },
  "assets": {
    "styles": "styles.css"
  }
}
```

## 🌍 Multi-language Support

Add translations by creating locale files:

```
my-resume-project/
  resume.yaml           # Your resume data
  locales/
    en/
      content.yaml      # English translations
    fr/
      content.yaml      # French translations
```

**Locale file example (locales/en/content.yaml):**

```yaml
sections:
  experience: Experience
  education: Education
  skills: Skills
  languages: Languages

labels:
  present: Present
  location: Location
```

**Build with locale:**

```bash
node src/cli.js build -c resume.yaml -l fr
```

## 📋 Configuration Reference

### Profile Section

```yaml
profile:
  name: string (required)
  email: string (email format)
  phone: string
  city: string
  country: string
  address: string
  website: string (URL)
  introduction: string
  photo: string (path or URL)
```

### Experience Section

```yaml
experience:
  - company: string (required)
    position: string (required)
    location: string
    startDate: string (YYYY-MM format, required)
    endDate: string or null ("present" or YYYY-MM)
    description: string
    tasks: array of strings
    technologies: array of strings
```

### Education Section

```yaml
education:
  - institution: string (required)
    degree: string (required)
    field: string
    location: string
    startDate: string (YYYY or YYYY-MM)
    endDate: string or null
    gpa: string or number
    honors: string
    description: string
```

### Skills Section

```yaml
skills:
  - category: string
    items: array of strings
```

### Languages Section

```yaml
languages:
  - language: string
    proficiency: enum (native|fluent|advanced|intermediate|basic)
```

### Other Sections

```yaml
hobbies: array of strings

social:
  - platform: string
    url: string (required)
    username: string
```

## 🛠️ Development

### Project Structure

```
resume-crafter/
├── src/
│   ├── cli.js              # CLI interface
│   ├── generator/          # Build orchestration
│   ├── config/             # YAML loading & validation
│   ├── themes/             # Theme system
│   └── utils/              # Utilities
├── themes/
│   └── default/            # Default theme
├── examples/
│   └── basic/              # Example resume
└── dist/                   # Generated output
```

### Available Scripts

- `npm run build` - Build the example resume
- `npm run dev` - Watch mode for development
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

### CLI Options

```bash
node src/cli.js build [options]

Options:
  -c, --config <path>    Path to config file (default: "./resume.yaml")
  -t, --theme <name>     Theme name to use (default: "default")
  -o, --output <path>    Output directory (default: "./dist")
  -l, --language <code>  Language code (default: "en")
  -h, --help            Display help
```

## 🤝 Contributing

Contributions are welcome! This project was built entirely with Claude Code, demonstrating the power of AI-assisted development. Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Create custom themes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Built with [Claude Code](https://claude.com/claude-code)** - This entire project, from architecture to implementation, was created using Anthropic's AI-powered development environment.
- **[Tailwind CSS](https://tailwindcss.com/)** - For beautiful, utility-first styling
- **[Handlebars](https://handlebarsjs.com/)** - For powerful templating
- **[js-yaml](https://github.com/nodeca/js-yaml)** - For YAML parsing
- **[Ajv](https://ajv.js.org/)** - For JSON Schema validation

## 📞 Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/JasonBenett/resume-crafter).

---

**Made with ❤️ and [Claude Code](https://claude.com/claude-code)**
