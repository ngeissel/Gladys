---
to: ./services/<%= module %>/lib/config/<%= module %>.getConfiguration.js
---
const logger = require('../../../../utils/logger');
const { CONFIGURATION } = require('../utils/<%= module %>.constants');

/**
 * @description Returns <%= className %> configuration informations.
 * @returns {Object} [configuration] Service connection informations.
 * @returns {string} [configuration.apiKey] API key to connect to the service.
 * @example
 * <%= module %>.getConfiguration();
 */
async function getConfiguration() {
  logger.debug('<%= className %> : get configuration');
  const apiKey = await this.gladys.variable.getValue(CONFIGURATION.<%= constName %>_API_KEY, this.serviceId);
  logger.debug(`<%= className %> return config apiKey=${apiKey}`);
  return {
    apiKey,
  };
}

module.exports = {
  getConfiguration,
};
