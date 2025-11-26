/**
 * Common schema patterns and helpers
 */

/**
 * Schema for a translatable string field
 * Allows either a simple string or an object with language keys
 */
const translatableString = {
  oneOf: [
    {
      type: 'string',
    },
    {
      type: 'object',
      patternProperties: {
        '^[a-z]{2}$': {
          type: 'string',
        },
      },
      additionalProperties: false,
      minProperties: 1,
    },
  ],
};

/**
 * Schema for an array of translatable strings
 * Each item can be either a string or a language object
 */
const translatableStringArray = {
  type: 'array',
  items: translatableString,
};

module.exports = {
  translatableString,
  translatableStringArray,
};
