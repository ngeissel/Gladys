---
to: ./services/<%= module %>/lib/config/<%= module %>.saveConfiguration.js
---
const logger = require('../../../../utils/logger');
const { CONFIGURATION } = require('../utils/<%= module %>.constants');

/**
 * @description Return <%= className %> status.
 * @param {Object} [configuration] - <%= className %> configuration.
 * @param {string} [configuration.apiKey] - <%= className %> API key.
 * @returns {any} Null.
 * @example
 * <%= module %>.saveConfiguration();
 */
async function saveConfiguration({ apiKey }) {
  logger.debug(`<%= className %>: save config`);
  logger.debug(`<%= className %>: save config with ${CONFIGURATION.<%= constName %>_API_KEY}=${apiKey}`);
  await this.gladys.variable.setValue(CONFIGURATION.<%= constName %>_API_KEY, apiKey, this.serviceId);
  return null;
}

module.exports = {
  saveConfiguration,
};
