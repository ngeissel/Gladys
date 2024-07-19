---
to: ./services/<%= module %>/lib/utils/<%= module %>.convertToGladysDevice.js
---
const logger = require('../../../../utils/logger');
const { addSelector } = require('../../../../utils/addSelector');
const { DEVICE_FEATURE_CATEGORIES, DEVICE_FEATURE_TYPES } = require('../../../../utils/constants');

const convertToGladysDevice = (serviceId, sourceDevice) => {
  logger.debug(`Convert device : ${sourceDevice}`);
  const device = {
    name: sourceDevice.name,
    external_id: `<%= module %>:${sourceDevice.uuid}`,
    service_id: serviceId,
    should_poll: false,
    features: [],
  };
  addSelector(device);  

  return device;
};

module.exports = {
  convertToGladysDevice,
};