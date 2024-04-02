---
to: ./services/<%= module %>/lib/device/<%= module %>.postDelete.js
---
const logger = require('../../../../utils/logger');

/**
 * @description Post delete action.
 * @param {object} device - The deleted device.
 * @example
 * postDelete(device)
 */
function postDelete(device) {
  logger.debug(`Post delete of ${device.external_id}`);
  // TODO : write some post delete process
}

module.exports = {
  postDelete,
};