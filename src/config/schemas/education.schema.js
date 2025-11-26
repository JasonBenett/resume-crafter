/**
 * JSON Schema for education/diploma entries
 */
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
        type: 'string',
        minLength: 1,
        description: 'Degree, diploma, or certification title',
      },
      field: {
        type: 'string',
        description: 'Field of study or major',
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
        type: 'string',
        description: 'Honors, awards, or distinctions',
      },
      description: {
        type: 'string',
        description: 'Additional details about the education',
      },
    },
    required: ['institution', 'degree'],
    additionalProperties: false,
  },
};
