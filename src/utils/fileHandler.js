const fs = require('fs-extra');

/**
 * Ensure directory exists, create if not
 * @param {string} dirPath - Directory path
 */
async function ensureDir(dirPath) {
  await fs.ensureDir(dirPath);
}

/**
 * Copy file from source to destination
 * @param {string} src - Source file path
 * @param {string} dest - Destination file path
 */
async function copyFile(src, dest) {
  await fs.copy(src, dest);
}

/**
 * Copy directory recursively
 * @param {string} src - Source directory path
 * @param {string} dest - Destination directory path
 */
async function copyDir(src, dest) {
  await fs.copy(src, dest, { recursive: true });
}

/**
 * Write content to file
 * @param {string} filePath - File path
 * @param {string} content - Content to write
 */
async function writeFile(filePath, content) {
  await fs.writeFile(filePath, content, 'utf-8');
}

/**
 * Read file content
 * @param {string} filePath - File path
 * @returns {Promise<string>}
 */
async function readFile(filePath) {
  return await fs.readFile(filePath, 'utf-8');
}

/**
 * Clean directory (remove and recreate)
 * @param {string} dirPath - Directory path
 */
async function cleanDir(dirPath) {
  await fs.remove(dirPath);
  await fs.ensureDir(dirPath);
}

module.exports = {
  ensureDir,
  copyFile,
  copyDir,
  writeFile,
  readFile,
  cleanDir,
};
