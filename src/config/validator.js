const Ajv = require('ajv');
const resumeSchema = require('./schemas/resume.schema');

// Create Ajv instance with options
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
});

/**
 * Format validation errors into user-friendly messages
 * @param {Array} errors - Ajv validation errors
 * @returns {string} Formatted error message
 */
function formatValidationErrors(errors) {
  if (!errors || errors.length === 0) {
    return 'Unknown validation error';
  }

  const messages = errors.map((error) => {
    const field = error.instancePath || 'root';
    const fieldName = field.replace(/^\//, '').replace(/\//g, '.');

    switch (error.keyword) {
      case 'required':
        return `Missing required field: ${fieldName ? fieldName + '.' : ''}${error.params.missingProperty}`;

      case 'type':
        return `Field "${fieldName}" must be of type ${error.params.type} (got ${typeof error.data})`;

      case 'minLength':
        return `Field "${fieldName}" must be at least ${error.params.limit} characters long`;

      case 'pattern':
        return `Field "${fieldName}" has invalid format: ${error.message}`;

      case 'enum':
        return `Field "${fieldName}" must be one of: ${error.params.allowedValues.join(', ')}`;

      case 'additionalProperties':
        return `Unknown field "${fieldName}.${error.params.additionalProperty}" is not allowed`;

      default:
        return `Validation error at "${fieldName}": ${error.message}`;
    }
  });

  return messages.join('\n');
}

/**
 * Validate resume configuration against schema
 * @param {Object} config - Configuration object to validate
 * @returns {Object} Validation result { valid: boolean, errors: string|null }
 */
function validateResumeConfig(config) {
  const validate = ajv.compile(resumeSchema);
  const valid = validate(config);

  if (!valid) {
    return {
      valid: false,
      errors: formatValidationErrors(validate.errors),
    };
  }

  return {
    valid: true,
    errors: null,
  };
}

/**
 * Validate and throw error if invalid
 * @param {Object} config - Configuration object to validate
 * @throws {Error} If validation fails
 */
function validateAndThrow(config) {
  const result = validateResumeConfig(config);

  if (!result.valid) {
    throw new Error(`Configuration validation failed:\n${result.errors}`);
  }
}

module.exports = {
  validateResumeConfig,
  validateAndThrow,
  formatValidationErrors,
};
