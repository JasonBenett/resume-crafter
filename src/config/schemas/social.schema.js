/**
 * JSON Schema for social media links
 */
module.exports = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      platform: {
        type: 'string',
        minLength: 1,
        description:
          'Social media platform name (e.g., LinkedIn, GitHub, Twitter)',
      },
      url: {
        type: 'string',
        pattern: '^https?://',
        description: 'Full URL to the profile',
      },
      username: {
        type: 'string',
        description: 'Username or handle on the platform',
      },
    },
    required: ['platform', 'url'],
    additionalProperties: false,
  },
};
