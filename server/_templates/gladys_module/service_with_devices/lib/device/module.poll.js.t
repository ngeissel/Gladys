---
to: ./services/<%= module %>/lib/device/<%= module %>.poll.js
---
const logger = require('../../../../utils/logger');

/**
 * @description Polling requested device.
 * @param {object} device - Device to poll.
 * @example
 * <%= module %>.poll({}),
 */
function poll(device) {
  logger.debug(`Polling ${device.external_id}`);
}

module.exports = {
  poll,
};