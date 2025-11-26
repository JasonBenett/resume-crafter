const fs = require('fs').promises;
const yaml = require('js-yaml');
const path = require('path');

/**
 * Load and parse a YAML configuration file
 * @param {string} filePath - Path to the YAML file
 * @returns {Promise<Object>} Parsed configuration object
 * @throws {Error} If file cannot be read or YAML is invalid
 */
async function loadYamlFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const config = yaml.load(fileContent);

    if (!config || typeof config !== 'object') {
      throw new Error('Configuration file must contain a valid YAML object');
    }

    return config;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Configuration file not found: ${filePath}`);
    }

    if (error.name === 'YAMLException') {
      throw new Error(
        `Invalid YAML syntax in ${path.basename(filePath)}: ${error.message}`
      );
    }

    throw error;
  }
}

/**
 * Load resume configuration from YAML file
 * @param {string} configPath - Path to resume configuration file
 * @returns {Promise<Object>} Resume configuration object
 */
async function loadResumeConfig(configPath) {
  return await loadYamlFile(configPath);
}

module.exports = {
  loadYamlFile,
  loadResumeConfig,
};
