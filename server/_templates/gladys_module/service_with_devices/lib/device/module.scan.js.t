---
to: ./services/<%= module %>/lib/device/<%= module %>.scan.js
---
const { convertToGladysDevice } = require('../utils/<%= module %>.convertToGladysDevice');
const { WEBSOCKET_MESSAGE_TYPES } = require('../../../../utils/constants');

/**
 * @description Force scanning for devices.
 * @returns {*} Discovered devices.
 * @example
 * scan();
 */
async function scan() {
  // TODO : Adapt ...
  
  const device = convertToGladysDevice(this.serviceId, {
      name: 'the name !',
      uuid: 'uuid',
    },
  );
  this.discoveredDevices[device.external_id] = device;
  this.<%= attributeName %>Handler.notifyNewDevice(device, WEBSOCKET_MESSAGE_TYPES.<%= constName %>.NEW_DEVICE);
  return this.discoveredDevices;
}

module.exports = {
  scan,
};