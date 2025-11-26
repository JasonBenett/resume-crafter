# Configuration Reference

Complete reference for all configuration options in `resume.yaml`.

## Table of Contents

- [Translatable Fields](#translatable-fields)
- [Site Configuration](#site-configuration)
- [Profile Section](#profile-section)
- [Experience Section](#experience-section)
- [Education Section](#education-section)
- [Skills Section](#skills-section)
- [Languages Section](#languages-section)
- [Hobbies Section](#hobbies-section)
- [Social Section](#social-section)

## Translatable Fields

**Note:** Most text fields support inline translation. You can use either a simple string or an object with language codes:

```yaml
# Simple string
introduction: "Software engineer with 5 years of experience"

# Or multi-language object
introduction:
  en: "Software engineer with 5 years of experience"
  fr: "Ingénieur logiciel avec 5 ans d'expérience"
  es: "Ingeniero de software con 5 años de experiencia"
```

See the [Multi-Language Guide](multi-language.md) for more details on content translation.

---

## Site Configuration

Configure site-wide settings and language behavior.

```yaml
site:
  languages: array of strings     # List of languages to build (e.g., ["en", "fr", "es"])
                                  # If not specified, builds all available theme languages
                                  # Must be valid theme-supported language codes

  defaultLanguage: string         # 2-letter language code (e.g., "en", "fr", "es")
                                  # If set, this language will be at root (/) instead of a language selector
                                  # Other languages will be in subdirectories (e.g., /fr/, /es/)
                                  # Must be included in the languages array if both are specified
```

**Examples:**

```yaml
# Build only English and French, with English at root
site:
  languages: [en, fr]
  defaultLanguage: en

# Build all theme languages with language selector at root
site:
  # No configuration needed

# Build all theme languages with Spanish at root
site:
  defaultLanguage: es
```

---

## Profile Section

Personal information and contact details. The `name` field is required.

```yaml
profile:
  name: string (required)                    # Your full name
  email: string (email format)               # Email address
  phone: string                              # Phone number with country code
  city: string                               # City of residence
  country: string                            # Country of residence
  address: string | translatable             # Full street address (optional)
  website: string (URL)                      # Personal website
  introduction: string | translatable        # Professional summary or bio
  photo: string (path or URL)                # Path to profile photo
```

**Field Details:**

- **name** - Required. Your full name as you want it displayed
- **email** - Validated as proper email format
- **phone** - Include country code (e.g., "+1 (555) 123-4567")
- **address** - Can be translated for different languages
- **introduction** - Professional summary, can be multi-line using `|`
- **photo** - Relative path from resumes directory or full URL

**Example:**

```yaml
profile:
  name: María García
  email: maria.garcia@example.com
  phone: "+34 612 345 678"
  city: Madrid
  country: Spain
  website: https://mariagarcia.dev
  introduction: |
    Experienced software engineer with a passion for building
    scalable web applications and mentoring junior developers.
  photo: profile.jpg
```

---

## Experience Section

Professional work experience entries.

```yaml
experience:
  - company: string (required)               # Company name
    position: string | translatable (required) # Job title or position
    location: string                         # Job location
    startDate: string (YYYY-MM, required)    # Start date (e.g., "2020-01")
    endDate: string or null                  # "present", YYYY-MM, or null
    description: string | translatable       # Brief role description
    tasks: array of (string | translatable)  # Responsibilities and achievements
    technologies: array of strings           # Technologies or tools used
```

**Field Details:**

- **company** - Required. Company or organization name
- **position** - Required. Can be translated for different languages
- **startDate** - Required. Format: "YYYY-MM" (e.g., "2020-01")
- **endDate** - Use "present" for current jobs, "YYYY-MM", or null
- **description** - One-paragraph overview of the role
- **tasks** - Bullet list of achievements and responsibilities
- **technologies** - Tech stack (not typically translated)

**Example:**

```yaml
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
      fr: Direction du développement d'architecture de microservices.
      es: Liderando el desarrollo de arquitectura de microservicios.
    tasks:
      - en: Architected and implemented RESTful APIs serving 1M+ daily requests
        fr: Conception et implémentation d'APIs RESTful traitant 1M+ requêtes/jour
        es: Diseñé e implementé APIs RESTful con 1M+ solicitudes diarias
      - Mentored team of 4 junior developers
      - Reduced deployment time by 60% through CI/CD pipeline improvements
    technologies:
      - Node.js
      - React
      - PostgreSQL
      - Docker
      - Kubernetes
```

---

## Education Section

Educational background and qualifications.

```yaml
education:
  - institution: string (required)           # School or university name
    degree: string | translatable (required) # Degree or diploma title
    field: string | translatable             # Field of study or major
    location: string                         # Institution location
    startDate: string (YYYY or YYYY-MM)      # Start date
    endDate: string or null                  # "present", YYYY, YYYY-MM, or null
    gpa: string or number                    # Grade point average
    honors: string | translatable            # Honors, awards, distinctions
    description: string | translatable       # Additional details
```

**Field Details:**

- **institution** - Required. University or school name
- **degree** - Required. Degree type (Bachelor's, Master's, etc.)
- **field** - Major or area of study
- **startDate** - Format: "YYYY" or "YYYY-MM"
- **endDate** - Use "present" for ongoing, or year/date
- **gpa** - As string ("3.8/4.0") or number (3.8)
- **honors** - Cum laude, Dean's List, etc.

**Example:**

```yaml
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
    location: Madrid, Spain
    startDate: "2016"
    endDate: "2018"
    gpa: "3.8/4.0"
    honors: Summa Cum Laude
```

---

## Skills Section

Skills organized by category.

```yaml
skills:
  - category: string | translatable          # Skill category name
    items: array of (string | translatable)  # List of skills in this category
```

**Field Details:**

- **category** - Group name (e.g., "Programming Languages", "Frameworks")
- **items** - Array of skills within the category
- Both fields support translation

**Example:**

```yaml
skills:
  - category:
      en: Programming Languages
      fr: Langages de Programmation
      es: Lenguajes de Programación
    items:
      - JavaScript/TypeScript
      - Python
      - Go
  - category: Frameworks & Tools
    items:
      - React
      - Node.js
      - Express
      - PostgreSQL
      - MongoDB
```

---

## Languages Section

Language proficiency information.

```yaml
languages:
  - language: string | translatable          # Language name
    proficiency: enum (required)             # Proficiency level
```

**Proficiency Levels:**

- `native` - Native speaker
- `fluent` - Fluent/bilingual
- `advanced` - Advanced proficiency
- `intermediate` - Intermediate proficiency
- `basic` - Basic knowledge

**Example:**

```yaml
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
  - language:
      en: French
      fr: Français
      es: Francés
    proficiency: intermediate
```

---

## Hobbies Section

Personal interests and hobbies.

```yaml
hobbies: array of (string | translatable)
```

**Example:**

```yaml
hobbies:
  - en: Hiking
    fr: Randonnée
    es: Senderismo
  - en: Photography
    fr: Photographie
    es: Fotografía
  - en: Open source contributions
    fr: Contributions open source
    es: Contribuciones de código abierto
```

---

## Social Section

Social media profiles and links.

```yaml
social:
  - platform: string (required)              # Platform name (e.g., GitHub, LinkedIn)
    url: string (required, URL format)       # Full profile URL
    username: string                         # Username or handle
```

**Field Details:**

- **platform** - Name of the social platform
- **url** - Required. Must be a valid URL starting with http:// or https://
- **username** - Optional display name or handle

**Example:**

```yaml
social:
  - platform: GitHub
    url: https://github.com/mariagarcia
    username: mariagarcia
  - platform: LinkedIn
    url: https://linkedin.com/in/maria-garcia
    username: maria-garcia
  - platform: Twitter
    url: https://twitter.com/mariagarcia
    username: "@mariagarcia"
```

---

## Complete Example

Here's a complete, minimal `resume.yaml`:

```yaml
profile:
  name: John Doe
  email: john.doe@example.com
  phone: "+1 (555) 123-4567"
  introduction: Software engineer with 5 years of experience.

experience:
  - company: Tech Corp
    position: Software Engineer
    startDate: "2020-01"
    endDate: present
    tasks:
      - Built scalable web applications
      - Led team of 3 developers

education:
  - institution: State University
    degree: Bachelor of Science
    field: Computer Science
    startDate: "2015"
    endDate: "2019"

skills:
  - category: Programming Languages
    items:
      - JavaScript
      - Python

languages:
  - language: English
    proficiency: native

social:
  - platform: GitHub
    url: https://github.com/johndoe
```

---

## Validation

Resume Crafter validates your configuration when building:

```bash
# Validate without building
node src/cli.js validate

# Validation happens automatically during build
node src/cli.js build
```

**Common validation errors:**

- Missing required fields (name, company, position, etc.)
- Invalid date formats (use YYYY-MM)
- Invalid email format
- Invalid URLs for social links
- Invalid proficiency levels

---

## Next Steps

- **[Multi-Language Support](multi-language.md)** - Add translations
- **[Themes](themes.md)** - Customize appearance
- **[Deployment](deployment.md)** - Publish your resume

For examples, see the [examples/](../examples/) directory.
