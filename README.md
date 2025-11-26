# Resume Crafter

A modern, flexible static website generator for creating beautiful, professional resume websites from simple YAML configuration files.

> **Note**: This entire project was created using [Claude Code](https://claude.com/claude-code), Anthropic's AI-powered development environment.

## ✨ Features

- **📝 YAML Configuration** - Write your resume in human-friendly YAML format
- **🎨 Theme System** - Fully customizable themes with Handlebars templates
- **🌍 Multi-language Support** - Build multilingual sites with inline content translation
- **📱 Responsive Design** - Mobile-friendly and print-ready layouts
- **✅ Schema Validation** - Comprehensive validation ensures data integrity
- **🚀 Zero Database** - Pure static site generation
- **⚡ Fast Build** - Quick compilation with Tailwind CSS v4
- **🎯 SEO Ready** - Semantic HTML structure
- **🖨️ Print Friendly** - Optimized for PDF export

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/JasonBenett/resume-crafter.git
cd resume-crafter
npm install
```

### Create Your Resume

```bash
# Initialize a new resume
node src/cli.js init

# Edit resumes/resume.yaml with your information
# Then build
node src/cli.js build

# Open in browser
open dist/index.html
```

That's it! You now have a professional resume website.

## 📖 Documentation

- **[Getting Started](docs/getting-started.md)** - Detailed installation and first steps
- **[Configuration Reference](docs/configuration.md)** - All available fields and options
- **[Multi-Language Support](docs/multi-language.md)** - Create multilingual resumes
- **[Themes Guide](docs/themes.md)** - Using and customizing themes
- **[Theme Development](docs/theme-development.md)** - Creating custom themes
- **[CLI Reference](docs/cli-reference.md)** - All command-line options
- **[Deployment Guide](docs/deployment.md)** - Publish your resume online
- **[Contributing](docs/contributing.md)** - Development guide

## 🎨 Example

**Input** (`resume.yaml`):

```yaml
profile:
  name: María García
  email: maria@example.com
  introduction:
    en: Experienced software engineer...
    fr: Ingénieure logicielle expérimentée...
    es: Ingeniera de software experimentada...

experience:
  - company: Tech Corp
    position:
      en: Senior Developer
      fr: Développeuse Senior
      es: Desarrolladora Senior
    startDate: "2020-01"
    endDate: present
    tasks:
      - Led team of 5 developers
      - Improved performance by 40%
```

**Output**: Professional website in 3 languages with automatic language switching!

```
dist/
├── index.html          # English (default)
├── fr/index.html       # French
├── es/index.html       # Spanish
└── styles.css          # Compiled CSS
```

## 🌍 Multi-Language Features

Resume Crafter makes multilingual resumes easy:

### Inline Content Translation

```yaml
position:
  en: Software Engineer
  fr: Ingénieur Logiciel
  es: Ingeniero de Software
```

### Language Configuration

```yaml
site:
  languages: [en, fr, es]    # Build only these languages
  defaultLanguage: en         # English at root
```

### Automatic Builds

```bash
# Builds all configured languages in one command
node src/cli.js build

# Generates:
# - / (English)
# - /fr/ (French)
# - /es/ (Spanish)
# - Language switcher included!
```

Learn more in the [Multi-Language Guide](docs/multi-language.md).

## 🛠️ CLI Commands

```bash
# Initialize new resume
node src/cli.js init

# Build resume
node src/cli.js build

# Build specific language
node src/cli.js build -l fr

# Validate configuration
node src/cli.js validate

# List available themes
node src/cli.js list-themes
```

See [CLI Reference](docs/cli-reference.md) for all options.

## 📦 NPM Scripts

```bash
npm run build      # Build example resume
npm run dev        # Watch mode for development
npm test           # Run tests
npm run lint       # Lint code
npm run format     # Format code with Prettier
```

## 🚀 Deployment

Deploy your resume to:

- **[GitHub Pages](docs/deployment.md#github-pages)** - Free hosting for developers
- **[Netlify](docs/deployment.md#netlify)** - Drag-and-drop or automatic deployment
- **[Vercel](docs/deployment.md#vercel)** - Deploy with one command

All options are free and include HTTPS with custom domains!

See the [Deployment Guide](docs/deployment.md) for detailed instructions.

## 🎨 Themes

Resume Crafter uses a powerful theme system built on Handlebars templates.

**Use a theme:**

```bash
node src/cli.js build -t default
```

**Create your own theme:**

See the [Theme Development Guide](docs/theme-development.md) for detailed instructions.

## 📋 Configuration

Basic configuration structure:

```yaml
site:
  languages: [en, fr]
  defaultLanguage: en

profile:
  name: Your Name
  email: your.email@example.com
  introduction: Your professional summary

experience:
  - company: Company Name
    position: Your Position
    startDate: "2020-01"
    endDate: present

education:
  - institution: University Name
    degree: Bachelor's Degree
    field: Computer Science

skills:
  - category: Programming Languages
    items: [JavaScript, Python, Go]

languages:
  - language: English
    proficiency: native
```

See the [Configuration Reference](docs/configuration.md) for all available fields.

## 🤝 Contributing

Contributions are welcome! This project was built entirely with Claude Code.

To contribute:

1. Read the [Contributing Guide](docs/contributing.md)
2. Fork the repository
3. Create a feature branch
4. Make your changes
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Built with [Claude Code](https://claude.com/claude-code)** - This entire project was created using Anthropic's AI-powered development environment
- **[Tailwind CSS](https://tailwindcss.com/)** - Beautiful, utility-first styling
- **[Handlebars](https://handlebarsjs.com/)** - Powerful templating
- **[js-yaml](https://github.com/nodeca/js-yaml)** - YAML parsing
- **[Ajv](https://ajv.js.org/)** - JSON Schema validation

## 📞 Support

- **Documentation**: See [docs/](docs/) directory
- **Issues**: Report on [GitHub Issues](https://github.com/JasonBenett/resume-crafter/issues)
- **Examples**: Check [examples/](examples/) directory

---

**Made with ❤️ and [Claude Code](https://claude.com/claude-code)**
