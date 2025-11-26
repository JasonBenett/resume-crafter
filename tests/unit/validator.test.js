const { describe, test } = require('node:test');
const assert = require('node:assert');
const { validateAndThrow } = require('../../src/config/validator');

describe('Config Validator', () => {
  describe('Profile Validation', () => {
    test('should validate valid profile', () => {
      const config = {
        profile: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      };

      assert.doesNotThrow(() => validateAndThrow(config));
    });

    test('should reject profile without name', () => {
      const config = {
        profile: {
          email: 'john@example.com',
        },
      };

      assert.throws(() => validateAndThrow(config), /profile\.name/i);
    });

    test('should reject profile with invalid email', () => {
      const config = {
        profile: {
          name: 'John Doe',
          email: 'invalid-email',
        },
      };

      assert.throws(() => validateAndThrow(config), /email/i);
    });

    test('should accept profile with optional fields', () => {
      const config = {
        profile: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          city: 'New York',
          country: 'USA',
          website: 'https://example.com',
          introduction: 'A brief intro',
        },
      };

      assert.doesNotThrow(() => validateAndThrow(config));
    });
  });

  describe('Experience Validation', () => {
    test('should validate valid experience entries', () => {
      const config = {
        profile: { name: 'John Doe' },
        experience: [
          {
            company: 'Tech Corp',
            position: 'Developer',
            startDate: '2020-01',
            endDate: 'present',
          },
        ],
      };

      assert.doesNotThrow(() => validateAndThrow(config));
    });

    test('should reject experience without required fields', () => {
      const config = {
        profile: { name: 'John Doe' },
        experience: [
          {
            company: 'Tech Corp',
            // missing position and dates
          },
        ],
      };

      assert.throws(() => validateAndThrow(config));
    });
  });

  describe('Skills Validation', () => {
    test('should validate valid skills', () => {
      const config = {
        profile: { name: 'John Doe' },
        skills: [
          {
            category: 'Programming',
            items: ['JavaScript', 'Python'],
          },
        ],
      };

      assert.doesNotThrow(() => validateAndThrow(config));
    });

    test('should reject skills without required fields', () => {
      const config = {
        profile: { name: 'John Doe' },
        skills: [
          {
            // missing category and items
          },
        ],
      };

      assert.throws(() => validateAndThrow(config));
    });
  });

  describe('Languages Validation', () => {
    test('should validate valid languages', () => {
      const config = {
        profile: { name: 'John Doe' },
        languages: [
          {
            language: 'English',
            proficiency: 'native',
          },
        ],
      };

      assert.doesNotThrow(() => validateAndThrow(config));
    });

    test('should reject invalid proficiency level', () => {
      const config = {
        profile: { name: 'John Doe' },
        languages: [
          {
            language: 'English',
            proficiency: 'invalid-level',
          },
        ],
      };

      assert.throws(() => validateAndThrow(config), /proficiency/i);
    });
  });
});
