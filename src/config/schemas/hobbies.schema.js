/**
 * JSON Schema for hobbies and interests
 */
const { translatableString } = require('./common');

module.exports = {
  type: 'array',
  items: {
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
  },
  description: 'List of hobbies and interests (translatable)',
};
