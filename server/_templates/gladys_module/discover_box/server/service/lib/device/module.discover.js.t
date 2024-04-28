---
to: ./services/<%= module %>/lib/device/<%= module %>.getDiscoveredDevices.js
---
const logger = require('../../../../utils/logger');

/**
 * @description Get all <%= module %> discovered devices.
 * @returns {*} Discovered devices.
 * @example
 * <%= attributeName %>Handler.getDiscoveredDevices()
 */
function getDiscoveredDevices() {
  logger.debug(`<%= className %>: return discovered devices`);
  return this.discoveredDevices;
}

module.exports = {
  getDiscoveredDevices,
};