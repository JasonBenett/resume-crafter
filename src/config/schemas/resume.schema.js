/**
 * Master JSON Schema for resume configuration
 * Combines all individual schemas
 */
const { translatableString, translatableStringArray } = require('./common');
const profileSchema = require('./profile.schema');
const experienceSchema = require('./experience.schema');
const educationSchema = require('./education.schema');
const hobbiesSchema = require('./hobbies.schema');
const socialSchema = require('./social.schema');

module.exports = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    site: {
      type: 'object',
      properties: {
        defaultLanguage: {
          type: 'string',
          pattern: '^[a-z]{2}$',
          description:
            'Default language code (e.g., "en"). If set, this language will be at the root instead of a language selector.',
        },
        languages: {
          type: 'array',
          items: {
            type: 'string',
            pattern: '^[a-z]{2}$',
          },
          minItems: 1,
          uniqueItems: true,
          description:
            'List of languages to build (e.g., ["en", "fr"]). If not specified, all available theme languages are built.',
        },
        particles: {
          type: 'boolean',
          description:
            'Enable floating particles background effect (default: false)',
        },
      },
      additionalProperties: false,
      description: 'Site-wide configuration options',
    },
    profile: {
      ...profileSchema,
      description: 'Personal information and contact details',
    },
    experience: {
      ...experienceSchema,
      description: 'Professional work experience',
    },
    education: {
      ...educationSchema,
      description: 'Educational background and qualifications',
    },
    hobbies: {
      ...hobbiesSchema,
      description: 'Personal interests and hobbies',
    },
    social: {
      ...socialSchema,
      description: 'Social media profiles and links',
    },
    skills: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          category: {
            ...translatableString,
            description:
              'Skill category (e.g., Programming, Languages) (translatable)',
          },
          items: {
            ...translatableStringArray,
            description: 'List of skills in this category (translatable)',
          },
        },
        required: ['category', 'items'],
        additionalProperties: false,
      },
      description: 'Skills organized by category',
    },
    languages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          language: {
            oneOf: [
              {
                type: 'string',
                minLength: 1,
              },
              {
                type: 'object',
                patternProperties: {
                  '^[a-z]{2}$': {
                    type: 'string',
                    minLength: 1,
                  },
                },
                additionalProperties: false,
                minProperties: 1,
              },
            ],
            description: 'Language name (translatable)',
          },
          proficiency: {
            type: 'string',
            enum: ['native', 'fluent', 'advanced', 'intermediate', 'basic'],
            description: 'Proficiency level',
          },
        },
        required: ['language', 'proficiency'],
        additionalProperties: false,
      },
      description: 'Language skills and proficiency levels',
    },
  },
  required: ['profile'],
  additionalProperties: false,
};
