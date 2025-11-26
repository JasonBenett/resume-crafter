/**
 * JSON Schema for hobbies and interests
 */
module.exports = {
  type: 'array',
  items: {
    type: 'string',
    minLength: 1,
  },
  description: 'List of hobbies and interests',
};
