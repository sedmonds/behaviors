const getConfigIfExistsOrDefault = require('./behaviorConfig');
const Build = require('./build');

/**
 * The implementation of the behavior CLI
 * @param {Object} program
 * @return {Promise<void>}
 */
async function behaviorCLI(program) {
  if (
    [
      program.validate,
      program.build,
      program.metadata,
      program.watch,
    ].every(value => !value)
  ) {
    program.outputHelp();
    return Promise.resolve();
  }
  const config = await getConfigIfExistsOrDefault(program);
  if (program.build) {
    await Build.createRunnableBehaviors(config);
    if (program.watch) return Build.watch(config);
  } else if (program.metadata) {
    return Build.generateMetdataFile(config);
  } else if (program.watch) {
    return Build.watch(config);
  }
  return Promise.resolve();
}

module.exports = behaviorCLI;

/**
 * @typedef {Object} Config
 * @property {boolean|string} what
 * @property {string} behaviorDir
 * @property {string} libDir
 * @property {string} buildDir
 * @property {string} distDir
 * @property {string} tsConfigFilePath
 * @property {string} [metadata]
 */
