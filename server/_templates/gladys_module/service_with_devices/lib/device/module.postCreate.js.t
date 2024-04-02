---
to: ./services/<%= module %>/lib/device/<%= module %>.postCreate.js
---
const logger = require('../../../../utils/logger');

/**
 * @description  Device post creation action.
 * @param {object} device - The created device.
 * @example
 * postCreate(device)
 */
function postCreate(device) {
    logger.debug(`Post creation of ${device.external_id}`);
    // TODO : write some post creation process
  }
  
  module.exports = {
    postCreate,
  };