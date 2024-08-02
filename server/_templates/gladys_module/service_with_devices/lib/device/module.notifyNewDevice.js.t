---
to: ./services/<%= module %>/lib/device/<%= module %>.notifyNewDevice.js
---
const { EVENTS } = require('../../../../utils/constants');

/**
 * @description Fire event for new devices.
 * @param {object} device - Discovered device.
 * @param {string} event - The event to publish to.
 * @example
 * notifyNewDevice(discoveredDevice)
 */
function notifyNewDevice(device, event) {
  this.gladys.event.emit(EVENTS.WEBSOCKET.SEND_ALL, {
    type: event,
    payload: device,
  });
}

module.exports = {
  notifyNewDevice,
};