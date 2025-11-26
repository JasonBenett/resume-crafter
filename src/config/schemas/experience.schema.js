/**
 * JSON Schema for professional experience entries
 */
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
        type: 'string',
        minLength: 1,
        description: 'Job title or position',
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
        type: 'string',
        description: 'Brief description of the role',
      },
      tasks: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'List of responsibilities and achievements',
      },
      technologies: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Technologies or tools used',
      },
    },
    required: ['company', 'position', 'startDate'],
    additionalProperties: false,
  },
};
