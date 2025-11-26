const { loadYamlFile, loadResumeConfig } = require('./loader');
const { validateResumeConfig, validateAndThrow } = require('./validator');

/**
 * Load and validate resume configuration
 * @param {string} configPath - Path to configuration file
 * @returns {Promise<Object>} Validated configuration object
 * @throws {Error} If loading or validation fails
 */
async function loadAndValidateConfig(configPath) {
  // Load YAML file
  const config = await loadResumeConfig(configPath);

  // Validate against schema
  validateAndThrow(config);

  return config;
}

module.exports = {
  loadYamlFile,
  loadResumeConfig,
  validateResumeConfig,
  validateAndThrow,
  loadAndValidateConfig,
};
