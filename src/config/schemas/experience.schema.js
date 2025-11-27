/**
 * JSON Schema for professional experience entries
 */
const { translatableString, translatableStringArray } = require('./common');

module.exports = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      company: {
        type: 'string',
        minLength: 1,
        description: 'Company name',
      },
      position: {
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
        description: 'Job title or position (translatable)',
      },
      location: {
        type: 'string',
        description: 'Location of the job',
      },
      startDate: {
        type: 'string',
        pattern: '^\\d{4}-\\d{2}(-\\d{2})?$',
        description: 'Start date in YYYY-MM or YYYY-MM-DD format',
      },
      endDate: {
        type: ['string', 'null'],
        pattern: '^(\\d{4}-\\d{2}(-\\d{2})?|present)$',
        description:
          'End date in YYYY-MM or YYYY-MM-DD format, "present" for current job, or null',
      },
      description: {
        ...translatableString,
        description: 'Brief description of the role (translatable)',
      },
      tasks: {
        ...translatableStringArray,
        description: 'List of responsibilities and achievements (translatable)',
      },
      technologies: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Technologies or tools used',
      },
      url: {
        type: 'string',
        description: 'URL to company website or project (optional)',
      },
    },
    required: ['company', 'position', 'startDate'],
    additionalProperties: false,
  },
};
