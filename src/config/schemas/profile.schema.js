/**
 * JSON Schema for profile/personal information
 */
const { translatableString } = require('./common');

module.exports = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      description: 'Full name of the person',
    },
    dateOfBirth: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      description: 'Date of birth in YYYY-MM-DD format',
    },
    phone: {
      type: 'string',
      description: 'Phone number',
    },
    email: {
      type: 'string',
      pattern: '^[^@]+@[^@]+\\.[^@]+$',
      description: 'Email address',
    },
    city: {
      type: 'string',
      description: 'City of residence',
    },
    country: {
      type: 'string',
      description: 'Country of residence',
    },
    address: {
      ...translatableString,
      description: 'Full address (optional, translatable)',
    },
    introduction: {
      ...translatableString,
      description: 'Brief introduction or professional summary (translatable)',
    },
    photo: {
      type: 'string',
      description: 'Path or URL to profile photo',
    },
    website: {
      type: 'string',
      description: 'Personal website URL',
    },
  },
  required: ['name'],
  additionalProperties: false,
};
