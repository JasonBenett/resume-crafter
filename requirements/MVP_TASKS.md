# MVP Tasks - Resume Crafter

This document outlines the detailed tasks required to build a functional first MVP of Resume Crafter.

## Phase 1: Project Foundation & Setup ✅

### 1.1 Project Initialization
- [x] Install and configure core dependencies (Node.js tooling)
- [x] Set up project directory structure (src/, themes/, examples/, dist/)
- [x] Configure package.json with proper scripts (build, dev, test)
- [x] Add ESLint/Prettier for code quality
- [x] Create .gitignore for node_modules, dist, build artifacts

### 1.2 Build System
- [x] Set up Tailwind CSS configuration and PostCSS
- [x] Configure build pipeline for processing CSS
- [x] Implement file copying/asset handling for static generation
- [x] Add development mode with file watching

## Phase 2: Configuration System

### 2.1 Config Schema Design
- [ ] Define JSON schema for profile data (name, DOB, phone, city, country, intro)
- [ ] Define schema for professional experience entries (dates, company, title, description, tasks)
- [ ] Define schema for education/diploma entries (date, school, title, results, description)
- [ ] Define schema for hobbies list
- [ ] Define schema for social networks (platform, URL, username)
- [ ] Create master config schema combining all content types

### 2.2 Multi-language Support
- [ ] Design i18n structure for translations (e.g., `locales/{lang}/content.json`)
- [ ] Implement language detection/selection logic
- [ ] Define how themes specify supported languages
- [ ] Create example configs in multiple languages

### 2.3 Config Validation
- [ ] Implement JSON schema validation for user configs
- [ ] Add helpful error messages for invalid configurations
- [ ] Create config file loader with validation

## Phase 3: Theme System Architecture

### 3.1 Theme Structure
- [ ] Define theme directory structure (templates/, assets/, theme.json)
- [ ] Create theme.json schema (name, description, supported languages, assets)
- [ ] Implement theme discovery mechanism (scan themes/ directory)
- [ ] Design template format (HTML with placeholder syntax or template engine)

### 3.2 Theme Engine
- [ ] Choose and integrate templating engine (Handlebars, EJS, or custom)
- [ ] Implement data injection into templates (profile, experience, education, etc.)
- [ ] Handle partial templates for reusable components
- [ ] Process theme-specific CSS with Tailwind

### 3.3 Asset Handling
- [ ] Copy theme assets (images, fonts) to output directory
- [ ] Process and minify CSS files
- [ ] Handle relative paths in generated HTML
- [ ] Support for user-provided assets (profile photo, etc.)

## Phase 4: Static Site Generator Engine

### 4.1 Core Generator
- [ ] Implement main build function that orchestrates the process
- [ ] Load and validate user configuration
- [ ] Load and validate selected theme
- [ ] Generate HTML from template + config data
- [ ] Write output files to dist/ directory

### 4.2 Multi-page Support (if needed for MVP)
- [ ] Generate index.html as main resume page
- [ ] Support for optional additional pages (portfolio, detailed projects)
- [ ] Create navigation between pages if multiple exist

### 4.3 Output Optimization
- [ ] Minify generated HTML
- [ ] Optimize CSS output (purge unused Tailwind classes)
- [ ] Ensure output is deployment-ready (static hosting compatible)

## Phase 5: Default Theme Implementation

### 5.1 Design & Layout
- [ ] Create clean, professional default theme design
- [ ] Implement responsive layout with Tailwind
- [ ] Design sections for: header/profile, experience, education, hobbies, social links
- [ ] Ensure mobile-friendly layout

### 5.2 Theme Components
- [ ] Profile/header section template
- [ ] Professional experience timeline component
- [ ] Education/diploma section
- [ ] Hobbies grid or list component
- [ ] Social media links footer/sidebar
- [x] Print-friendly CSS styles

### 5.3 Styling
- [x] Configure Tailwind theme colors and typography
- [ ] Create consistent spacing and layout patterns
- [ ] Add subtle animations or transitions
- [ ] Test across browsers (Chrome, Firefox, Safari)

## Phase 6: CLI Interface

### 6.1 Command Structure
- [x] Implement `build` command (build site from config)
- [x] Add `--theme` flag to specify theme
- [x] Add `--config` flag to specify config file path
- [x] Add `--output` flag to specify output directory
- [ ] Add `--watch` flag for development mode (using npm run dev with chokidar instead)

### 6.2 Developer Experience
- [x] Add helpful command-line output (progress, success/error messages)
- [ ] Implement `init` command to scaffold example config
- [ ] Add `list-themes` command to show available themes
- [ ] Create `validate` command to check config without building

## Phase 7: Documentation & Examples

### 7.1 Example Configurations
- [ ] Create complete example resume config (examples/basic/)
- [ ] Add multi-language example (examples/multilingual/)
- [ ] Include example with all content types filled
- [ ] Add example with minimal required fields

### 7.2 User Documentation
- [ ] Write README.md with quick start guide
- [ ] Document config file format and all available fields
- [ ] Explain theme system and how to create custom themes
- [ ] Add deployment guide (GitHub Pages, Netlify, Vercel)

### 7.3 Developer Documentation
- [ ] Document theme development process
- [ ] Explain template syntax and available variables
- [ ] Create theme contribution guidelines

## Phase 8: Testing & Quality Assurance

### 8.1 Unit Tests
- [ ] Test config validation logic
- [ ] Test theme loading and validation
- [ ] Test data transformation/injection
- [ ] Test file I/O operations

### 8.2 Integration Tests
- [ ] Test full build process with example configs
- [ ] Test theme switching
- [ ] Test multi-language builds
- [ ] Verify output HTML validity

### 8.3 Manual Testing
- [ ] Build example resumes and verify visual output
- [ ] Test responsive behavior on different screen sizes
- [ ] Verify all links work correctly
- [ ] Test print layout
- [ ] Cross-browser compatibility check

## Phase 9: MVP Release Preparation

### 9.1 Polish
- [ ] Review all error messages for clarity
- [ ] Ensure consistent code style across project
- [ ] Add inline code comments for complex logic
- [ ] Review and improve documentation

### 9.2 Repository Setup
- [ ] Write comprehensive README with screenshots
- [ ] Add LICENSE file
- [ ] Create CONTRIBUTING.md guidelines
- [ ] Add GitHub issue templates
- [ ] Set up basic CI/CD (run tests on PR)

### 9.3 Release
- [ ] Tag v1.0.0-mvp release
- [ ] Write release notes
- [ ] Publish to npm (optional for MVP)
- [ ] Create demo site showcasing the tool

---

## Success Criteria for MVP

The MVP is complete when:
- [ ] A user can create a config JSON file with their resume data
- [ ] Running the build command generates a complete static website
- [ ] The default theme renders all content types professionally
- [ ] The generated site is mobile-responsive and print-friendly
- [ ] Documentation is sufficient for users to get started
- [ ] At least one complete example is provided
- [ ] Basic error handling prevents cryptic failures

## Out of Scope for MVP

These features should be considered for future releases:
- Advanced theme marketplace or repository
- Web-based GUI for editing config
- PDF export functionality
- Rich text editing support
- Dynamic content fetching (from LinkedIn, etc.)
- Theme customization without creating new theme
- Analytics integration