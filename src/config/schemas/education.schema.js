/**
 * JSON Schema for education/diploma entries
 */
const { translatableString } = require('./common');

module.exports = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      institution: {
        type: 'string',
        minLength: 1,
        description: 'School, university, or institution name',
      },
      degree: {
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
        description: 'Degree, diploma, or certification title (translatable)',
      },
      field: {
        ...translatableString,
        description: 'Field of study or major (translatable)',
      },
      location: {
        type: 'string',
        description: 'Location of the institution',
      },
      startDate: {
        type: 'string',
        pattern: '^\\d{4}(-\\d{2})?$',
        description: 'Start date in YYYY or YYYY-MM format',
      },
      endDate: {
        type: ['string', 'null'],
        pattern: '^(\\d{4}(-\\d{2})?|present)$',
        description:
          'End date in YYYY or YYYY-MM format, "present" for ongoing, or null',
      },
      gpa: {
        type: ['string', 'number'],
        description: 'Grade point average or final grade',
      },
      honors: {
        ...translatableString,
        description: 'Honors, awards, or distinctions (translatable)',
      },
      description: {
        ...translatableString,
        description: 'Additional details about the education (translatable)',
      },
    },
    required: ['institution', 'degree'],
    additionalProperties: false,
  },
};
