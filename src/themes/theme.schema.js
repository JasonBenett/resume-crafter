/**
 * JSON Schema for theme.json configuration
 */
module.exports = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      description: 'Theme display name',
    },
    version: {
      type: 'string',
      pattern: '^\\d+\\.\\d+\\.\\d+$',
      description: 'Theme version (semver format)',
    },
    description: {
      type: 'string',
      description: 'Brief description of the theme',
    },
    author: {
      type: 'string',
      description: 'Theme author name',
    },
    supportedLanguages: {
      type: 'array',
      items: {
        type: 'string',
        minLength: 2,
        maxLength: 5,
      },
      description: 'List of supported language codes',
    },
    templates: {
      type: 'object',
      properties: {
        main: {
          type: 'string',
          description: 'Main template file (default: index.hbs)',
        },
        partials: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'List of partial template files',
        },
      },
      required: ['main'],
      additionalProperties: false,
    },
    assets: {
      type: 'object',
      properties: {
        styles: {
          type: 'string',
          description: 'Main CSS file (default: styles.css)',
        },
        images: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Image files to include',
        },
        fonts: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Font files to include',
        },
      },
      additionalProperties: false,
    },
  },
  required: ['name', 'version', 'templates'],
  additionalProperties: false,
};
