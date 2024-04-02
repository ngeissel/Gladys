---
to: ./services/<%= module %>/lib/device/<%= module %>.setValue.js
---
const logger = require('../../../../utils/logger');
const { BadParameters } = require('../../../../utils/coreErrors');

/**
 * @description Send the new device value over device protocol.
 * @param {object} device - Updated Gladys device.
 * @param {object} deviceFeature - Updated Gladys device feature.
 * @param {string|number} value - The new device feature value.
 * @example
 * <%= attributeName %>Handler.setValue(device, deviceFeature, 0);
 */
function setValue(device, deviceFeature, value) {
  logger.debug(`Set value of ${deviceFeature.extarnal_id} with value ${value}`);
  const externalId = deviceFeature.external_id;
  const [prefix, topic] = deviceFeature.external_id.split(':');

  if (prefix !== '<%= module %>') {
    throw new BadParameters(`<%= className %> device external_id is invalid: "${externalId}" should starts with "<%= module %>:"`);
  }
  // TODO : update this      
}

module.exports = {
  setValue,
};