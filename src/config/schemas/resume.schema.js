/**
 * Master JSON Schema for resume configuration
 * Combines all individual schemas
 */
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
            type: 'string',
            description: 'Skill category (e.g., Programming, Languages)',
          },
          items: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'List of skills in this category',
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
            type: 'string',
            minLength: 1,
            description: 'Language name',
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
